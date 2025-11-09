// تحديد عناصر اختيار اللغة وكل الأقسام متعددة اللغات
const languageSelector = document.getElementById("language-selector");
const multilingualSections = document.querySelectorAll(".lang");

// وظيفة لتغيير اللغة
function switchLanguage(lang) {
    multilingualSections.forEach(section => {
        section.style.display = (section.dataset.lang === lang) ? "block" : "none";
    });

    // تغيير اتجاه الصفحة للعربية
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
}

// عند تغيير اختيار اللغة
languageSelector.addEventListener("change", (event) => {
    switchLanguage(event.target.value);
});

// عند تحميل الصفحة، نضمن أن اللغة الافتراضية تظهر بشكل صحيح
document.addEventListener("DOMContentLoaded", () => {
    const defaultLang = languageSelector.value;
    switchLanguage(defaultLang);
});
