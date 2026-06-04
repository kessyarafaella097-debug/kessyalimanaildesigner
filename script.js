function agendar(){

let nome = document.getElementById("nome").value;
let telefone = document.getElementById("telefone").value;
let servico = document.getElementById("servico").value;
let data = document.getElementById("data").value;
let horario = document.getElementById("horario").value;

let mensagem =
`Olá, Kessya!

Gostaria de agendar um horário.

Nome: ${nome}
Telefone: ${telefone}
Procedimento: ${servico}
Data: ${data}
Horário: ${horario}`;

let numero = "5583991740417";

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
);

}
