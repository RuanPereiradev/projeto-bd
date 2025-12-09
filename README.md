### 

# 📚 **Plano de Desenvolvimento — Sistema de Biblioteca Acadêmica (Clean Architecture + DDD + UseCases)**

## ✅ **Visão Geral do Projeto**

Este documento organiza todo o plano de desenvolvimento do sistema da Biblioteca Acadêmica, utilizando:

- **DDD (Domain-Driven Design)**
- **Clean Architecture**
- **Use Cases (Aplicação)**
- **SOLID**
- **Repository Pattern**
- **Mappers / DTOs**
- **Modularização por contexto de domínio**

---

# 📂 **Macro Estrutura do Projeto (Clean Architecture)**

```
/src
  /domain
    /entities
    /valueObjects
    /repositories
    /services
    /exceptions

  /application
    /usecases
    /dto
    /interfaces

  /infra
    /db
      /models
      /migrations
    /repositories
    /mappers
    /config

  /api
    /controllers
    /middlewares
    /routes

```

---

# 🧠 **Domínios Principais (Bounded Contexts - DDD)**

## **1. Domínio: Livros**

- Livro
- Autor
- Editora
- Categoria
- Subcategoria
- Exemplar

## **2. Domínio: Usuários**

- Aluno
- Professor
- Funcionário
- Curso
- Telefone (VO)
- Status do usuário (ativo/inativo)

## **3. Domínio: Reserva**

- Reserva
- Datas
- Estado da reserva

## **4. Domínio: Empréstimo**

- Empréstimo
- Regras por tipo de usuário
- Multas
- Devolução

## **5. Domínio: Autenticação / Acesso**

- Usuário do sistema
- Permissões (Admin, Bibliotecário, Usuário)
- Login
- Sessão

---

# 🧱 **Entidades Principais (Domain Layer)**

## **Livro**

- ISBN (VO)
- Título
- Ano
- Editora
- Categoria/Subcategoria
- Autores[]
- Exemplares[]

## **Exemplar**

- Número sequencial
- Status (disponível / emprestado / reservado)

## **Usuários (Polimorfismo)**

- Aluno → limite: 3 livros / 15 dias
- Professor → limite: 5 livros / 30 dias
- Funcionário → limite: 4 livros / 21 dias

## **Empréstimo**

- id
- usuário
- data início
- data devolução prevista
- itens emprestados[]

## **Reserva**

- id
- usuário
- livro
- data reserva

---

# 🎯 **Casos de Uso (Application Layer)**

## **Domínio: Acesso**

- LoginUsuarioUseCase
- LogoutUsuarioUseCase
- ValidarPermissãoUseCase

## **Domínio: Livros**

- CriarLivroUseCase
- AtualizarLivroUseCase
- RemoverLivroUseCase
- ListarLivrosUseCase
- ConsultarLivroPorFiltroUseCase (nome, autor, ano etc.)
- CriarExemplarUseCase
- AtualizarExemplarUseCase
- RemoverExemplarUseCase

## **Domínio: Categoria/Subcategoria**

- CriarCategoriaUseCase
- CriarSubcategoriaUseCase
- ListarCategoriasUseCase

## **Domínio: Usuários**

- CadastrarAlunoUseCase (valida data de conclusão)
- CadastrarProfessorUseCase
- CadastrarFuncionarioUseCase
- ListarUsuariosUseCase
- AtualizarUsuarioUseCase
- InativarUsuarioUseCase

## **Domínio: Reservas**

- CriarReservaUseCase
- ListarReservasPorLivroUseCase
- CancelarReservaUseCase

## **Domínio: Empréstimos**

- RealizarEmprestimoUseCase
- RenovarEmprestimoUseCase
- ComprarDevoluçãoUseCase
- CalcularMultaUseCase

---

# ⚙️ **Infra Layer (DB / Repositórios / Mappers)**

### **Repositórios por domínio**

- LivroRepository
- CategoriaRepository
- UsuarioRepository
- ReservaRepository
- EmprestimoRepository

Eles implementam as interfaces da camada Domain e são usados pelos Use Cases.

---

# 📘 **Regras de Domínio Importantes**

### **1. Regras de empréstimo**

- aluno → até **3 livros** / **15 dias**
- funcionário → até **4 livros** / **21 dias**
- professor → até **5 livros** / **30 dias**

UseCase:

```tsx
VerificarElegibilidadeEmprestimoUseCase

```

### **2. Regras de multa**

- aluno → R$ 1,00 por dia
- funcionário → R$ 1,50 por dia
- professor → R$ 2,00 por dia

### **3. Cadastro de aluno**

- Se data de conclusão já passou → **não pode cadastrar**
- Validar por Trigger no BD + validação no domínio

### **4. Exemplar só existe se o Livro existir**

- Constraint + regra na entidade

### **5. Polimorfismo nos usuários**

- Entities:

```
Usuario (abstract)
Aluno
Professor
Funcionario

```

### **6. Visões do BD necessárias**

- Livros por categoria
- Livros por autor
- Professores por curso
- Reservas por livro

---

# 📅 **Roadmap de Desenvolvimento**

## 🟩 **Semana 1 — Modelagem**

- Modelagem conceitual (DER)
- Modelagem lógica
- Modelagem física
- Scripts de criação
- Criação do repositório Git
- Configuração inicial do ambiente

## 🟦 **Semana 2 — Setup do Projeto + Domínio**

- Criar projeto base com Clean Architecture
- Criar Entities + Value Objects
- Criar Regras de Domínio
- Criar Interfaces dos Repositórios

## 🟧 **Semana 3 — Use Cases**

- Criar todos os casos de uso principais
- Criar DTOs
- Criar Validadores

## 🟥 **Semana 4 — Infraestrutura**

- Criar Repositórios concretos
- Criar Mappers
- Criar migrations
- Criar visões do BD
- Integrar com Use Cases

## 🟪 **Semana 5 — API**

- Criar Controllers
- Criar Rotas
- Criar Middlewares
- Criar autenticação/níveis de acesso

## 🟫 **Semana 6 — Application Final**

- Interfaces gráficas / telas
- Funcionalidades completas
- Testes básicos

## 🟨 **Semana 7 — Documentação**

- PDF da aplicação
- Manual do usuário
- Slides da apresentação

---

# 📝 **Backlog Principal**

| Tarefa | Tipo | Contexto | Status |
| --- | --- | --- | --- |
| Criar DER | Modelagem | BD | 🔄 |
| Criar Script SQL | Modelagem | BD | 🔄 |
| Criar Entities | Domain | Livros/Usuários | 🔄 |
| Criar Repositórios | Infra | Todos | 🔄 |
| Criar UseCases | Application | Todos | 🔄 |
| Criar API de Livros | API | Livros | 🔄 |
| Criar API de Usuários | API | Usuários | 🔄 |
| Implementar Reservas | Domain+App | Reservas | 🔄 |
| Implementar Empréstimos | Domain+App | Empréstimos | 🔄 |
| Criar Login/Admin | Acesso | Auth | 🔄 |
| Criar Visões SQL | BD | Consultas | 🔄 |
| Criar Interface Gráfica | UX | Sistema | 🔄 |
| Criar documentação PDF | Finalização | Docs | 🔄 |
| Criar Slides | Finalização | Apresentação | 🔄 |
