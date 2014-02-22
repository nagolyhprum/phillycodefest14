CREATE TABLE IF NOT EXISTS `daytbl` (
  `dayid` int(11) NOT NULL AUTO_INCREMENT,
  `gameid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `caloricintake` int(5) NOT NULL,
  PRIMARY KEY (`dayid`)
);

CREATE TABLE IF NOT EXISTS `foodgrouptbl` (
  `groupid` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(32) NOT NULL,
  `symbol` varchar(1) NOT NULL,
  PRIMARY KEY (`groupid`)
);

INSERT INTO `foodgrouptbl` (`groupid`, `groupname`, `symbol`) VALUES
(1, 'Fruits', 'f'),
(2, 'Vegtables', 'v'),
(3, 'Grains', 'g'),
(4, 'Milk', 'd'),
(5, 'Meat & Beans', 'm'),
(6, 'Fats & Oils', 'o');

CREATE TABLE IF NOT EXISTS `foodtbl` (
  `foodid` int(11) DEFAULT NULL,
  `groupid` int(11) NOT NULL,
  `foodname` varchar(32) NOT NULL,
  `calores` int(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS `gametbl` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`gameid`)
);

CREATE TABLE IF NOT EXISTS `usertbl` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `height` int(2) NOT NULL,
  `weight` int(3) NOT NULL,
  `gender` int(1) NOT NULL,
  `age` int(3) NOT NULL,
  PRIMARY KEY (`userid`)
);