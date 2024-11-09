function onMenuClick() {
    const navbar = document.querySelector("nav");
    const ul = navbar.querySelector("ul");
    const responsive_class_name = "responsive";

    ul.classList.toggle(responsive_class_name);
    navbar.classList.toggle(responsive_class_name);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));