# 🚗 APP DE CORRIDAS

Sistema de gerenciamento de corridas desenvolvido com Clean Architecture, TypeScript e Node.js.

## 📋 Sobre o Projeto

O APP DE CORRIDAS é uma aplicação backend completa para gerenciamento de corridas de passageiros, permitindo:

- ✅ Cadastro e gerenciamento de motoristas
- ✅ Cadastro e gerenciamento de passageiros
- ✅ Cálculo de tarifas baseado em distância e horário
- ✅ Aceitação de corridas com geração automática de recibos
- ✅ Sistema de filas para processamento assíncrono
- ✅ Validação de dados com Zod
- ✅ Testes unitários com Jest

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

- **Domain**: Entidades, Value Objects, Services e Interfaces de Repositório
- **Application**: Casos de Uso (Use Cases)
- **Infrastructure**: Implementações de Banco de Dados, Serviços Externos e Workers
- **Presentation**: Controllers, Routes, Middlewares e Schemas de Validação

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **PG-Boss** - Sistema de filas baseado em PostgreSQL
- **InversifyJS** - Injeção de dependências
- **Zod** - Validação de schemas
- **Jest** - Framework de testes
- **date-fns** - Manipulação de datas


## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone git@github.com:felmartins1985/app_corridas.git
cd arkmeds
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_DATABASE=arkmeds_db

# Queue (PGBoss - usa o mesmo banco PostgreSQL)
QUEUE_CONNECTION_STRING=postgresql://seu_usuario:sua_senha@localhost:5432/arkmeds_db
```

### 4. Configure o banco de dados

**IMPORTANTE:** É necessário criar manualmente o banco de dados e as tabelas antes de iniciar a aplicação.

#### 4.1. Crie o banco de dados

Crie o banco de dados:

```sql
CREATE DATABASE arkmeds_db;
```

Habilite a extensão UUID (necessária para as chaves primárias):

```sql
\c arkmeds_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### 4.2. Crie as tabelas necessárias

O projeto inclui um arquivo `database-schema.sql` na raiz com todas as tabelas necessárias.

Você pode executar o script da seguinte forma:

**Via cliente PostgreSQL (DBeaver, pgAdmin, etc.)**

1. Conecte-se ao banco de dados `arkmeds_db`
2. Abra o arquivo `database-schema.sql`
3. Execute o script completo

O script criará as seguintes tabelas:

- `drivers` - Motoristas
- `passengers` - Passageiros
- `races` - Corridas
- `fare_requests` - Solicitações de tarifa
- Tabelas do PG-Boss para o sistema de filas

### 5. Inicie a aplicação

**Modo Desenvolvimento (com hot-reload):**

```bash
npm run dev
```

**Modo Produção:**

```bash
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000/api`

Você verá as seguintes mensagens de sucesso:

```
✅ Database connected successfully
📦 ReceiptWorker instance: ReceiptWorker
✅ Queue service started
✅ Receipt worker started
🔄 Receipt Worker started from index.ts
🚀 Server running on port 3000
📡 API available at http://localhost:3000/api
```

## 🧪 Executando os Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm run test:watch

# Rodar testes com verbose
npm run test:verbose
```

## 📚 Documentação da API

### Motoristas (Drivers)

- `POST /api/drivers` - Criar motorista
- `GET /api/drivers` - Listar todos os motoristas
- `GET /api/drivers/:id` - Buscar motorista por ID
- `PUT /api/drivers/:id` - Atualizar motorista
- `DELETE /api/drivers/:id` - Deletar motorista

### Passageiros (Passengers)

- `POST /api/passengers` - Criar passageiro
- `GET /api/passengers` - Listar todos os passageiros
- `GET /api/passengers/:id` - Buscar passageiro por ID
- `PUT /api/passengers/:id` - Atualizar passageiro
- `DELETE /api/passengers/:id` - Deletar passageiro

### Tarifas (Fare)

- `POST /api/fare/calculate` - Calcular tarifa de uma corrida

### Corridas (Races)

- `POST /api/race/accept` - Aceitar uma corrida e gerar recibo

## 📁 Estrutura de Pastas

```
src/
├── application/          # Casos de uso
│   └── use-cases/
├── domain/              # Lógica de negócio
│   ├── entities/        # Entidades do domínio
├   ├──enums/            # Enumerações
│   ├── repositories/    # Interfaces de repositórios
│   ├── services/        # Serviços de domínio
│   └── value-objects/   # Objetos de valor
├── infrastructure/      # Implementações externas
│   ├── database/        # TypeORM e repositórios
│   ├── services/        # Serviços de infraestrutura
│   └── workers/         # Background workers
├── presentation/        # Camada de apresentação
│   ├── controllers/     # Controllers HTTP
│   ├── dtos/           # Data Transfer Objects
│   ├── middlewares/    # Middlewares Express
│   ├── routes/         # Rotas da API
│   └── schemas/        # Schemas de validação (Zod)
└── shared/             # Código compartilhado
    ├── container/      # Configuração do InversifyJS
    └── errors/         # Classes de erro customizadas
```

## 🎯 Funcionalidades Principais

### 1. Cálculo de Tarifas Dinâmicas

O sistema calcula tarifas baseado em:

- **Distância percorrida** (em metros)
- **Dia da semana** (dia útil ou fim de semana)
- **Período do dia** (manhã, tarde, noite)

### 2. Sistema de Filas com PG-Boss

Processamento assíncrono de recibos usando PG-Boss, permitindo:

- Geração de recibos em background
- Retry automático em caso de falhas
- Rastreamento de jobs

### 3. Validação Robusta

Todas as entradas são validadas usando Zod, garantindo:

- CPF válido e formatado
- Datas válidas
- Coordenadas geográficas corretas
- Endereços completos

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila o TypeScript
npm start            # Inicia em modo produção
npm test             # Executa os testes
npm run test:watch   # Testes em modo watch
npm run lint         # Verifica código com ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Formata código com Prettier
```
