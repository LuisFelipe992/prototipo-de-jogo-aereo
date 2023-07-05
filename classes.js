// CLASSE BASE NAVE
class Nave{
	constructor(x,y,src,imgN){
		this.x = x;
		this.y = y;
		this.larg = 100;
		this.alt = 100;
		this.vida = 100;

		this.e = false;
		this.c = false;
		this.d = false;
		this.b = false;
		this.fire = true;
		this.tiros = new Array();
		this.vel = 4;

		this.porcento = 25;

		this.img = new Image();
		this.imgNave = imgN;
		this.img.src = src + this.imgNave+"-1.png";
		this.src = src;
		this.indice=1;
	}
	update(){
		this.anima();
		this.move();
		this.fogo();
		this.colisaoComCpu(CPU);
		for(var i in this.tiros){
			this.tiros[i].update();
			if(this.tiros[i].y <= 0 || this.tiros[i].colidiu){
				this.tiros.splice(i,1);
			}
		}
	}
	draw(){
		// ctx.fillStyle = "green";
		// ctx.fillRect(this.x,this.y,this.larg,this.alt);
		ctx.drawImage(this.img, this.x, this.y, this.larg, this.alt);
		this.drawFogo();
		
	}
	anima(){
		if(frames%5==1){
			if(this.indice<3){
				this.indice++;
			}else{
				this.indice=1;
			}
			this.img.src= this.src+this.imgNave+"-"+this.indice+".png";
		}
	}
	move(){
		if(this.e && this.x>0){
			this.d = false;
			this.x-= this.vel;

		}if(this.c && this.y>0){
			this.b = false;
			this.y-= this.vel;

		}if(this.d && this.x+this.larg<canva.width){
			this.e = false;
			this.x+= this.vel;

		}if(this.b && this.y+this.alt<canva.height){
			this.c = false;
			this.y+= this.vel;

		}
	}
	fogo(){
		if(this.fire && frames%this.porcento == 0){
			 // this.tiros.push(new Tiro(this.x+20,this.y,true,100/6));
			 // this.tiros.push(new Tiro(this.x + this.larg-20,this.y,true,100/6));
			 this.tiros.push(new Tiro(this.x+this.larg/2,this.y,true,100/6));
		}
	}
	drawFogo(){
		for(var i in this.tiros){
			this.tiros[i].draw();
		}
	}
	
	colisaoComCpu(cpu){
		for(var i in cpu){
			if(cpu[i].tipo == 0){
				if(cpu[i].y+cpu[i].alt>this.y && cpu[i].y<this.y+this.alt  &&  cpu[i].x< this.x+this.larg && cpu[i].x+cpu[i].larg>this.x){
					if(frames%50==1 && this.vida>0){
						this.vida-=cpu[i].dano
						
					}
				}
			}
		}
	}
}


// OPONENTES




class NaveOp{
	constructor(x,y,src,tipo,imgN){
		this.x = x;
		this.y = y;
		this.larg = 100;
		this.alt = 100;
		this.tipo = tipo;
		this.vida = 100;
		this.perda = 100;
		this.atingido = false;
		this.multHp = 1;
		this.dano = 100/8;
		this.e = false;
		this.c = false;
		this.d = false;
		this.b = false;
		this.fire = false;
		this.tiros = new Array();
		this.vel = 1;

		this.porcento = 25;

		this.img = new Image();
		this.imgNave = imgN;
		this.img.src = src + this.imgNave+"-1.png";
		this.src = src;
		this.indice=1;
	}
	update(){
		this.anima();
		this.move();
		this.fogo();
		if(this.tipo == 0){
			this.interageComPlayer();
		}
		for(var i in this.tiros){
			this.tiros[i].update();
			if(this.tiros[i].y <= 0 || this.tiros[i].colidiu){
				this.tiros.splice(i,1);
			}
		}
	}
	draw(){
		// ctx.fillStyle = "green";
		// ctx.fillRect(this.x,this.y,this.larg,this.alt);
		ctx.drawImage(this.img, this.x, this.y, this.larg, this.alt);
		this.drawFogo();
	}
	anima(){
		if(frames%2==1){
			if(this.indice<3){
				this.indice++;
			}else{
				this.indice=1;
			}
			this.img.src= this.src+this.imgNave+"-"+this.indice+".png";
		}
	}
	move(){
		if(this.e && this.x>0){
			this.d = false;
			this.x-= this.vel;

		}if(this.c && this.y>0){
			this.b = false;
			this.y-= this.vel;

		}if(this.d && this.x+this.larg<canva.width){
			this.e = false;
			this.x+= this.vel;

		}if(this.b && this.y+this.alt<canva.height){
			this.c = false;
			this.y+= this.vel;

		}
	}
	fogo(){
		if(this.fire && frames%this.porcento == 0){
			this.tiros.push(new Tiro(this.x+20,this.y,true));
			this.tiros.push(new Tiro(this.x + this.larg-20,this.y,true));
		}
	}
	drawFogo(){
		for(var i in this.tiros){
			this.tiros[i].draw();
		}
	}
	interageComPlayer(){
		if(jogador.x> this.x+this.larg){
			this.d = true;
			this.e = false;
		}else if(jogador.x< this.x-this.larg){
			this.e = true;
			this.d = false;
		}
		if(jogador.y> this.y+this.alt/2){
			this.b = true;
			this.c = false;
		}else if(jogador.y< this.y){
			this.c = true;
			this.v = false;
		}
	}
	colideOp(){
		
	}
	
}
/* ESTADO DE JOGO */

class Estado{
	constructor(){
		this.cena = false;
		this.menu = false;
		this.configuracoes = false;
		this.jogando = true;
		this.modoJogando ={
			historia : false,
			sobrevivencia : false
		};

		this.pause = false;
		this.fim = false;
	}
	update(){

	}
	draw(){

	}
	drawMenu(){

	}
}

/* BACKGROUND DAS FASES*/

class Fase{
	constructor(caminho = String, largura, altura){
		this.img = new Image();
		this.img.src = caminho;
		this.x =0;
		this.y =-15000+canva.height;
		this.larg = largura;
		this.alt  = altura;
		this.vel = 5/4; 
		this.perdaJ = 100;
		this.multHp = 2;
	}
	update(){
		this.y+=this.vel;
		if(this.y>= -80 && this.vel>0){
			this.vel -= 0.009;
		}if(this.vel<0){
			this.vel = 0;
		}
	}
	draw(){
		ctx.drawImage(this.img,this.x,this.y, canva.width, this.alt);
		this.drawVida("green",false);
		this.drawVidaCPU("yellow",CPU)
		
	}
	drawVida(cor, cpu= Boolean){
		
		ctx.fillStyle = "white";
		ctx.fillRect(50,50,100*this.multHp,30);
		if(this.perdaJ>jogador.vida){
			this.perdaJ-=0.5;
		}
		ctx.fillStyle = "red";
		ctx.fillRect(50,50,this.perdaJ*this.multHp,30);
		ctx.fillStyle = cor;
		ctx.fillRect(50,50,jogador.vida*this.multHp,30);

	}
	drawVidaCPU(cor,obj){
		for(var i=0; i< obj.length; i++){
				ctx.fillStyle = "white";
				ctx.fillRect(obj[i].x,obj[i].y,100*obj[i].multHp,10);
				if(obj[i].perda>obj[i].vida){
					obj[i].perda-=1;
				}
				ctx.fillStyle = "red";
				ctx.fillRect(obj[i].x,obj[i].y,obj[i].perda*obj[i].multHp,10);
				ctx.fillStyle = cor;
				ctx.fillRect(obj[i].x,obj[i].y,obj[i].vida*obj[i].multHp,10);
			}
	}
}


/* TIRO */
function colideTiroOp(op,tiro){
	for(var o in op){
		for(var t in tiro){
			if(tiro[t].y<op[o].y+op[o].alt && tiro[t].y+tiro[t].alt>op[o].y  &&  tiro[t].x+tiro[t].larg>op[o].x && tiro[t].x<op[o].x+op[o].larg){
				op[o].vida-=tiro[t].dano;
				tiro.splice(t,1);
				op[0].atingido = true;
				if(op[o].vida<=0){
					op.splice(o,1);
				}
					
			}
		}
	}
}

class Tiro{
	constructor(x,y, jogador = Boolean,dano,src,tiro=String){
		this.x = x;
		this.y = y;
		this.larg = 30;
		this.alt = 30;
		this.cor = "red";
		this.vel = 10;
		this.colidiu = false;
		this.jogador = jogador;// se falso: é disparo de CPU
		this.d;
		this.dano = dano

		this.img= new Image();
		this.src = src;
		this.imgTiro = tiro;
		this.indice=1;

		//this.img.src = this.src+this.imgTiro+this.indice+".png";
		this.img.src="arquivos/imagens/TIROS/tiro nave F1.png";

		this.x-=15;
	}
	update(){
		if(this.colidiu == false && this.y> 0 && this.jogador){
			this.y-= this.vel;
			
		}	
	}
	draw(){
		ctx.fillStyle = this.cor;
		//ctx.fillRect(this.x, this.y, this.larg, this.alt);
		ctx.drawImage(this.img,this.x,this.y,this.larg,this.alt);
	}

}


// CLASSE FILHO OPONENTES//

class Oponente extends Nave{
	
}