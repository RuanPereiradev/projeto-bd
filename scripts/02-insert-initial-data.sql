-- scripts/02-insert-initial-data.sql
-- Dados iniciais do sistema

USE `equipe422707`;

-- Cursos
INSERT INTO
    `Curso` (`cod_curso`, `nome_curso`)
VALUES (1, 'Ciência da Computação'),
    (2, 'Engenharia de Software'),
    (3, 'Sistemas de Informação'),
    (4, 'Administração'),
    (5, 'Direito');

-- Categorias
INSERT INTO
    `Categoria` (`cod_categoria`, `descricao`)
VALUES (1, 'Tecnologia'),
    (2, 'Ciências Humanas'),
    (3, 'Exatas'),
    (4, 'Literatura'),
    (5, 'Direito');

-- Subcategorias
INSERT INTO
    `Subcategoria` (
        `cod_subcategoria`,
        `descricao`,
        `cod_categoria`
    )
VALUES (1, 'Programação', 1),
    (2, 'Banco de Dados', 1),
    (3, 'Redes', 1),
    (4, 'Filosofia', 2),
    (5, 'Matemática', 3),
    (6, 'Romance', 4);

-- Autores
INSERT INTO
    `Autor` (
        `id_autor`,
        `nome`,
        `email`,
        `nacionalidade`
    )
VALUES (
        1,
        'Robert C. Martin',
        'robert@cleancode.com',
        'EUA'
    ),
    (
        2,
        'Eric Evans',
        'eric@ddd.com',
        'EUA'
    ),
    (
        3,
        'Martin Fowler',
        'martin@patterns.com',
        'Reino Unido'
    ),
    (
        4,
        'Machado de Assis',
        NULL,
        'Brasil'
    ),
    (
        5,
        'Clarice Lispector',
        NULL,
        'Brasil'
    );

-- Usuários de exemplo
INSERT INTO
    `Usuario` (
        `nome`,
        `tipo`,
        `endereco`,
        `ativo`
    )
VALUES (
        'João Silva',
        'ALUNO',
        'Rua das Flores, 123',
        1
    ),
    (
        'Maria Santos',
        'PROFESSOR',
        'Av. Principal, 456',
        1
    ),
    (
        'Pedro Oliveira',
        'FUNCIONARIO',
        'Travessa Central, 789',
        1
    ),
    (
        'Ana Costa',
        'ALUNO',
        'Alameda dos Anjos, 321',
        1
    );

-- Alunos
INSERT INTO
    `Aluno` (
        `id_usuario`,
        `matricula`,
        `cod_curso`,
        `data_ingresso`,
        `data_conclusao_prevista`
    )
VALUES (
        1,
        '2023001',
        1,
        '2023-01-15',
        '2027-12-20'
    ),
    (
        4,
        '2023002',
        2,
        '2023-02-10',
        '2027-11-30'
    );

-- Professor
INSERT INTO
    `Professor` (
        `id_usuario`,
        `mat_siape`,
        `endereco`,
        `regime_trabalho`,
        `cod_curso`,
        `data_contratacao`
    )
VALUES (
        2,
        'SIAPE001',
        'Av. Principal, 456',
        '40h',
        1,
        '2020-03-15'
    );

-- Funcionário
INSERT INTO
    `Funcionario` (`id_usuario`, `matricula`)
VALUES (3, 'FUNC001');

-- Telefones
INSERT INTO
    `Telefone` (`id_usuario`, `telefone`)
VALUES (1, '(11) 9999-8888'),
    (2, '(11) 9777-6666'),
    (3, '(11) 9555-4444'),
    (4, '(11) 9333-2222');

-- Livros
INSERT INTO
    `Livro` (
        `ISBN`,
        `titulo`,
        `ano_lancamento`,
        `editora`,
        `quantidade_exemplares`,
        `cod_categoria`,
        `cod_subcategoria`
    )
VALUES (
        '978-0132350884',
        'Clean Code',
        2008,
        'Prentice Hall',
        5,
        1,
        1
    ),
    (
        '978-0321125217',
        'Domain-Driven Design',
        2003,
        'Addison-Wesley',
        3,
        1,
        1
    ),
    (
        '978-0201633610',
        'Design Patterns',
        1994,
        'Addison-Wesley',
        4,
        1,
        1
    ),
    (
        '978-8535902779',
        'Dom Casmurro',
        1899,
        'Editora Garnier',
        2,
        4,
        6
    ),
    (
        '978-8571644973',
        'A Hora da Estrela',
        1977,
        'Rocco',
        3,
        4,
        6
    );

-- Exemplares
INSERT INTO
    `Exemplar` (`ISBN`, `numero_sequencial`)
VALUES ('978-0132350884', 1),
    ('978-0132350884', 2),
    ('978-0132350884', 3),
    ('978-0321125217', 1),
    ('978-0321125217', 2),
    ('978-0201633610', 1),
    ('978-0201633610', 2),
    ('978-8535902779', 1),
    ('978-8571644973', 1);

-- LivroAutor (relacionamento)
INSERT INTO
    `LivroAutor` (
        `ISBN`,
        `id_autor`,
        `autor_principal`
    )
VALUES ('978-0132350884', 1, 1),
    ('978-0321125217', 2, 1),
    ('978-0201633610', 3, 1),
    ('978-8535902779', 4, 1),
    ('978-8571644973', 5, 1);