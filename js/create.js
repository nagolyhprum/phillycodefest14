(function(){
	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.removeAllChildren();
			gameState = MAIN;
			
			circle = new createjs.Shape();
			circle.graphics.beginFill("blue").drawCircle(0, 100, 100);
			circle.x = circle.y = 50;
			circle.addEventListener("click", function(event) {
				gameState.click();
				gameState.init();
			});
			stage.addChild(circle);
			
			var text = new createjs.Text("MAIN");
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
			stage.removeAllChildren();
			gameState = GAME;
			
			circle = new createjs.Shape();
			circle.graphics.beginFill("red").drawCircle(0, 100, 100);
			circle.x = circle.y = 50;
			circle.addEventListener("click", function(event) {
				gameState.click();
				gameState.init();
			});
			stage.addChild(circle);
			
			var text = new createjs.Text("GAME");
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

