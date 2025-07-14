# 📄 API NFe - Sistema de Nota Fiscal Eletrônica

## 📋 Sobre o Projeto

API desenvolvida em NestJS para gerenciamento de Notas Fiscais Eletrônicas (NFe). O sistema permite criar, consultar e gerenciar notas fiscais com todas as informações necessárias conforme legislação brasileira.

## 🚀 Tecnologias Utilizadas

- **Node.js** v20
- **NestJS** - Framework backend
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Swagger** - Documentação da API
- **Docker** - Containerização
- **TypeScript** - Linguagem de programação

## 📁 Estrutura do Projeto

```
src/
├── entity/              # Entidades do banco de dados
│   └── nfe.entity.ts    # Entidade NFe
├── interfaces/          # Interfaces TypeScript
│   └── nfe.interface.ts # Interface NFe
├── nfe/                 # Módulo principal NFe
│   ├── nfe.controller.ts    # Controller da API
│   ├── nfe.service.ts       # Serviços de negócio
│   ├── nfe.module.ts        # Módulo NFe
│   └── calculations/        # Serviços de cálculo
│       └── calculations.services.ts
├── app.module.ts        # Módulo principal da aplicação
└── main.ts             # Arquivo de inicialização
```

## 🛠️ Funcionalidades

- ✅ Criação de NFe com dados completos
- ✅ Consulta de NFe por ID
- ✅ Listagem de todas as NFe
- ✅ Deleção de NFe por ID
- ✅ Deleção de todas as NFe
- ✅ Cálculos automáticos de impostos (ISSQN, COFINS, etc.)
- ✅ Validação de dados de entrada
- ✅ Documentação automática com Swagger

## 🗄️ Banco de Dados

Este projeto utiliza **SQLite** como banco de dados principal:
- **Leve e eficiente** para desenvolvimento e pequenas aplicações
- **Sem configuração adicional** necessária
- **Arquivo local** (`nfe.db`) para persistência de dados
- **Ideal para** prototipagem e aplicações standalone

## 📚 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/nfe/create` | Criar nova NFe |
| GET    | `/nfe/findAll` | Listar todas as NFe |
| GET    | `/nfe/:id` | Buscar NFe por ID |
| DELETE | `/nfe/:id` | Deletar NFe por ID |
| DELETE | `/nfe` | Deletar todas as NFe |

### 📝 Estrutura da NFe

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
  "aditionalInfo": "string",
  "issqnValue": 0,
  "cofinsValue": 0
}
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js v20+
- Docker (opcional)
- npm ou yarn

### 📦 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd api-nfe
```

2. **Instale as dependências:**
```bash
npm install
```

### 🔧 Execução Local

**Desenvolvimento:**
```bash
npm run start:dev
```

**Produção:**
```bash
npm run build
npm run start:prod
```

### 🐳 Execução com Docker

**Desenvolvimento:**
```bash
docker-compose up
```

**Build da imagem:**
```bash
docker build -t api-nfe .
```

## 📖 Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger em:
```
http://localhost:3000/api
```

## 🧪 Testes

**Executar todos os testes:**
```bash
npm run test
```

**Testes em modo watch:**
```bash
npm run test:watch
```

**Testes com coverage:**
```bash
npm run test:cov
```

**Testes E2E:**
```bash
npm run test:e2e
```

## 📊 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run start:debug` | Inicia em modo debug |
| `npm run build` | Compila o projeto |
| `npm run format` | Formata o código |
| `npm run lint` | Executa o linter |

## 🌍 Variáveis de Ambiente

```env
NODE_ENV=development|production
PORT=3000
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

Desenvolvido com ❤️ para o gerenciamento de NFe.

por Jair Costa

---

Se este projeto foi útil para você, mande uma estrela! ⭐⭐⭐⭐⭐