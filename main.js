const form = document.querySelector("#novoItem");
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem("itens")) || []; //verifica se o local storage tem algo, se não, ent cria um array vazio
//JSON.parse() volta a string para array

console.log(itens);

itens.forEach((element) => {
    console.log(element.nome, element.quantidade);
    criaElemento(element);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    criaElemento(itemAtual);

    itens.push(itemAtual);

    //local storage
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(objeto){
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = objeto.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += objeto.nome;

    lista.appendChild(novoItem);
};