-- ============================================
-- ARKMEDS - Database Schema
-- Execute este script no DBeaver para criar as tabelas
-- ============================================

-- Tabela de Motoristas
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  "birthDate" TIMESTAMP NOT NULL,
  gender VARCHAR(50) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  "zipCode" VARCHAR(10) NOT NULL
);

-- Tabela de Passageiros
CREATE TABLE IF NOT EXISTS passengers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  "birthDate" TIMESTAMP NOT NULL,
  gender VARCHAR(50) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  "zipCode" VARCHAR(10) NOT NULL
);

-- Tabela de Corridas
CREATE TABLE IF NOT EXISTS races (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "passengerId" UUID NOT NULL,
  "driverId" UUID NOT NULL,
  "originLat" DOUBLE PRECISION NOT NULL,
  "originLng" DOUBLE PRECISION NOT NULL,
  "destinationLat" DOUBLE PRECISION NOT NULL,
  "destinationLng" DOUBLE PRECISION NOT NULL,
  date TIMESTAMP NOT NULL,
  "distanceMeters" DOUBLE PRECISION NOT NULL,
  price DOUBLE PRECISION NOT NULL
);

-- Tabela de Solicitações de Tarifa
CREATE TABLE IF NOT EXISTS fare_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "passengerId" UUID NOT NULL,
  "originLat" DOUBLE PRECISION NOT NULL,
  "originLng" DOUBLE PRECISION NOT NULL,
  "destinationLat" DOUBLE PRECISION NOT NULL,
  "destinationLng" DOUBLE PRECISION NOT NULL,
  date TIMESTAMP NOT NULL
);

-- Verificação: listar todas as tabelas criadas
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
