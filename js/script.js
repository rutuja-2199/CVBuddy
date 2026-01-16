// CVBuddy Script

let selectedStyle = null;

const styles = [
    {
        id: 'style1',
        name: 'Modern Blue',
        class: 'cv-style-1',
        preview: `
            <div class="cv-style-1">
                <div class="header">
                    <h4>John Doe</h4>
                    <p>Software Engineer</p>
                </div>
                <div class="section">
                    <h5>Contact</h5>
                    <p>Email: john@example.com</p>
                </div>
            </div>
        `
    },
    {
        id: 'style2',
        name: 'Classic Black',
        class: 'cv-style-2',
        preview: `
            <div class="cv-style-2">
                <div class="header">
                    <h4>Jane Smith</h4>
                    <p>Marketing Manager</p>
                </div>
                <div class="section">
                    <h5>Summary</h5>
                    <p>Experienced professional...</p>
                </div>
            </div>
        `
    },
    {
        id: 'style3',
        name: 'Elegant Green',
        class: 'cv-style-3',
        preview: `
            <div class="cv-style-3">
                <div class="header">
                    <h4>Alex Johnson</h4>
                    <p>Data Analyst</p>
                </div>
                <div class="section">
                    <h5>Skills</h5>
                    <p>Python, SQL...</p>
                </div>
            </div>
        `
    }
];

function loadStyles() {
    const container = document.querySelector('#style-selection .row');
    styles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card style-card" data-style="${style.id}">
                <div class="card-body text-center">
                    <h5 class="card-title">${style.name}</h5>
                    <div class="style-preview">${style.preview}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function selectStyle(styleId) {
    selectedStyle = styles.find(s => s.id === styleId);
    document.getElementById('style-selection').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
}

function generateCV(data) {
    const template = `
        <div class="${selectedStyle.class}">
            <div class="header">
                <h1>${data.name}</h1>
                <p>${data.email} | ${data.phone}</p>
            </div>
            ${data.summary ? `<div class="section"><h3>Professional Summary</h3><p>${data.summary}</p></div>` : ''}
            ${data.experience ? `<div class="section"><h3>Work Experience</h3><p>${data.experience.replace(/\n/g, '<br>')}</p></div>` : ''}
            ${data.education ? `<div class="section"><h3>Education</h3><p>${data.education.replace(/\n/g, '<br>')}</p></div>` : ''}
            ${data.skills ? `<div class="section"><h3>Skills</h3><p>${data.skills}</p></div>` : ''}
        </div>
    `;
    return template;
}

function goToHome() {
    document.getElementById('style-selection').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('preview-section').style.display = 'none';
    selectedStyle = null;
    // Reset form
    document.getElementById('cv-form').reset();
    // Scroll to top
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    loadStyles();

    document.getElementById('style-selection').addEventListener('click', (e) => {
        const card = e.target.closest('.style-card');
        if (card) {
            const styleId = card.dataset.style;
            selectStyle(styleId);
        }
    });

    document.getElementById('cv-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const cvHTML = generateCV(data);
        document.getElementById('cv-preview').innerHTML = cvHTML;
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('preview-section').style.display = 'block';
    });

    document.getElementById('download-btn').addEventListener('click', downloadPDF);

    document.getElementById('back-btn').addEventListener('click', () => {
        document.getElementById('preview-section').style.display = 'none';
        document.getElementById('form-section').style.display = 'block';
    });

    // Home navigation
    document.querySelector('.navbar-brand').addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
    });

    document.querySelector('.display-4').addEventListener('click', () => {
        goToHome();
    });
});