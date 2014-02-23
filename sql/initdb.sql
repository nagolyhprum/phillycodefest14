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
  `foodgroupsymbol` varchar(1) NOT NULL,
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

INSERT INTO `foodtbl` (`foodgroupid`, `foodname`, `foodimage`, `foodcalories`) VALUES
	(1, "Grape", "fruit_a.png"),
	(1, "Apple", "fruit_b.png"),
	(1, "Pineapple", "fruit_c.png"),
	(2, "Carrot", "vegetable_a.png"),
	(2, "Lettuce", "vegetable_b.png"),
	(2, "Tomato", "vegetable_c.png"),
	(3, "Bread", "grain_a.png"),
	(3, "Cereal", "grain_b.png"),
	(3, "Oatmeal", "grain_c.png"),
	(4, "Whole Milk", "dairy_a.png"),
	(4, "Cheese", "dairy_a.png"),
	(4, "Half Milk", "dairy_a.png"),
	(5, "Chicken", "protein_a.png"),
	(5, "Lamb", "protein_b.png"),
	(5, "Steak", "protein_c.png"),
	(6, "Candy", "junk_a.png"),
	(6, "Oil", "junk_b.png"),
	(6, "Fat", "junk_c.png");

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
  PRIMARY KEY (`userid`)
);
