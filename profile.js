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

let isUserSignedIn = false;

document.addEventListener('click', (event) => {
    if (!isUserSignedIn) {
        console.log("User is signed out, cannot change settings");
        return;
    }
    const target = event.target;
    switch (target.id) {
        case "profile-picture":
            const imageInput = document.getElementById("profile-picture-input");
            const file = imageInput.files[0];
            if (!file) break;
            const reader = new FileReader();
            let data;
            reader.onload = (e) => {
                const profilePicture = document.getElementById("change-profile-picture");
                profilePicture.src = e.target.result;
                data = e.target.result;
            };
            reader.readAsDataURL(file);
            updateProfile(user, {
                photoURL: data
            }).then(() => {
                console.log("Profile updated successfully");
            }).catch((error) => {
                console.error("Error updating profile:", error);
            });
            break;
        case "change-username":
            const username = prompt("What is your new username?");
            if (!username) break;
            updateProfile(user, {
                displayName: "New Username"
            }).then(() => {
                console.log("Profile updated successfully");
            }).catch((error) => {
                console.error("Error updating profile:", error);
            });
            break;
        case "sign-out":
            signOut(auth).then(() => {
                console.log("Signed out successfully");
                window.location.href = "index.html";
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
            break;
        default: break;
    }
});

function updateUserProfile(user) {
    const username = user.displayName;
    const profilePicture = user.photoURL;

    document.getElementById("username").textContent = username;
    document.getElementById("profile-picture").src = profilePicture;
}

onAuthStateChanged(auth, (user) => {
    document.getElementById("sign-in").classList.toggle("hidden");
    document.getElementById("profile-picture").classList.toggle("hidden");
    if (user) {
        isUserSignedIn = true;
        updateUserProfile(user);
        console.log("User is signed in.");
    } else {
        isUserSignedIn = false;
        document.getElementById("username").textContent = "Guest";
        document.getElementById("profile-picture").src = "images/default-profile-picture";
        console.log("User is signed out.");
    }
});
