(function(){
	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.removeAllChildren();
			gameState = MAIN;
			var height = 50;
			var width = stage.canvas.width-padding*2;
			drawButton(
				padding,
				stage.canvas.height / 2 - height * 1.5 - padding * 2, 
				height, 
				width, 
				GAME, 
				"Start"
			);
			drawButton(padding,stage.canvas.height/2-height/2,height,width,FOOD, "Food");
			drawButton(padding,stage.canvas.height/2+height/2+padding*2,height,width,HELP, "Help");
		};
		
		MAIN.update = function(){
		
		};

	}());
	
	var GAME = window.GAME || {};
	
	(function(){
		GAME.day = -1;
		GAME.init = function(){
			GAME.calories = 0;
			GAME.grains = 0;
			GAME.protien = 0;
			GAME.vegtables = 0;
			GAME.fruit = 0;
			GAME.junk = 0;
			GAME.dairy = 0;
			
			DB.createGame(function(day) {
				GAME.day = day;
				stage.removeAllChildren();
				gameState = GAME;		

				//Begin Day Add
				circle = new createjs.Shape();
				circle.graphics.beginFill("red").drawCircle(100, 100, 25);
				circle.x = circle.y = 50;
				circle.addEventListener("click", function(event) {
					DB.createDay(GAME.calories, GAME.grains, GAME.protien, GAME.vegtables, GAME.fruit, GAME.junk, GAME.dairy);
				});
				stage.addChild(circle);	
				//End Day Add
				
				var text = new createjs.Text("GAME");
				text.x = 20;
				text.y = 20;
				stage.addChild(text);
				//add clickable that ends the day and submits random results
			});
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
		var text = new createjs.Text(text, (height/2) + "px Arial" , "black");
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
}());

