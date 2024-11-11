import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
const auth = getAuth();

const track = document.getElementById("profile-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -90);
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of track.querySelectorAll("img")) {
        image.animate({
        objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

function updateUserProfile(user) {
    const username = user.displayName;
    const profilePicture = user.photoURL;

    document.getElementById("username").textContent = userName;
    document.getElementById("profile-picture").src = userProfilePicture;
}

document.getElementById("sign-in").classList.toggle("hidden");
document.getElementById("profile-picture").classList.toggle("hidden");

// onAuthStateChanged(auth, (user) => {
//     document.getElementById("sign-in").classList.toggle("hidden");
//     document.getElementById("profile-picture").classList.toggle("hidden");
//     if (user) {
//         updateUserProfile(user);
//         const uid = user.uid;
//     } else {
//         document.getElementById("username").textContent = "guest";
//         document.getElementById("profile-picture").src = "images/default-profile-picture";
//     }
// });

// const pics = track.querySelectorAll("img");
// pics.forEach(myPic => {
//     myPic.addEventListener("click", () => {
//         myPic.classList.toggle("fill-screen");
//         myPic.style.width = "1.5rem";
//     });
// });
