const irPraCadastro = document.getElementById('ir_Cadastro');

irPraCadastro.addEventListener('click', trocaCard);

const voltarLogin = document.getElementById('voltar_Login');

voltarLogin.addEventListener('click', trocaCard);

// function troca o card de login e cadastro (james)

function trocaCard(cor, msg) {

    let login = document.getElementById('login');
    let cadastro = document.getElementById('cadastro');

    if (login.style.display === 'block') {
        login.style.display = 'none';
        cadastro.style.display = 'block';
    } else {
        cadastro.style.display = 'none';
        login.style.display = 'block';
    }
}


let logado = sessionStorage.getItem('logado');
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
let formularioCadastro = document.getElementById('form');

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado() {
        if (logado) {
            window.location.href = "home.html";
            return;
        }
    }
})

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let usuario = document.getElementById('valorUsuario').value;
    let email = document.getElementById('valorEmail').value;
    let senha = document.getElementById('valorSenha').value;
    let senha2 = document.getElementById('valorSenha2').value;

    if (senha != senha2) {
        alert('Senhas não coincidem');
        return;
    }

    const user = {
        username: usuario,
        email: email,
        password: senha,
        recados: []
    }

    console.log(user);

    let existe = listaUsuarios.some((valor) => valor.email === email)

    if (existe) {
        alert('E-mail já cadastrado!');
        return
    }

    listaUsuarios.push(user);
    salvarDadosStorage(listaUsuarios);

    window.location.href = "index.html";
});

function salvarDadosStorage(listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
};

let botaoLogin = document.getElementById('btn-login');

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado() {
        if (logado) {
            salvarSessao(logado);
            window.location.href = "home.html";
        }
    }
})

botaoLogin.addEventListener('click', () => {
    verificarLogin();
})

function verificarLogin() {
    let emailHTML = document.getElementById('usuario');
    let senhaHTML = document.getElementById('senha');

    let user = listaUsuarios.find(
        (valor) => valor.email === emailHTML.value && valor.password === senhaHTML.value);

    if (!user) {
        alert('E-mail ou Senha inválidos.');
        return;
    }

    salvarSessao(emailHTML.value);
    window.location.href = "home.html";
}

function salvarSessao(data) {
    JSON.stringify(sessionStorage.setItem("logado", data));
}

