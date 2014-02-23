(function(){
	var User = {};
	
	DB.createUser(70, 130, UTILS.man, 22, function(user) {
		if(user.result === true) {
			alert("Thank you for creating your new account.");
		} else if(user.result === false) {
			alert("Thank you for reusing your account.");
		} else if(user.result === null){			
			alert("Uh oh, could not create an account.");
		}
		User = user;
	});

	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.removeAllChildren();
			gameState = MAIN;
			var height = 50;
			var width = stage.canvas.width-UTILS.padding*2;
			drawButton(
				UTILS.padding,
				stage.canvas.height / 2 - height * 1.5 - UTILS.padding * 2, 
				height, 
				width, 
				GAME, 
				"Start"
			);
			drawButton(UTILS.padding,stage.canvas.height/2-height/2,height,width,FOOD, "Food");
			drawButton(UTILS.padding,stage.canvas.height/2+height/2+UTILS.padding*2,height,width,HELP, "Help");
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
			GAME.bars = {};
			GAME.board = [];
			GAME.calories = 0;
			GAME.grain = 0;
			GAME.protein = 0;
			GAME.vegetable = 0;
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
				GAME.addStatistics();
			});
		};
		
		GAME.meals = [
			"Breakfast",
			"Lunch",
			"Snack",
			"Dinner",
			"Desert"
		];
		
		GAME.updateStatistics = function() {
			GAME.txtCalories.text = "Cal. : " + GAME.calories + " / " + UTILS.getCaloricIntake(User.height, User.weight, User.gender, User.age);
			GAME.txtDay.text = "Day : " + GAME.day + " / " + 28;
			GAME.txtMeal.text = "Meal : " + GAME.meals[GAME.meal];
			var ty = stage.canvas.height - UTILS.padding - UTILS.offset,
				total = GAME.grain + GAME.vegetable + GAME.fruit + GAME.junk + GAME.protein + GAME.dairy,
				y = ty - UTILS.barheight - 12;
			for(var group in GAME.foods) {			
				var value = GAME[group.toLowerCase()];
				if(value) {
					GAME.bars[group].scaleY = value / total;
				} else {
					GAME.bars[group].scaleY = 0.01;
				}				
				GAME.bars[group].y = y + (1 - GAME.bars[group].scaleY) * UTILS.barheight;
			}
		};
		
		GAME.addStatistics = function() {	
			//shopping cart
			var x = UTILS.padding * 2 + 8 * UTILS.imagesize;
			var y = UTILS.padding;
			var width = stage.canvas.width-x-UTILS.padding;
			var height = UTILS.imagesize * 8;
			stage.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, width, height)));
			for(var i = 0; i < GAME.foodForTheWeek.length; i++){
				var food = GAME.foodForTheWeek[i];
				var image = new createjs.Bitmap("images/" + food.image);
				var row = Math.floor(i / 2),
					col = i % 2;
				image.scaleY = UTILS.scale;
				image.scaleX = UTILS.scale;
				image.x = UTILS.offset + UTILS.offset * col + x + UTILS.imagesize * UTILS.scale * col;
				image.y = UTILS.offset + UTILS.offset * row + y + UTILS.imagesize * UTILS.scale * row;
				stage.addChild(image);
			}									
			//AVATAR
			y = (UTILS.imagesize * UTILS.scale * 3) + (UTILS.offset * 6);
			width = stage.canvas.width - x - UTILS.padding - UTILS.offset * 2;
			height = width;
			//GENERATE THE IMAGE
			var image = new createjs.Bitmap("images/avatar.png");
			image.x = x + UTILS.offset;
			image.y = y;
			stage.addChild(image);			
			//BARS
			var i = 0, bar_width = 5;			
			for(var group in GAME.foods) {
				var tx = x + UTILS.offset / 2 * i + UTILS.offset + 2,
					ty = stage.canvas.height - UTILS.padding - UTILS.offset;
				var text = new createjs.Text(group[0]);
				text.x = tx;
				text.y = ty;
				text.textBaseline = "bottom";				
				stage.addChild(text);
				stage.addChild(GAME.bars[group] = new createjs.Shape(new createjs.Graphics().ss(1).s("#000").f("#f00").r(tx + 1, 0, bar_width, UTILS.barheight)));
				i++;
			}			
			//TEXT STATS
			//CALORIES
			var txtCalories = GAME.txtCalories = new createjs.Text("Cal. : x / y");
			txtCalories.x = x + UTILS.offset;
			txtCalories.y = y + height;
			txtCalories.textBaseline = "top";
			stage.addChild(txtCalories);
			//DAY
			var txtDay = GAME.txtDay = new createjs.Text("Day : x / y");
			txtDay.x = x + UTILS.offset;
			txtDay.y = y + height + 12;
			txtDay.textBaseline = "top";
			stage.addChild(txtDay);
			//MEAL
			var txtMeal = GAME.txtMeal = new createjs.Text("Meal : Breakfast");
			txtMeal.x = x + UTILS.offset;
			txtMeal.y = y + height + 24;
			txtMeal.textBaseline = "top";
			stage.addChild(txtMeal);
			GAME.updateStatistics();
		};
		
		GAME.checkPoint = function(col, row){
			var rv = {};
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
		};
		
		GAME.moveChecker = function(){
			var matching = [];
			for (var i = 0; i < GAME.board.length; i++){
				for(var j = 0; j < GAME.board[i].length; j++){
					matching.push(checkPoint(GAME.board[i][j]));
				}
			}
				
			return matching;
		};
		
		GAME.generateGamePiece = function() {
			return GAME.foodForTheWeek[UTILS.next(GAME.foodForTheWeek.length)];
		};
		
		GAME.populateBoard = function() {
			var size = 47;
			for(var rows = 0; rows < 8; rows++) {
				GAME.board[rows] = [];
				for(var columns = 0; columns < 8; columns++) {
					var x = columns * size + UTILS.padding, y = rows * size + UTILS.padding;
					var food = GAME.generateGamePiece();
					var image = new createjs.Bitmap("images/" + food.image);
					image.addEventListener("click", GAME.switchPiece);
					image.x = x
					image.y = y;
					image.data = {
						column : columns,
						row : rows
					};
					GAME.board[rows][columns] = {
						image : image,
						food : food,
						data : image.data
					};
					stage.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, size, size)));
					stage.addChild(image);
				}
			}		
		};
		
		GAME.moveChecker = function() {
			return [];
		};
		
		GAME.update = function(){
		};
		
		GAME.selectedPiece = false;
		
		GAME.processing = false;
		
		GAME.bars = {};
		
		GAME.switchPiece = function(e) {			
			if(!GAME.processing) {
				var d1 = e.target.data;
				var clicked = GAME.board[d1.row][d1.column];
				var original = GAME.selectedPiece;
				if(original) {
					var d2 = original.data;
					if(Math.abs(d1.column - d2.column) + Math.abs(d1.row - d2.row) == 1) {
						console.log("SWAPPING");
						var synch = UTILS.synch(2, function() {
							UTILS.swap(original.data, clicked.data);
							GAME.board[original.data.row][original.data.column] = original;
							GAME.board[clicked.data.row][clicked.data.column] = clicked;
							var toBreak = GAME.moveChecker();
							if(toBreak.length) {
								while(toBreak.length) {
									GAME.doBreak(toBreak);
									toBreak = GAME.moveChecker();
								}
								GAME.processing = false;
							} else {
								var synch = UTILS.synch(2, function() {
									GAME.processing = false;
								});
								//swap in the array
								UTILS.swap(original.data, clicked.data);
								GAME.board[original.data.row][original.data.column] = original;
								GAME.board[clicked.data.row][clicked.data.column] = clicked;
								GAME.move(clicked, clicked.image.x, clicked.image.y, original.image.x, original.image.y, synch);
								GAME.move(original, original.image.x, original.image.y, clicked.image.x, clicked.image.y, synch);								
							}
						});
						GAME.processing = true;
						GAME.move(clicked, clicked.image.x, clicked.image.y, original.image.x, original.image.y, synch);
						GAME.move(original, original.image.x, original.image.y, clicked.image.x, clicked.image.y, synch);
						GAME.selectedPiece = false;
					} else {
						GAME.selectedPiece = clicked;
					}
				} else {
					GAME.selectedPiece = clicked;
				}
			}
		};

		GAME.move = function(obj, x1, y1, x2, y2, complete) {
			var pos = {x : x1, y : y1};
			var action = createjs.Tween.get(pos);
			action.to({x : x2, y : y2}, 1000);
			action.on("change", function() {
				obj.image.x = Math.floor(pos.x);
				obj.image.y = Math.floor(pos.y);
			});
			action.call(function() {
				complete && complete();
			});
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
	DB.createDay(GAME.calories, GAME.grain, GAME.protien, GAME.vegetable, GAME.fruit, GAME.junk, GAME.dairy, function(bool) {
		if(bool) {
			alert("The game is over");
		}
	});
});
stage.addChild(circle);	
//End Day Add		
*/