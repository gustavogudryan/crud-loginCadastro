const logado = sessionStorage.getItem('logado');
const listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

const btnLogout = document.getElementById("logout");

const formRecado = document.querySelector("#novo-recado-form");
const inputTituloNovoRecado = document.querySelector("#titulo-recado-input");
const inputNovoRecado = document.querySelector("#novo-recado-input");
const listaRecados = document.querySelector("#recados");

const tituloNome = document.getElementById("titulo-home");


document.addEventListener('DOMContentLoaded', () => {

    checarLogged();

    function checarLogged() {
        if (!logado) {
            window.location.href = "index.html"
            return
        }
    }

    let listaUsuarios = buscarTodosUsuarios();

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    tituloNome.innerHTML = `<span class="bem-vindo">Bem-vindo,</span> <span class="username">${user.username}</span> `;

    user.recados.forEach((recado) => montarHTML(recado))

})

function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('logado')
    document.location.reload();
})

formRecado.addEventListener('submit', (e) => {
    e.preventDefault();

    salvarRecado();

});

function salvarRecado() {
    let recado = inputNovoRecado.value;
    let tituloRecado = inputTituloNovoRecado.value;

    const novoRecado = {
        titulo: tituloRecado,
        detalhamento: recado,
        id: Math.floor((Math.random() * (1000000000 - 10) + 10))
    }

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user.recados.push(novoRecado);

    atualizarDadosUsuario(user);
    formRecado.reset();
    montarHTML(novoRecado);
}

function atualizarDadosUsuario(dadosAtualizados) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user = dadosAtualizados;

    atualizarStorage();
}

function atualizarStorage() {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

function montarHTML(novoRecado) {
    //capturando
    let titulo = novoRecado.titulo;
    let recado = novoRecado.detalhamento;
    let id = novoRecado.id

    //montando html
    const elementoRecado = document.createElement("div");
    elementoRecado.classList.add("recado");
    elementoRecado.setAttribute('id', novoRecado.id);

    const conteudoRecado = document.createElement("div");
    conteudoRecado.classList.add("conteudo-recado");
    elementoRecado.appendChild(conteudoRecado);

    const mostrarId = document.createElement("input");
    mostrarId.classList.add("id-recado")
    mostrarId.type = 'text'
    mostrarId.value = id
    mostrarId.setAttribute("readonly", "readonly")

    const inputRecado = document.createElement("input");
    inputRecado.classList.add("texto-recado");
    inputRecado.type = "text";
    inputRecado.value = recado;
    inputRecado.setAttribute("readonly", "readonly");

    const inputTitulo = document.createElement("input");
    inputTitulo.classList.add("titulo-recado");
    inputTitulo.type = "text";
    inputTitulo.value = titulo;
    inputTitulo.setAttribute("readonly", "readonly");

    conteudoRecado.appendChild(mostrarId)
    conteudoRecado.appendChild(inputTitulo);
    conteudoRecado.appendChild(inputRecado);


    //buttons recados
    const botoesRecado = document.createElement("div");
    botoesRecado.classList.add("botoes-recado");

    const botaoEditarRecado = document.createElement("button");
    botaoEditarRecado.classList.add("editar-recado");
    botaoEditarRecado.innerHTML = "EDITAR";

    const botaoDeletarRecado = document.createElement("button");
    botaoDeletarRecado.classList.add("deletar-recado");
    botaoDeletarRecado.innerHTML = "APAGAR";

    botoesRecado.appendChild(botaoEditarRecado);
    botoesRecado.appendChild(botaoDeletarRecado);
    elementoRecado.appendChild(botoesRecado);
    listaRecados.appendChild(elementoRecado);

    //buttons callback
    botaoEditarRecado.addEventListener('click', () => editarRecado(botaoEditarRecado, inputTitulo, inputRecado, novoRecado.id));
    botaoDeletarRecado.addEventListener('click', () => apagarRecado(novoRecado.id));
};

function editarRecado(botaoEditarRecado, inputTitulo, inputRecado, id) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    if (botaoEditarRecado.innerText.toLocaleLowerCase() == "editar") {
        inputRecado.removeAttribute("readonly");
        inputRecado.focus();
        inputTitulo.removeAttribute("readonly");
        inputTitulo.focus();
        botaoEditarRecado.innerText = "SALVAR";
    } else {
        inputRecado.setAttribute("readonly", "readonly");
        inputTitulo.setAttribute("readonly", "readonly");
        botaoEditarRecado.innerText = "EDITAR";
        let novoInput = inputRecado.value;
        let novoTitulo = inputTitulo.value;
        user.recados[recadoEspecifico].detalhamento = novoInput;
        user.recados[recadoEspecifico].titulo = novoTitulo;
        atualizarDadosUsuario(user);
    }
}

function apagarRecado(id) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    let linhaRecado = document.getElementById(id);

    let confirma = confirm(`Você deseja apagar este recado?`);

    if (confirma) {
        linhaRecado.remove();
        user.recados.splice(recadoEspecifico, 1);
        atualizarDadosUsuario(user);
    } else {
        return
    }
}



