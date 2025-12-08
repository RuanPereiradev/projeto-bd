# 📦 Configuração do Ambiente com Docker + MySQL + Scripts SQL

### Este guia explica de forma clara e didática como configurar um ambiente usando Docker, Docker Compose e scripts SQL para criar e popular um banco de dados automaticamente.

## 🗂 Estrutura de Pastas Recomendada
```pgsql
/seu-projeto
│
├── docker-compose.yml
│
└── scripts/
    ├── 01-database.sql
    ├── 02-tables.sql
    ├── 03-views.sql
    ├── 04-inserts.sql
    └── init.sh
```

- A pasta scripts/ fica na raiz do projeto.

- Os arquivos vão rodar na ordem numérica, garantindo que tudo seja criado corretamente.

## 🐳 Docker Compose

### O docker-compose.yml sobe o MySQL e executa tudo automaticamente via init.sh:
```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: biblioteca_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3307:3306"
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 📜 Script de Inicialização (init.sh)

### Este script executa seus arquivos SQL na ordem correta:

```bash
#!/bin/bash
set -e

echo "🚀 Iniciando execução dos scripts SQL..."

for file in /docker-entrypoint-initdb.d/*.sql; do
    echo "📄 Executando: $file"
    mysql -u root -proot < "$file"
done

echo "✅ Finalizado!"
```
- Importante: dê permissão de execução:
- chmod +x scripts/init.sh

## ▶️ Como rodar tudo

1. Subir o MySQL com Docker

```bash
docker compose up -d
```

2. Verificar se o container está rodando
```bash
docker ps
```

 - Deve aparecer algo como:
 ```ngnix
biblioteca_mysql    mysql:8.0    Up ...  0.0.0.0:3307->3306/tcp
```

3. Entrar no MySQL

```bash
docker exec -it biblioteca_mysql mysql -u root -proot
```

## 🔍 Verificando se as views foram criadas

Dentro do MySQL:

```sql
USE equipe422707;
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

 - Você verá algo como:

```bash 
| vw_disponibilidade_exemplares |
| vw_emprestimos_ativos         |
| vw_livros_por_ano             |
| ...                           |
```