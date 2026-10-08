// ======================================================
// ISH VAQTIM — APP.JS
// ======================================================


// ==================== GLOBAL ====================

let currentDate = new Date();
let selectedDate = null;
let selectedSchedule = null;
let settingsSchedule = null;

let settings =
    JSON.parse(localStorage.getItem("ishVaqtimSettings")) || null;

let workData =
    JSON.parse(localStorage.getItem("ishVaqtimDays")) || {};

let registeredNfc =
    localStorage.getItem("ishVaqtimNfc") || "";

let language =
    localStorage.getItem("ishVaqtimLanguage") || "uz";


// ==================== TRANSLATIONS ====================

const translations = {

    uz: {
        welcomeSubtitle:
            "Ish vaqtini va maoshingizni nazorat qiling",

        login: "Kirish",
        register: "Ro‘yxatdan o‘tish",

        loginTitle: "Hisobga kirish",
        registerTitle: "Ro‘yxatdan o‘tish",

        loginNfcInfo:
            "Ro‘yxatdan o‘tgan NFC kartangiz orqali kiring",

        personalInfo: "Shaxsiy ma’lumotlar",
        workSchedule: "Ish jadvali",
        workTime: "Ish vaqti",
        salary: "Oylik maosh",

        scheduleType: "Ish jadvali",
        scheduleStart: "Jadval boshlanish sanasi",

        workStart: "Ish boshlanishi",
        workEnd: "Ish tugashi",
        break: "Tanaffus",

        monthlySalary: "Oylik maosh",

        salaryHint:
            "Soatlik stavka rejalashtirilgan oylik ish soatlari asosida avtomatik hisoblanadi.",

        nfcRegistration: "NFC karta",

        nfcRegisterInfo:
            "Ishga kirishda va ishdan chiqishda bir xil NFC karta ishlatiladi.",

        nfcAuto:
            "Tizim Kirish / Chiqishni avtomatik aniqlaydi.",

        finish: "Tugatish",

        hourRate: "1 soat:",

        workedHours: "Ishlangan soat",
        earned: "Ishlangan pul",
        workedDays: "Ishlangan kun",

        mon: "Du",
        tue: "Se",
        wed: "Ch",
        thu: "Pa",
        fri: "Ju",
        sat: "Sh",
        sun: "Ya",

        scheduledWork: "Rejadagi ish kuni",
        extraWork: "Qo‘shimcha ish",
        restDay: "Dam olish",

        start: "Kirish",
        end: "Chiqish",
        hours: "Soat",
        payment: "To‘lov",

        save: "Saqlash",
        delete: "O‘chirish",

        attendance: "Davomat",

        attendanceInfo:
            "Bitta karta bilan ertalab Kirish, kechqurun Chiqish.",

        settings: "Sozlamalar",
        profile: "Profil",

        nfcStatus: "NFC karta holati",

        saveChanges: "O‘zgarishlarni saqlash",

        logout: "Hisobdan chiqish",

        logoutHint:
            "Hisobdan chiqish ma’lumotlaringizni o‘chirmaydi.",

        name: "Ism",
        surname: "Familiya",

        success: "Muvaffaqiyatli",
        error: "Xatolik",

        nfcRegistered:
            "NFC karta muvaffaqiyatli ro‘yxatdan o‘tdi.",

        loginSuccess:
            "Kirish muvaffaqiyatli.",

        nfcMorning:
            "Kirish qayd etildi: 08:00",

        nfcEvening:
            "Chiqish qayd etildi: 19:00",

        nfcLate:
            "Chiqish qayd etildi: 20:00",

        nfcAlreadyEntered:
            "Bugungi Kirish allaqachon qayd etilgan.",

        nfcAlreadyExited:
            "Bugungi Chiqish allaqachon qayd etilgan.",

        nfcWrongTime:
            "Hozir NFC davomat uchun belgilangan vaqt emas.",

        noNfc:
            "NFC karta ro‘yxatdan o‘tmagan.",

        saved:
            "O‘zgarishlar saqlandi.",

        deleted:
            "Davomat o‘chirildi.",

        selectSchedule:
            "Ish jadvalini tanlang.",

        enterName:
            "Ism va familiyani kiriting.",

        enterSalary:
            "Oylik maoshni kiriting.",

        selectDate:
            "Jadval boshlanish sanasini tanlang.",

        loginFirst:
            "Avval ro‘yxatdan o‘ting."
    },


    ru: {
        welcomeSubtitle:
            "Контролируйте рабочее время и заработок",

        login: "Войти",
        register: "Регистрация",

        loginTitle: "Вход в аккаунт",
        registerTitle: "Регистрация",

        loginNfcInfo:
            "Войдите с помощью зарегистрированной NFC-карты",

        personalInfo: "Личные данные",
        workSchedule: "График работы",
        workTime: "Рабочее время",
        salary: "Зарплата",

        scheduleType: "График работы",
        scheduleStart: "Дата начала графика",

        workStart: "Начало работы",
        workEnd: "Конец работы",
        break: "Перерыв",

        monthlySalary: "Месячная зарплата",

        salaryHint:
            "Почасовая ставка рассчитывается автоматически на основе плановых рабочих часов месяца.",

        nfcRegistration: "NFC-карта",

        nfcRegisterInfo:
            "Одна и та же NFC-карта используется при входе и выходе с работы.",

        nfcAuto:
            "Система автоматически определяет Вход / Выход.",

        finish: "Завершить",

        hourRate: "1 час:",

        workedHours: "Отработано часов",
        earned: "Заработано",
        workedDays: "Рабочих дней",

        mon: "Пн",
        tue: "Вт",
        wed: "Ср",
        thu: "Чт",
        fri: "Пт",
        sat: "Сб",
        sun: "Вс",

        scheduledWork: "Рабочий день",
        extraWork: "Дополнительная работа",
        restDay: "Выходной",

        start: "Вход",
        end: "Выход",
        hours: "Часы",
        payment: "Оплата",

        save: "Сохранить",
        delete: "Удалить",

        attendance: "Посещаемость",

        attendanceInfo:
            "Одна карта: утром Вход, вечером Выход.",

        settings: "Настройки",
        profile: "Профиль",

        nfcStatus: "Статус NFC-карты",

        saveChanges: "Сохранить изменения",

        logout: "Выйти из аккаунта",

        logoutHint:
            "Выход из аккаунта не удаляет ваши данные.",

        name: "Имя",
        surname: "Фамилия",

        success: "Успешно",
        error: "Ошибка",

        nfcRegistered:
            "NFC-карта успешно зарегистрирована.",

        loginSuccess:
            "Вход выполнен успешно.",

        nfcMorning:
            "Вход записан: 08:00",

        nfcEvening:
            "Выход записан: 19:00",

        nfcLate:
            "Выход записан: 20:00",

        nfcAlreadyEntered:
            "Сегодняшний вход уже записан.",

        nfcAlreadyExited:
            "Сегодняшний выход уже записан.",

        nfcWrongTime:
            "Сейчас не время для NFC-посещаемости.",

        noNfc:
            "NFC-карта не зарегистрирована.",

        saved:
            "Изменения сохранены.",

        deleted:
            "Посещаемость удалена.",

        selectSchedule:
            "Выберите график работы.",

        enterName:
            "Введите имя и фамилию.",

        enterSalary:
            "Введите месячную зарплату.",

        selectDate:
            "Выберите дату начала графика.",

        loginFirst:
            "Сначала зарегистрируйтесь."
    }

};


// ==================== LANGUAGE ====================

function t(key) {

    return translations[language][key] ||
           translations.uz[key] ||
           key;
}


function updateLanguageUI() {

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (translations[language][key]) {
                element.textContent =
                    translations[language][key];
            }

        });


    document.querySelectorAll("[data-placeholder]")
        .forEach(element => {

            const key = element.dataset.placeholder;

            if (translations[language][key]) {
                element.placeholder =
                    translations[language][key];
            }

        });


    const selectors = [
        "welcomeLanguage",
        "loginLanguage",
        "registerLanguage"
    ];

    selectors.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.value = language;
        }

    });


    updateCalendar();
    updateSummary();
}


function changeLanguage(value) {

    if (value !== "uz" && value !== "ru") {
        return;
    }

    language = value;

    localStorage.setItem(
        "ishVaqtimLanguage",
        language
    );

    const panel =
        document.getElementById("languageQuickPanel");

    if (panel) {
        panel.classList.add("hidden");
    }

    updateLanguageUI();
}


function toggleLanguage() {

    const panel =
        document.getElementById("languageQuickPanel");

    if (!panel) {
        return;
    }

    panel.classList.toggle("hidden");
}


// ==================== SCREEN CONTROL ====================

function hideAllScreens() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });
}


function showWelcome() {

    hideAllScreens();

    document
        .getElementById("welcomeScreen")
        .classList.add("active");

    updateLanguageUI();
}


function showLogin() {

    hideAllScreens();

    document
        .getElementById("loginScreen")
        .classList.add("active");

    updateLanguageUI();
}


function showRegister() {

    hideAllScreens();

    document
        .getElementById("registerScreen")
        .classList.add("active");

    resetRegistration();

    updateLanguageUI();
}


// ==================== REGISTRATION ====================

function resetRegistration() {

    selectedSchedule = null;

    document
        .querySelectorAll(".scheduleBtn")
        .forEach(btn => {

            if (!btn.classList.contains("settingsScheduleBtn")) {
                btn.classList.remove("selected");
            }

        });

    for (let i = 1; i <= 5; i++) {

        const step =
            document.getElementById(
                `registerStep${i}`
            );

        if (step) {

            if (i === 1) {
                step.classList.remove("hidden");
            } else {
                step.classList.add("hidden");
            }

        }

    }


    const nfcStatus =
        document.getElementById("registerNfcStatus");

    if (nfcStatus) {
        nfcStatus.textContent = "";
    }


    const finishBtn =
        document.getElementById("finishRegisterBtn");

    if (finishBtn) {
        finishBtn.disabled = true;
    }


    const name =
        document.getElementById("regName");

    const surname =
        document.getElementById("regSurname");

    const scheduleStart =
        document.getElementById("scheduleStart");

    const workStart =
        document.getElementById("workStart");

    const workEnd =
        document.getElementById("workEnd");

    const breakMinutes =
        document.getElementById("breakMinutes");

    const salary =
        document.getElementById("monthlySalary");


    if (name) name.value = "";
    if (surname) surname.value = "";
    if (scheduleStart) scheduleStart.value = "";
    if (workStart) workStart.value = "08:00";
    if (workEnd) workEnd.value = "20:00";
    if (breakMinutes) breakMinutes.value = 60;
    if (salary) salary.value = "";
}


function nextRegisterStep(stepNumber) {

    if (stepNumber === 2) {

        const name =
            document.getElementById("regName").value.trim();

        const surname =
            document.getElementById("regSurname").value.trim();

        if (!name || !surname) {

            showRegisterMessage(
                t("enterName")
            );

            return;
        }
    }


    if (stepNumber === 3) {

        if (!selectedSchedule) {

            showRegisterMessage(
                t("selectSchedule")
            );

            return;
        }

        const date =
            document.getElementById("scheduleStart").value;

        if (!date) {

            showRegisterMessage(
                t("selectDate")
            );

            return;
        }
    }


    if (stepNumber === 5) {

        const salary =
            Number(
                document.getElementById("monthlySalary").value
            );

        if (!salary || salary <= 0) {

            showRegisterMessage(
                t("enterSalary")
            );

            return;
        }
    }


    for (let i = 1; i <= 5; i++) {

        const step =
            document.getElementById(
                `registerStep${i}`
            );

        if (step) {
            step.classList.add("hidden");
        }
    }


    document
        .getElementById(`registerStep${stepNumber}`)
        .classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function selectSchedule(schedule, button) {

    selectedSchedule = schedule;

    document
        .querySelectorAll(
            "#registerStep2 .scheduleBtn"
        )
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");
}


function showRegisterMessage(message) {

    const status =
        document.getElementById(
            "registerNfcStatus"
        );

    if (status) {
        status.textContent = message;
    } else {

        alert(message);
    }
}


// ==================== NFC REGISTRATION ====================

async function testRegisterNfc() {

    const status =
        document.getElementById("registerNfcStatus");

    if (!window.telegramUser) {
        if (status) {
            status.textContent =
                "⚠️ Avval Telegram tomonidan tanilishingiz kerak. Sahifani qayta oching.";
        }
        return;
    }

    if (status) {
        status.textContent = "Qidirilmoqda... (avval kartani telefon ilovasiga tekkizgan bo'ling)";
    }

    try {
        // So'nggi 2 daqiqa ichida kelgan, hali bog'lanmagan skanni qidiramiz
        const scan = await sbFindRecentUnclaimedScan(120);

        if (!scan) {
            if (status) {
                status.textContent =
                    "❌ Karta topilmadi. Avval native ilovada kartani tekkizing, so'ng shu tugmani bosing.";
            }
            return;
        }

        const claimed = await sbClaimScan(scan.id);

        if (!claimed) {
            if (status) {
                status.textContent =
                    "⚠️ Bu karta shu payt boshqa joyda band qilindi. Kartani qayta tekkizib ko'ring.";
            }
            return;
        }

        registeredNfc = scan.card_hash;

        localStorage.setItem(
            "ishVaqtimNfc",
            registeredNfc
        );

        if (status) {
            status.textContent = "✅ " + t("nfcRegistered");
        }

        const finishBtn =
            document.getElementById("finishRegisterBtn");

        if (finishBtn) {
            finishBtn.disabled = false;
        }
    } catch (e) {
        if (status) {
            status.textContent = "❌ Xato: " + e.message;
        }
    }
}


// ==================== FINISH REGISTRATION ====================

async function finishRegistration() {

    if (!registeredNfc) {

        alert(t("noNfc"));

        return;
    }

    if (!window.telegramUser) {
        alert("Telegram foydalanuvchisi aniqlanmadi. Sahifani qayta oching.");
        return;
    }


    const name =
        document.getElementById("regName").value.trim();

    const surname =
        document.getElementById("regSurname").value.trim();

    const scheduleStart =
        document.getElementById("scheduleStart").value;

    const workStart =
        document.getElementById("workStart").value;

    const workEnd =
        document.getElementById("workEnd").value;

    const breakMinutes =
        Number(
            document.getElementById("breakMinutes").value
        ) || 0;

    const monthlySalary =
        Number(
            document.getElementById("monthlySalary").value
        ) || 0;


    settings = {

        name,
        surname,

        schedule: selectedSchedule,

        scheduleStart,

        workStart,
        workEnd,

        breakMinutes,

        monthlySalary
    };


    const status =
        document.getElementById("registerNfcStatus");

    try {
        if (status) status.textContent = "Saqlanmoqda...";

        await sbUpsertProfile({
            telegram_id: window.telegramUser.id,
            first_name: name,
            last_name: surname,
            schedule_type: selectedSchedule,
            schedule_start: scheduleStart,
            work_start: workStart,
            work_end: workEnd,
            break_minutes: breakMinutes,
            monthly_salary: monthlySalary,
            card_hash: registeredNfc
        });
    } catch (e) {
        if (status) status.textContent = "❌ Supabase xatosi: " + e.message;
        alert("Profilni serverga saqlab bo'lmadi: " + e.message);
        return;
    }


    localStorage.setItem(
        "ishVaqtimSettings",
        JSON.stringify(settings)
    );


    localStorage.setItem(
        "ishVaqtimDays",
        JSON.stringify(workData)
    );


    openHome();
}


// ==================== HOME ====================

function openHome() {

    if (!settings) {

        showWelcome();

        return;
    }


    hideAllScreens();

    document
        .getElementById("homeScreen")
        .classList.add("active");


    loadHeader();

    updateCalendar();

    updateSummary();

    updateNfcStatus();

    updateLanguageUI();
}


function loadHeader() {

    const fullName =
        `${settings.name || ""} ${settings.surname || ""}`.trim();


    document.getElementById(
        "headerName"
    ).textContent = fullName || "—";


    document.getElementById(
        "headerSchedule"
    ).textContent =
        settings.schedule || "—";


    document.getElementById(
        "headerSalary"
    ).textContent =
        formatMoney(settings.monthlySalary) + " ₽";


    document.getElementById(
        "headerHourlyRate"
    ).textContent =
        formatMoney(
            calculateHourlyRate(currentDate)
        ) + " ₽";
}


// ==================== DATE / SCHEDULE ====================

function parseDateOnly(dateString) {

    const parts =
        dateString.split("-").map(Number);

    return new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );
}


function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function isScheduledWorkDay(date) {

    if (!settings || !settings.scheduleStart) {
        return false;
    }


    const start =
        parseDateOnly(settings.scheduleStart);

    const current =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );


    const diff =
        Math.floor(
            (current - start) /
            (1000 * 60 * 60 * 24)
        );


    if (diff < 0) {
        return false;
    }


    if (settings.schedule === "2/2") {
        return diff % 4 < 2;
    }


    if (settings.schedule === "5/2") {
        return diff % 7 < 5;
    }


    if (settings.schedule === "6/1") {
        return diff % 7 < 6;
    }


    return false;
}


// ==================== HOURS ====================

function calculateHours(
    start,
    end,
    breakMinutes
) {

    if (!start || !end) {
        return 0;
    }


    const [startH, startM] =
        start.split(":").map(Number);

    const [endH, endM] =
        end.split(":").map(Number);


    let startTotal =
        startH * 60 + startM;

    let endTotal =
        endH * 60 + endM;


    if (endTotal < startTotal) {
        endTotal += 24 * 60;
    }


    let minutes =
        endTotal -
        startTotal -
        Number(breakMinutes || 0);


    if (minutes < 0) {
        minutes = 0;
    }


    return minutes / 60;
}


// ==================== MONTH HOURS ====================

function getScheduledDaysInMonth(date) {

    if (!settings) {
        return 0;
    }


    const year =
        date.getFullYear();

    const month =
        date.getMonth();


    const days =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    let count = 0;


    for (let day = 1; day <= days; day++) {

        const current =
            new Date(
                year,
                month,
                day
            );


        if (isScheduledWorkDay(current)) {
            count++;
        }
    }


    return count;
}


function getPlannedHoursInMonth(date) {

    if (!settings) {
        return 0;
    }


    const scheduledDays =
        getScheduledDaysInMonth(date);


    const dailyHours =
        calculateHours(
            settings.workStart,
            settings.workEnd,
            settings.breakMinutes
        );


    return scheduledDays * dailyHours;
}


function calculateHourlyRate(date) {

    if (!settings || !settings.monthlySalary) {
        return 0;
    }


    const plannedHours =
        getPlannedHoursInMonth(date);


    if (plannedHours <= 0) {
        return 0;
    }


    return (
        Number(settings.monthlySalary) /
        plannedHours
    );
}


// ==================== MONEY ====================

function formatMoney(value) {

    return Math.round(
        Number(value || 0)
    ).toLocaleString(
        language === "ru"
            ? "ru-RU"
            : "ru-RU"
    );
}


// ==================== CALENDAR ====================

function updateCalendar() {

    const calendar =
        document.getElementById("calendar");

    if (!calendar) {
        return;
    }


    calendar.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const monthName =
        currentDate.toLocaleDateString(
            language === "ru"
                ? "ru-RU"
                : "ru-RU",
            {
                month: "long",
                year: "numeric"
            }
        );


    document.getElementById(
        "currentMonth"
    ).textContent =
        monthName.charAt(0).toUpperCase() +
        monthName.slice(1);


    const firstDay =
        new Date(
            year,
            month,
            1
        );


    let startDay =
        firstDay.getDay();

    // Yakshanba = 0.
    // Bizning kalendar Dushanbadan boshlanadi.
    startDay =
        startDay === 0
            ? 6
            : startDay - 1;


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (let i = 0; i < startDay; i++) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendarDay empty";

        calendar.appendChild(empty);
    }


    for (let day = 1; day <= daysInMonth; day++) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const key =
            dateKey(date);


        const button =
            document.createElement("button");

        button.className =
            "calendarDay";


        const scheduled =
            isScheduledWorkDay(date);


        const worked =
            !!workData[key];


        if (scheduled) {

            button.classList.add(
                "scheduled"
            );

        } else if (worked) {

            button.classList.add(
                "extra"
            );

        } else {

            button.classList.add(
                "rest"
            );
        }


        const today =
            new Date();


        if (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        ) {

            button.classList.add(
                "today"
            );
        }


        if (selectedDate === key) {

            button.classList.add(
                "selected"
            );
        }


        button.textContent = day;


        if (worked) {

            const dot =
                document.createElement("span");

            dot.className =
                "workDot";

            button.appendChild(dot);
        }


        button.onclick = () =>
            selectDay(date);


        calendar.appendChild(button);
    }
}


// ==================== MONTH CHANGE ====================

function changeMonth(direction) {

    currentDate =
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + direction,
            1
        );


    selectedDate = null;

    const panel =
        document.getElementById(
            "selectedDayPanel"
        );

    if (panel) {
        panel.classList.add("hidden");
    }


    loadHeader();

    updateCalendar();

    updateSummary();
}


// ==================== SELECT DAY ====================

function selectDay(date) {

    selectedDate =
        dateKey(date);


    const panel =
        document.getElementById(
            "selectedDayPanel"
        );


    panel.classList.remove("hidden");


    document.getElementById(
        "selectedDateTitle"
    ).textContent =
        date.toLocaleDateString(
            language === "ru"
                ? "ru-RU"
                : "ru-RU",
            {
                day: "numeric",
                month: "long"
            }
        );


    const data =
        workData[selectedDate] || {};


    document.getElementById(
        "dayStart"
    ).value =
        data.start || "";


    document.getElementById(
        "dayEnd"
    ).value =
        data.end || "";


    document.getElementById(
        "dayBreak"
    ).value =
        data.breakMinutes ??
        settings.breakMinutes ??
        0;


    updateSelectedDayResult();

    updateCalendar();
}


function updateSelectedDayResult() {

    if (!selectedDate) {
        return;
    }


    const start =
        document.getElementById(
            "dayStart"
        ).value;


    const end =
        document.getElementById(
            "dayEnd"
        ).value;


    const breakMinutes =
        Number(
            document.getElementById(
                "dayBreak"
            ).value
        ) || 0;


    const hours =
        calculateHours(
            start,
            end,
            breakMinutes
        );


    const date =
        parseDateOnly(selectedDate);


    const hourlyRate =
        calculateHourlyRate(date);


    const pay =
        hours * hourlyRate;


    document.getElementById(
        "dayHours"
    ).textContent =
        hours.toFixed(2);


    document.getElementById(
        "dayPay"
    ).textContent =
        formatMoney(pay) + " ₽";
}


// ==================== SAVE DAY ====================

function saveSelectedDay() {

    if (!selectedDate) {
        return;
    }


    const start =
        document.getElementById(
            "dayStart"
        ).value;


    const end =
        document.getElementById(
            "dayEnd"
        ).value;


    const breakMinutes =
        Number(
            document.getElementById(
                "dayBreak"
            ).value
        ) || 0;


    if (!start && !end) {

        return;
    }


    workData[selectedDate] = {

        start,
        end,

        breakMinutes
    };


    localStorage.setItem(
        "ishVaqtimDays",
        JSON.stringify(workData)
    );


    updateSelectedDayResult();

    updateCalendar();

    updateSummary();


    // Supabase'ga ham yozamiz, shunda Android ilova va boshqa qurilmalar ham ko'radi
    if (window.currentProfileId) {
        sbUpsertAttendanceDay(
            window.currentProfileId,
            selectedDate,
            start || null,
            end || null
        ).catch(e => console.warn("Supabase'ga saqlashda xato:", e));
    }
}


function deleteSelectedDay() {

    if (!selectedDate) {
        return;
    }


    const dateToDelete = selectedDate;


    delete workData[selectedDate];


    localStorage.setItem(
        "ishVaqtimDays",
        JSON.stringify(workData)
    );


    document
        .getElementById(
            "selectedDayPanel"
        )
        .classList.add("hidden");


    selectedDate = null;

    updateCalendar();

    updateSummary();


    if (window.currentProfileId) {
        sbDeleteAttendanceDay(
            window.currentProfileId,
            dateToDelete
        ).catch(e => console.warn("Supabase'dan o'chirishda xato:", e));
    }
}


// ==================== SUMMARY ====================

function updateSummary() {

    const hoursElement =
        document.getElementById(
            "summaryHours"
        );

    if (!hoursElement || !settings) {
        return;
    }


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const hourlyRate =
        calculateHourlyRate(currentDate);


    let totalHours = 0;
    let totalPay = 0;
    let totalDays = 0;


    Object.keys(workData)
        .forEach(key => {

            const date =
                parseDateOnly(key);


            if (
                date.getFullYear() !== year ||
                date.getMonth() !== month
            ) {
                return;
            }


            const data =
                workData[key];


            const hours =
                calculateHours(
                    data.start,
                    data.end,
                    data.breakMinutes
                );


            if (hours > 0) {

                totalHours += hours;

                totalPay +=
                    hours * hourlyRate;

                totalDays++;
            }

        });


    document.getElementById(
        "summaryHours"
    ).textContent =
        totalHours.toFixed(2) + " soat";


    document.getElementById(
        "summaryPay"
    ).textContent =
        formatMoney(totalPay) + " ₽";


    document.getElementById(
        "summaryDays"
    ).textContent =
        totalDays;


    const headerRate =
        document.getElementById(
            "headerHourlyRate"
        );


    if (headerRate) {

        headerRate.textContent =
            formatMoney(hourlyRate) + " ₽";
    }


    const settingsRate =
        document.getElementById(
            "settingsHourlyRate"
        );


    if (settingsRate) {

        settingsRate.textContent =
            formatMoney(hourlyRate) + " ₽";
    }
}


// ==================== SETTINGS ====================

function openSettings() {

    if (!settings) {
        return;
    }


    hideAllScreens();


    document
        .getElementById(
            "settingsScreen"
        )
        .classList.add("active");


    document.getElementById(
        "settingsName"
    ).value =
        settings.name || "";


    document.getElementById(
        "settingsSurname"
    ).value =
        settings.surname || "";


    document.getElementById(
        "settingsScheduleStart"
    ).value =
        settings.scheduleStart || "";


    document.getElementById(
        "settingsWorkStart"
    ).value =
        settings.workStart || "08:00";


    document.getElementById(
        "settingsWorkEnd"
    ).value =
        settings.workEnd || "20:00";


    document.getElementById(
        "settingsBreak"
    ).value =
        settings.breakMinutes || 0;


    document.getElementById(
        "settingsSalary"
    ).value =
        settings.monthlySalary || "";


    settingsSchedule =
        settings.schedule || null;


    document
        .querySelectorAll(
            ".settingsScheduleBtn"
        )
        .forEach(btn => {

            btn.classList.toggle(
                "selected",
                btn.dataset.schedule ===
                settingsSchedule
            );

        });


    updateSettingsHourlyRate();

    updateNfcStatus();

    updateLanguageUI();
}


function selectSettingsSchedule(
    schedule,
    button
) {

    settingsSchedule =
        schedule;


    document
        .querySelectorAll(
            ".settingsScheduleBtn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );


    updateSettingsHourlyRate();
}


function updateSettingsHourlyRate() {

    if (!settings) {
        return;
    }


    const temporarySettings = {
        ...settings,

        schedule:
            settingsSchedule ||
            settings.schedule,

        scheduleStart:
            document.getElementById(
                "settingsScheduleStart"
            )?.value ||
            settings.scheduleStart,

        workStart:
            document.getElementById(
                "settingsWorkStart"
            )?.value ||
            settings.workStart,

        workEnd:
            document.getElementById(
                "settingsWorkEnd"
            )?.value ||
            settings.workEnd,

        breakMinutes:
            Number(
                document.getElementById(
                    "settingsBreak"
                )?.value
            ) ||
            settings.breakMinutes,

        monthlySalary:
            Number(
                document.getElementById(
                    "settingsSalary"
                )?.value
            ) ||
            settings.monthlySalary
    };


    const oldSettings =
        settings;


    settings =
        temporarySettings;


    const rate =
        calculateHourlyRate(currentDate);


    const rateElement =
        document.getElementById(
            "settingsHourlyRate"
        );


    if (rateElement) {

        rateElement.textContent =
            formatMoney(rate) + " ₽";
    }


    settings =
        oldSettings;
}


function saveSettings() {

    if (!settings) {
        return;
    }


    settings.name =
        document.getElementById(
            "settingsName"
        ).value.trim();


    settings.surname =
        document.getElementById(
            "settingsSurname"
        ).value.trim();


    settings.schedule =
        settingsSchedule ||
        settings.schedule;


    settings.scheduleStart =
        document.getElementById(
            "settingsScheduleStart"
        ).value;


    settings.workStart =
        document.getElementById(
            "settingsWorkStart"
        ).value;


    settings.workEnd =
        document.getElementById(
            "settingsWorkEnd"
        ).value;


    settings.breakMinutes =
        Number(
            document.getElementById(
                "settingsBreak"
            ).value
        ) || 0;


    settings.monthlySalary =
        Number(
            document.getElementById(
                "settingsSalary"
            ).value
        ) || 0;


    localStorage.setItem(
        "ishVaqtimSettings",
        JSON.stringify(settings)
    );


    if (window.currentProfileId && window.telegramUser) {
        sbUpsertProfile({
            telegram_id: window.telegramUser.id,
            first_name: settings.name,
            last_name: settings.surname,
            schedule_type: settings.schedule,
            schedule_start: settings.scheduleStart,
            work_start: settings.workStart,
            work_end: settings.workEnd,
            break_minutes: settings.breakMinutes,
            monthly_salary: settings.monthlySalary,
            card_hash: registeredNfc
        }).catch(e => console.warn("Supabase'ga profil saqlashda xato:", e));
    }


    alert("✅ " + t("saved"));

    openHome();
}


// ==================== NFC LOGIN ====================

function testLoginNfc() {

    if (!registeredNfc) {

        document.getElementById(
            "loginMessage"
        ).textContent =
            "❌ " + t("loginFirst");

        return;
    }


    document.getElementById(
        "loginMessage"
    ).textContent =
        "✅ " + t("loginSuccess");


    setTimeout(() => {

        openHome();

    }, 400);
}


// ==================== NFC ATTENDANCE ====================

function getTodayKey() {

    return dateKey(
        new Date()
    );
}


function getCurrentTimeMinutes() {

    const now =
        new Date();

    return (
        now.getHours() * 60 +
        now.getMinutes()
    );
}


function nfcTest() {

    if (!registeredNfc) {

        showNfcMessage(
            "❌ " + t("noNfc")
        );

        return;
    }


    const today =
        getTodayKey();


    const nowMinutes =
        getCurrentTimeMinutes();


    const todayData =
        workData[today] || {};


    // --------------------------------------
    // 07:30 – 08:30
    // KIRISH
    // --------------------------------------

    if (
        nowMinutes >= 7 * 60 + 30 &&
        nowMinutes <= 8 * 60 + 30
    ) {

        if (todayData.start) {

            showNfcMessage(
                "⚠️ " + t("nfcAlreadyEntered")
            );

            return;
        }


        workData[today] = {

            ...todayData,

            start: "08:00",

            breakMinutes:
                settings.breakMinutes || 0
        };


        saveWorkData();


        showNfcMessage(
            "✅ " + t("nfcMorning")
        );


        updateCalendar();

        updateSummary();

        updateNfcStatus();

        return;
    }


    // --------------------------------------
    // 18:00 – 19:29
    // CHIQISH 19:00
    // --------------------------------------

    if (
        nowMinutes >= 18 * 60 &&
        nowMinutes < 19 * 60 + 30
    ) {

        if (todayData.end) {

            showNfcMessage(
                "⚠️ " + t("nfcAlreadyExited")
            );

            return;
        }


        if (!todayData.start) {

            showNfcMessage(
                "⚠️ Avval Kirish qayd etilishi kerak."
            );

            return;
        }


        workData[today] = {

            ...todayData,

            end: "19:00"
        };


        saveWorkData();


        showNfcMessage(
            "✅ " + t("nfcEvening")
        );


        updateCalendar();

        updateSummary();

        updateNfcStatus();

        return;
    }


    // --------------------------------------
    // 19:30 dan keyin
    // CHIQISH 20:00
    // --------------------------------------

    if (
        nowMinutes >= 19 * 60 + 30
    ) {

        if (todayData.end) {

            showNfcMessage(
                "⚠️ " + t("nfcAlreadyExited")
            );

            return;
        }


        if (!todayData.start) {

            showNfcMessage(
                "⚠️ Avval Kirish qayd etilishi kerak."
            );

            return;
        }


        workData[today] = {

            ...todayData,

            end: "20:00"
        };


        saveWorkData();


        showNfcMessage(
            "✅ " + t("nfcLate")
        );


        updateCalendar();

        updateSummary();

        updateNfcStatus();

        return;
    }


    showNfcMessage(
        "⚠️ " + t("nfcWrongTime")
    );
}


function saveWorkData() {

    localStorage.setItem(
        "ishVaqtimDays",
        JSON.stringify(workData)
    );
}


function showNfcMessage(message) {

    const element =
        document.getElementById(
            "nfcMessage"
        );

    if (element) {
        element.textContent =
            message;
    }
}


function updateNfcStatus() {

    const element =
        document.getElementById(
            "settingsNfcStatus"
        );


    if (element) {

        element.textContent =
            registeredNfc
                ? "✅ " + registeredNfc
                : "❌ —";
    }


    const todayStatus =
        document.getElementById(
            "nfcTodayStatus"
        );


    if (!todayStatus) {
        return;
    }


    const today =
        getTodayKey();


    const data =
        workData[today];


    if (!data) {

        todayStatus.textContent =
            language === "ru"
                ? "Ожидание Входа"
                : "Kirish kutilmoqda";

        return;
    }


    if (data.start && !data.end) {

        todayStatus.textContent =
            language === "ru"
                ? "Вход записан • ожидается Выход"
                : "Kirish qayd etildi • Chiqish kutilmoqda";

        return;
    }


    if (data.start && data.end) {

        todayStatus.textContent =
            language === "ru"
                ? "Вход и Выход записаны"
                : "Kirish va Chiqish qayd etilgan";

        return;
    }
}


// ==================== LOGOUT ====================

function logout() {

    /*
       MUHIM:
       Logout ma'lumotlarni o'chirmaydi.

       settings
       NFC
       davomat
       til

       localStorage'da qoladi.
    */

    hideAllScreens();

    showWelcome();
}


// ==================== INPUT LISTENERS ====================

document.addEventListener(
    "input",
    function(event) {

        const id =
            event.target.id;


        if (
            id === "dayStart" ||
            id === "dayEnd" ||
            id === "dayBreak"
        ) {

            updateSelectedDayResult();
        }


        if (
            id === "settingsScheduleStart" ||
            id === "settingsWorkStart" ||
            id === "settingsWorkEnd" ||
            id === "settingsBreak" ||
            id === "settingsSalary"
        ) {

            updateSettingsHourlyRate();
        }
    }
);


// ==================== START APP ====================
// Eslatma: startApp() endi bu yerda avtomatik chaqirilmaydi.
// Uni supabase-sync.js chaqiradi, chunki avval Telegram orqali
// profilni Supabase'dan yuklab olishimiz kerak.

function startApp() {

    updateLanguageUI();


    if (
        settings &&
        registeredNfc
    ) {

        showLogin();

    } else {

        showWelcome();
    }
}
