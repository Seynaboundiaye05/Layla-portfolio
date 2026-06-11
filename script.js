// Gestion du curseur personnalisé
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; 
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Effet d'étincelles (Sparkles) lors d'un clic
document.addEventListener('click', e => {
  const sparks = ['✦', '✿', '❋', '✸', '✺'];
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    s.style.cssText = `
      left: ${e.clientX + (Math.random() - 0.5) * 60}px;
      top: ${e.clientY + (Math.random() - 0.5) * 60}px;
      position: fixed;
      color: var(--rose);
      font-size: ${0.8 + Math.random()}rem;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
});

// Génération des pétales flottants en arrière-plan
const petalsContainer = document.getElementById('petals');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (8 + Math.random() * 12) + 's';
  p.style.animationDelay = (Math.random() * 15) + 's';
  p.style.width = (6 + Math.random() * 8) + 'px';
  p.style.height = (10 + Math.random() * 8) + 'px';
  petalsContainer.appendChild(p);
}

// Détection du défilement pour faire apparaître les éléments (Scroll Reveal)
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

// Gestion dynamique des erreurs de chargement d'images de la galerie (Bascule sur le SVG)
document.querySelectorAll('.gallery-img').forEach(img => {
  img.onerror = function() {
    this.style.display = 'none'; // Cache la balise img brisée pour afficher le SVG en fond
  };
});