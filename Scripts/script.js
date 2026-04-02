document.addEventListener('DOMContentLoaded', () => {

    // --- TEMA ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            const icon = themeBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // --- EMAILJS---
    if(typeof emailjs !== 'undefined'){
        emailjs.init("FecsaPE0pQ4Y_J5kK");
    }
     

    // --- FORMULÁRIO ---
    const contactForm = document.getElementById('contact-form');
    const btn = document.getElementById('button-send');

    if (contactForm && btn) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const originalText = btn.innerText;
            btn.innerText = 'A enviar...';
            btn.disabled = true;

            const serviceID = 'service_yd693ch';
            const templateID = 'template_0ee9n8h';

            emailjs.sendForm(serviceID, templateID, this).then(() => {
                btn.innerText = 'Mensagem Enviada!';
                alert('Obrigado! A sua mensagem foi enviada com sucesso.');
                contactForm.reset();

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);

            }, (err) => {
                console.error('Erro EmailJS:', err);
                btn.innerText = originalText;
                btn.disabled = false;
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            });
        });
    }

     // --- IDIOMA GUARDADO ---
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) changeLang(savedLang);
});


// --- TROCA DE IDIOMA ---
function changeLang(lang) {
    const elements = document.querySelectorAll('[data-pt]:not(#cv-link)');
    Array.from(elements).forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
        const novoLink = cvLink.getAttribute(`data-${lang}-link`);
        if (novoLink) cvLink.href = novoLink;
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