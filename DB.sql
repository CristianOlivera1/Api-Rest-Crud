-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2025 a las 21:06:07
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbtiendaprofe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `barcode` varchar(150) NOT NULL,
  `sale_price` decimal(16,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tactividad`
--

CREATE TABLE `tactividad` (
  `idActividad` char(36) NOT NULL,
  `actividad` varchar(100) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT current_timestamp(),
  `fechaFin` datetime DEFAULT current_timestamp(),
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tactividad`
--

INSERT INTO `tactividad` (`idActividad`, `actividad`, `fechaInicio`, `fechaFin`, `estado`) VALUES
('24d47031-fd99-4b0b-8f26-ce5b8772aab9', 'qqqqqqqqq', '2025-02-03 09:48:00', '2025-02-03 06:52:00', 0),
('3597e31b-979d-49d4-b5ef-cd8e19d94aa1', 'xxxxxxxxxxx', '2025-02-03 07:38:00', '2025-02-03 08:38:00', 1),
('bafff2bf-2c5a-48c3-a0b6-435ebdf3d253', 'gggggggggggggggggg', '2025-02-03 09:48:00', '2025-02-03 17:49:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tcategory`
--

CREATE TABLE `tcategory` (
  `idCategory` char(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(800) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tcategory`
--

INSERT INTO `tcategory` (`idCategory`, `name`, `description`, `state`, `createdAt`, `updatedAt`) VALUES
('35249be4-d307-44a4-a51a-b63b68f5708a', 'Electrodomestico', 'Step into the future with this eye-catching high-top sneaker, designed for those who dare to stand out. The sneaker features a sleek silver body with striking gold accents, offering a modern twist on classic footwear. Its high-top design provides support and style, making it the perfect addition to any avant-garde fashion collection. Grab a pair today and elevate your shoe game!', 1, '2025-01-14 15:02:55', '2025-01-14 15:02:55'),
('4c7f7586-f9b5-4324-a3be-ef0c539e85c2', 'Polos', 'sssssssssssss', 1, '2025-01-13 07:40:43', '2025-01-13 07:40:43'),
('9e98c9a9-6a62-4d3b-b00e-bdde20da0f61', 'Sillas', 'prueba al insertar datos a la api', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('bf982a58-bf5a-454e-8e78-838241d2f598', 'Camas', 'ffffff', 0, '2025-01-14 15:38:28', '2025-02-13 11:29:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tclient`
--

CREATE TABLE `tclient` (
  `idClient` char(36) NOT NULL,
  `firstName` varchar(70) NOT NULL,
  `surName` varchar(100) NOT NULL,
  `dni` char(8) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(80) NOT NULL,
  `birthDate` date NOT NULL,
  `email` varchar(70) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tclient`
--

INSERT INTO `tclient` (`idClient`, `firstName`, `surName`, `dni`, `gender`, `phone`, `address`, `birthDate`, `email`, `createdAt`, `updatedAt`) VALUES
('25bffa4b-7dbf-4882-b097-f59cc73c8805', 'prueba0', 'jjjjjjjjjjjj', '44444444', 1, 931258745, '321 Plaza Mayor', '2025-01-10', 'cristian@gmail.com', '2025-01-16 15:36:59', '2025-02-13 11:31:55'),
('2eec2d34-a67f-43fc-ac6e-b9917ed35db8', 'prueba3', 'prueba3', '25123457', 0, 987412563, '321 Plaza Mayor', '2025-01-08', 'cristian@gmail.pe', '2025-01-16 15:56:40', '2025-01-16 15:57:07'),
('46121969-d416-11ef-93f1-0a0027000004', 'Juan', 'Perez', '12345678', 1, 987654321, '123 Calle Falsa', '1990-01-01', 'juan.perez@example.com', '2025-01-16 09:29:20', '2025-01-16 09:29:20'),
('46122e29-d416-11ef-93f1-0a0027000004', 'Ana', 'Gomez', '87654321', 0, 123456789, '456 Avenida Real', '1985-05-12', 'ana.gomez@example.com', '2025-01-16 09:29:20', '2025-01-16 09:29:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tproduct`
--

CREATE TABLE `tproduct` (
  `idProduct` char(36) NOT NULL,
  `idCategory` char(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `barcode` varchar(150) NOT NULL,
  `sale_price` decimal(16,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tproduct`
--

INSERT INTO `tproduct` (`idProduct`, `idCategory`, `name`, `barcode`, `sale_price`, `stock`, `state`, `createdAt`, `updatedAt`) VALUES
('7108aba6-3de3-4749-86ff-d05b6d4082c9', '4c7f7586-f9b5-4324-a3be-ef0c539e85c2', 'aaaaaaacs', '25123457', '25123456.00', 125123457, 0, '2025-02-13 10:19:43', '2025-02-13 11:28:39'),
('8236cc7a-7aef-4fbc-a60e-565372427a30', '35249be4-d307-44a4-a51a-b63b68f5708a', 'pc', '4444444', '100.00', 100, 1, '2025-02-13 14:12:44', '2025-02-13 14:12:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tpurchase`
--

CREATE TABLE `tpurchase` (
  `idpurchase` char(36) NOT NULL,
  `idclient` char(36) NOT NULL,
  `date` date NOT NULL,
  `payment_method` char(1) NOT NULL,
  `comment` varchar(800) DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tpurchase_product`
--

CREATE TABLE `tpurchase_product` (
  `idpurchase_product` char(36) NOT NULL,
  `idpurchase` char(36) NOT NULL,
  `idproduct` char(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(16,2) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuser`
--

CREATE TABLE `tuser` (
  `idUser` char(36) NOT NULL,
  `nameUser` varchar(700) NOT NULL,
  `password` varchar(2000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tuser`
--

INSERT INTO `tuser` (`idUser`, `nameUser`, `password`, `createdAt`, `updatedAt`) VALUES
('3652e77d-eb1d-410a-9b91-eee9b1f64ddd', 'pruebacryp', '6QyrcvMuOw5n8eirqbEeBw==', '2025-01-28 14:34:27', '2025-01-28 14:34:27'),
('84d5a3e3-b4aa-4020-b0ce-b74271d8d5ee', 'encrypt', '2mbMIAYMp6KAbJdlV7eZcw==', '2025-01-28 14:42:07', '2025-01-28 14:42:07'),
('90e4c004-3241-4fd8-9d9f-c48e277e2d55', 'cristian', 'R2PYqRxOoEBpN5paLf/rFCw7Vv+ELT+e4cHIrrN8F4s=', '2025-01-28 15:08:25', '2025-01-28 15:08:25'),
('ae906de2-e1d9-45ea-9140-2fdf88368662', 'a', '2mbMIAYMp6KAbJdlV7eZcw==', '2025-02-04 15:39:49', '2025-02-04 15:39:49'),
('bae8bd21-176a-4aa4-b0aa-817d4d4664b3', 'admin', '2mbMIAYMp6KAbJdlV7eZcw==', '2025-01-28 15:27:02', '2025-01-28 15:27:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indices de la tabla `tactividad`
--
ALTER TABLE `tactividad`
  ADD PRIMARY KEY (`idActividad`);

--
-- Indices de la tabla `tcategory`
--
ALTER TABLE `tcategory`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indices de la tabla `tclient`
--
ALTER TABLE `tclient`
  ADD PRIMARY KEY (`idClient`);

--
-- Indices de la tabla `tproduct`
--
ALTER TABLE `tproduct`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Indices de la tabla `tpurchase`
--
ALTER TABLE `tpurchase`
  ADD PRIMARY KEY (`idpurchase`),
  ADD KEY `idclient` (`idclient`);

--
-- Indices de la tabla `tpurchase_product`
--
ALTER TABLE `tpurchase_product`
  ADD PRIMARY KEY (`idpurchase_product`),
  ADD KEY `idpurchase` (`idpurchase`),
  ADD KEY `idproduct` (`idproduct`);

--
-- Indices de la tabla `tuser`
--
ALTER TABLE `tuser`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tproduct`
--
ALTER TABLE `tproduct`
  ADD CONSTRAINT `tproduct_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `tcategory` (`idCategory`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tpurchase`
--
ALTER TABLE `tpurchase`
  ADD CONSTRAINT `tpurchase_ibfk_1` FOREIGN KEY (`idclient`) REFERENCES `tclient` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tpurchase_product`
--
ALTER TABLE `tpurchase_product`
  ADD CONSTRAINT `tpurchase_product_ibfk_1` FOREIGN KEY (`idpurchase`) REFERENCES `tpurchase` (`idpurchase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tpurchase_product_ibfk_2` FOREIGN KEY (`idproduct`) REFERENCES `tproduct` (`idProduct`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
