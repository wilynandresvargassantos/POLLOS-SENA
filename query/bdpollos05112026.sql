-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2026 a las 16:45:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdpollos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idcliente` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `tipoDocumento` varchar(3) NOT NULL,
  `numeroDocumento` varchar(10) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idcliente`, `nombres`, `tipoDocumento`, `numeroDocumento`, `direccion`, `telefono`, `correo`, `contrasena`, `estado`) VALUES
(1, 'Carlos Prueba', 'CC', '1234567890', 'Calle 10 # 20-30', '3001234567', 'carlos.prueba@example.com', '$2b$10$vvl7oJy.c1i3qw/f4dYnGOoGOizstWdZZaOQq1PhrP2x7ahP9mJdi', 'Activo'),
(2, 'Juan Perez Pollos', 'CC', '1098765001', 'Calle 10 # 20-30', '3101234567', 'juan.pollos@example.com', '$2b$10$8W8ySRNoDt9AvPK0p5x3kucj9UOBDeWhIKOXrojUczpLBqXRiLNKi', 'Activo'),
(3, 'Maria Autoregistro Pollos', '', '1098765002', '', '3119876543', 'maria.pollos@example.com', '$2b$10$iSJhN.qNYr1TVQwaRSYpGuKQIBM8Zmzeh9ZNeZBH8deJHs.TxepdW', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `idcliente` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidadKg` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Pendiente','Confirmado','Cancelado','Entregado') DEFAULT 'Pendiente',
  `fechaPedido` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idcliente`, `idProducto`, `cantidadKg`, `total`, `estado`, `fechaPedido`) VALUES
(1, 1, 1, 10.50, 183750.00, 'Cancelado', '2026-11-03 16:22:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL COMMENT 'Precio por kilogramo',
  `cantidadDisponible` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Stock en kilogramos',
  `estado` varchar(10) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `descripcion`, `precio`, `cantidadDisponible`, `estado`) VALUES
(1, 'Pechuga de Pollo Fresca Especial', 'Pechuga entera limpia, sin piel y deshuesada por kg', 17500.00, 96.00, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `idtrabajador` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `tipoDocumento` varchar(3) NOT NULL,
  `numeroDocumento` varchar(10) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`idtrabajador`, `nombres`, `tipoDocumento`, `numeroDocumento`, `direccion`, `telefono`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, 'Andres Asador', 'CC', '1034567890', 'Avenida 30 # 10-25', '3123456789', 'andres.asador@pollos.com', '$2b$10$qcGRUwCGJe2HJVZfDWRLIOhI.3sVhZ5Yj0yK86Zz4GEE3c.KJ1ToS', 'Trabajador', 'Activo'),
(2, 'Administrador General Pollos', 'CC', '1098765499', 'Carrera 30 # 25-10', '3209876543', 'admin.pollos@gmail.com', '$2b$10$RnIkwBDdUaU.xrz8RYWySekOKTrZGErlNUINmkcfV.kihdH/5Vsym', 'Admin', 'Activo'),
(3, 'Pedro Operario Pollos', 'CC', '1098765003', 'Carrera 15 # 40-50', '3129876543', 'pedro.trabajador@pollos.com', '$2b$10$VDEB5Au27zPxUISUkn8Jpu3h.A1oWstnNFsZWK.1sLrhpro.tD9o6', 'Trabajador', 'Activo'),
(4, 'Carlos Administrador General', 'CC', '1098765004', 'Avenida Principal Calle 50 # 12-34', '3001234004', 'admin.carlos@pollos.com', '$2b$10$xvayLylEImln31VtE2AW9.KCIACVEA1bLmnzDgb.pGA/BSUpNo0Ai', 'Admin', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `fk_pedido_cliente` (`idcliente`),
  ADD KEY `fk_pedido_producto` (`idProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`idtrabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `idtrabajador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`idcliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pedido_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
