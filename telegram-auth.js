// Telegram Mini App foydalanuvchisini Supabase Edge Function orqali tasdiqlaydi.
// Bu fayl hozircha faqat SINOV uchun: ekranda "tanildi / tanilmadi" degan xabar ko'rsatadi.
// Keyingi bosqichda shu yerda olingan foydalanuvchi ID'si profil va karta bog'lash uchun ishlatiladi.

const SUPABASE_URL = "https://hkyyrsgnoonsihbwydrs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kdlfcT6hiuEXhZCwWPApeg__SFyVNsX"; // tekshiring!
const VERIFY_FUNCTION_URL = SUPABASE_URL + "/functions/v1/telegram-verify";

// Tasdiqlangan foydalanuvchi shu global o'zgaruvchiga yoziladi.
// Keyingi bosqichda app.js shu yerdan foydalanadi.
window.telegramUser = null;

function setTelegramBanner(text, isError) {
    const el = document.getElementById("telegramStatusBanner");
    if (!el) return;
    el.textContent = text;
    el.style.background = isError ? "#fde2e2" : "#e3f3ea";
    el.style.color = isError ? "#b42318" : "#15803d";
}

async function verifyTelegramUser() {
    const tg = window.Telegram ? window.Telegram.WebApp : null;

    if (!tg || !tg.initData) {
        setTelegramBanner(
            "⚠️ Bu sahifa Telegram ilovasi ichida ochilmagan (brauzerda test qilsangiz, bu normal holat).",
            true
        );
        return;
    }

    tg.ready();

    try {
        const response = await fetch(VERIFY_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY
            },
            body: JSON.stringify({ initData: tg.initData })
        });

        const data = await response.json();

        if (data.ok) {
            window.telegramUser = data.user;
            const name = data.user.first_name || "Foydalanuvchi";
            setTelegramBanner("✅ Telegram: " + name + " tanildi (ID: " + data.user.id + ")", false);

            // Boshqa fayllarga (supabase-sync.js) xabar beramiz: endi profilni yuklash mumkin
            window.dispatchEvent(
                new CustomEvent("telegram-verified", { detail: data.user })
            );
        } else {
            setTelegramBanner("❌ Tasdiqlanmadi: " + (data.error || "noma'lum xato"), true);
        }
    } catch (e) {
        setTelegramBanner("❌ Server bilan bog'lanib bo'lmadi: " + e.message, true);
    }
}

document.addEventListener("DOMContentLoaded", verifyTelegramUser);
