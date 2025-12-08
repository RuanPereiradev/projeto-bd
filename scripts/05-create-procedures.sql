-- scripts/05-create-procedures.sql
-- Criação das Procedures do sistema

USE `equipe422707`;

-- Procedure: Realizar Empréstimo
DELIMITER $$
CREATE OR REPLACE PROCEDURE `sp_realizar_emprestimo`(
    IN p_id_usuario INT,
    IN p_isbn VARCHAR(20),
    OUT p_id_emprestimo INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_exemplar_id INT;
    DECLARE v_tipo_usuario ENUM('ALUNO', 'PROFESSOR', 'FUNCIONARIO');
    DECLARE v_prazo INT;
    DECLARE v_emprestimos_ativos INT;
    DECLARE v_usuario_existe INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Erro ao realizar empréstimo';
        SET p_id_emprestimo = NULL;
    END;
    
    -- Verificar se usuário existe e está ativo
    SELECT COUNT(*) INTO v_usuario_existe
    FROM Usuario 
    WHERE id_usuario = p_id_usuario AND ativo = 1;
    
    IF v_usuario_existe = 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Usuário não encontrado ou inativo';
        SET p_id_emprestimo = NULL;
        LEAVE;
    END IF;
    
    START TRANSACTION;
    
    -- Verificar tipo de usuário
    SELECT tipo INTO v_tipo_usuario 
    FROM Usuario 
    WHERE id_usuario = p_id_usuario;
    
    -- Verificar empréstimos ativos
    SELECT COUNT(*) INTO v_emprestimos_ativos
    FROM Emprestimo e
    JOIN EmprestimoItem ei ON e.id_emprestimo = ei.id_emprestimo
    WHERE e.id_usuario = p_id_usuario AND ei.data_devolvido IS NULL;
    
    -- Aplicar limites por tipo de usuário
    IF v_tipo_usuario = 'ALUNO' AND v_emprestimos_ativos >= 3 THEN
        SET p_success = FALSE;
        SET p_message = 'Aluno já atingiu o limite de 3 empréstimos ativos';
        SET p_id_emprestimo = NULL;
        ROLLBACK;
        LEAVE;
    ELSEIF v_tipo_usuario = 'FUNCIONARIO' AND v_emprestimos_ativos >= 4 THEN
        SET p_success = FALSE;
        SET p_message = 'Funcionário já atingiu o limite de 4 empréstimos ativos';
        SET p_id_emprestimo = NULL;
        ROLLBACK;
        LEAVE;
    ELSEIF v_tipo_usuario = 'PROFESSOR' AND v_emprestimos_ativos >= 5 THEN
        SET p_success = FALSE;
        SET p_message = 'Professor já atingiu o limite de 5 empréstimos ativos';
        SET p_id_emprestimo = NULL;
        ROLLBACK;
        LEAVE;
    END IF;
    
    -- Encontrar exemplar disponível
    SELECT ex.id_exemplar INTO v_exemplar_id
    FROM Exemplar ex
    WHERE ex.ISBN = p_isbn
    AND NOT EXISTS (
        SELECT 1 FROM EmprestimoItem ei 
        WHERE ei.id_exemplar = ex.id_exemplar 
        AND ei.data_devolvido IS NULL
    )
    LIMIT 1;
    
    IF v_exemplar_id IS NULL THEN
        SET p_success = FALSE;
        SET p_message = 'Nenhum exemplar disponível para este livro';
        SET p_id_emprestimo = NULL;
        ROLLBACK;
        LEAVE;
    END IF;
    
    -- Definir prazo
    IF v_tipo_usuario = 'ALUNO' THEN
        SET v_prazo = 15;
    ELSEIF v_tipo_usuario = 'FUNCIONARIO' THEN
        SET v_prazo = 21;
    ELSE -- PROFESSOR
        SET v_prazo = 30;
    END IF;
    
    -- Inserir empréstimo
    INSERT INTO Emprestimo (id_usuario, data_inicio, data_prevista_devolucao)
    VALUES (p_id_usuario, CURDATE(), DATE_ADD(CURDATE(), INTERVAL v_prazo DAY));
    
    SET p_id_emprestimo = LAST_INSERT_ID();
    
    -- Inserir item do empréstimo
    INSERT INTO EmprestimoItem (id_emprestimo, id_exemplar)
    VALUES (p_id_emprestimo, v_exemplar_id);
    
    COMMIT;
    
    SET p_success = TRUE;
    SET p_message = CONCAT('Empréstimo realizado com sucesso. ID: ', p_id_emprestimo);
    
END$$
DELIMITER ;

-- Procedure: Devolver Livro
DELIMITER $$
CREATE OR REPLACE PROCEDURE `sp_devolver_livro`(
    IN p_id_item INT,
    OUT p_multa DECIMAL(10,2),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_data_devolucao DATE DEFAULT CURDATE();
    DECLARE v_item_existe INT;
    
    -- Verificar se item existe
    SELECT COUNT(*) INTO v_item_existe
    FROM EmprestimoItem
    WHERE id_item = p_id_item;
    
    IF v_item_existe = 0 THEN
        SET p_message = 'Item de empréstimo não encontrado';
        SET p_multa = 0;
        LEAVE;
    END IF;
    
    -- Atualizar data de devolução (trigger calculará multa)
    UPDATE EmprestimoItem 
    SET data_devolvido = v_data_devolucao
    WHERE id_item = p_id_item;
    
    -- Buscar multa calculada
    SELECT multa INTO p_multa
    FROM EmprestimoItem
    WHERE id_item = p_id_item;
    
    IF p_multa > 0 THEN
        SET p_message = CONCAT('Livro devolvido com sucesso. Multa aplicada: R$ ', FORMAT(p_multa, 2));
    ELSE
        SET p_message = 'Livro devolvido com sucesso. Sem multa.';
    END IF;
    
END$$
DELIMITER ;

-- Procedure: Renovar Empréstimo
DELIMITER $$
CREATE OR REPLACE PROCEDURE `sp_renovar_emprestimo`(
    IN p_id_emprestimo INT,
    IN p_novo_prazo_dias INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_tipo_usuario ENUM('ALUNO', 'PROFESSOR', 'FUNCIONARIO');
    DECLARE v_id_usuario INT;
    DECLARE v_data_prevista DATE;
    DECLARE v_renovacoes INT DEFAULT 0;
    
    -- Verificar se empréstimo existe e não foi devolvido
    SELECT e.id_usuario, e.data_prevista_devolucao, u.tipo
    INTO v_id_usuario, v_data_prevista, v_tipo_usuario
    FROM Emprestimo e
    JOIN Usuario u ON e.id_usuario = u.id_usuario
    WHERE e.id_emprestimo = p_id_emprestimo
    AND NOT EXISTS (
        SELECT 1 FROM EmprestimoItem ei 
        WHERE ei.id_emprestimo = e.id_emprestimo 
        AND ei.data_devolvido IS NOT NULL
    );
    
    IF v_id_usuario IS NULL THEN
        SET p_success = FALSE;
        SET p_message = 'Empréstimo não encontrado ou já devolvido';
        LEAVE;
    END IF;
    
    -- Limitar renovações
    IF v_tipo_usuario = 'ALUNO' AND p_novo_prazo_dias > 7 THEN
        SET p_success = FALSE;
        SET p_message = 'Alunos podem renovar por no máximo 7 dias';
        LEAVE;
    ELSEIF v_tipo_usuario = 'FUNCIONARIO' AND p_novo_prazo_dias > 14 THEN
        SET p_success = FALSE;
        SET p_message = 'Funcionários podem renovar por no máximo 14 dias';
        LEAVE;
    ELSEIF v_tipo_usuario = 'PROFESSOR' AND p_novo_prazo_dias > 21 THEN
        SET p_success = FALSE;
        SET p_message = 'Professores podem renovar por no máximo 21 dias';
        LEAVE;
    END IF;
    
    -- Atualizar data de devolução
    UPDATE Emprestimo
    SET data_prevista_devolucao = DATE_ADD(v_data_prevista, INTERVAL p_novo_prazo_dias DAY)
    WHERE id_emprestimo = p_id_emprestimo;
    
    SET p_success = TRUE;
    SET p_message = CONCAT('Empréstimo renovado com sucesso. Nova data: ', 
                          DATE_ADD(v_data_prevista, INTERVAL p_novo_prazo_dias DAY));
    
END$$
DELIMITER ;

-- Procedure: Reservar Livro
DELIMITER $$
CREATE OR REPLACE PROCEDURE `sp_reservar_livro`(
    IN p_id_usuario INT,
    IN p_isbn VARCHAR(20),
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_exemplares_disponiveis INT;
    DECLARE v_reservas_ativas INT;
    DECLARE v_usuario_ativo BOOLEAN;
    
    -- Verificar se usuário está ativo
    SELECT ativo INTO v_usuario_ativo
    FROM Usuario
    WHERE id_usuario = p_id_usuario;
    
    IF NOT v_usuario_ativo THEN
        SET p_success = FALSE;
        SET p_message = 'Usuário inativo. Não pode fazer reservas.';
        LEAVE;
    END IF;
    
    -- Verificar exemplares disponíveis (usando a view)
    SELECT exemplares_disponiveis INTO v_exemplares_disponiveis
    FROM vw_disponibilidade_exemplares
    WHERE ISBN = p_isbn;
    
    IF v_exemplares_disponiveis > 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Há exemplares disponíveis. Faça um empréstimo diretamente.';
        LEAVE;
    END IF;
    
    -- Verificar se usuário já tem reserva ativa para este livro
    SELECT COUNT(*) INTO v_reservas_ativas
    FROM Reserva
    WHERE id_usuario = p_id_usuario 
    AND ISBN = p_isbn
    AND data_reserva >= DATE_SUB(CURDATE(), INTERVAL 7 DAY); -- Reservas dos últimos 7 dias
    
    IF v_reservas_ativas > 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Você já tem uma reserva ativa para este livro.';
        LEAVE;
    END IF;
    
    -- Criar reserva
    INSERT INTO Reserva (id_usuario, ISBN, data_reserva)
    VALUES (p_id_usuario, p_isbn, CURDATE());
    
    SET p_success = TRUE;
    SET p_message = 'Livro reservado com sucesso. Você será notificado quando houver exemplar disponível.';
    
END$$
DELIMITER ;

-- Procedure: Relatório de Multas por Usuário
DELIMITER $$
CREATE OR REPLACE PROCEDURE `sp_relatorio_multas_usuario`(
    IN p_id_usuario INT,
    IN p_data_inicio DATE,
    IN p_data_fim DATE
)
BEGIN
    SELECT 
        u.nome,
        u.tipo,
        e.id_emprestimo,
        l.titulo,
        ei.data_devolvido,
        ei.multa,
        e.data_prevista_devolucao,
        DATEDIFF(ei.data_devolvido, e.data_prevista_devolucao) AS dias_atraso
    FROM EmprestimoItem ei
    JOIN Emprestimo e ON ei.id_emprestimo = e.id_emprestimo
    JOIN Usuario u ON e.id_usuario = u.id_usuario
    JOIN Exemplar ex ON ei.id_exemplar = ex.id_exemplar
    JOIN Livro l ON ex.ISBN = l.ISBN
    WHERE u.id_usuario = p_id_usuario
    AND ei.data_devolvido BETWEEN p_data_inicio AND p_data_fim
    AND ei.multa > 0
    ORDER BY ei.data_devolvido DESC;
END$$
DELIMITER ;