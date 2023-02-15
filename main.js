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
    const existe = itens.find((elemento) => elemento.nome === nome.value); //retorna o proprio obj ou 'undefined'

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[existe.findIndex(elemento => elemento.id === existe.id)] = itemAtual; //atualizando o array 
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElemento(itemAtual);
    
        itens.push(itemAtual);
    };

    //local storage
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
};

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
};

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function(){ //nn se pode usar arrow function pois nn carrega o 'this'
        deletaElemento(this.parentNode, id); //acessa o pai do 'this', no caso o 'button'
    });

    return elementoBotao;
};

function deletaElemento(tag, id){
    tag.remove(); //remove o pai do elemento de tag 'button' clicado

    //remover item do array
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1);

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
};