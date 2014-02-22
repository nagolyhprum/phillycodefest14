(function(){
	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.clear();
			gameState = MAIN;
			var text = new createjs.Text("MAIN");
			text.addEventListener("click", function(event) {
				GAME.init;
			});
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
		};
		
		MAIN.update = function(){
		
		};
		
		MAIN.click = function(){
			gameState = GAME;
		};
	}());
	
	var GAME = window.GAME || {};
	
	(function(){
		GAME.init = function(){
			stage.clear();
			gameState = GAME;
			var text = new createjs.Text("GAME");
			text.addEventListener("click", function(event) {
				MAIN.init;
			});
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
		};
		
		GAME.update = function(){
			
		};
		
		GAME.click = function(){
			gameState = MAIN;
		};
	}());
	
	var gameState;
    var stage = new createjs.Stage("stage");
	MAIN.init();
	createjs.Ticker.addEventListener("tick", function(){
		gameState.update();
		stage.update();
	});
	
	stage.addEventListener("click", function(event) {
		gameState.click();
	});
}());

