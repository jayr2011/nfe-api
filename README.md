# 📄 API NFe - Electronic Invoice System

## 📋 About the Project

API developed in NestJS for managing Electronic Invoices (NFe). The system allows creating, querying, and managing invoices with all necessary information according to Brazilian legislation.

## 🚀 Technologies Used

- **Node.js** v20
- **NestJS** - Backend framework
- **TypeORM** - Database ORM
- **SQLite** - Database
- **Swagger** - API documentation
- **Docker** - Containerization
- **TypeScript** - Programming language
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 📁 Project Structure

```
src/
├── entity/                   # Database entities
│   └── nfe.entity.ts        # NFe entity
├── interfaces/              # TypeScript interfaces
│   └── nfe.interface.ts     # NFe interface
├── nfe/                     # Main NFe module
│   ├── controllers/         # API controllers
│   │   └── nfe.controller.ts
│   ├── services/           # Business services
│   │   └── nfe.service.ts
│   ├── nfe.module.ts       # NFe module
│   └── calculations/       # Calculation services
│       └── calculations.services.ts
├── constants/              # Application constants
│   └── aliquotas.ts       # Tax rates
├── app.module.ts          # Main application module
└── main.ts               # Bootstrap file
test/
├── src/                   # Unit tests
│   └── nfe/
│       ├── controllers/
│       ├── services/
│       ├── interfaces/
│       └── calculations/
├── mocks/                 # Test mocks
│   └── nfe.mock.ts
└── app.e2e-spec.ts       # E2E tests
```

## 🛠️ Features

- ✅ Complete NFe creation with all data
- ✅ NFe query by ID
- ✅ List all NFe records
- ✅ Delete NFe by ID
- ✅ Delete all NFe records
- ✅ Update NFe by ID
- ✅ Automatic tax calculations (ISSQN, COFINS, PIS, CSLL, INSS, IR)
- ✅ Input data validation
- ✅ Automatic Swagger documentation
- ✅ Comprehensive unit and integration testing
- ✅ Code quality with ESLint and Prettier
- ✅ Git hooks with Husky
- ✅ Error handling and logging

## 🗄️ Database

This project uses **SQLite** as the main database:
- **Lightweight and efficient** for development and small applications
- **No additional configuration** required
- **Local file** (`nfe.db`) for data persistence
- **Ideal for** prototyping and standalone applications

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/nfe/create` | Create new NFe |
| GET    | `/nfe/findAll` | List all NFe records |
| GET    | `/nfe/:id` | Find NFe by ID |
| PATCH  | `/nfe/:id` | Update NFe by ID |
| DELETE | `/nfe/:id` | Delete NFe by ID |
| DELETE | `/nfe/all` | Delete all NFe records |

### 📝 NFe Structure

```json
{
  "issuerData": {
    "cpfCnpj": "string",
    "corporateName": "string",
    "tradeName": "string",
    "address": "string",
    "zipCode": "string",
    "phone": "string",
    "email": "string",
    "stateRegistration": "string",
    "municipalRegistration": "string",
    "taxRegime": "string"
  },
  "recipientData": {
    "cpfCnpj": "string",
    "corporateName": "string",
    "zipCode": "string",
    "address": "string",
    "city": "string",
    "stateRegistration": "string",
    "municipalRegistration": "string",
    "phone": "string"
  },
  "servicesDescription": {
    "serviceCode": "string",
    "description": "string",
    "unitValue": 0,
    "quantity": 0,
    "discount": 0
  },
  "aditionalInfo": "string"
}
```

### 📊 Automatic Calculations

The system automatically calculates:
- **Total Invoice Value** - Based on unit value, quantity, and discount
- **PIS/PASEP** - 1.65% rate
- **COFINS** - 7.6% rate  
- **CSLL** - 9% rate
- **INSS** - 20% rate
- **IR** - 15% rate
- **ISSQN** - 2% rate
- **Net Value** - Total value minus all taxes
- **Estimated Taxes Value** - Sum of all calculated taxes

## 🚀 How to Run

### Prerequisites

- Node.js v20+
- Docker (optional)
- npm or yarn

### 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd api-nfe
```

2. **Install dependencies:**
```bash
npm install
```

### 🔧 Local Execution

**Development:**
```bash
npm run start:dev
```

**Production:**
```bash
npm run build
npm run start:prod
```

### 🐳 Docker Execution

**Development:**
```bash
docker-compose up
```

**Build image:**
```bash
docker build -t api-nfe .
```

## 📖 API Documentation



After starting the application, access the Swagger documentation at:

```
http://localhost:3000/api
```

## 🧪 Testing

**Run all tests:**
```bash
npm run test
```

**Tests in watch mode:**
```bash
npm run test:watch
```

**Tests with coverage:**
```bash
npm run test:cov
```

**E2E tests:**
```bash
npm run test:e2e
```

**Pre-push validation:**
```bash
npm run pre-push
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode |
| `npm run start:debug` | Start in debug mode |
| `npm run build` | Compile the project |
| `npm run format` | Format the code |
| `npm run lint` | Run the linter |
| `npm run test` | Run unit tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:e2e` | Run E2E tests |
| `npm run pre-push` | Run pre-push validation |

## 🔧 Code Quality

The project includes several code quality tools:

- **ESLint** - Static code analysis
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks
- **Jest** - Testing framework with coverage
- **TypeScript** - Static typing

## 🌍 Environment Variables

```env
NODE_ENV=development|production
PORT=3000
```

## 🏗️ Architecture

The project follows NestJS best practices:

- **Modular architecture** with separated concerns
- **Service layer** for business logic
- **Controller layer** for HTTP handling
- **Entity layer** for data modeling
- **Interface layer** for type definitions
- **Calculation services** for tax computations
- **Comprehensive testing** with mocks and integration tests

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Developed with ❤️ for NFe management.

by Jair Costa

---

If this project was useful to you, give it a star! ⭐⭐⭐⭐⭐