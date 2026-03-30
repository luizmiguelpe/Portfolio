document.addEventListener('DOMContentLoaded', () => {
    
    const themeBtn = document.getElementById('theme-toggle');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
            
            // Guarda a preferência
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Aplica o tema guardado ao carregar
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        const icon = themeBtn?.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }
});

//Lógica Idioma
function changeLang(lang) {
    const elements = document.querySelectorAll('[data-pt]');
    Array.from(elements).forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    //Troca o PDF
    const cvLink = document.getElementById('cv-link');
    if(cvLink) {
        const novoLink = cvLink.getAttribute(`data-${lang}-link`);
        if(novoLink) {
            cvLink.href = novoLink;
        }
    }

    const buttons = document.querySelectorAll('.lang-switcher-custom button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    localStorage.setItem('selectedLang', lang);
}