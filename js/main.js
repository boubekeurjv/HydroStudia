// Language translations (English + Arabic)
const translations = {
    en: {
        hero_title: "Hydraulic Engineering & Premium Equipment",
        hero_desc: "From detailed hydraulic studies to high-quality supplies — HydroStudia supports your projects with precision and certified expertise.",
        request_study: "Request a study",
        shop_equipment: "Shop equipment",
        years_exp: "Years of experience",
        projects_done: "Projects delivered",
        trust: "Client trust",
        our_services: "Our core services",
        service1_title: "Hydraulic studies",
        service1_desc: "Drainage, irrigation, water supply — detailed modelling.",
        service2_title: "Project monitoring",
        service2_desc: "Technical assistance, site supervision, quality control.",
        service3_title: "Consulting & Audit",
        service3_desc: "Diagnostic of existing networks, optimization plans.",
        service4_title: "Equipment supply",
        service4_desc: "Pipes, pumps, valves – delivered to your site.",
        services_title: "Our engineering services",
        services_subtitle: "Comprehensive hydraulic solutions from studies to equipment",
        service1_long: "We perform hydraulic modeling, drainage network design, irrigation schemes, water supply systems, and stormwater management.",
        service2_long: "On-site supervision, quality assurance, progress reporting, and technical assistance.",
        service3_long: "Diagnostic of existing networks, leak detection, efficiency optimization, and expert advice.",
        service4_long: "Supply of high-quality pipes (HDPE, PVC), pumps, valves, fittings, and automation components.",
        shop_title: "Hydraulic equipment store",
        your_cart: "Your cart",
        proforma_invoice: "Proforma invoice",
        invoice_details: "Proforma invoice details",
        generate_pdf: "Generate PDF invoice",
        cancel: "Cancel",
        contact_us: "Contact us",
        send_message: "Send message",
        reach_us: "Reach us directly"
    },
    ar: {
        hero_title: "الهندسة الهيدروليكية والمعدات الاحترافية",
        hero_desc: "من الدراسات الهيدروليكية التفصيلية إلى التوريد عالي الجودة — هيدروستوديا يدعم مشاريعك بدقة وخبرة معتمدة.",
        request_study: "طلب دراسة",
        shop_equipment: "شراء معدات",
        years_exp: "سنوات الخبرة",
        projects_done: "مشروع منجز",
        trust: "ثقة العملاء",
        our_services: "خدماتنا الأساسية",
        service1_title: "الدراسات الهيدروليكية",
        service1_desc: "الصرف، الري، إمدادات المياه — نمذجة مفصلة.",
        service2_title: "متابعة المشاريع",
        service2_desc: "مساعدة تقنية، إشراف موقع، مراقبة الجودة.",
        service3_title: "استشارات وتدقيق",
        service3_desc: "تشخيص الشبكات القائمة، خطط التحسين.",
        service4_title: "توريد المعدات",
        service4_desc: "أنابيب، مضخات، صمامات - يتم توصيلها إلى موقعك.",
        services_title: "خدماتنا الهندسية",
        services_subtitle: "حلول هيدروليكية شاملة من الدراسات إلى المعدات",
        service1_long: "نقوم بالنمذجة الهيدروليكية، وتصميم شبكات الصرف، وأنظمة الري، وشبكات المياه، وإدارة مياه الأمطار.",
        service2_long: "إشراف موقع، ضمان الجودة، تقارير التقدم، مساعدة فنية.",
        service3_long: "تشخيص الشبكات القائمة، كشف التسربات، تحسين الكفاءة، واستشارات الخبراء.",
        service4_long: "توريد أنابيب HDPE و PVC عالية الجودة، مضخات، صمامات، قطع ربط، ومكونات أتمتة.",
        shop_title: "متجر المعدات الهيدروليكية",
        your_cart: "سلتك",
        proforma_invoice: "فاتورة مؤقتة",
        invoice_details: "تفاصيل الفاتورة المؤقتة",
        generate_pdf: "إنشاء فاتورة PDF",
        cancel: "إلغاء",
        contact_us: "اتصل بنا",
        send_message: "إرسال رسالة",
        reach_us: "تواصل معنا مباشرة"
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if(translations[lang][key]) el.innerText = translations[lang][key];
    });
    // Update buttons text if needed
    const btns = document.querySelectorAll('.btn-primary, .btn-outline');
    btns.forEach(btn => {
        const span = btn.querySelector('[data-key]');
        if(span) span.innerText = translations[lang][span.getAttribute('data-key')];
    });
}

// Load navbar and footer dynamically
function loadNavbarAndFooter() {
    fetch('/assets/nav.html')
        .then(res => res.text())
        .catch(() => `
            <div class="nav-container">
                <div class="logo">Hydro<span>Studia</span></div>
                <div class="nav-links">
                    <a href="index.html" data-key="home">Home</a>
                    <a href="services.html" data-key="services">Services</a>
                    <a href="shop.html" data-key="shop">Shop</a>
                    <a href="contact.html" data-key="contact">Contact</a>
                </div>
                <div class="lang-switch">
                    <button onclick="setLanguage('en')">EN</button>
                    <button onclick="setLanguage('ar')">عربي</button>
                </div>
            </div>
        `)
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
            setLanguage(currentLang);
            // active link
            const path = window.location.pathname.split('/').pop();
            document.querySelectorAll('.nav-links a').forEach(a => {
                if(a.getAttribute('href') === path) a.classList.add('active');
            });
        });
    document.getElementById('footer').innerHTML = `<div class="container">© 2025 HydroStudia — Precision hydraulics. All rights reserved.</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavbarAndFooter();
    // contact form handler
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(currentLang === 'en' ? 'Thank you! We will contact you soon.' : 'شكراً! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }
    const whatsappBtn = document.getElementById('whatsappBtn');
    if(whatsappBtn) whatsappBtn.addEventListener('click', () => window.open('https://wa.me/213778335282', '_blank'));
    const heroCta = document.getElementById('heroCta');
    if(heroCta) heroCta.addEventListener('click', () => window.location.href = 'contact.html');
    const shopCta = document.getElementById('shopCtaBtn');
    if(shopCta) shopCta.addEventListener('click', () => window.location.href = 'shop.html');
});
