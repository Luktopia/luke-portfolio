const grid = document.getElementById('cert-list');
let data = [];

function renderGrid() {

    grid.innerHTML = data.map(cert => `

        <article class="certCard">

            <img src="${cert.image}" alt="${cert.name}" class="thumb" loading="lazy">
    
            <div class="cert-info">

                <h3>${cert.name}</h3>

                <div>Issuer: ${cert.issuer}</div>
                
            </div>

        </article>
        

        
    `).join('');

    // Attach modal behavior
    document.querySelectorAll('.certCard img').forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            const caption = document.getElementById('caption');

            modal.style.display = 'block';
            modalImg.src = img.src;
            caption.textContent = img.alt;
        });
    });

    // Close button
    document.querySelector('.close').onclick = () => {
        document.getElementById('imageModal').style.display = 'none';
    };

}

async function infoInit() {
    try {
        const res = await fetch('data/certs.json');
        data = await res.json();
        renderGrid();
    } catch (e) {
        grid.innerHTML = `<div>Failed to load certs.json<br><small>${e}</small></div>`;
    }
}

infoInit();
