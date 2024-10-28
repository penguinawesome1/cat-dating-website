let slider = document.querySelector(".slider");
let nextTitle = document.getElementById("next");
nextBtn.onClick = () => {
    slider.append(slider.querySelector("h5:first-child"))
}

let prevTitle = document.getElementById("prev");
prevBtn.onClick = () => {
    slider.append(slider.querySelector("h5:last-child"))
}