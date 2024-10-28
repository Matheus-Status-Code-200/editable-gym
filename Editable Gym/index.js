let currentEditElement = null; // Add this variable to track currently edited element

// Menu Mobile Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0,0,0,0.9)';
        nav.style.padding = '0.5rem 1rem';
    } else {
        nav.style.background = 'rgba(0,0,0,0.7)';
        nav.style.padding = '1rem';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .instructor-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

function openEditor(type, event) {
    const modal = document.querySelector('.edit-modal');
    const overlay = document.querySelector('.modal-overlay');
    const form = document.getElementById('edit-form');
    
    // Store the clicked element
    currentEditElement = event.target.closest(`.${type}-card`) || 
                        event.target.closest(`.${type}`);
    
    let formHtml = '';
    
    switch(type) {
        case 'hero':
            formHtml = `
                <input type="text" id="edit-title" placeholder="Título">
                <input type="text" id="edit-subtitle" placeholder="Subtítulo">
                <input type="text" id="edit-background" placeholder="URL da imagem de fundo">
                <label>Cor do Overlay:</label>
                <input type="color" id="edit-overlay-color" value="#000000">
                <label>Cor do Botão:</label>
                <input type="color" id="edit-button-color" value="#ff4d4d">
                <button onclick="saveEdits('hero')">Salvar</button>
            `;
            break;
        case 'hero-content':
            formHtml = `<div>
                    <label>Título:</label>
                    <input type="text" id="edit-hero-title" placeholder="Título">
                    <label>Cor do Título:</label>
                    <input type="color" id="edit-hero-title-color" value="#ffffff">
                    
                    <label>Subtítulo:</label>
                    <input type="text" id="edit-hero-subtitle" placeholder="Subtítulo">
                    <label>Cor do Subtítulo:</label>
                    <input type="color" id="edit-hero-subtitle-color" value="#ffffff">
                    
                    <label>Imagem de Fundo:</label>
                    <input type="text" id="edit-hero-bg-url" placeholder="URL da imagem">
                    <input type="file" id="edit-hero-bg-file" accept="image/*">
                    
                    <label>Texto do Botão:</label>
                    <input type="text" id="edit-hero-btn-text" placeholder="Texto do botão">
                    <label>Cor do Botão:</label>
                    <input type="color" id="edit-hero-btn-color" value="#ff4d4d">
                    
                    <button onclick="saveEdits('hero-content')">Salvar</button>
                </div>
            `;
            break;
        case 'feature':
            formHtml = `
                <input type="text" id="edit-feature-title" placeholder="Título">
                <input type="text" id="edit-feature-description" placeholder="Descrição">
                <label>Cor do Ícone:</label>
                <input type="color" id="edit-feature-color" value="#ff4d4d">
                <label>Cor de Fundo:</label>
                <input type="color" id="edit-feature-bg" value="#ffffff">
                <button onclick="saveEdits('feature')">Salvar</button>
            `;
            break;
        case 'pricing':
            formHtml = `
                <input type="text" id="edit-plan-title" placeholder="Nome do Plano">
                <input type="text" id="edit-plan-price" placeholder="Preço">R$
                <label>Cor do Preço:</label>
                <input type="color" id="edit-price-color" value="#ff4d4d">
                <label>Cor de Fundo:</label>
                <input type="color" id="edit-pricing-bg" value="#f4f4f4">
                <label>Cor do Botão:</label>
                <input type="color" id="edit-pricing-button" value="#ff4d4d">
                <button onclick="saveEdits('pricing')">Salvar</button>
            `;
            break;
        case 'instructor':
            formHtml = `
                <input type="text" id="edit-instructor-name" placeholder="Nome">
                <input type="text" id="edit-instructor-role" placeholder="Função">
                <input type="text" id="edit-instructor-image" placeholder="URL da imagem">
                <label>Cor de Fundo:</label>
                <input type="color" id="edit-instructor-bg" value="#ffffff">
                <button onclick="saveEdits('instructor')">Salvar</button>
            `;
            break;
        case 'logo':
            formHtml = `
                <label>Texto do Logo:</label>
                <input type="text" id="edit-logo-text" placeholder="Texto">
                <label>Cor do Logo:</label>
                <input type="color" id="edit-logo-color" value="#ff4d4d">
                <button onclick="saveEdits('logo')">Salvar</button>
            `;
            break;
        case 'footer':
            formHtml = `
                <label>Texto do Título:</label>
                <input type="text" id="edit-footer-title" value="${currentEditElement.querySelector('h2').textContent}" placeholder="Título">

                <label>CNPJ:</label>
                <input type="text" id="edit-footer-cnpj" value="${currentEditElement.querySelectorAll('p')[0].textContent.replace('CNPJ: ', '')}" placeholder="CNPJ">

                <label>Endereço:</label>
                <input type="text" id="edit-footer-address" value="${currentEditElement.querySelectorAll('p')[1].textContent.replace('Endereço: ', '')}" placeholder="Endereço">

                <label>Telefone:</label>
                <input type="text" id="edit-footer-phone" value="${currentEditElement.querySelectorAll('p')[2].textContent.replace('Telefone: ', '')}" placeholder="Telefone">

                <label>Email:</label>
                <input type="text" id="edit-footer-email" value="${currentEditElement.querySelectorAll('p')[3].textContent.replace('Email: ', '')}" placeholder="Email">

                <label>Texto do Botão:</label>
                <input type="text" id="edit-footer-btn-text" value="${currentEditElement.querySelector('.btn').textContent}" placeholder="Texto do Botão">

                <button onclick="saveEdits('footer')">Salvar</button>
            `;
            break;
    }
    form.innerHTML = formHtml;
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function openEditorLinks(type, event) {
    const modal = document.querySelector('.edit-modal');
    const overlay = document.querySelector('.modal-overlay');
    const form = document.getElementById('edit-form');

    // Select all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    currentEditElement = navLinks; // Store all links for editing
    
    let formHtml = `
        <h4>Editable Nav Links</h4>
    `;

    // Loop through each nav link and create inputs for editing
    navLinks.forEach((link, index) => {
        formHtml += `
            <input type="text" id="edit-nav-title-${index}" placeholder="Texto do Link" value="${link.textContent}">
            <label>Cor do Link ${index + 1}:</label>
            <input type="color" id="edit-nav-color-${index}" value="${getComputedStyle(link).color}">
        `;
    });

    formHtml += `<button onclick="saveEditsLink('nav-link', ${navLinks.length})">Salvar</button>`;

    form.innerHTML = formHtml;
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function saveEditsLink(type, numberOfLinks) {
    if (type === 'nav-link') {
        if (!currentEditElement) return;

        currentEditElement.forEach((link, index) => {
            const navTitle = document.getElementById(`edit-nav-title-${index}`).value;
            if(navTitle=='null') return;                        
            if (navTitle) link.textContent = navTitle;
        })
        currentEditElement.forEach((link, index) => {
            const navColor = document.getElementById(`edit-nav-color-${index}`).value;
            if(navColor == '#000000') return;                        
            if (navColor) link.style.color = navColor;
        }
    
    );
    }

    // Reset currentEditElement
    currentEditElement = null;

    // Close modal after saving
    document.querySelector('.edit-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
}

// Close modal when clicking overlay
    document.querySelector('.modal-overlay').addEventListener('click', () => {
    document.querySelector('.edit-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
});
function saveEdits(type) {
    switch(type) {
        case 'hero':
            const heroSection = document.querySelector('.hero');
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            const heroButton = document.querySelector('.hero .btn');

            const newTitle = document.getElementById('edit-title').value;
            const newSubtitle = document.getElementById('edit-subtitle').value;
            const newBackground = document.getElementById('edit-background').value;
            const newOverlayColor = document.getElementById('edit-overlay-color').value;
            const newButtonColor = document.getElementById('edit-button-color').value;

            if (newTitle) heroTitle.textContent = newTitle;
            if (newSubtitle) heroSubtitle.textContent = newSubtitle;
            if (newBackground) {
                heroSection.style.background = `linear-gradient(${newOverlayColor}80, ${newOverlayColor}80), url('${newBackground}') center/cover`;
            }
            if (newButtonColor) heroButton.style.backgroundColor = newButtonColor;
            break;

        case 'hero-content':
            const heroContent = document.querySelector('.hero-content');
            const heroTitleContent = heroContent.querySelector('h1');
            const heroSubtitleContent = heroContent.querySelector('p');
            const heroButtonContent = heroContent.querySelector('.btn');
            const heroSectionContent = document.querySelector('.hero');

            const newHeroTitle = document.getElementById('edit-hero-title').value;
            const heroTitleColor = document.getElementById('edit-hero-title-color').value;
            const newHeroSubtitle = document.getElementById('edit-hero-subtitle').value;
            const heroSubtitleColor = document.getElementById('edit-hero-subtitle-color').value;
            const newHeroButtonText = document.getElementById('edit-hero-btn-text').value;
            const heroButtonColor = document.getElementById('edit-hero-btn-color').value;

            if (newHeroTitle) heroTitleContent.textContent = newHeroTitle;
            if (heroTitleColor) heroTitleContent.style.color = heroTitleColor;
            if (newHeroSubtitle) heroSubtitleContent.textContent = newHeroSubtitle;
            if (heroSubtitleColor) heroSubtitleContent.style.color = heroSubtitleColor;
            if (newHeroButtonText) heroButtonContent.textContent = newHeroButtonText;
            if (heroButtonColor) heroButtonContent.style.backgroundColor = heroButtonColor;
            
            // Handle background image
            const bgUrlInput = document.getElementById('edit-hero-bg-url');
            const bgFileInput = document.getElementById('edit-hero-bg-file');

            if (bgUrlInput.value) {
                heroSectionContent.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bgUrlInput.value}') center/cover`;
            }

            if (bgFileInput.files && bgFileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    heroSectionContent.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${e.target.result}') center/cover`;
                }
                reader.readAsDataURL(bgFileInput.files[0]);
            }
            break;

        case 'feature':
            if (!currentEditElement) return;
            const title = document.getElementById('edit-feature-title').value;
            const description = document.getElementById('edit-feature-description').value;
            const iconColor = document.getElementById('edit-feature-color').value;
            const bgColor = document.getElementById('edit-feature-bg').value;
            
            if (title) currentEditElement.querySelector('h3').textContent = title;
            if (description) currentEditElement.querySelector('p').textContent = description;
            if (iconColor) currentEditElement.querySelector('.feature-icon').style.fill = iconColor;
            if (bgColor) currentEditElement.style.backgroundColor = bgColor;
            break;

        case 'pricing':
            if (!currentEditElement) return;
            const planTitle = document.getElementById('edit-plan-title').value;
            const planPrice = document.getElementById('edit-plan-price').value;
            const priceColor = document.getElementById('edit-price-color').value;
            const pricingBg = document.getElementById('edit-pricing-bg').value;
            const buttonColor = document.getElementById('edit-pricing-button').value;
            
            if (planTitle) currentEditElement.querySelector('h3').textContent = planTitle;
            if (planPrice) currentEditElement.querySelector('.price').textContent = "R$ "+planPrice;
            if (priceColor) currentEditElement.querySelector('.price').style.color = priceColor;
            if (pricingBg) currentEditElement.style.backgroundColor = pricingBg;
            if (buttonColor) currentEditElement.querySelector('.btn').style.backgroundColor = buttonColor;
            break;

        case 'instructor':
            if (!currentEditElement) return;
            const name = document.getElementById('edit-instructor-name').value;
            const role = document.getElementById('edit-instructor-role').value;
            const image = document.getElementById('edit-instructor-image').value;
            const instructorBg = document.getElementById('edit-instructor-bg').value;
            
            if (name) currentEditElement.querySelector('h3').textContent = name;
            if (role) currentEditElement.querySelector('p').textContent = role;
            if (image) currentEditElement.querySelector('img').src = image;
            if (instructorBg) currentEditElement.style.backgroundColor = instructorBg;
            break;

        case 'logo':
            const logoElement = document.querySelector('.logo');
            const logoText = document.getElementById('edit-logo-text').value;
            const logoColor = document.getElementById('edit-logo-color').value;

            if (logoText) logoElement.textContent = logoText;
            if (logoColor) logoElement.style.color = logoColor;
            break;

        case 'footer':
                const footerTitle = document.getElementById('edit-footer-title').value;
                const footerCNPJ = document.getElementById('edit-footer-cnpj').value;
                const footerAddress = document.getElementById('edit-footer-address').value;
                const footerPhone = document.getElementById('edit-footer-phone').value;
                const footerEmail = document.getElementById('edit-footer-email').value;
                const footerBtnText = document.getElementById('edit-footer-btn-text').value;

                if (footerTitle) currentEditElement.querySelector('h2').textContent = footerTitle;
                if (footerCNPJ) currentEditElement.querySelectorAll('p')[0].textContent = `CNPJ: ${footerCNPJ}`;
                if (footerAddress) currentEditElement.querySelectorAll('p')[1].textContent = `Endereço: ${footerAddress}`;
                if (footerPhone) currentEditElement.querySelectorAll('p')[2].textContent = `Telefone: ${footerPhone}`;
                if (footerEmail) currentEditElement.querySelectorAll('p')[3].textContent = `Email: ${footerEmail}`;
                if (footerBtnText) currentEditElement.querySelector('.btn').textContent = footerBtnText;
}
    // Reset currentEditElement
    currentEditElement = null;
    // Close modal after saving
    document.querySelector('.edit-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
}

// Close modal when clicking overlay
document.querySelector('.modal-overlay').addEventListener('click', () => {
    document.querySelector('.edit-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
});