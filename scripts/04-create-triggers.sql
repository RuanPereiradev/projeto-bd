-- scripts/04-create-triggers.sql
-- Criação dos Triggers do sistema

USE `equipe422707`;

-- Trigger: Bloqueia cadastro de aluno com data de conclusão passada
DELIMITER $$

CREATE OR REPLACE TRIGGER `trg_bloqueia_aluno_concluido`
BEFORE INSERT ON `Aluno`
FOR EACH ROW
BEGIN
    IF NEW.data_conclusao_prevista <= CURDATE() THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cadastro bloqueado: data de conclusão prevista já foi atingida.';
    END IF;
END$$

DELIMITER;

-- Trigger: Atualiza quantidade_exemplares quando um exemplar é adicionado
DELIMITER $$

CREATE OR REPLACE TRIGGER `trg_atualiza_quantidade_exemplares_insert`
AFTER INSERT ON `Exemplar`
FOR EACH ROW
BEGIN
    UPDATE `Livro` 
    SET quantidade_exemplares = quantidade_exemplares + 1
    WHERE ISBN = NEW.ISBN;
END$$

DELIMITER;

-- Trigger: Atualiza quantidade_exemplares quando um exemplar é removido
DELIMITER $$

CREATE OR REPLACE TRIGGER `trg_atualiza_quantidade_exemplares_delete`
AFTER DELETE ON `Exemplar`
FOR EACH ROW
BEGIN
    UPDATE `Livro` 
    SET quantidade_exemplares = quantidade_exemplares - 1
    WHERE ISBN = OLD.ISBN;
END$$

DELIMITER;

-- Trigger: Calcula multa automaticamente na devolução
DELIMITER $$

CREATE OR REPLACE TRIGGER `trg_calcula_multa`
BEFORE UPDATE ON `EmprestimoItem`
FOR EACH ROW
BEGIN
    DECLARE v_tipo_usuario ENUM('ALUNO', 'PROFESSOR', 'FUNCIONARIO');
    DECLARE v_prazo INT;
    DECLARE v_dias_atraso INT;
    DECLARE v_valor_multa DECIMAL(10,2);

    -- Só calcula se o livro está sendo devolvido
    IF NEW.data_devolvido IS NOT NULL AND OLD.data_devolvido IS NULL THEN
        
        -- Descobrir o tipo do usuário
        SELECT u.tipo INTO v_tipo_usuario
        FROM Emprestimo e
        JOIN Usuario u ON e.id_usuario = u.id_usuario
        WHERE e.id_emprestimo = NEW.id_emprestimo;

        -- Definir prazo conforme tipo
        IF v_tipo_usuario = 'ALUNO' THEN
            SET v_prazo = 15;
        ELSEIF v_tipo_usuario = 'FUNCIONARIO' THEN
            SET v_prazo = 21;
        ELSEIF v_tipo_usuario = 'PROFESSOR' THEN
            SET v_prazo = 30;
        ELSE
            SET v_prazo = 0;
        END IF;

        -- Calcular dias de atraso
        SELECT DATEDIFF(NEW.data_devolvido, e.data_prevista_devolucao) 
        INTO v_dias_atraso
        FROM Emprestimo e
        WHERE e.id_emprestimo = NEW.id_emprestimo;

        IF v_dias_atraso < 0 THEN
            SET v_dias_atraso = 0;
        END IF;

        -- Calcular valor por tipo de usuário
        IF v_tipo_usuario = 'ALUNO' THEN
            SET v_valor_multa = v_dias_atraso * 1.00;
        ELSEIF v_tipo_usuario = 'FUNCIONARIO' THEN
            SET v_valor_multa = v_dias_atraso * 1.50;
        ELSEIF v_tipo_usuario = 'PROFESSOR' THEN
            SET v_valor_multa = v_dias_atraso * 2.00;
        ELSE
            SET v_valor_multa = 0.00;
        END IF;

        SET NEW.multa = v_valor_multa;
    END IF;
END$$

DELIMITER;

-- Trigger: Atualiza data_real_devolucao no empréstimo quando todos os itens forem devolvidos
DELIMITER $$

CREATE OR REPLACE TRIGGER `trg_atualiza_devolucao_emprestimo`
AFTER UPDATE ON `EmprestimoItem`
FOR EACH ROW
BEGIN
    DECLARE v_total_itens INT;
    DECLARE v_itens_devolvidos INT;
    DECLARE v_max_data_devolucao DATE;

    -- Verificar se este foi o último item a ser devolvido
    IF NEW.data_devolvido IS NOT NULL AND OLD.data_devolvido IS NULL THEN
        -- Contar total de itens no empréstimo
        SELECT COUNT(*) INTO v_total_itens
        FROM EmprestimoItem
        WHERE id_emprestimo = NEW.id_emprestimo;

        -- Contar itens já devolvidos
        SELECT COUNT(*) INTO v_itens_devolvidos
        FROM EmprestimoItem
        WHERE id_emprestimo = NEW.id_emprestimo AND data_devolvido IS NOT NULL;

        -- Se todos os itens foram devolvidos
        IF v_total_itens = v_itens_devolvidos THEN
            -- Encontrar a maior data de devolução
            SELECT MAX(data_devolvido) INTO v_max_data_devolucao
            FROM EmprestimoItem
            WHERE id_emprestimo = NEW.id_emprestimo;

            -- Atualizar data_real_devolucao no empréstimo
            UPDATE Emprestimo
            SET data_real_devolucao = v_max_data_devolucao
            WHERE id_emprestimo = NEW.id_emprestimo;
        END IF;
    END IF;
END$$

DELIMITER;