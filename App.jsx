const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityY = Math.random() * 3 - 1.5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.y += this.velocityY;
        if (this.y > canvas.height || this.y < 0) this.velocityY *= -1;
    }
}

function createParticles() {
    for (let i = 0; i < 30; i++) {
        let size = Math.random() * 5 + 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particles.push(new Particle(x, y, size, color));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

// GSAP Animations
gsap.from("#section1 h1", { opacity: 0, y: -50, duration: 1 });

gsap.to("#section2", {
    scrollTrigger: {
        trigger: "#section2",
        start: "top center",
        end: "bottom center",
        scrub: true,
        pin: true,
    },
    backgroundColor: "#FF33A8",
});

gsap.from("#section3 h1", {
    scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        toggleActions: "restart none none none",
    },
    opacity: 0, x: -100, duration: 1
});