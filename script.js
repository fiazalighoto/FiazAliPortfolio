document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    // Toggle mobile navigation drawer
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            const isExpanded = mobileMenu.getAttribute("aria-expanded") === "true";
            mobileMenu.setAttribute("aria-expanded", String(!isExpanded));
            mobileMenu.classList.toggle("open");
            navLinks.classList.toggle("active");
        });

        // Close mobile menu when a link is clicked
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.setAttribute("aria-expanded", "false");
                mobileMenu.classList.remove("open");
                navLinks.classList.remove("active");
            });
        });
    }

    // Highlight active section link on scroll
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    // Verify PDF availability and provide clear feedback if missing locally
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    pdfLinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            const pdfPath = link.getAttribute("href");
            if (!pdfPath) return;

            try {
                const response = await fetch(pdfPath, { method: "HEAD" });
                if (!response.ok) {
                    event.preventDefault();
                    alert(`"${pdfPath}" was not found in the site folder. Please place ${pdfPath} in the same directory as index.html.`);
                }
            } catch {
                // Allow default behavior when opened via file:// protocol where fetch may be restricted
            }
        });
    });
});