DROP SCHEMA IF EXISTS `phillycodefest14`;

CREATE SCHEMA IF NOT EXISTS `phillycodefest14`;

use `phillycodefest14`;

CREATE TABLE IF NOT EXISTS `daytbl` (
  `dayid` int(11) NOT NULL AUTO_INCREMENT,
  `gameid` int(11) NOT NULL,
  `daycalories` int(5) NOT NULL,
  `daygrain` int(4) NOT NULL,
  `dayprotein` int(4) NOT NULL,
  `dayjunk` int(4) NOT NULL,
  `dayvegetables` int(4) NOT NULL,
  `dayfruit` int(4) NOT NULL,
  `daydairy` int(4) NOT NULL,
  PRIMARY KEY (`dayid`)
);

CREATE TABLE IF NOT EXISTS `foodgrouptbl` (
  `foodgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `foodgroupname` varchar(32) NOT NULL,
  PRIMARY KEY (`foodgroupid`)
);

INSERT INTO `foodgrouptbl` (`foodgroupid`, `foodgroupname`) VALUES
	(1, 'Fruit'),
	(2, 'Vegetable'),
	(3, 'Grain'),
	(4, 'Dairy'),
	(5, 'Protein'),
	(6, 'Junk');

CREATE TABLE IF NOT EXISTS `foodtbl` (
  `foodid` int(11) DEFAULT NULL AUTO_INCREMENT PRIMARY KEY,
  `foodgroupid` int(11) NOT NULL,
  `foodname` varchar(32) NOT NULL,
  `foodimage` VARCHAR(32) NOT NULL
);

INSERT INTO foodtbl 
	(foodid, foodname, foodgroupid, foodimage)
VALUES
	(205745, "Fruit Salad", 1, "fruit_a.png"),
	(206449, "Apple Salad", 1, "fruit_b.png"),
	(206732, "Pineapple and Cabbage Salad", 1, "fruit_c.png"),
	(100033, "Broccoli", 2, "vegetable_a.png"),
	(100159, "Mixed Vegetables", 2, "vegetable_b.png"),
	(100397, "Corn", 2, "vegetable_c.png"),
	(201611, "Red Kidney Beans", 5, "protein_a.png"),
	(101300, "Chicken" , 5, "protein_b.png"),
	(101349, "Ham with Rice", 5, "protein_c.png"),
	(205085, "Milk", 4, "dairy_a.png"),
	(201398, "Tapioca Pudding", 4, "dairy_b.png"),
	(206957, "Cream Cheese Dip", 4, "dairy_c.png"),
	(101328, "Cream of Wheat", 3, "grain_a.png"),
	(200581, "Brown Rice", 3, "grain_b.png"),
	(205455, "Macaroni with Cheese", 3, "grain_c.png"),
	(100566, "Milk shake", 6, "junk_a.png"),
	(205687, "Popcorn with Butter", 6, "junk_b.png"),
	(201916, "Custard", 6, "junk_c.png");

CREATE TABLE IF NOT EXISTS `nuttbl` (
	`nutid` int(4) NOT NULL PRIMARY KEY,
	`nutname` varchar(32) NOT NULL,
	`nutmeasure` varchar(32) NOT NULL
);	

INSERT INTO nuttbl
	(nutid, nutname, nutmeasure)
VALUES
	(203, "Protein", "g"),
	(204, "Total Fat", "g"),
	(205, "Carbohydrate", "g"),
	(208, "Energy", "kcal"),
	(221, "Alcohol", "g"),
	(255, "Water", "g"),
	(262, "Caffeine", "mg"),
	(263, "Theobromine", "mg"),
	(269, "Sugars, total", "g"),
	(291, "Fiber, total dietary", "g"),
	(301, "Calcium", "mg"),
	(303, "Iron", "mg"),
	(304, "Magnesium", "mg"),
	(305, "Phosphorus", "mg"),
	(306, "Potassium", "mg"),
	(307, "Sodium", "mg"),
	(309, "Zinc", "mg"),
	(312, "Copper", "mg"),
	(317, "Selenium", "mcg"),
	(319, "Retinol", "mcg"),
	(320, "Vitamin A, RAE", "mcg_RAE"),
	(321, "Carotene, beta", "mcg"),
	(322, "Carotene, alpha", "mcg"),
	(323, "Vitamin E (alpha-tocopherol)", "mg"),
	(328, "Vitamin D (D2 + D3)", "mcg"),
	(334, "Cryptoxanthin, beta", "mcg"),
	(337, "Lycopene", "mcg"),
	(338, "Lutein + zeaxanthin", "mcg"),
	(401, "Vitamin C", "mg"),
	(404, "Thiamin", "mg"),
	(405, "Riboflavin", "mg"),
	(406, "Niacin", "mg"),
	(415, "Vitamin B-6", "mg"),
	(417, "Folate, total", "mcg"),
	(418, "Vitamin B-12", "mcg"),
	(421, "Choline, total", "mg"),
	(430, "Vitamin K (phylloquinone)", "mcg"),
	(431, "Folic acid", "mcg"),
	(432, "Folate, food", "mcg"),
	(435, "Folate, DFE", "mcg_DFE"),
	(573, "Vitamin E, added", "mg"),
	(578, "Vitamin B-12, added", "mcg"),
	(601, "Cholesterol", "mg"),
	(606, "Fatty acids, total saturated", "g"),
	(607, "4:0", "g"),
	(608, "6:0", "g"),
	(609, "8:0", "g"),
	(610, "10:0", "g"),
	(611, "12:0", "g"),
	(612, "14:0", "g"),
	(613, "16:0", "g"),
	(614, "18:0", "g"),
	(617, "18:1", "g"),
	(618, "18:2", "g"),
	(619, "18:3", "g"),
	(620, "20:4", "g"),
	(621, "22:6 n-3", "g"),
	(626, "16:1", "g"),
	(627, "18:4", "g"),
	(628, "20:1", "g"),
	(629, "20:5 n-3", "g"),
	(630, "22:1", "g"),
	(631, "22:5 n-3", "g"),
	(645, "Fatty acids, total monounsaturated", "g"),
	(646, "Fatty acids, total polyunsaturated", "g"),
	(666, "Calories", "");

	
CREATE TABLE IF NOT EXISTS `nutvaltbl`(
	`foodid` int(11) NOT NULL,
	`nutid` int(11) NOT NULL,
	`nutvalmeasure` decimal(11,3)
);



CREATE TABLE IF NOT EXISTS `gametbl` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `gameweeks` int(11) NOT NULL,
  PRIMARY KEY (`gameid`)
);

CREATE TABLE IF NOT EXISTS `usertbl` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `userheight` int(2) NOT NULL,
  `userweight` int(3) NOT NULL,
  `usergender` int(1) NOT NULL,
  `userage` int(3) NOT NULL,
  `userfbid` int(11) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`userid`)
);

INSERT INTO 
	nutvaltbl (foodid, nutid, nutvalmeasure) 
VALUES 
	(205745, 666, 73),
	(206449, 666, 350),
	(206732, 666, 108),
	(100033, 666, 30),
	(100159, 666, 30),
	(100397, 666, 133),
	(201611, 666, 225),
	(101300, 666, 188),
	(101349, 666, 279),
	(205085, 666, 122),
	(201398, 666, 100),
	(206957, 666, 53),
	(101328, 666, 150),
	(200581, 666, 216),
	(205455, 666, 250),
	(100566, 666, 360),
	(205687, 666, 200),
	(201916, 666, 308);
	
