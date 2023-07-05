/* NO PC */
var controlePc = {
	e:65 ,//A
	c:87 ,//W
	d:68 ,// D
	b:83 ,// B
	fire:74 ,
	pause:0 
}
window.addEventListener("keydown",(evt)=>{
	var tecla = evt.keyCode;
	console.log(tecla);
	switch(tecla){
		case controlePc.e:
			jogador.e = true;
			break;
		case controlePc.c:
			jogador.c = true;
			break;
		case controlePc.d:
			jogador.d = true;
			break;
		case controlePc.b:
			jogador.b = true;
			break;
		case 32:
			jogador.porcento = 5;
			break;
		

	}
},false);

window.addEventListener("keyup",(evt)=>{
	var tecla = evt.keyCode;
	console.log(tecla);
	switch(tecla){
		case controlePc.e:
			jogador.e = false;
			break;
		case controlePc.c:
			jogador.c = false;
			break;
		case controlePc.d:
			jogador.d = false;
			break;
		case controlePc.b:
			jogador.b = false;
			break;
		case controlePc.fire:
			jogador.fire = true;
			break;
		case 32:
			jogador.porcento = 25;
			break;
	}
},false);