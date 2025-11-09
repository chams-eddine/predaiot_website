const languageSelector = document.getElementById("language-selector");
const multilingualSections = document.querySelectorAll(".lang");

function switchLanguage(lang){
    multilingualSections.forEach(section => {
        section.style.display = (section.dataset.lang === lang) ? "block" : "none";
    });
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

    if(typeof update3DText === "function") update3DText(lang);
}

languageSelector.addEventListener("change", (e) => switchLanguage(e.target.value));
document.addEventListener("DOMContentLoaded", () => switchLanguage(languageSelector.value));
