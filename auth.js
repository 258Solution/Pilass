import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.cadastrar = async function () {

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        const credencial = await createUserWithEmailAndPassword(auth, email, senha);

        await setDoc(doc(db, "usuarios", credencial.user.uid), {
            nome: nome,
            email: email,
            criadoEm: new Date()
        });

        alert("Conta criada com sucesso!");

        window.location.href = "index.html";

    } catch (erro) {
        alert(erro.message);
        console.error(erro);
    }

};