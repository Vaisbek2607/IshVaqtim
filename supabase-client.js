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
