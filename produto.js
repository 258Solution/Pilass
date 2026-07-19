import { auth, db } from "./firebase.js";
import { supabase } from "./supabase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

let usuario = null;

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    usuario = user;

});

window.salvarProduto = async function () {

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const checkout = document.getElementById("checkout").value.trim();
    const metodo = document.getElementById("metodo").value;

    const arquivo = document.getElementById("imagem").files[0];

    if (!arquivo) {
        alert("Selecione uma imagem.");
        return;
    }

    try {

        // Nome único para a imagem
        const nomeArquivo = Date.now() + "_" + arquivo.name;

        // Upload para o Supabase
        const { error } = await supabase.storage
            .from("Produtos")
            .upload(nomeArquivo, arquivo);

        if (error) throw error;

        // URL pública da imagem
        const { data } = supabase.storage
            .from("Produtos")
            .getPublicUrl(nomeArquivo);

        // Salva no Firestore
        await addDoc(collection(db, "produtos"), {

            uid: usuario.uid,
            nome,
            descricao,
            preco,
            checkout,
            metodo,
            imagem: data.publicUrl,
            criadoEm: serverTimestamp()

        });

        alert("Produto cadastrado com sucesso!");

        window.location.href = "produtos.html";

    } catch (erro) {

        console.error(erro);
        alert("Erro ao cadastrar o produto.");

    }

};