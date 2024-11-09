import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const submitSignIn = document.getElementById("submit-sign-in");
submitSignIn.addEventListener("click", function (event) {
    event.preventDefault(); // stops page from refreshing
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signing In...");
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

const submitSignUp = document.getElementById("submit-sign-up");
submitSignUp.addEventListener("click", function (event) {
    event.preventDefault(); // stops page from refreshing
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Creating Account...");
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

const googleLogin = document.getElementById("google-sign-in");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((userCredential) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            alert("Signing In...");
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

const card = document.querySelector(".login-container");
const needAccountBtn = document.getElementById("need-account");
needAccountBtn.addEventListener("click", function () {
    card.classList.add("flip");
});

const haveAccountBtn = document.getElementById("have-account");
haveAccountBtn.addEventListener("click", function () {
    card.classList.remove("flip");
});