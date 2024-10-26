function onMenuClick() {
    const navbar = document.querySelector("nav");
    const ul = navbar.querySelector("ul");
    const responsive_class_name = "responsive";

    ul.classList.toggle(responsive_class_name);
    navbar.classList.toggle(responsive_class_name);
}