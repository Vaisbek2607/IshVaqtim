// Bu fayl app.js DAN KEYIN yuklanishi kerak.
// Telegram tasdiqlangandan so'ng (telegram-auth.js "telegram-verified" xabarini yuborgach),
// shu yerda Supabase'dan profil va davomat (attendance) ma'lumotlari o'qiladi,
// so'ngra app.js ichidagi `settings` va `workData` o'zgaruvchilariga joylanadi.
// Shundan keyingina ekran (Login/Welcome/Home) ko'rsatiladi.

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

async function syncWithSupabase(user) {
    window.currentProfileId = null;

    try {
        const profile = await sbGetProfile(user.id);

        if (profile) {
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

            workData = await loadAttendanceAsWorkData(profile.id, profile.break_minutes);

            localStorage.setItem("ishVaqtimSettings", JSON.stringify(settings));
            localStorage.setItem("ishVaqtimDays", JSON.stringify(workData));
            localStorage.setItem("ishVaqtimNfc", registeredNfc);
        } else {
            // Bu Telegram foydalanuvchisi uchun hali profil yaratilmagan
            settings = null;
            registeredNfc = "";
        }
    } catch (e) {
        console.warn("Supabase'dan ma'lumot yuklashda xato:", e);
        // Xato bo'lsa ham, lokal saqlangan (eski) ma'lumot bilan davom etamiz
    }

    startApp();
}

window.addEventListener("telegram-verified", (event) => {
    syncWithSupabase(event.detail);
});

// Agar Telegram tashqarisida (oddiy brauzerda) ochilgan bo'lsa,
// telegram-verified xabari hech qachon kelmaydi - shuning uchun lokal ma'lumot bilan ishga tushiramiz.
setTimeout(() => {
    if (!window.telegramUser) {
        console.warn("Telegram topilmadi, lokal ma'lumot bilan ishga tushirilmoqda.");
        startApp();
    }
}, 2500);
