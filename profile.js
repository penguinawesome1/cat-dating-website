import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

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
const storage = getStorage(app);
let user;

document.addEventListener('click', (event) => {
    if (!user) {
        console.log("User is not signed in, preventing action.");
        return;
    }
    const target = event.target;
    switch (target.id) {
        case "change-profile-picture":
            const imageInput = document.getElementById("profile-picture-input");
            const file = imageInput.files[0];
            if (!file) break;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(1);
                const url = e.target.result;
                const storageRef = ref(storage, url);
                uploadBytes(storageRef, file)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                    console.log('Uploaded a pfp!');
                }).then((downloadURL) => {
                    updateUserProfile(downloadURL);
                }).catch((error) => {
                    console.error('Error uploading file', error);
                });
            };
            reader.readAsDataURL(file);
            break;
        case "change-username":
            const username = prompt("What is your new username?");
            if (!username) break;
            updateProfile(user, { displayName: username })
            .then(() => {
                updateUserProfile(user);
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
    const profilePicture = document.getElementById("profile-picture");
    profilePicture.src = user.photoURL;
    
    const username = document.getElementById("username");
    username.textContent = user.displayName;
}

onAuthStateChanged(auth, (currentUser) => {
    const profilePicture = document.getElementById("profile-picture");
    const signIn = document.getElementById("sign-in");
    if (currentUser) {
        updateUserProfile(currentUser);
        profilePicture.classList.remove("hidden");
        signIn.classList.add("hidden");
    } else {
        profilePicture.src = "images/default-profile-picture";
        profilePicture.classList.add("hidden");
        signIn.classList.remove("hidden");
        document.getElementById("username").textContent = "Guest";
    }
    user = currentUser;
});
