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




# 📚 Sistema de Biblioteca – Requisitos Funcionais (RF)
## 🧑‍🎓 1. Usuários do Sistema
### RF01 – Manter usuários

O sistema deve permitir cadastrar, consultar, atualizar e desativar usuários do tipo:

Aluno

Professor

Funcionário

### RF02 – Identificar tipo de usuário

O sistema deve identificar o tipo do usuário (ALUNO, PROFESSOR ou FUNCIONÁRIO) no momento do acesso, pois:

O tipo influencia regras de empréstimo

O tipo define prazos e limites

RF03 – Ativar e desativar usuário

O sistema deve permitir ativar ou desativar um usuário, impedindo usuários inativos de:

Realizar empréstimos

Realizar reservas

## 🎓 2. Alunos
### RF04 – Manter alunos

O sistema deve permitir cadastrar, consultar, atualizar e desativar alunos, associando:

Matrícula

Curso

Data de ingresso

Data de conclusão prevista

### RF05 – Bloquear aluno concluído

O sistema deve impedir o cadastro de alunos cuja data de conclusão prevista já tenha sido atingida
(regra aplicada via trigger no banco).

RF06 – Consultar alunos por curso

O sistema deve permitir consultar alunos vinculados a um determinado curso.

## 👨‍🏫 3. Professores
### RF07 – Manter professores

O sistema deve permitir cadastrar, consultar, atualizar e desativar professores, associando:

Matrícula SIAPE

Regime de trabalho

Curso

Data de contratação

### RF08 – Consultar professores por curso

O sistema deve permitir consultar professores por curso, conforme view vw_professores_por_curso.

## 🧑‍💼 4. Funcionários
### RF09 – Manter funcionários

O sistema deve permitir cadastrar, consultar, atualizar e desativar funcionários, associando:

Matrícula funcional

## 📖 5. Livros
### RF10 – Manter livros

O sistema deve permitir cadastrar, consultar, atualizar e remover livros, informando:

ISBN

Título

Ano de lançamento

Editora

Categoria e subcategoria

### RF11 – Associar autores aos livros

O sistema deve permitir associar um ou mais autores a um livro, identificando o autor principal.

### RF12 – Consultar livros por autor

O sistema deve permitir consultar livros por autor, conforme view vw_livros_por_autor.

### RF13 – Consultar livros por categoria e subcategoria

O sistema deve permitir consultar livros por categoria e subcategoria, conforme views:

vw_livros_por_categoria

vw_livros_por_subcategoria

### RF14 – Consultar livros por editora

O sistema deve permitir consultar livros por editora, conforme view vw_livros_por_editora.

RF15 – Consultar livros por ano

O sistema deve permitir consultar livros por ano de lançamento, conforme view vw_livros_por_ano.

## 📦 6. Exemplares
### RF16 – Manter exemplares

O sistema deve permitir cadastrar e remover exemplares de livros, mantendo:

Número sequencial por ISBN

### RF17 – Atualizar quantidade de exemplares

O sistema deve atualizar automaticamente a quantidade de exemplares de um livro ao:

Inserir exemplar

Remover exemplar
(regra aplicada via trigger).

### RF18 – Consultar disponibilidade de exemplares

O sistema deve permitir consultar exemplares disponíveis, conforme view vw_disponibilidade_exemplares.

## 📑 7. Empréstimos
### RF19 – Registrar empréstimo

O sistema deve permitir registrar empréstimos de livros, vinculando:

Usuário

Data de início

Data prevista de devolução

### RF20 – Restringir limite de empréstimos

O sistema deve respeitar os limites por tipo de usuário:

Aluno: até 3 livros por 15 dias

Funcionário: até 4 livros por 21 dias

Professor: até 5 livros por 30 dias

### RF21 – Impedir empréstimo sem exemplar disponível

O sistema deve impedir o empréstimo caso não haja exemplares disponíveis.

### RF22 – Listar empréstimos ativos

O sistema deve permitir consultar empréstimos ativos, conforme view vw_emprestimos_ativos.

### RF23 – Consultar empréstimos por usuário

O sistema deve permitir que o usuário consulte seus próprios empréstimos.

### RF24 – Registrar devolução

O sistema deve permitir registrar a devolução de exemplares de um empréstimo.

### RF25 – Atualizar data real de devolução

O sistema deve atualizar automaticamente a data real de devolução quando todos os itens forem devolvidos
(regra aplicada via trigger).

## 💰 8. Multas
### RF26 – Calcular multa automaticamente

O sistema deve calcular automaticamente a multa no momento da devolução, conforme:

Tipo de usuário

Dias de atraso
(regra aplicada via trigger).

## 📌 9. Reservas
### RF27 – Registrar reserva

O sistema deve permitir registrar reservas de livros, vinculando:

Usuário

Livro

Data da reserva

RF28 – Consultar reservas por livro

O sistema deve permitir consultar reservas por livro, conforme view vw_reservas_por_livro.

## 🔐 10. Acesso ao Sistema
### RF29 – Identificação de usuário

```text
O sistema deve permitir identificação do usuário informando:

Tipo de usuário

Matrícula correspondente (matrícula, SIAPE ou funcional)

RF30 – Acesso restrito às próprias informações

O sistema deve garantir que o usuário acesse apenas seus próprios dados, empréstimos e reservas.

✅ Observação final (importante)

- O sistema não utiliza senha

- A autenticação é institucional, baseada em dados já existentes

- Regras críticas estão garantidas no banco via triggers

- Views são usadas para consultas e relatórios
