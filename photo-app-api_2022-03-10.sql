# ************************************************************
# Sequel Ace SQL dump
# Version 20031
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.34)
# Database: photo-app-api
# Generation Time: 2022-03-10 18:02:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Albums`;

CREATE TABLE `Albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `User_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;

INSERT INTO `Albums` (`id`, `title`, `User_id`)
VALUES
	(1,'Cats and Windows',5),
	(2,'Duktiga djur',19),
	(3,'Coffee table',19),
	(4,'Hehe ;)',19),
	(5,'Midsommar 2005',19),
	(6,'Foodler McDoodler',19),
	(7,'Doge',19);

/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Albums_Photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Albums_Photos`;

CREATE TABLE `Albums_Photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Photo_id` int(11) DEFAULT NULL,
  `Album_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photoId` (`Photo_id`),
  KEY `userId` (`Album_id`),
  CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY (`Photo_id`) REFERENCES `Photos` (`id`),
  CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY (`Album_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Albums_Photos` WRITE;
/*!40000 ALTER TABLE `Albums_Photos` DISABLE KEYS */;

INSERT INTO `Albums_Photos` (`id`, `Photo_id`, `Album_id`)
VALUES
	(4,5,4),
	(5,6,5),
	(6,5,2),
	(7,6,2),
	(8,8,6),
	(9,7,2);

/*!40000 ALTER TABLE `Albums_Photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;

INSERT INTO `Photos` (`id`, `title`, `url`, `comment`, `User_id`)
VALUES
	(1,'Windowtree','https://images.unsplash.com/photo-1646157446679-60fff3cb1088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80','Tree through a window in the countryside',1),
	(2,'Chill cat','https://images.unsplash.com/photo-1646076398209-3f6fa13df9b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80','A cat chillin\' like a villian',1),
	(3,'Tiny cact','https://images.unsplash.com/photo-1646143612209-a06a538b8c7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80','A lonely tiny cactus',5),
	(4,'Venice street','https://images.unsplash.com/photo-1646237355337-c6fe828db242?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','Boat in venice',5),
	(5,'A Pug','https://images.unsplash.com/photo-1646387785399-6e8693ef5074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','A pug called Puggington',19),
	(6,'French protestors','https://images.unsplash.com/photo-1646518163675-9b83fd36a438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80','They are not happy...',19),
	(7,'Franska potestanter','https://images.unsplash.com/photo-1646518163675-9b83fd36a438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80','Luther was right',19),
	(8,'Pizza Time','https://images.unsplash.com/photo-1628520381718-220759f5fafe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','We want pizza! P I Z Z A, PIZZA!',19),
	(9,'Sportscar','https://images.unsplash.com/photo-1646841133003-f51276864403?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80','Gotta go fast!',19),
	(10,'Sprialing down','https://images.unsplash.com/photo-1646809429861-e1bb067e92f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80','Spiraling mental healht lol',19);

/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(2,'gurk@burk.se','gurkburk123','Gurkan','Larsson'),
	(5,'hoho@gmail.com','password123','Ninja','Lundström'),
	(6,'hohohehe@gmail.com','ninja123','Lukas','Nilsson'),
	(15,'cool9@hotmail.nu','$2b$10$klQqiBxzX9MkredwzvJXMOaI8iMp9HSMlQy775C9jSHM.Zn3vCcRi','Uffe','den Tuffe'),
	(16,'cool10@hotmail.nu','$2b$10$ihcyiVRLlWXgHAb8YeDVTu7ckUTTkEDpq3isbEeW7REitA884fMAq','Uffe','den Tuffe'),
	(19,'alexander@gmail.com','$2b$10$rzqlxvWyTZxl4fhErm/pzO68bvl4HZXh6jx0ghUM.rPqhmJofOFsq','Alexander','Bergquist'),
	(20,'kenny@mylta.tk','$2b$10$Hy2qVysjGvocjdvVizOhHel25XU2GZxxGGGHlplp3U6fFVONZT2Yy','Kenny','Starfighter'),
	(21,'josefin.fransson@gmail.com','$2b$10$1VEnCwCc0yKhliv9FRQ44uIKifpQXAuQoUVWiBZ50wSI4w4Uizo52','Josefin','Fransson');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
