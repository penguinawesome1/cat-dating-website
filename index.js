import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBp2Xt-6o12a8aRZBmHJGZtbhHCbda8CAc",
    authDomain: "fireside-flurt-e55e1.firebaseapp.com",
    projectId: "fireside-flurt-e55e1",
    storageBucket: "fireside-flurt-e55e1.firebasestorage.app",
    messagingSenderId: "662119957266",
    appId: "1:662119957266:web:cd4020072fd1a637d4a9cb",
    measurementId: "G-0LP58TPFJE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const track = document.getElementById("profile-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -90);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.querySelectorAll("img")) {
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
    const profilePicture = document.getElementById("profile-picture");
    profilePicture.src = user.photoURL;
    
    const username = document.getElementById("username");
    username.textContent = user.displayName;
}

onAuthStateChanged(auth, (user) => {
    const profilePictureBox = document.getElementById("profile-picture");
    if (user) {
        updateUserProfile(user);
        document.getElementById("profile-picture").classList.remove("hidden");
        document.getElementById("sign-in").classList.add("hidden");
    } else {
        profilePicture.src = "images/default-profile-picture";
        profilePicture.classList.add("hidden");
        document.getElementById("sign-in").classList.remove("hidden");
        document.getElementById("username").textContent = "Guest";
    }
});

// const pics = track.querySelectorAll("img");
// pics.forEach(myPic => {
//     myPic.addEventListener("click", () => {
//         myPic.classList.toggle("fill-screen");
//     });
// });
