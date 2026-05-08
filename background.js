const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

let width, height;
let particles = [];
const particleCount = 200; // More points for a better effect
const mouse = { x: -1000, y: -1000 };
const interactionRadius = 200;

// Access CSS variables
const style = getComputedStyle(document.body);
const primaryColor = style.getPropertyValue('--primary-color').trim() || '#884FFF';
const textColorLight = '#E2E8F0'; // Light gray

function resize() {
  const rect = hero.getBoundingClientRect();
  width = canvas.width = rect.width;
  height = canvas.height = rect.height;
  initParticles();
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = 1.2;
    this.color = textColorLight;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Follow mouse slightly (antigravity style)
    const dx = mouse.x - this.x;
    const dy = (mouse.y - hero.offsetTop) - this.y; // Adjust for scroll position
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < interactionRadius) {
      this.color = primaryColor;
      this.x += dx * 0.005;
      this.y += dy * 0.005;
    } else {
      this.color = textColorLight;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top + window.scrollY; // Adjust for element position in page
});

// For touch devices
window.addEventListener('touchstart', (e) => {
  const rect = hero.getBoundingClientRect();
  mouse.x = e.touches[0].clientX - rect.left;
  mouse.y = e.touches[0].clientY - rect.top + window.scrollY;
});

resize();
animate();
