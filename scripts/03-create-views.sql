-- scripts/03-create-views.sql
-- Criação das Views do sistema

USE `equipe422707`;

-- View: Livros por Autor
CREATE
OR REPLACE VIEW `vw_livros_por_autor` AS
SELECT
    a.nome AS autor,
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    l.editora AS editora,
    l.ano_lancamento AS ano_lancamento,
    CASE
        WHEN la.autor_principal = 1 THEN 'SIM'
        ELSE 'NÃO'
    END AS autor_principal
FROM
    `LivroAutor` la
    JOIN `Autor` a ON la.id_autor = a.id_autor
    JOIN `Livro` l ON la.ISBN = l.ISBN
ORDER BY a.nome, l.titulo;

-- View: Livros por Categoria
CREATE
OR REPLACE VIEW `vw_livros_por_categoria` AS
SELECT
    c.descricao AS categoria,
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    l.editora AS editora,
    l.ano_lancamento AS ano_lancamento
FROM `Livro` l
    JOIN `Categoria` c ON l.cod_categoria = c.cod_categoria
ORDER BY c.descricao, l.titulo;

-- View: Livros por Subcategoria
CREATE
OR REPLACE VIEW `vw_livros_por_subcategoria` AS
SELECT
    c.descricao AS categoria,
    s.descricao AS subcategoria,
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    l.editora AS editora,
    l.ano_lancamento AS ano_lancamento
FROM
    `Livro` l
    JOIN `Subcategoria` s ON l.cod_subcategoria = s.cod_subcategoria
    JOIN `Categoria` c ON s.cod_categoria = c.cod_categoria
ORDER BY s.descricao, l.titulo;

-- View: Livros por Editora
CREATE
OR REPLACE VIEW `vw_livros_por_editora` AS
SELECT
    l.editora AS editora,
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    l.ano_lancamento AS ano_lancamento
FROM `Livro` l
ORDER BY l.editora, l.titulo;

-- View: Livros por Ano
CREATE
OR REPLACE VIEW `vw_livros_por_ano` AS
SELECT
    l.ano_lancamento AS ano_lancamento,
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    l.editora AS editora
FROM `Livro` l
ORDER BY l.ano_lancamento DESC, l.titulo;

-- View: Disponibilidade de Exemplares
CREATE
OR REPLACE VIEW `vw_disponibilidade_exemplares` AS
SELECT
    l.ISBN AS ISBN,
    l.titulo AS titulo,
    l.quantidade_exemplares AS quantidade_exemplares,
    COUNT(ei.id_exemplar) AS exemplares_emprestados,
    (
        l.quantidade_exemplares - COUNT(ei.id_exemplar)
    ) AS exemplares_disponiveis
FROM
    `Livro` l
    LEFT JOIN `Exemplar` ex ON ex.ISBN = l.ISBN
    LEFT JOIN `EmprestimoItem` ei ON ei.id_exemplar = ex.id_exemplar
    AND ei.data_devolvido IS NULL
GROUP BY
    l.ISBN,
    l.titulo,
    l.quantidade_exemplares
ORDER BY l.titulo;

-- View: Professores por Curso
CREATE
OR REPLACE VIEW `vw_professores_por_curso` AS
SELECT
    c.nome_curso AS nome_curso,
    p.mat_siape AS mat_siape,
    u.nome AS nome,
    p.regime_trabalho AS regime_trabalho,
    p.data_contratacao AS data_contratacao
FROM
    `Professor` p
    JOIN `Usuario` u ON p.id_usuario = u.id_usuario
    JOIN `Curso` c ON p.cod_curso = c.cod_curso
ORDER BY c.nome_curso, u.nome;

-- View: Reservas por Livro
CREATE
OR REPLACE VIEW `vw_reservas_por_livro` AS
SELECT
    l.titulo AS titulo,
    l.ISBN AS ISBN,
    r.data_reserva AS data_reserva,
    u.nome AS usuario
FROM
    `Reserva` r
    JOIN `Livro` l ON r.ISBN = l.ISBN
    JOIN `Usuario` u ON r.id_usuario = u.id_usuario
ORDER BY l.titulo, r.data_reserva DESC;

-- View: Empréstimos Ativos
CREATE
OR REPLACE VIEW `vw_emprestimos_ativos` AS
SELECT
    e.id_emprestimo,
    u.nome AS usuario,
    l.titulo AS livro,
    ex.numero_sequencial AS exemplar,
    e.data_inicio,
    e.data_prevista_devolucao,
    DATEDIFF (
        CURRENT_DATE,
        e.data_prevista_devolucao
    ) AS dias_atraso
FROM
    `Emprestimo` e
    JOIN `Usuario` u ON e.id_usuario = u.id_usuario
    JOIN `EmprestimoItem` ei ON e.id_emprestimo = ei.id_emprestimo
    JOIN `Exemplar` ex ON ei.id_exemplar = ex.id_exemplar
    JOIN `Livro` l ON ex.ISBN = l.ISBN
WHERE
    ei.data_devolvido IS NULL
ORDER BY e.data_prevista_devolucao;