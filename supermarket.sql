CREATE DATABASE  IF NOT EXISTS `supermarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userID_idx` (`user_id`),
  CONSTRAINT `FK_userID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,'2022-05-04',NULL),(9,5,'2022-05-16','2022-06-01'),(10,11,'2022-05-28',NULL),(11,5,'2022-06-01','2022-06-01'),(12,5,'2022-06-01','2022-06-01'),(13,5,'2022-06-01','2022-06-01'),(14,5,'2022-06-01','2022-06-01'),(15,5,'2022-06-01','2022-06-07'),(16,14,'2022-06-02','2022-06-02'),(17,14,'2022-06-02','2022-06-02'),(18,14,'2022-06-02','2022-06-07'),(19,5,'2022-06-07','2022-06-07'),(20,5,'2022-06-07',NULL),(21,15,'2022-06-07',NULL),(22,14,'2022-06-07',NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Pastries and breads'),(2,'Dairy products'),(3,'Fruits and Vegetables'),(4,'snacks'),(5,'Drinking'),(6,'Meat and fish');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_shipment` date NOT NULL,
  `date_order` date NOT NULL,
  `adress` varchar(45) NOT NULL,
  `const` int NOT NULL,
  `credit_card` varchar(45) NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_idx` (`user_id`),
  KEY `FK_cart_idx` (`cart_id`),
  CONSTRAINT `FK_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5,'2022-06-01','2022-06-16','asdv',28,'9876543210123456',9),(2,5,'2022-06-01','2022-06-15','adfrsf',118,'9876543210123456',11),(3,5,'2022-06-01','2022-06-14','Tel-Aviv - sdg',48,'9876543210123456',12),(4,5,'2022-06-01','2022-06-14','Haifa - asfdf',82,'9876543210123456',13),(5,5,'2022-06-01','2022-06-16','Beer-Sheva - dfbgdh 25',52,'9874563210123456',14),(6,14,'2022-06-02','2022-06-02','Haifa - Haodem 26',104,'4012364567889542',16),(7,14,'2022-06-02','2023-05-27','Netanya - asdgfh',11,'9876543210123456',17),(8,5,'2022-06-07','2022-06-23','Beer-Sheva - sfadghfyg',21,'9876543210123456',15),(9,5,'2022-06-07','2022-06-22','Beer-Sheva - ZDXFcgvhjkl',21,'9876543210123456',19),(10,14,'2022-06-07','2022-07-06','Haifa - sdfghjkl',52,'9876543210123456',18);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `unit_price` int NOT NULL,
  `img` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_category_idx` (`category_id`),
  KEY `FK_categore_idx` (`category_id`),
  CONSTRAINT `FK_categore` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Wholemeal bread',1,11,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/GVB28_L_P_4504762_1.png'),(2,'Rye bread',1,10,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/PKS54_L_P_7290013683465_1.png'),(3,'One-third baguette',1,14,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/EEL38_L_P_5082986_1.png'),(4,'Braided challah',1,7,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/DUP66_L_P_7296073528890_1.png'),(5,'Fresh minced meat',6,29,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/GSZ34_L_P_9144772_1.png'),(6,'Roast lamb shoulder',6,89,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/JTL44_L_P_9392876_1.png'),(7,'Thin Denver steak',6,99,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/ERF14_L_P_900230_1.png'),(8,'Asado with bone',6,64,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/XHF58_L_P_7296073454182_1.png'),(9,'Fresh whole Dennis',6,85,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/RAE14_L_P_9011111_1.png'),(10,'Sliced carp',6,50,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/RBJ18_L_P_9011142_1.png'),(11,'Yellow cheese 28%',2,20,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/WIX32_L_P_9137750_1.png'),(12,'Yogurt in a jug 4%',2,16,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/LZD24_L_P_43944_1.png'),(13,'Milk 3%',2,6,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/AAL20_L_P_4131074_1.png'),(14,'Apples',3,10,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/TSR28_L_P_963136_1.png'),(15,'Orange',3,5,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/DLL58_L_P_7296073440772_1.png'),(16,'Tomato',3,7,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/VWW04_L_P_22_1.png'),(17,'Cucumber',3,6,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/CVY60_L_P_7296073440369_1.png'),(18,'Pringles',4,11,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/TSA42_L_P_38000169663_1.png'),(19,'Bamba',4,4,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/TBR24_L_P_66318_1.png'),(20,'Beasley',4,7,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/SWZ28_L_P_66196_1.png'),(21,'Coca-Cola case',5,50,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/EDX40_L_P_7290110115364_1.png'),(22,'Squeezed orange juice',5,25,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/FPW52_L_P_7290016682335_1.png'),(23,'Goldstar beer',5,25,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/OTY34_L_P_8464741_1.png'),(24,'Johnny Walker',5,309,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_medium/IUP46_M_P_5000267165806_1.png'),(28,'Spelled tortilla',1,15,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/STM50_L_P_7290017816081_1.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_cart`
--

DROP TABLE IF EXISTS `product_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `count` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cart_idx` (`cart_id`),
  KEY `FK_product_idx` (`product_id`),
  CONSTRAINT `FK_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_cart`
--

LOCK TABLES `product_cart` WRITE;
/*!40000 ALTER TABLE `product_cart` DISABLE KEYS */;
INSERT INTO `product_cart` VALUES (88,2,1,9),(92,13,3,9),(94,2,2,11),(95,1,2,11),(96,11,3,11),(97,12,1,11),(98,2,2,12),(99,3,2,12),(100,1,2,13),(101,11,3,13),(102,1,2,14),(103,2,3,14),(104,1,2,16),(105,13,3,16),(106,20,2,16),(107,21,1,16),(108,1,1,17),(109,1,1,15),(110,2,1,15),(111,1,1,19),(112,2,1,19),(113,1,2,18),(114,28,2,18);
/*!40000 ALTER TABLE `product_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `card_id` int NOT NULL,
  `password` varchar(45) NOT NULL,
  `adress` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `birth_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sasson','sasson',555,'e2d2af960ada70e65297bec6a535e705','here','admin','nfd','0000-00-00'),(5,'aaa','aaa',123456789,'e2d2af960ada70e65297bec6a535e705','deh','user','Haifa','2002-10-23'),(11,'sss','sss',123456789,'e2d2af960ada70e65297bec6a535e705','dfdfbdf','user','Netanya','1998-03-22'),(14,'itzhak','www',209132620,'e2d2af960ada70e65297bec6a535e705','sdfhgn','user','Ashdod','2006-12-24'),(15,'sadfg','qqq',987654321,'e2d2af960ada70e65297bec6a535e705','sadfghj','user','Tel-Aviv','2022-06-02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-07 15:34:50
