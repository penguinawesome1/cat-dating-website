import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
    if (!isUserSignedIn) return;
    const target = event.target;
    switch (target.id) {
        case "profile-picture":
            const imageInput = document.getElementById("profile-picture-input");
            const file = imageInput.files[0];
            if (!file) break;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const profilePicture = document.getElementById("change-profile-picture");
                updateUserProfile(user, { photoURL: e.target.result })
                .then(() => {
                    profilePicture.src = e.target.result;
                    console.log("Profile updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                });
            };
            reader.readAsDataURL(file);
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
            auth.currentUser.getIdToken(true)
            .then(() => {
                auth.currentUser.reload()
                .then(() => {
                    const updatedUser = auth.currentUser;
                    updateUserProfile(updatedUser);
                }).catch((error) => {
                    console.error("Error reloading user data:", error);
                });
            })
            .catch((error) => {
                console.error("Error refreshing token:", error);
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
