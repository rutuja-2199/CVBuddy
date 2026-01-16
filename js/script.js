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
                    <h1>John Doe</h1>
                    <p>Software Engineer</p>
                </div>
                <div class="section">
                    <h3>Contact</h3>
                    <p>Email: john@example.com</p>
                </div>
                <div class="section">
                    <h3>Experience</h3>
                    <p>Developed web applications...</p>
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
                    <h2>Jane Smith</h2>
                    <p>Marketing Manager</p>
                </div>
                <div class="section">
                    <h3>Professional Summary</h3>
                    <p>Experienced marketing professional...</p>
                </div>
                <div class="section">
                    <h3>Work Experience</h3>
                    <p>Led marketing campaigns...</p>
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
                    <h1>Alex Johnson</h1>
                    <p>Data Analyst</p>
                </div>
                <div class="section">
                    <h3>Skills</h3>
                    <p>Python, SQL, Tableau...</p>
                </div>
                <div class="section">
                    <h3>Education</h3>
                    <p>Bachelor's in Computer Science...</p>
                </div>
            </div>
        `
    }
];

function loadStyles() {
    const container = document.getElementById('style-selection');
    styles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card style-card" data-style="${style.id}">
                <div class="card-body">
                    <h5 class="card-title">${style.name}</h5>
                    <div class="card-text">${style.preview}</div>
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

function downloadPDF() {
    const element = document.getElementById('cv-preview');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('cv.pdf');
    });
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
});