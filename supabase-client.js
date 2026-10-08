// Supabase bilan Mini App tomonidan gaplashish uchun kichik yordamchi.
// Bu fayl telegram-auth.js dan KEYIN, app.js dan OLDIN yuklanishi kerak.

const SB_URL = "https://hkyyrsgnoonsihbwydrs.supabase.co";
const SB_ANON_KEY = "sb_publishable_kdlfcT6hiuEXhZCwWPApeg__SFyVNsX"; // tekshiring!

function sbHeaders(extra) {
    return Object.assign({
        "apikey": SB_ANON_KEY,
        "Authorization": "Bearer " + SB_ANON_KEY,
        "Content-Type": "application/json"
    }, extra || {});
}

// So'nggi N soniya ichida kelgan, hali bog'lanmagan (claimed=false) skanlarni qaytaradi.
async function sbFindRecentUnclaimedScan(withinSeconds) {
    const since = new Date(Date.now() - withinSeconds * 1000).toISOString();

    const url = SB_URL +
        "/rest/v1/nfc_scans?claimed=eq.false&scanned_at=gte." + encodeURIComponent(since) +
        "&order=scanned_at.desc&limit=1";

    const res = await fetch(url, { headers: sbHeaders() });
    if (!res.ok) throw new Error("nfc_scans so'rovi xato: " + res.status);

    const rows = await res.json();
    return rows.length > 0 ? rows[0] : null;
}

// Topilgan skanni "band qilindi" deb belgilaydi, shu bilan boshqa odam uni ishlata olmaydi.
async function sbClaimScan(scanId) {
    const url = SB_URL + "/rest/v1/nfc_scans?id=eq." + scanId + "&claimed=eq.false";

    const res = await fetch(url, {
        method: "PATCH",
        headers: sbHeaders({ "Prefer": "return=representation" }),
        body: JSON.stringify({ claimed: true })
    });

    if (!res.ok) throw new Error("Skanni band qilishda xato: " + res.status);

    const rows = await res.json();
    return rows.length > 0; // true bo'lsa, aynan biz band qildik
}

// Profilni yaratadi yoki (telegram_id bo'yicha) yangilaydi.
async function sbUpsertProfile(profile) {
    const url = SB_URL + "/rest/v1/profiles?on_conflict=telegram_id";

    const res = await fetch(url, {
        method: "POST",
        headers: sbHeaders({ "Prefer": "resolution=merge-duplicates,return=representation" }),
        body: JSON.stringify(profile)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error("Profil saqlashda xato: " + res.status + " " + text);
    }

    const rows = await res.json();
    return rows[0];
}

// Telegram ID bo'yicha profilni o'qiydi.
async function sbGetProfile(telegramId) {
    const url = SB_URL + "/rest/v1/profiles?telegram_id=eq." + telegramId + "&limit=1";
    const res = await fetch(url, { headers: sbHeaders() });
    if (!res.ok) throw new Error("Profil o'qishda xato: " + res.status);
    const rows = await res.json();
    return rows.length > 0 ? rows[0] : null;
}


// Profilning barcha attendance (davomat) yozuvlarini qaytaradi.
async function sbListAttendance(profileId) {
    const url = SB_URL +
        "/rest/v1/attendance?profile_id=eq." + profileId +
        "&order=work_date.asc&limit=1000";

    const res = await fetch(url, { headers: sbHeaders() });
    if (!res.ok) throw new Error("attendance so'rovi xato: " + res.status);
    return await res.json();
}

// Bitta kunning Kirish/Chiqish vaqtini yozadi yoki yangilaydi (qo'lda tahrirlash uchun).
async function sbUpsertAttendanceDay(profileId, workDate, checkIn, checkOut) {
    const url = SB_URL + "/rest/v1/attendance?on_conflict=profile_id,work_date";

    const body = {
        profile_id: profileId,
        work_date: workDate,
        check_in: checkIn || null,
        check_out: checkOut || null,
        source: "manual"
    };

    const res = await fetch(url, {
        method: "POST",
        headers: sbHeaders({ "Prefer": "resolution=merge-duplicates,return=minimal" }),
        body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("attendance saqlashda xato: " + res.status);
}

// Bitta kunning yozuvini butunlay o'chiradi.
async function sbDeleteAttendanceDay(profileId, workDate) {
    const url = SB_URL +
        "/rest/v1/attendance?profile_id=eq." + profileId + "&work_date=eq." + workDate;

    const res = await fetch(url, {
        method: "DELETE",
        headers: sbHeaders({ "Prefer": "return=minimal" })
    });

    if (!res.ok) throw new Error("attendance o'chirishda xato: " + res.status);
}
