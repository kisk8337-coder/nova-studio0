document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // REVEAL ANIMATION (OPTIMIZED)
    // =========================
    const revealItems = document.querySelectorAll(".reveal.animate");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(el => observer.observe(el));


    // =========================
    // MODAL SYSTEM (FIXED)
    // =========================
    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openForm");

    function openModal() {
        if (!modal) return;
        modal.style.display = "flex";
        requestAnimationFrame(() => modal.classList.add("show"));
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("show");

        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }, 300);
    }

    if (openBtn) {
        openBtn.addEventListener("click", openModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });


    // =========================
    // LIGHTBOX (PORTFOLIO)
    // =========================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll("#portfolio .img, .ba-images img").forEach(img => {
        img.addEventListener("click", () => {
            if (!lightbox || !lightboxImg) return;

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    if (lightbox) {
        lightbox.addEventListener("click", () => {
            lightbox.style.display = "none";
            if (lightboxImg) lightboxImg.src = "";
        });
    }


    // =========================
    // TOAST SYSTEM (SAFE)
    // =========================
    function showToast(message, type = "success") {
        let toast = document.getElementById("toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.style.position = "fixed";
        toast.style.bottom = "24px";
        toast.style.right = "24px";
        toast.style.padding = "14px 18px";
        toast.style.borderRadius = "12px";
        toast.style.fontSize = "14px";
        toast.style.color = "#fff";
        toast.style.zIndex = "9999";
        toast.style.transition = "0.35s ease";
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
        toast.style.backdropFilter = "blur(10px)";

        toast.style.background =
            type === "success"
                ? "rgba(40,167,69,0.9)"
                : "rgba(220,53,69,0.9)";

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
        }, 2500);
    }


    // =========================
    // TELEGRAM FORM (REAL FIX)
    // =========================
    const form = document.getElementById("bookingForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (form.honeypot && form.honeypot.value) return;

            const button = form.querySelector("button");

            if (button) {
                button.disabled = true;
                button.textContent = "Отправка...";
            }

            const TOKEN = "PUT_YOUR_TOKEN_HERE";
            const CHAT_ID = "PUT_YOUR_CHAT_ID_HERE";

            const text = `
📸 Новая заявка

👤 Имя: ${form.name?.value || "-"}
📞 Телефон: ${form.phone?.value || "-"}
📧 Email: ${form.email?.value || "-"}
💬 Telegram: ${form.telegram?.value || "-"}
            `;

            try {
                const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text
                    })
                });

                const data = await res.json();

                if (!data.ok) throw new Error();

                showToast("Заявка отправлена 🚀", "success");
                form.reset();
                closeModal();

            } catch (err) {
                showToast("Ошибка отправки", "error");
            } finally {
                if (button) {
                    button.disabled = false;
                    button.textContent = "Отправить";
                }
            }
        });
    }


    // =========================
    // HERO PARALLAX (SMOOTH)
    // =========================
    const heroBg = document.querySelector(".hero-bg");

    if (heroBg) {
        let last = 0;

        window.addEventListener("scroll", () => {
            const target = window.scrollY * 0.2;
            last += (target - last) * 0.08;
            heroBg.style.transform = `translateY(${last}px) scale(1.2)`;
        });
    }

});
// =========================
// BEFORE / AFTER DRAG (STABLE)
// =========================

document.querySelectorAll(".case-slider").forEach(slider => {
    const after = slider.querySelector(".after");
    const line = slider.querySelector(".slider-line");

    let isDown = false;

    const move = (clientX) => {
        const rect = slider.getBoundingClientRect();

        let x = clientX - rect.left;
        let percent = x / rect.width;

        percent = Math.max(0, Math.min(1, percent));

        const value = percent * 100;

        after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        line.style.left = value + "%";
    };

    // START DRAG
    slider.addEventListener("pointerdown", (e) => {
        isDown = true;
        slider.setPointerCapture(e.pointerId); // фиксируем указатель
        move(e.clientX);
    });

    // MOVE (по всему окну — это ключ)
    window.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        move(e.clientX);
    });

    // END DRAG
    const stop = () => {
        isDown = false;
    };

    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
});
const servicesData = {
  commercial: {
    title: "Коммерческая съёмка",
    text: `
✔ проработка идеи и концепции<br>
✔ подбор референсов<br>
✔ съёмка под задачу бизнеса<br>
✔ обработка фото<br><br>
Результат: визуал, который продаёт
    `
  },
  product: {
    title: "Предметная съёмка",
    text: `
✔ съёмка для Wildberries / Ozon<br>
✔ белый фон / лайфстайл<br>
✔ работа со светом<br><br>
Результат: рост CTR карточек
    `
  },
  wedding: {
    title: "Свадебная съёмка",
    text: `
✔ полный день или церемония<br>
✔ репортаж + постановка<br>
✔ обработка всех фото<br><br>
Результат: живая история дня
    `
  },
  love: {
    title: "Love Story",
    text: `
✔ помощь с позированием<br>
✔ подбор локации<br>
✔ атмосферная съёмка<br><br>
Результат: эстетичная история пары
    `
  },
  personal: {
    title: "Персональная съёмка",
    text: `
✔ портрет / lifestyle<br>
✔ помощь в образе<br>
✔ лёгкая атмосфера<br><br>
Результат: сильный личный визуал
    `
  },
  content: {
    title: "Контент для соцсетей",
    text: `
✔ съёмка под Instagram<br>
✔ контент-план<br>
✔ серия фото<br><br>
Результат: единый стиль профиля
    `
  }
};
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.service;
    const service = servicesData[key];

    if (!service) return;

    const modal = document.getElementById("modal");

    modal.querySelector("h2").textContent = service.title;
    modal.querySelector("p").innerHTML = service.text;

    modal.style.display = "flex";
    requestAnimationFrame(() => modal.classList.add("show"));
    document.body.style.overflow = "hidden";
  });
});

