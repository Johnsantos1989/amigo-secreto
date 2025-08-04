// 🎯 Lista de amigos
const lista = [];

// 🎯 Elementos da interface
const campoInput = document.getElementById('amigo');
const listaVisual = document.getElementById('listaAmigos');
const resultadoVisual = document.getElementById('resultado');

// 🔊 Fala uma mensagem com a voz do navegador
function falar(mensagem) {
  const fala = new SpeechSynthesisUtterance(mensagem);
  fala.lang = 'pt-BR';
  window.speechSynthesis.speak(fala);
}

// ➕ Adiciona amigo com validação e fala o nome
function adicionarAmigo() {
  const nome = campoInput.value.trim();
  if (nome === "") {
    alert("Por favor, insira um nome válido!");
    return;
  }

  if (lista.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    campoInput.value = "";
    campoInput.focus();
    return;
  }

  lista.push(nome);
  atualizarLista();
  campoInput.value = "";
  campoInput.focus();

  falar(`Nome adicionado: ${nome}`);
}

// 🔃 Atualiza lista na tela
function atualizarLista() {
  listaVisual.innerHTML = "";
  lista.forEach((nome) => {
    const item = document.createElement("li");
    item.textContent = nome;
    listaVisual.appendChild(item);
  });
}

// 🎲 Sorteia e anuncia o nome com suspense
function sortearAmigo() {
  if (lista.length === 0) {
    alert("Adicione pelo menos um nome antes de sortear!");
    return;
  }

  let contador = 0;
  const tempoTotal = 2000;
  const intervalo = 100;

  const animacao = setInterval(() => {
    const nomeAleatorio = lista[Math.floor(Math.random() * lista.length)];
    resultadoVisual.innerHTML = `<li>🎲 Sorteando... <strong>${nomeAleatorio}</strong></li>`;
    contador += intervalo;

    if (contador >= tempoTotal) {
      clearInterval(animacao);
      const sorteado = lista[Math.floor(Math.random() * lista.length)];
      resultadoVisual.innerHTML = `<li>🎉 Amigo Secreto sorteado: <strong>${sorteado}</strong></li>`;
      falar(`Amigo secreto sorteado: ${sorteado}`);
    }
  }, intervalo);
}

// 🔄 Reinicia o sorteio e limpa tudo
function reiniciarSorteio() {
  lista.length = 0;
  listaVisual.innerHTML = "";
  resultadoVisual.innerHTML = "";
  campoInput.value = "";
  falar("Lista reiniciada! Pronto para começar um novo sorteio.");
}
