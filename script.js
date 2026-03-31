document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    document.getElementById("year").textContent = new Date().getFullYear();

    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const linkNodes = document.querySelectorAll(".nav-links a[href^='#']");

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 25);
    });

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    linkNodes.forEach((a) => {
        a.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.classList.remove("active");
        });
    });

    document.querySelectorAll("a[href^='#']").forEach((a) => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (id === "#") return;
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const sections = [...document.querySelectorAll("section[id]")];
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute("id");
            document.querySelectorAll(".nav-links a").forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { threshold: 0.45 });
    sections.forEach((s) => spy.observe(s));

    const revealEls = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transitionDelay = `${(i % 6) * 0.12}s`;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => revealObs.observe(el));

    const counts = document.querySelectorAll(".count");
    const countObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.dataset.target || "0");
            let step = 0;
            const timer = setInterval(() => {
                step += 1;
                el.textContent = String(Math.min(target, Math.ceil((target / 40) * step)));
                if (step >= 40) clearInterval(timer);
            }, 40);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counts.forEach((el) => countObserver.observe(el));

    const eyebrowEl = document.getElementById("typed-eyebrow");
    const text = "// CYBERSECURITY & DIGITAL FORENSICS";
    let idx = 0;
    const typing = setInterval(() => {
        eyebrowEl.textContent = `${text.slice(0, idx)}${idx % 2 ? "_" : ""}`;
        idx += 1;
        if (idx > text.length) {
            clearInterval(typing);
            eyebrowEl.textContent = text;
        }
    }, 45);

    const glitch = document.querySelector(".glitch");
    setInterval(() => {
        glitch.classList.add("glitching");
        setTimeout(() => glitch.classList.remove("glitching"), 400);
    }, 8000);

    document.querySelectorAll(".magnetic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0,0)";
        });
    });

    document.querySelectorAll(".tilt").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty("--mx", `${px * 100}%`);
            card.style.setProperty("--my", `${py * 100}%`);
            const max = card.classList.contains("project-card") ? 12 : 8;
            const rx = (0.5 - py) * max;
            const ry = (px - 0.5) * max;
            card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
        });
    });

    if (!isMobile) {
        const dot = document.querySelector(".cursor-dot");
        const ring = document.querySelector(".cursor-ring");
        let dx = window.innerWidth / 2; let dy = window.innerHeight / 2;
        let rx = dx; let ry = dy;
        window.addEventListener("mousemove", (e) => {
            dx = e.clientX; dy = e.clientY;
        });
        const loop = () => {
            rx += (dx - rx) * 0.12;
            ry += (dy - ry) * 0.12;
            dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
            ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
            requestAnimationFrame(loop);
        };
        loop();
        const interactive = "a, button, .project-card, .skill-card, .cert-row, .contact-card";
        document.querySelectorAll(interactive).forEach((el) => {
            el.addEventListener("mouseenter", () => ring.classList.add("hover"));
            el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
        });
    }

    const setupCanvas = (id, radar) => {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const count = isMobile ? 36 : 80;
        let w = 0; let h = 0;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random(), y: Math.random(),
            vx: (Math.random() - 0.5) * 0.0012, vy: (Math.random() - 0.5) * 0.0012
        }));
        const resize = () => {
            const r = canvas.getBoundingClientRect();
            w = r.width; h = r.height;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);
        let t = 0;
        const draw = () => {
            t += 0.01;
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            for (let gy = 0; gy < 16; gy += 1) {
                const y = h * 0.62 + gy * 20;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y + gy * 2);
                ctx.stroke();
            }
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > 1) p.vx *= -1;
                if (p.y < 0 || p.y > 1) p.vy *= -1;
            });
            for (let i = 0; i < particles.length; i += 1) {
                const a = particles[i];
                const ax = a.x * w; const ay = a.y * h;
                ctx.fillStyle = "rgba(0,255,200,0.9)";
                ctx.fillRect(ax - 1, ay - 1, 2, 2);
                for (let j = i + 1; j < particles.length; j += 1) {
                    const b = particles[j];
                    const bx = b.x * w; const by = b.y * h;
                    const d = Math.hypot(ax - bx, ay - by);
                    if (d < 120) {
                        ctx.strokeStyle = `rgba(0,255,200,${(1 - d / 120) * 0.15})`;
                        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
                    }
                }
            }
            if (radar) {
                const cx = w - 120; const cy = 100;
                ctx.strokeStyle = "rgba(0,255,200,0.2)";
                ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = "rgba(0,255,200,0.9)";
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(t * 2) * 65, cy + Math.sin(t * 2) * 65);
                ctx.stroke();
            }
            requestAnimationFrame(draw);
        };
        draw();
    };
    setupCanvas("hero-canvas", true);
    setupCanvas("contact-canvas", false);
});
