import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    console.log("Usuário logado:", user.email);

});

// Função para sair
window.logout = async function () {

    await signOut(auth);

    window.location.href = "index.html";

};