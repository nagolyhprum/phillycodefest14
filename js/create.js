(function(){
	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.removeAllChildren();
			gameState = MAIN;
			drawButton(25,25,25,100,GAME, "Start");
			drawButton(25,75,25,100,FOOD, "Food");
			drawButton(25,125,25,100,HELP, "Help");

			
			var text = new createjs.Text("MAIN");
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
			stage.update();
		};
		
		MAIN.update = function(){
		
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
				MAIN.init();
			});
			stage.addChild(circle);
			
			var text = new createjs.Text("GAME");
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
		};
		
		GAME.update = function(){
			
		};
		
	}());
	
	var FOOD = window.FOOD || {};
	
	(function(){
		FOOD.init = function(){
			stage.removeAllChildren();
			gameState = FOOD;
			
			circle = new createjs.Shape();
			circle.graphics.beginFill("red").drawCircle(0, 100, 100);
			circle.x = circle.y = 50;
			circle.addEventListener("click", function(event) {
				MAIN.init();
			});
			stage.addChild(circle);
			
			var text = new createjs.Text("FOOD");
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
		};
		
		FOOD.update = function(){
			
		};
		
	}());
	
	var HELP = window.HELP || {};
	
	(function(){
		HELP.init = function(){
			stage.removeAllChildren();
			gameState = HELP;
			
			circle = new createjs.Shape();
			circle.graphics.beginFill("red").drawCircle(0, 100, 100);
			circle.x = circle.y = 50;
			circle.addEventListener("click", function(event) {
				MAIN.init();
			});
			stage.addChild(circle);
			
			var text = new createjs.Text("HELP");
			text.x = 20;
			text.y = 20;
			stage.addChild(text);
		};
		
		HELP.update = function(){
			
		};
		
	}());
	
	var gameState;
    var stage = new createjs.Stage("stage");
	var padding = 50;
	var buttonWidth = 100;
	
	function drawButton(x,y,height,width,library, text){
		var g = new createjs.Graphics(); g.setStrokeStyle(1); g.beginStroke(createjs.Graphics.getRGB(0,0,0)); g.beginFill(createjs.Graphics.getRGB(255,0,0)); g.drawRoundRect(0,0,width,height,5);
		var button = new createjs.Shape(g);
		button.x = x;
		button.y = y;
		var text = new createjs.Text(text, "10px Arial", "black");
		text.textBaseline = "middle";
		text.textAlign = "center";
		text.x = x+width/2;
		text.y = y+height/2;
		button.addEventListener("click", function(event) {
				library.init();
		});
		stage.addChild(button);
		stage.addChild(text);
	}
	
	MAIN.init();
	
	createjs.Ticker.addEventListener("tick", function(){
		gameState.update();
		stage.update();
	});
	
	stage.addEventListener("click", function(event) {
		gameState.click();
	});
}());

