import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

window.login = async function () {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, senha);

        window.location.href = "dashboard.html";

    } catch (erro) {

        alert("E-mail ou senha inválidos.");
        console.error(erro);

    }

};