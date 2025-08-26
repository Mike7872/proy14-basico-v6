-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 16:18:55
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `numa` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `codl` varchar(30) NOT NULL,
  `rela` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`numa`, `num`, `codl`, `rela`) VALUES
(1, 8, '1746452407525', 'autor'),
(2, 9, '1747054208441', 'coautor'),
(4, 8, '1747054208441', 'coautor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `codl` varchar(30) NOT NULL,
  `noml` varchar(200) NOT NULL,
  `des` text NOT NULL,
  `stdl` varchar(3) NOT NULL,
  `fechp` varchar(10) NOT NULL,
  `tipo` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`codl`, `noml`, `des`, `stdl`, `fechp`, `tipo`) VALUES
('1746451159077', 'El principito', 'Un libro infantil', 'del', '1990-05-23', 'novela'),
('1746452407525', 'Troya 2', 'Un libro de homero sobre guerra', 'act', '2002-05-12', 'novela'),
('1747054208441', 'La iliada', 'Libro de guerra', 'act', '2025-05-08', 'novela'),
('1748265948518', '100 añosde soledad', 'un libro interesante', 'act', '2022-05-12', 'comedia'),
('1748266179862', 'La vaca', 'intereante', 'act', '2025-05-08', 'otro'),
('1748266376457', 'Padre rico padre pobre', 'libro de negocios', 'act', '1990-05-12', 'finanzas'),
('1748266407704', 'Los negocios', 'para invertir', 'act', '2025-04-30', 'finanzas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `person`
--

CREATE TABLE `person` (
  `num` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `ap` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `std` varchar(3) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `fechn` text DEFAULT NULL,
  `gen` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `person`
--

INSERT INTO `person` (`num`, `nom`, `ap`, `email`, `pwd`, `std`, `tipo`, `fechn`, `gen`) VALUES
(4, 'Rolando', 'Aruquipa', 'roly@gmail.com', '123', 'act', 'Pasante', '2000-01-01', 'n'),
(5, 'Aisa Roxana', 'Gomes', 'aisa@gmail.com', '123', 'act', 'Pasante', '2000-01-01', 'n'),
(7, 'Federico', 'Peluche', 'pelufede@gmail.com', '123', 'act', 'Pasante', '2000-01-01', 'n'),
(8, 'Federica', 'Peluche', 'fedepeluch@gmail.com', '123', 'act', 'Pasante', '2000-01-01', 'n'),
(9, 'Homero', 'Quispe', 'homer@gmail.com', '123', 'act', 'Pasante', '2000-01-01', 'n'),
(10, 'Arnold', 'Paye', 'arnol@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'Gerente', '2000-01-01', 'n'),
(11, 'samuel', 'medina', 'samu@email.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'Gerente', '2000-01-01', 'n'),
(12, 'Manuel', 'Lopez', 'manuel@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'Pasante', '1990-03-12', 'm'),
(13, 'Julia', 'quispe', 'julia@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'Pasante', '2005-05-16', 'f'),
(14, 'Mariela', 'Ticona', 'mariela@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'Pasante', '2005-05-24', 'f');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`numa`),
  ADD KEY `num` (`num`),
  ADD KEY `codl` (`codl`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`codl`);

--
-- Indices de la tabla `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`num`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `numa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `person`
--
ALTER TABLE `person`
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autor`
--
ALTER TABLE `autor`
  ADD CONSTRAINT `autor_ibfk_1` FOREIGN KEY (`num`) REFERENCES `person` (`num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `autor_ibfk_2` FOREIGN KEY (`codl`) REFERENCES `libro` (`codl`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
