// Bu fayl app.js DAN KEYIN yuklanishi kerak.
// Ikki xil ishga tushirish yo'li bor:
//   1) Android ilova ichidagi WebView - window.AndroidApp orqali, Telegram'siz.
//   2) Telegram Mini App - "telegram-verified" xabari orqali (avvalgidek).
// Ikkalasida ham oxir-oqibat bir xil narsa bajariladi: Supabase'dan profil va
// attendance o'qiladi, so'ngra app.js ichidagi `settings`/`workData` to'ldiriladi.

async function loadAttendanceAsWorkData(profileId, breakMinutes) {
    const rows = await sbListAttendance(profileId);
    const result = {};

    rows.forEach(row => {
        result[row.work_date] = {
            start: row.check_in ? row.check_in.slice(0, 5) : "",
            end: row.check_out ? row.check_out.slice(0, 5) : "",
            breakMinutes: breakMinutes
        };
    });

    return result;
}

function applyProfile(profile) {
    settings = {
        name: profile.first_name,
        surname: profile.last_name,
        schedule: profile.schedule_type,
        scheduleStart: profile.schedule_start,
        workStart: profile.work_start ? profile.work_start.slice(0, 5) : "08:00",
        workEnd: profile.work_end ? profile.work_end.slice(0, 5) : "20:00",
        breakMinutes: profile.break_minutes,
        monthlySalary: profile.monthly_salary
    };

    registeredNfc = profile.card_hash || "";
    window.currentProfileId = profile.id;

    localStorage.setItem("ishVaqtimSettings", JSON.stringify(settings));
    localStorage.setItem("ishVaqtimNfc", registeredNfc);
}

// --- 1-YO'L: Android ilova ichida (WebView) ---
async function syncWithAndroid() {
    try {
        const profileId = window.AndroidApp.getProfileId();

        if (!profileId || profileId === "null") {
            // Android hali Supabase'ga profil yubormagan (masalan internet yo'q edi)
            settings = null;
            registeredNfc = "";
            startApp();
            return;
        }

        const profile = await sbGetProfileById(profileId);

        if (profile) {
            applyProfile(profile);
            workData = await loadAttendanceAsWorkData(profile.id, profile.break_minutes);
            localStorage.setItem("ishVaqtimDays", JSON.stringify(workData));
        } else {
            settings = null;
            registeredNfc = "";
        }
    } catch (e) {
        console.warn("Android orqali sinxronlashda xato:", e);
    }

    startApp();
}

// --- 2-YO'L: Telegram Mini App ---
async function syncWithTelegram(user) {
    window.currentProfileId = null;

    try {
        const profile = await sbGetProfile(user.id);

        if (profile) {
            applyProfile(profile);
            workData = await loadAttendanceAsWorkData(profile.id, profile.break_minutes);
            localStorage.setItem("ishVaqtimDays", JSON.stringify(workData));
        } else {
            settings = null;
            registeredNfc = "";
        }
    } catch (e) {
        console.warn("Supabase'dan ma'lumot yuklashda xato:", e);
    }

    startApp();
}

if (window.AndroidApp) {
    // Android ichida - Telegram'ni kutmasdan, darhol boshlaymiz
    syncWithAndroid();
} else {
    window.addEventListener("telegram-verified", (event) => {
        syncWithTelegram(event.detail);
    });

    // Telegram tashqarisida (oddiy brauzerda) ochilgan bo'lsa - lokal ma'lumot bilan ishga tushiramiz
    setTimeout(() => {
        if (!window.telegramUser) {
            console.warn("Telegram topilmadi, lokal ma'lumot bilan ishga tushirilmoqda.");
            startApp();
        }
    }, 2500);
}
