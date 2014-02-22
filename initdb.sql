-- phpMyAdmin SQL Dump
-- version 4.0.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 22, 2014 at 08:04 AM
-- Server version: 5.5.35-MariaDB
-- PHP Version: 5.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `petercha_codefesttest`
--

-- --------------------------------------------------------

--
-- Table structure for table `daytbl`
--

CREATE TABLE IF NOT EXISTS `daytbl` (
  `dayid` int(11) NOT NULL AUTO_INCREMENT,
  `gameid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `caloricintake` int(5) NOT NULL,
  PRIMARY KEY (`dayid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `foodgrouptbl`
--

CREATE TABLE IF NOT EXISTS `foodgrouptbl` (
  `groupid` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(32) NOT NULL,
  PRIMARY KEY (`groupid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `foodgrouptbl`
--

INSERT INTO `foodgrouptbl` (`groupid`, `groupname`) VALUES
(1, 'Fruits'),
(2, 'Vegtables'),
(3, 'Grains'),
(4, 'Milk'),
(5, 'Meat & Beans'),
(6, 'Fats & Oils');

-- --------------------------------------------------------

--
-- Table structure for table `foodtbl`
--

CREATE TABLE IF NOT EXISTS `foodtbl` (
  `foodid` int(11) DEFAULT NULL,
  `groupid` int(11) NOT NULL,
  `foodname` varchar(32) NOT NULL,
  `calores` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gametbl`
--

CREATE TABLE IF NOT EXISTS `gametbl` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`gameid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `usertbl`
--

CREATE TABLE IF NOT EXISTS `usertbl` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `height` int(2) NOT NULL,
  `weight` int(3) NOT NULL,
  `gender` int(1) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
