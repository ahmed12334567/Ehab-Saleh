const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.onclick = () => {
    document.body.classList.toggle("theme-dark");

    if (document.body.classList.contains("theme-dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.querySelector('i').className = 'fas fa-sun';
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.querySelector('i').className = 'fas fa-moon';
    }
};

window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("theme-dark");
        toggleBtn.querySelector('i').className = 'fas fa-sun';
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
};
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMsg = document.getElementById("successMessage");

    name.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    message.classList.remove("is-invalid");
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (messageError) messageError.textContent = "";
    successMsg.classList.add('d-none');

    let isValid = true;

    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const messageVal = message.value.trim();

    if (!nameVal) {
        name.classList.add("is-invalid");
        if (nameError) nameError.textContent = "Please complete fullname";
        isValid = false;
    } else if (nameVal.length < 4) {
        name.classList.add("is-invalid");
        if (nameError) nameError.textContent = "Please Enter Correct Name";
        isValid = false;
    }

    if (!emailVal) {
        email.classList.add("is-invalid");
        if (emailError) emailError.textContent = "Please complete email";
        isValid = false;
    } else if (!emailVal.includes('@') || !emailVal.includes('.')) {
        email.classList.add("is-invalid");
        if (emailError) emailError.textContent = "Please Enter Correct email( add [.] or [@] )";
        isValid = false;
    }

    // Message validation
    if (!messageVal) {
        message.classList.add("is-invalid");
        if (messageError) messageError.textContent = "Please complete message";
        isValid = false;
    } else if (messageVal.length < 10) {
        message.classList.add("is-invalid");
        if (messageError) messageError.textContent = "Enter Your Message";
        isValid = false;
    }

    if (isValid) {
        successMsg.classList.remove('d-none');
        successMsg.scrollIntoView({ behavior: 'smooth' });

        // Send email via emailjs باستخدام القيم (.value)
        emailjs.init("614RMq58Vr5RTdDGI");
        emailjs.send("service_km4sgmp", "template_v3u8yzt", {
            name: nameVal,    // تم التعديل لإرسال القيمة
            email: emailVal,  // تم التعديل لإرسال القيمة
            message: messageVal // تم التعديل لإرسال القيمة
        }).then(() => {
            console.log("Email sent successfully!");
            form.reset(); // التصفير بعد التأكد من القراءة
        }).catch((error) => {
            console.error("Email send failed:", error);
        });

        // Reload after 7 seconds
        setTimeout(() => {
            window.location.reload();
        }, 7000);
    }
});

// باقي الكود الخاص بالبحث والـ Observer سليم ولا يحتاج تعديل
const searchInput = document.getElementById('projectSearch');
const projectCards = document.querySelectorAll('.project-card');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    projectCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const categories = card.dataset.categories.toLowerCase();

        if (title.includes(query) || categories.includes(query)) {
            card.style.display = '';
            card.classList.add('animate-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
});

const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.1
});

elements.forEach(el => observer.observe(el));




document.querySelectorAll('.icon').forEach(icon => {

    /* 3D حركة */
    icon.addEventListener('mousemove', e => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 5;
        const rotateY = (x - rect.width / 2) / 5;

        icon.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

    /* 💥 ripple */
    icon.addEventListener('click', function (e) {
        let ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.width = ripple.style.height = "200px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,0.4)";
        ripple.style.left = (e.offsetX - 100) + "px";
        ripple.style.top = (e.offsetY - 100) + "px";
        ripple.style.animation = "ripple 0.6s linear";
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

});

const style = document.createElement('style');
style.innerHTML = `
@keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(2); opacity: 0; }
}`;
document.head.appendChild(style);




const btn = document.getElementById("scrollTopBtn");
const circle = document.querySelector("#scrollTopBtn circle");

const circumference = 2 * Math.PI * 45;

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let progress = scrollTop / docHeight;

    // progress circle
    circle.style.strokeDashoffset = circumference - (progress * circumference);

    // show button
    if (scrollTop > 300) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
});

// scroll top
btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width/2);
    const dy = e.clientY - (rect.top + rect.height/2);

    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 150) {
        btn.style.transform = `translate(${dx*0.15}px, ${dy*0.15}px) scale(1.15)`;
    } else {
        btn.style.transform = "scale(1)";
    }
});