/* CRIAÇÃO DO CANVAS */
var canva = document.createElement("canvas");
var ctx = canva.getContext("2d");

document.body.appendChild(canva);
canva.width = window.innerWidth;
canva.height = window.innerHeight;
/* VARIAVEIS DE JOGO */
var frames = 0;


var estado = new Estado();
var jogador = new Nave(100,100,"arquivos/imagens/NAVE/","nave 1");
var CPU = new Array();

var ambiente = new Fase("arquivos/imagens/DESERTO P1.png", 2000, 15000);



/* FUNÇÕES */
(function loop(){
	requestAnimationFrame(loop,canva);
	
	update();
	draw();

	frames++;
})();


function update(){
	if(estado.jogando && estado.pause == false){
		jogador.update();
		ambiente.update();
		if(frames %100 == 1 && CPU.length<5){
			CPU.push(new NaveOp(Math.floor(Math.random()*canva.width),-200,"arquivos/imagens/INIMIGOS/",0,"INIMIGO R 1"));
		}
		for(var i in CPU){
			CPU[i].update();
			CPU[i].fire = false;
		}
		colideTiroOp(CPU,jogador.tiros);
	}
};

function draw(){
	if(estado.jogando == true){
		ctx.fillStyle = "green"
		ctx.fillRect(0,0,canva.width,canva.height);
		ambiente.draw();
		jogador.draw();
		for(var i in CPU){
			CPU[i].draw();
		}

	}
};