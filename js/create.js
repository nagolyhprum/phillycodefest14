(function(){
	DB.createUser(10, 20, 30, 40, function(bool) {
		if(bool[0] === true) {
			alert("Thank you for creating your new account.");
		} else if(bool[0] === false) {
			alert("Thank you for reusing your account.");
		} else if(bool[0] === null){			
			alert("Uh oh, could not create an account.");
		}
	});

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
	
	GAME.day = -1;
	
	DB.getFoods(function(f) {
		GAME.foods = f;
	});
	
	GAME.shopping = function(){
		var shoppingcart = [];
		for(var key in GAME.foods){
			var value = GAME.foods[key];
			shoppingcart.push(value[UTILS.next(value.length)]);
		}
		return shoppingcart;
	};	
	
	(function(){	
		GAME.init = function() {
			GAME.board = [];
			GAME.calories = 0;
			GAME.grains = 0;
			GAME.protien = 0;
			GAME.vegetables = 0;
			GAME.fruit = 0;
			GAME.junk = 0;
			GAME.dairy = 0;			
			GAME.meal = 0;
			GAME.foodForTheWeek = GAME.shopping();
			DB.createGame(4, function(day) {				
				GAME.day = day;
				stage.removeAllChildren();
				gameState = GAME;		
				GAME.populateBoard();
				GAME.populateList();
			});
		};
		
		GAME.checkPoint(col, row){
			rv = {};
			var og = GAME[col][row].name;
			if(((col+2) < GAME.length) &&(og == GAME[col+1][row].name == GAME[col+2][row].name)){
				rv.north = [[col,row], [col+1,row],[col+2,row]]
			}
			if(((col-2) >= 0) &&(og == GAME[col-1][row].name == GAME[col-2][row].name)){
				rv.south = [[col,row], [col-1,row],[col,row]];
			}
			if(((row+2) < GAME[col].length) && (og == GAME[col][row+1].name == GAME[col][row+2].name)){
				rv.east = [[col,row], [col,row+1],[col,row+2]];
			}
			if(((row-2) >= 0) && (og == GAME[col][row-1].name == GAME[col][row-2].name)){
				rv.west = [[col,row], [col,row-1],[col,row-2]];
			}
			return rv;
		}
		
		GAME.moveChecker(){
			var matching = [];
			for (int i = 0; i < GAME.board.length; i++){
				for(int j = 0; j < GAME.board[j].length; j++){
					matching.push(checkPoint(GAME.board[i][j]));
				}
			}
				
			return matching;
		}
		
		
		GAME.populateList = function() {
			
			var x = 50*2 * 8 * UTILS.padding;
			var y = 50;
			var width = stage.canvas.width-x-padding;
			var height = UTILS.padding * 5;
			var list = [];
			stage.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, width, height)));

			for(var i = 0; i < foodForTheWeek.length; i++){
				var food = GAME.foodForTheWeek[i];
				var scale = (stage.canvas.width-x-padding)/foodForTheWeek.length;
				var image = new createjs.Bitmap("images/" + food.image);
				image.scaleY = scale;
				image.scaleX = scale;
				image.x = x + (i)*scale;
				image.y = y;
				list.push(image);
				stage.addChild(image);
			}
				
			
		};
		
		GAME.populateBoard = function() {
			var size = 47;
			for(var rows = 0; rows < 8; rows++) {
				GAME.board[rows] = [];
				for(var columns = 0; columns < 8; columns++) {
					var x = columns * size + UTILS.padding, y = rows * size + UTILS.padding;
					var food = GAME.foodForTheWeek[UTILS.next(GAME.foodForTheWeek.length)];
					var image = new createjs.Bitmap("images/" + food.image);
					image.x = x
					image.y = y;
					GAME.board[rows][columns] = {
						image : image,
						food : food
					};
					stage.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, size, size)));
					stage.addChild(image);
				}
			}		
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

/*
//Begin Day Add
circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(100, 100, 25);
circle.x = circle.y = 50;
circle.addEventListener("click", function(event) {
	DB.createDay(GAME.calories, GAME.grains, GAME.protien, GAME.vegetables, GAME.fruit, GAME.junk, GAME.dairy, function(bool) {
		if(bool) {
			alert("The game is over");
		}
	});
});
stage.addChild(circle);	
//End Day Add		
*/