
var cardNames = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];
var j = 0;
/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.cards = [];
	this.cardsUp = [];
	this._cardsUp = 0;
	this.message = "Memory Game";
	this.finished = false;
	this._gs = gs;
	

	this.initGame = function() {

		for (var i = 0; i < 16; i++) {
			this.cards[i] = new MemoryGameCard(cardNames[i%8]);
		}
		this.cards = this.cards.sort(function() {return Math.random() - 0.5});
		this.message = "Memory Game";
		this.loop();

	}

	this.draw = function(that){
		this.cards.length

		for (var i = 0; i < that.cards.length; i++)
		{
			that.cards[i].draw(that._gs, i);
		}

		that._gs.drawMessage(that.message);
	}



	this.loop = function(){
		var self = this;
		var intervalId = setInterval(function(){self.draw(self);}, 16);
	}

	this.onClick = function(cardID){
		
			if((this.cardsUp.indexOf(cardID) < 0) && (this.cards[cardID].getStat() != "found"))
			{
				if (this.cards[cardID].getStat() != "up") {
					this.cardsUp.push(cardID);
					this.cards[cardID].flip();
				if (this.cardsUp.length == 2)
				{
					var card1 = this.cards[this.cardsUp.pop()];
					var card2 = this.cards[this.cardsUp.pop()];
					if (card1.compareTo(card2))
					{
						this.message = "Match found!!"
						card1.found();
						card2.found();
						this._cardsUp += 2;
					}
					else {
						this.message = "Try again"
						setTimeout(function(){card1.flip();card2.flip();}, 600);
					}
				}
				}			
			}
			if(this._cardsUp == 16) {this.message = "You win!!";}
	}
};

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

	this.nombre = id;
	this.stat = "down";
	
	this.flip = function(){

		switch(this.stat){
			case "down" :
				this.stat = "up";
				break;
			case "up" :
				this.stat = "down";
				break;
			
		}
	}

	this.found = function(){

		this.stat = "found";
	}

	this.compareTo = function(otherCard){

		return (this.nombre == otherCard.nombre);
	}

	this.draw = function(gs, pos){

		if (this.stat == "down"){

			gs.draw("back", pos);
		}
		else{

			gs.draw(this.nombre, pos);
		}
	}
	this.getStat = function(){
		return this.stat;
	}
};
