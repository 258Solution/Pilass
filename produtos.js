import { auth, db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const lista = document.getElementById("listaProdutos");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    carregarProdutos(user.uid);

});
async function carregarProdutos(uid) {

    lista.innerHTML = "";

    const q = query(
        collection(db, "produtos"),
        where("uid", "==", uid)
    );

    const resultado = await getDocs(q);

    if (resultado.empty) {

        lista.innerHTML = `
            <p style="text-align:center;">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }

    resultado.forEach((docItem) => {

        const produto = docItem.data();

        lista.innerHTML += `
            <div class="card">

                <img src="${produto.imagem}" alt="${produto.nome}">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <h2>${produto.preco} MT</h2>

         <div class="acoes">

<button onclick="copiarLink('${produto.checkout || ''}')">
        Copiar Link
    </button>

    <button onclick="editarProduto('${docItem.id}')">
        Editar
    </button>

    <button onclick="excluirProduto('${docItem.id}')">
        Excluir
    </button>

</div>
            </div>
        `;

    });

}
// Abrir página para cadastrar novo produto
window.novoProduto = function () {
    window.location.href = "produto.html";
};

// Abrir página para editar produto
window.editarProduto = function (id) {
    window.location.href = "produto.html?id=" + id;
};

// Excluir produto
window.excluirProduto = async function (id) {

    if (!confirm("Deseja excluir este produto?")) {
        return;
    }

    try {

        await deleteDoc(doc(db, "produtos", id));

        alert("Produto excluído com sucesso!");

        location.reload();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir o produto.");

    }

};

// Copiar link do checkout
window.copiarLink = async function (codigo) {

    if (!codigo) {
        alert("Este produto não possui um código de checkout.");
        return;
    }

    const link = window.location.origin +
        "/checkout.html?codigo=" + codigo;

    try {

        await navigator.clipboard.writeText(link);

        alert("Link copiado!\n\n" + link);

    } catch (erro) {

        alert("Copie este link:\n\n" + link);

    }

};