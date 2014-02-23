(function(){
	var User = {};	
	
	var LOGIN = window.LOGIN || {};
	
	(function() {
		var signup = $("#signup");
		LOGIN.init = function() {
			stage.removeAllChildren();
			DB.loadUser(function(user) {
				if(user.result === null) {
					var child = new createjs.DOMElement(signup[0]);
					gameState = LOGIN;
					stage.addChild(child);					
					signup.find("#action").click(function() {
						var name = signup.find("#name").val();
						var weight = signup.find("#weight").val();
						var height = signup.find("#height").val();
						var gender = signup.find("#gender").val();
						var age = signup.find("#age").val();
						DB.createUser(name, height, weight, gender, age, function(user) {
							User = user;
							signup.hide();
							MAIN.init();
						});
					});
				} else {
						User = user;
						MAIN.init();
				}
			});
		};
	}());

	var MAIN = window.MAIN || {};
	
	(function(){
		MAIN.init = function(){
			stage.removeAllChildren();
			gameState = MAIN;
			var height = 50;
			var width = stage.canvas.width-UTILS.padding*2;
			drawButton(UTILS.padding, stage.canvas.height / 2 - height * 1.5 - UTILS.padding * 2, height, width, GAME, "Start");
			drawButton(UTILS.padding,stage.canvas.height/2-height/2,height,width,FOOD, "Food");
			drawButton(UTILS.padding,stage.canvas.height/2+height/2+UTILS.padding*2,height,width,HELP, "Help");
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
			var keys = Object.keys(value);
			shoppingcart.push(value[keys[UTILS.next(keys.length)]]);
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
			DB.createGame(4, function(game) {				
				GAME.day = game.day;
				stage.removeAllChildren();
				gameState = GAME;		
				GAME.populateBoard();
				GAME.addStatistics();
				GAME.process(GAME.moveChecker(), true); //prevent inital matches
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
		
		var statistics;
		
		GAME.addStatistics = function() {	
			if(statistics) {
				stage.removeChild(statistics);
			}
			statistics = new createjs.Container();
			statistics.x = 0;
			statistics.y = 0;
			statistics.width = stage.canvas.width;
			statistics.height = stage.canvas.height;
			//shopping cart
			var x = UTILS.padding * 2 + 8 * UTILS.imagesize;
			var y = UTILS.padding;
			var width = stage.canvas.width - x - UTILS.padding;
			var height = UTILS.imagesize * 8;
			statistics.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, width, height)));
			for(var i = 0; i < GAME.foodForTheWeek.length; i++){
				var food = GAME.foodForTheWeek[i];
				var image = new createjs.Bitmap("images/" + food.image);
				var row = Math.floor(i / 2),
					col = i % 2;
				image.scaleY = UTILS.scale;
				image.scaleX = UTILS.scale;
				image.x = UTILS.offset + UTILS.offset * col + x + UTILS.imagesize * UTILS.scale * col;
				image.y = UTILS.offset + UTILS.offset * row + y + UTILS.imagesize * UTILS.scale * row;
				image.food = food;
				image.addEventListener("mouseover", function(e) {
					console.log("over");
					/*
					stage.addChild(e.target.hover = GAME.createHover(0, 0, e.target.nutrition));
					*/
				});
				image.addEventListener("mouseout", function(e) {
					console.log("out");
					/*
					stage.removeChild(e.target.hover);
					image.hover = null;
					*/
				});
				statistics.addChild(image);
			}									
			//AVATAR
			y = (UTILS.imagesize * UTILS.scale * 3) + (UTILS.offset * 6);
			width = stage.canvas.width - x - UTILS.padding - UTILS.offset * 2;
			height = width;
			//GENERATE THE IMAGE
			var image = new createjs.Bitmap("images/avatar.png");
			image.x = x + UTILS.offset;
			image.y = y;
			statistics.addChild(image);			
			//BARS
			var i = 0, bar_width = 5;			
			for(var group in GAME.foods) {
				var tx = x + UTILS.offset / 2 * i + UTILS.offset + 2,
					ty = stage.canvas.height - UTILS.padding - UTILS.offset;
				var text = new createjs.Text(group[0]);
				text.x = tx;
				text.y = ty;
				text.textBaseline = "bottom";				
				statistics.addChild(text);
				statistics.addChild(GAME.bars[group] = new createjs.Shape(new createjs.Graphics().ss(1).s("#000").f("#f00").r(tx + 1, 0, bar_width, UTILS.barheight)));
				i++;
			}			
			//TEXT STATS
			//CALORIES
			var txtCalories = GAME.txtCalories = new createjs.Text("Cal. : x / y");
			txtCalories.x = x + UTILS.offset;
			txtCalories.y = y + height;
			txtCalories.textBaseline = "top";
			statistics.addChild(txtCalories);
			//DAY
			var txtDay = GAME.txtDay = new createjs.Text("Day : x / y");
			txtDay.x = x + UTILS.offset;
			txtDay.y = y + height + 12;
			txtDay.textBaseline = "top";
			statistics.addChild(txtDay);
			//MEAL
			var txtMeal = GAME.txtMeal = new createjs.Text("Meal : Breakfast");
			txtMeal.x = x + UTILS.offset;
			txtMeal.y = y + height + 24;
			txtMeal.textBaseline = "top";
			statistics.addChild(txtMeal);
			//ADD STATISTICS
			stage.addChild(statistics);
			GAME.updateStatistics();
		};
		
		GAME.moveChecker = function(){
			var r = [];
			//check the rows
			for(var row = 0; row < 8; row++) {
				var consecutive = 1, last = GAME.board[row][0].food.foodgroupname;
				for(var col = 1; col < 8; col++) { 
					var current = GAME.board[row][col].food.foodgroupname;
					if(current == last) {
						consecutive++;
					} else {
						consecutive = 1;
					}
					last = current;
					if(consecutive >= 3) {
						r.push([{
							col : col,
							row : row
						}, {
							col : col - 1,
							row : row
						}, {
							col : col - 2,
							row : row
						}]);
					}
				}
			}			
			//check the columns
			for(var col = 0; col < 8; col++) { 
				var consecutive = 1, last = GAME.board[0][col].food.foodgroupname;
				for(var row = 1; row < 8; row++) {
					var current = GAME.board[row][col].food.foodgroupname;
					if(current == last) {
						consecutive++;
					} else {
						consecutive = 1;
					}
					last = current;
					if(consecutive >= 3) {
						r.push([{
							col : col,
							row : row
						}, {
							col : col,
							row : row - 1
						}, {
							col : col,
							row : row - 2
						}]);
					}
				}
			}
			return r;
		};
		
		GAME.doBreak = function(r, is_init) {	
			for(var i = 0; i < r.length; i++) {
				var consecutive = 0;
				var last;
				for(var j = 0; j < r[i].length; j++) {
					var o = r[i][j];
					if(GAME.board[o.row][o.col]) {
						consecutive++;
						last = GAME.board[o.row][o.col];
						stage.removeChild(last.image);
						GAME.board[o.row][o.col] = null;
					}
				}
				if(consecutive == 3 && !is_init) {
					GAME.calories += parseInt(last.food.nutrition.Calories);
					GAME[last.food.foodgroupname.toLowerCase()]++;					
				}
			}
			if(!is_init) {
				GAME.updateStatistics();
			}
		};
		
		GAME.fillColumns = function(success, is_init) {
			var synch = UTILS.synch(8, success);
			for(var col = 0; col < 8; col++) {
				GAME.fillColumn(col, synch, is_init);
			}
		};
		
		GAME.fillColumn = function(col, success, is_init) {
			var empty;
			for(var row = 7; row >= 0; row--) {
				var o = GAME.board[row][col];
				if(o && empty) { //if i am looking at an object and know where to put it
					var obj = {y:o.image.y};
					var image = o.image;
					o.data.column = empty.col;
					o.data.row = empty.row;
					GAME.board[empty.row][empty.col] = GAME.board[row][col];
					GAME.board[row][col] = null;
					if(!is_init) {
						var action = createjs.Tween.get(obj);
						action.to({
							y : UTILS.padding + empty.row * UTILS.imagesize
						}, UTILS.timetomove);
						action.on("change", function() {
							image.y = Math.floor(obj.y);
						});
						action.call(function() {
							GAME.fillColumn(col, success, is_init);
						});
					} else {
						image.y = UTILS.padding + empty.row * UTILS.imagesize;
						GAME.fillColumn(col, success, is_init);
					}
					return;
				}
				if(!o && !empty) { //if i havent seen an empty and i am looking at one now
					empty = {
						row : row,
						col : col
					};
				}
			}	
			if(empty) { //if there are empty cells and i need to generate new foods												
				var image = GAME.generateFoodForGrid(col * UTILS.imagesize + UTILS.padding, 0, empty.row, col, false);
				var obj = {y:image.y};
				if(!is_init) {
					var action = createjs.Tween.get(obj);
					action.to({
						y : UTILS.padding + empty.row * UTILS.imagesize
					}, UTILS.timetomove);
					action.on("change", function() {
						image.y = Math.floor(obj.y);
					});
					action.call(function() {
						GAME.fillColumn(col, success, is_init);
					});
				} else {
					image.y = UTILS.padding + empty.row * UTILS.imagesize;
					GAME.fillColumn(col, success, is_init);
				}
			} else {
				success();
			}
		};
		
		GAME.generateGamePiece = function() {
			return GAME.foodForTheWeek[UTILS.next(GAME.foodForTheWeek.length)];
		};
		
		GAME.populateBoard = function() {
			for(var rows = 0; rows < 8; rows++) {
				GAME.board[rows] = [];
				for(var columns = 0; columns < 8; columns++) {
					var x = columns * UTILS.imagesize + UTILS.padding, y = rows * UTILS.imagesize + UTILS.padding;
					GAME.generateFoodForGrid(x, y, rows, columns, true);
				}
			}		
		};
		
		GAME.generateFoodForGrid = function(x, y, row, column, makebox) {
			var food = GAME.generateGamePiece();
			var image = new createjs.Bitmap("images/" + food.image);
			image.addEventListener("click", GAME.switchPiece);
			image.x = x
			image.y = y;
			image.data = {
				column : column,
				row : row
			};
			GAME.board[row][column] = {
				image : image,
				food : food,
				data : image.data
			};
			makebox && stage.addChild(new createjs.Shape(new createjs.Graphics().ss(1).s("#000").r(x, y, UTILS.imagesize, UTILS.imagesize)));
			stage.addChild(image);			
			return image;
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
						var synch = UTILS.synch(2, function() {
							UTILS.swap(original.data, clicked.data);
							GAME.board[original.data.row][original.data.column] = original;
							GAME.board[clicked.data.row][clicked.data.column] = clicked;
							var toBreak = GAME.moveChecker();
							if(toBreak.length) {		
								GAME.process(toBreak, false, function() {					
									GAME.meal = GAME.meal + 1;
									if(GAME.meal == GAME.meals.length) {
										//SAVE DAY
										DB.createDay(GAME.calories, GAME.grain, GAME.protein, GAME.vegetable, GAME.fruit, GAME.junk, GAME.dairy, function(bool) {
											if(bool) {
												console.log("GAME OVER");
											}
										});
										GAME.meal = 0;
										GAME.calories = 0;
										GAME.grain = 0;
										GAME.protein = 0;
										GAME.vegetable = 0;
										GAME.fruit = 0;
										GAME.junk = 0;
										GAME.dairy = 0;		
										GAME.day++;
										if(GAME.day % 7 == 0) {
											GAME.foodForTheWeek = GAME.shopping();
											GAME.addStatistics();
										}
									}									
									GAME.processing = false;
									GAME.updateStatistics();
								});
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
		
		GAME.process = function(toBreak, is_init, complete) {
			if(toBreak.length) {
				GAME.doBreak(toBreak, is_init);
				GAME.fillColumns(function() {
					GAME.process(GAME.moveChecker(), is_init, complete);
				}, is_init);
			} else {
				complete && complete();
			}
		};

		GAME.move = function(obj, x1, y1, x2, y2, complete) {
			var pos = {x : x1, y : y1};
			var action = createjs.Tween.get(pos);
			action.to({x : x2, y : y2}, UTILS.timetomove);
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
	stage.enableMouseOver(20);
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
	
	LOGIN.init();
	
	createjs.Ticker.addEventListener("tick", function(){
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