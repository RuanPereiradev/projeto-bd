-- scripts/01-create-tables.sql
-- Criação de todas as tabelas do sistema

CREATE DATABASE IF NOT EXISTS `equipe422707`;

USE `equipe422707`;

-- Tabela Usuario
CREATE TABLE IF NOT EXISTS `Usuario` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(150) NOT NULL,
    `tipo` ENUM (
        'ALUNO',
        'PROFESSOR',
        'FUNCIONARIO'
    ) NOT NULL,
    `endereco` VARCHAR(255) NULL DEFAULT NULL,
    `ativo` TINYINT (1) NULL DEFAULT '1',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_usuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Curso
CREATE TABLE IF NOT EXISTS `Curso` (
    `cod_curso` INT NOT NULL,
    `nome_curso` VARCHAR(150) NOT NULL,
    PRIMARY KEY (`cod_curso`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Aluno
CREATE TABLE IF NOT EXISTS `Aluno` (
    `id_usuario` INT NOT NULL,
    `matricula` VARCHAR(20) NOT NULL,
    `cod_curso` INT NOT NULL,
    `data_ingresso` DATE NOT NULL,
    `data_conclusao_prevista` DATE NOT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `matricula` (`matricula`),
    KEY `cod_curso` (`cod_curso`),
    CONSTRAINT `Aluno_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE,
    CONSTRAINT `Aluno_ibfk_2` FOREIGN KEY (`cod_curso`) REFERENCES `Curso` (`cod_curso`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Funcionario
CREATE TABLE IF NOT EXISTS `Funcionario` (
    `id_usuario` INT NOT NULL,
    `matricula` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `matricula` (`matricula`),
    CONSTRAINT `Funcionario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Professor
CREATE TABLE IF NOT EXISTS `Professor` (
    `id_usuario` INT NOT NULL,
    `mat_siape` VARCHAR(20) NOT NULL,
    `endereco` VARCHAR(255) NULL DEFAULT NULL,
    `regime_trabalho` ENUM ('20h', '40h', 'DE') NOT NULL,
    `cod_curso` INT NOT NULL,
    `data_contratacao` DATE NOT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `mat_siape` (`mat_siape`),
    KEY `cod_curso` (`cod_curso`),
    CONSTRAINT `Professor_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE,
    CONSTRAINT `Professor_ibfk_2` FOREIGN KEY (`cod_curso`) REFERENCES `Curso` (`cod_curso`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Telefone
CREATE TABLE IF NOT EXISTS `Telefone` (
    `id_telefone` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id_telefone`),
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `Telefone_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Categoria
CREATE TABLE IF NOT EXISTS `Categoria` (
    `cod_categoria` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(150) NOT NULL,
    PRIMARY KEY (`cod_categoria`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Subcategoria
CREATE TABLE IF NOT EXISTS `Subcategoria` (
    `cod_subcategoria` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(150) NOT NULL,
    `cod_categoria` INT NOT NULL,
    PRIMARY KEY (`cod_subcategoria`),
    KEY `cod_categoria` (`cod_categoria`),
    CONSTRAINT `Subcategoria_ibfk_1` FOREIGN KEY (`cod_categoria`) REFERENCES `Categoria` (`cod_categoria`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Autor
CREATE TABLE IF NOT EXISTS `Autor` (
    `id_autor` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NULL DEFAULT NULL,
    `nacionalidade` VARCHAR(100) NULL DEFAULT NULL,
    PRIMARY KEY (`id_autor`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Livro
CREATE TABLE IF NOT EXISTS `Livro` (
    `ISBN` VARCHAR(20) NOT NULL,
    `titulo` VARCHAR(200) NOT NULL,
    `ano_lancamento` SMALLINT NOT NULL,
    `editora` VARCHAR(150) NOT NULL,
    `quantidade_exemplares` INT NOT NULL,
    `cod_categoria` INT NOT NULL,
    `cod_subcategoria` INT NOT NULL,
    PRIMARY KEY (`ISBN`),
    KEY `cod_categoria` (`cod_categoria`),
    KEY `cod_subcategoria` (`cod_subcategoria`),
    CONSTRAINT `Livro_ibfk_1` FOREIGN KEY (`cod_categoria`) REFERENCES `Categoria` (`cod_categoria`),
    CONSTRAINT `Livro_ibfk_2` FOREIGN KEY (`cod_subcategoria`) REFERENCES `Subcategoria` (`cod_subcategoria`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Exemplar
CREATE TABLE IF NOT EXISTS `Exemplar` (
    `id_exemplar` INT NOT NULL AUTO_INCREMENT,
    `ISBN` VARCHAR(20) NOT NULL,
    `numero_sequencial` INT NOT NULL,
    PRIMARY KEY (`id_exemplar`),
    UNIQUE KEY `ISBN` (`ISBN`, `numero_sequencial`),
    CONSTRAINT `Exemplar_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Livro` (`ISBN`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Emprestimo
CREATE TABLE IF NOT EXISTS `Emprestimo` (
    `id_emprestimo` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    `data_inicio` DATE NOT NULL,
    `data_prevista_devolucao` DATE NOT NULL,
    `data_real_devolucao` DATE NULL DEFAULT NULL,
    PRIMARY KEY (`id_emprestimo`),
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `Emprestimo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela EmprestimoItem
CREATE TABLE IF NOT EXISTS `EmprestimoItem` (
    `id_item` INT NOT NULL AUTO_INCREMENT,
    `id_emprestimo` INT NOT NULL,
    `id_exemplar` INT NOT NULL,
    `data_devolvido` DATE NULL DEFAULT NULL,
    `multa` DECIMAL(10, 2) NULL DEFAULT '0.00',
    PRIMARY KEY (`id_item`),
    KEY `id_emprestimo` (`id_emprestimo`),
    KEY `id_exemplar` (`id_exemplar`),
    CONSTRAINT `EmprestimoItem_ibfk_1` FOREIGN KEY (`id_emprestimo`) REFERENCES `Emprestimo` (`id_emprestimo`) ON DELETE CASCADE,
    CONSTRAINT `EmprestimoItem_ibfk_2` FOREIGN KEY (`id_exemplar`) REFERENCES `Exemplar` (`id_exemplar`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela Reserva
CREATE TABLE IF NOT EXISTS `Reserva` (
    `id_reserva` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    `ISBN` VARCHAR(20) NOT NULL,
    `data_reserva` DATE NOT NULL,
    PRIMARY KEY (`id_reserva`),
    KEY `id_usuario` (`id_usuario`),
    KEY `ISBN` (`ISBN`),
    CONSTRAINT `Reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE,
    CONSTRAINT `Reserva_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `Livro` (`ISBN`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabela LivroAutor
CREATE TABLE IF NOT EXISTS `LivroAutor` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `ISBN` VARCHAR(20) NOT NULL,
    `id_autor` INT NOT NULL,
    `autor_principal` TINYINT (1) NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `ISBN` (`ISBN`),
    KEY `id_autor` (`id_autor`),
    CONSTRAINT `LivroAutor_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Livro` (`ISBN`) ON DELETE CASCADE,
    CONSTRAINT `LivroAutor_ibfk_2` FOREIGN KEY (`id_autor`) REFERENCES `Autor` (`id_autor`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;