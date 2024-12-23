CREATE TABLE CLIENTE
(	NOME_CLIENTE		VARCHAR(40) 	NOT NULL,
	CPF_CLIENTE			CHAR(11)		NOT NULL,
	ENDERECO_CLIENTE	VARCHAR(50)		NOT NULL,
	TELEFONE_CLIENTE	VARCHAR(20),
	EMAIL_CLIENTE		VARCHAR(40),
	CUPON_DESCONTO		INT DEFAULT 0,
	PRIMARY KEY(CPF_CLIENTE));
	

CREATE TABLE ENTREGADOR
(	NOME_ENTREGADOR		VARCHAR(40) 	NOT NULL,
	CPF_ENTREGADOR			CHAR(11)		NOT NULL,
	ENDERECO_ENTREGADOR	VARCHAR(50)		NOT NULL,
	TELEFONE_ENTREGADOR	VARCHAR(20),
	EMAIL_ENTREGADOR		VARCHAR(40),
	SALARIO		DECIMAL(10,2)	NOT NULL,
	PRIMARY KEY(CPF_ENTREGADOR));


CREATE TABLE PEDIDO
(	ID_PEDIDO		INT				NOT NULL,
	DATA_PEDIDO			DATE			NOT NULL,
	ENDERECO_PEDIDO		VARCHAR(50)		NOT NULL,
	STATUS_PEDIDO		VARCHAR(20),
	CPF_CLIENTE		CHAR(11) 		NOT NULL,
	CPF_ENTREGADOR	CHAR(11)		NOT NULL,
	PRIMARY KEY(ID_PEDIDO),
	FOREIGN KEY(CPF_CLIENTE)	REFERENCES CLIENTE(CPF_CLIENTE),
	FOREIGN KEY(CPF_ENTREGADOR)	REFERENCES ENTREGADOR(CPF_ENTREGADOR));


CREATE TABLE ACOMPANHAMENTO
(	ID_ACOMP		INT				NOT NULL,
	NOME_ACOMP					VARCHAR(30)		NOT NULL,
	PRECO_ACOMP					DECIMAL(10,2)	NOT NULL,
	TIPO_ACOMP		VARCHAR(20)		NOT NULL,
	PRIMARY KEY(ID_ACOMP));


-- Tabela do relacionamento: pedido contém acompanhamento
CREATE TABLE ACOMPANHAMENTO_PEDIDO
(	ID_PEDIDO			INT		NOT NULL,
	ID_ACOMP	INT		NOT NULL,
	Quantidade_ACOMP			INT		NOT NULL,
	PRIMARY KEY(ID_PEDIDO, ID_ACOMP),
	FOREIGN KEY(ID_PEDIDO) REFERENCES PEDIDO(ID_PEDIDO),
	FOREIGN KEY(ID_ACOMP) REFERENCES ACOMPANHAMENTO(ID_ACOMP));


CREATE TABLE PIZZA
(	ID_PIZZA	INT				NOT NULL,
	NOME_PIZZA		VARCHAR(40)		NOT NULL,
	PRECO_PIZZA		DECIMAL(10,2)	NOT NULL,
	PRIMARY KEY(ID_PIZZA));


-- Tabela do relacionamento: pedido contém pizza
CREATE TABLE PIZZA_PEDIDO
(	ID_PEDIDO		INT			NOT NULL,
	ID_PIZZA		INT			NOT NULL,
	QUANTIDADE_PIZZA		INT			NOT NULL,
	PRIMARY KEY(ID_PEDIDO, ID_PIZZA),
	FOREIGN KEY(ID_PEDIDO) REFERENCES PEDIDO(ID_PEDIDO),
	FOREIGN KEY(ID_PIZZA) REFERENCES PIZZA(ID_PIZZA));


CREATE TABLE INGREDIENTE
(	ID_INGREDIENTE		INT				NOT NULL,
	NOME_INGREDIENTE				VARCHAR(30)		NOT NULL,
	PRECO_UNIDADE		DECIMAL(10,2)	NOT NULL,
	UNIDADE_MEDIDA		VARCHAR(10)		NOT NULL,
	PRIMARY KEY(ID_INGREDIENTE));


-- Tabela do relacionamento: Pizza inclui ingredientes
CREATE TABLE PIZZA_INGREDIENTE
(	ID_PIZZA			INT			NOT NULL,
	ID_INGREDIENTE		INT			NOT NULL,
	QUANTIDADE_INGREDIENTE			DECIMAL(10,2)		NOT NULL,
	PRIMARY KEY(ID_PIZZA, ID_INGREDIENTE),
	FOREIGN KEY(ID_PIZZA) REFERENCES PIZZA(ID_PIZZA),
	FOREIGN KEY(ID_INGREDIENTE) REFERENCES INGREDIENTE(ID_INGREDIENTE));


CREATE TABLE FORNECEDOR
(	NOME_FORNECEDOR		VARCHAR(40) 	NOT NULL,
	CNPJ_FORNECEDOR		CHAR(14)		NOT NULL,
	TELEFONE_FORNECEDOR	VARCHAR(20),
	EMAIL_FORNECEDOR		VARCHAR(40),
	PRIMARY KEY(CNPJ_FORNECEDOR));


-- Tabela do relacionamento: fornecedor fornece acompanhamento
CREATE TABLE FORNECE_INGREDIENTE
(	CNPJ_FORNECEDOR				CHAR(14)		NOT NULL,
	ID_INGREDIENTE		INT				NOT NULL,
	PRECO_FORNECEDOR				DECIMAL(5,2)	NOT NULL,
	QUANTIDADE_FORNECEDOR			INT				NOT NULL,
	PRIMARY KEY(CNPJ_FORNECEDOR, ID_INGREDIENTE),
	FOREIGN KEY(CNPJ_FORNECEDOR) REFERENCES FORNECEDOR(CNPJ_FORNECEDOR),
	FOREIGN KEY(ID_INGREDIENTE) REFERENCES INGREDIENTE(ID_INGREDIENTE));

	
-- Tabela do relacionamento: fornecedor fornece acompanhamento
CREATE TABLE FORNECE_ACOMP
(	CNPJ_FORNECEDOR					CHAR(14)		NOT NULL,
	ID_ACOMP		INT				NOT NULL,
	PRECO_FORNECEDOR					DECIMAL(5,2)	NOT NULL,
	QUANTIDADE_FORNECEDOR				INT				NOT NULL,
	PRIMARY KEY(CNPJ_FORNECEDOR, ID_ACOMP),
	FOREIGN KEY(CNPJ_FORNECEDOR) REFERENCES FORNECEDOR(CNPJ_FORNECEDOR),
	FOREIGN KEY(ID_ACOMP) REFERENCES ACOMPANHAMENTO(ID_ACOMP));


	-- Tabela CLIENTE
INSERT INTO CLIENTE (NOME_CLIENTE, CPF_CLIENTE, ENDERECO_CLIENTE, TELEFONE_CLIENTE, EMAIL_CLIENTE) VALUES
('Ana Souza', '12345678901', 'Rua das Flores, 123', '(11) 98877-1234', 'ana.souza@gmail.com'),
('Bruno Lima', '23456789012', 'Av. Paulista, 456', '(11) 97766-4321', 'bruno.lima@yahoo.com'),
('Carla Mendes', '34567890123', 'Rua do Sol, 789', '(21) 98654-6789', 'carla.mendes@hotmail.com'),
('Diego Nogueira', '45678901234', 'Rua Alegria, 321', '(31) 99543-2109', 'diego.nogueira@gmail.com'),
('Eduarda Silva', '56789012345', 'Rua Esperança, 987', '(41) 99876-5432', 'eduarda.silva@gmail.com'),
('Mariana Oliveira', '11122233344', 'Rua das Palmeiras, 150', '(11) 91234-5678', 'mariana.oliveira@gmail.com'),
('Felipe Santos', '22233344455', 'Av. Brasil, 25', '(21) 97654-3210', 'felipe.santos@yahoo.com'),
('Luciana Pereira', '33344455566', 'Rua da Amizade, 45', '(31) 98876-5432', 'luciana.pereira@hotmail.com'),
('Rafael Alves', '44455566677', 'Rua do Amor, 78', '(41) 93456-7890', 'rafael.alves@gmail.com'),
('Juliana Costa', '55566677788', 'Av. das Flores, 89', '(51) 96785-4321', 'juliana.costa@gmail.com'),
('João Batista', '66677788800', 'Rua Nova, 25', '(11) 91234-0098', 'joao.batista@gmail.com'),
('Tatiana Prado', '77788899911', 'Av. Primavera, 34', '(21) 98876-7654', 'tatiana.prado@yahoo.com'),
('Marcelo Dias', '88899900022', 'Rua do Lazer, 56', '(31) 99321-8765', 'marcelo.dias@hotmail.com'),
('Renata Azevedo', '99900011133', 'Rua Bonita, 78', '(41) 98765-5432', 'renata.azevedo@gmail.com'),
('Patrícia Nunes', '00011122244', 'Av. das Américas, 90', '(51) 95432-6789', 'patricia.nunes@gmail.com'),
('Carlos Henrique', '11223344556', 'Rua do Sol, 66', '(11) 92345-6789', 'carlos.henrique@gmail.com'),
('Daniela Souza', '22334455667', 'Av. do Mar, 98', '(21) 98765-4321', 'daniela.souza@yahoo.com'),
('Fernando Silva', '33445566778', 'Rua dos Lírios, 45', '(31) 98432-4567', 'fernando.silva@hotmail.com'),
('Bruna Carvalho', '44556677889', 'Rua Bela, 120', '(41) 99321-7890', 'bruna.carvalho@gmail.com'),
('Mário Andrade', '55667788990', 'Av. das Palmeiras, 101', '(51) 96654-4321', 'mario.andrade@gmail.com'),
('Carlos Mendes', '66677788899', 'Rua Esperança, 58', '(61) 98432-1567', 'carlos.mendes@gmail.com'),
('Laura Lima', '77788899900', 'Av. Central, 203', '(71) 97876-4532', 'laura.lima@gmail.com'),
('Pedro Souza', '88899900011', 'Rua das Árvores, 112', '(81) 98765-3421', 'pedro.souza@gmail.com'),
('Beatriz Rocha', '99900011122', 'Rua Bela Vista, 25', '(91) 95678-4321', 'beatriz.rocha@gmail.com'),
('Gustavo Torres', '00011122233', 'Av. das Nações, 99', '(31) 93421-6785', 'gustavo.torres@gmail.com');


-- Tabela ENTREGADOR
INSERT INTO ENTREGADOR (NOME_ENTREGADOR, CPF_ENTREGADOR, ENDERECO_ENTREGADOR, TELEFONE_ENTREGADOR, EMAIL_ENTREGADOR, SALARIO) VALUES
('Fábio Rocha', '67890123456', 'Av. Central, 654', '(51) 97776-3456', 'fabio.rocha@gmail.com', 2500.00),
('Gabriela Farias', '78901234567', 'Rua Bonita, 213', '(61) 97665-4321', 'gabriela.farias@gmail.com', 2400.00),
('Henrique Silva', '89012345678', 'Rua Liberdade, 456', '(71) 99654-2108', 'henrique.silva@gmail.com', 2600.00),
('Isabel Santos', '90123456789', 'Rua da Paz, 789', '(81) 98765-5432', 'isabel.santos@gmail.com', 2550.00),
('José Almeida', '01234567890', 'Av. das Nações, 123', '(91) 98654-7890', 'jose.almeida@gmail.com', 2700.00),
('Lucas Oliveira', '11122233348', 'Rua das Flores, 22', '(11) 91234-5678', 'lucas.oliveira@email.com', 2800.00),
('Maria Silva', '22233344457', 'Av. Paulista, 1001', '(11) 92345-6789', 'maria.silva@email.com', 2900.00),
('Carlos Mendes', '33344455564', 'Rua das Árvores, 345', '(21) 93456-7890', 'carlos.mendes@email.com', 2650.00),
('Ana Costa', '44455566674', 'Av. Brasil, 50', '(31) 94567-8901', 'ana.costa@email.com', 2750.00),
('Simone Ramos', '00112233448', 'Av. Amizade, 200', '(91) 90123-4567', 'simone.ramos@email.com', 2800.00);


-- Retiramos alguns entregadores pois 20 era um numero muito grande e atrapalhava na conta dos gastos da empresa!

--('Bruno Souza', '55566677785', 'Rua do Comércio, 789', '(71) 95678-9012', 'bruno.souza@email.com', 2600.00),
--('Fernanda Nunes', '66677788893', 'Av. das Nações, 432', '(41) 96789-0123', 'fernanda.nunes@email.com', 2850.00),
--('Gabriel Lopes', '77788899902', 'Rua do Sol, 123', '(51) 97890-1234', 'gabriel.lopes@email.com', 2700.00),
--('Juliana Martins', '88899900016', 'Av. Independência, 789', '(61) 98901-2345', 'juliana.martins@email.com', 2950.00),
--('Rodrigo Rocha', '99900011128', 'Rua da Esperança, 567', '(81) 99012-3456', 'rodrigo.rocha@email.com', 2500.00),
--('Paula Borges', '00011122237', 'Av. Central, 900', '(91) 90123-4567', 'paula.borges@email.com', 2800.00),
--('Rafael Freitas', '11223344553', 'Rua Nova, 101', '(85) 91234-5678', 'rafael.freitas@email.com', 2650.00),
--('Mariana Pereira', '22334455669', 'Av. das Palmeiras, 405', '(27) 92345-6789', 'mariana.pereira@email.com', 2900.00),
--('Thiago Azevedo', '33445566770', 'Rua do Mercado, 321', '(31) 93456-7890', 'thiago.azevedo@email.com', 2750.00),
--('Carla Lima', '44556677884', 'Av. das Flores, 876', '(71) 94567-8901', 'carla.lima@email.com', 2550.00),
--('Lucas Duarte', '55667788993', 'Rua das Mangueiras, 100', '(41) 95678-9012', 'lucas.duarte@email.com', 2650.00),
--('Amanda Reis', '66778899005', 'Av. Principal, 700', '(21) 96789-0123', 'amanda.reis@email.com', 2850.00),
--('João Figueiredo', '77889900113', 'Rua Secundária, 567', '(11) 97890-1234', 'joao.figueiredo@email.com', 2700.00),
--('Renata Oliveira', '88990011224', 'Av. dos Trabalhadores, 234', '(61) 98901-2345', 'renata.oliveira@email.com', 2950.00),
--('Pedro Maciel', '99001122337', 'Rua dos Ventos, 789', '(85) 99012-3456', 'pedro.maciel@email.com', 2500.00);




-- Tabela PEDIDO
INSERT INTO PEDIDO (ID_PEDIDO, DATA_PEDIDO, ENDERECO_PEDIDO, STATUS_PEDIDO, CPF_CLIENTE, CPF_ENTREGADOR) VALUES
(1, '2024-10-01', 'Rua das Flores, 123', 'Entregue', '12345678901', '67890123456'),
(2, '2024-10-01', 'Av. Paulista, 456', 'Entregue', '23456789012', '67890123456'),
(3, '2024-10-03', 'Rua do Sol, 789', 'Em preparo', '34567890123', '67890123456'),
(4, '2024-10-03', 'Rua Alegria, 321', 'Entregue', '45678901234', '00112233448'),
(5, '2024-10-05', 'Rua Esperança, 987', 'Cancelado', '56789012345', '67890123456'),
(6, '2024-10-06', 'Rua das Palmeiras, 150', 'Entregue', '11122233344', '78901234567'),
(7, '2024-10-06', 'Av. Brasil, 25', 'Entregue', '22233344455', '78901234567'),
(8, '2024-10-06', 'Rua da Amizade, 45', 'Em preparo', '33344455566', '78901234567'),
(9, '2024-10-09', 'Rua do Amor, 78', 'Entregue', '44455566677', '00112233448'),
(10, '2024-10-10', 'Av. das Flores, 89', 'Cancelado', '55566677788', '78901234567'),
(11, '2024-10-11', 'Rua Nova, 25', 'Entregue', '66677788800', '89012345678'),
(12, '2024-10-12', 'Av. Primavera, 34', 'Em trânsito', '77788899911', '89012345678'),
(13, '2024-10-13', 'Rua do Lazer, 56', 'Entregue', '88899900022', '89012345678'),
(14, '2024-10-13', 'Rua Bonita, 78', 'Cancelado', '99900011133', '00112233448'),
(15, '2024-10-14', 'Av. das Américas, 90', 'Entregue', '00011122244', '89012345678'),
(16, '2024-10-14', 'Rua do Sol, 66', 'Entregue', '11223344556', '90123456789'),
(17, '2024-10-14', 'Av. do Mar, 98', 'Em trânsito', '22334455667', '00112233448'),
(18, '2024-10-14', 'Rua dos Lírios, 45', 'Em preparo', '33445566778', '90123456789'),
(19, '2024-10-19', 'Rua Bela, 120', 'Entregue', '44556677889', '44455566674'),
(20, '2024-10-21', 'Av. das Palmeiras, 101', 'Cancelado', '55667788990', '90123456789'),
(21, '2024-10-21', 'Rua Esperança, 58', 'Entregue', '66677788899', '01234567890'),
(22, '2024-10-22', 'Av. Central, 203', 'Em preparo', '77788899900', '01234567890'),
(23, '2024-10-23', 'Rua das Árvores, 112', 'Entregue', '88899900011', '01234567890'),
(24, '2024-10-24', 'Rua Bela Vista, 25', 'Em trânsito', '99900011122', '44455566674'),
(25, '2024-10-25', 'Av. das Nações, 99', 'Entregue', '00011122233', '01234567890'),
(26, '2024-10-26', 'Rua das Flores, 123', 'Entregue', '99900011122', '11122233348'),
(27, '2024-10-26', 'Av. Paulista, 456', 'Em trânsito', '99900011122', '11122233348'),
(28, '2024-10-26', 'Rua do Sol, 789', 'Entregue', '00011122233', '11122233348'),
(29, '2024-10-26', 'Rua Alegria, 321', 'Cancelado', '22334455667', '44455566674'),
(30, '2024-10-27', 'Rua Esperança, 987', 'Entregue', '22334455667', '11122233348'),
(31, '2024-09-27', 'Rua Esperança, 987', 'Entregue', '22334455667', '22233344457'),
(32, '2024-11-05', 'Rua Esperança, 987', 'Entregue', '22334455667', '22233344457'),
(33, '2024-08-27', 'Rua Esperança, 987', 'Entregue', '22334455667', '22233344457'),
(34, '2024-09-25', 'Rua Esperança, 987', 'Entregue', '22334455667', '44455566674'),
(35, '2024-11-08', 'Rua Esperança, 987', 'Entregue', '22334455667', '22233344457'),
(36, '2024-09-22', 'Av. Central, 203', 'Entregue', '77788899900', '33344455564'),
(37, '2024-08-21', 'Av. Central, 203', 'Entregue', '77788899900', '00112233448'),
(38, '2024-10-17', 'Av. Central, 203', 'Entregue', '77788899900', '33344455564'),
(39, '2024-10-05', 'Av. Central, 203', 'Entregue', '77788899900', '44455566674'),
(40, '2024-10-22', 'Av. Central, 203', 'Entregue', '77788899900', '33344455564');


-- Tabela ACOMPANHAMENTO
INSERT INTO ACOMPANHAMENTO (ID_ACOMP, NOME_ACOMP, PRECO_ACOMP, TIPO_ACOMP) VALUES
(1, 'Coca Lata', 5.00, 'Bebida'),
(2, 'Suco de Laranja', 6.50, 'Bebida'),
(3, 'Sorvete Creme', 7.00, 'Sobremesa'),
(4, 'Coca 600', 8.00, 'Bebida'),
(5, 'Suca de Uva', 6.50, 'Bebida'),
(6, 'Água s/ Gas', 3.50, 'Bebida'),
(7, 'Chá Pêssego', 6.00, 'Bebida'),
(8, 'Pudim', 7.50, 'Sobremesa'),
(9, 'Chá Limão', 6.00, 'Bebida'),
(10, 'Fanta Laranja Lata', 5.00, 'Bebida'),
(11, 'Coca Zero Lata', 5.00, 'Bebida'),
(12, 'Água c/ Gás', 3.50, 'Bebida'),
(13, 'Bolo de Chocolate', 8.00, 'Sobremesa'),
(14, 'Guarana Zero Lata', 5.00, ''),
(15, 'Sprite Lata', 5.00, 'Bebida'),
(16, 'Guarana 600', 8.00, 'Bebida'),
(17, 'Guarana Lata', 5.00, 'Bebida'),
(18, 'Cheesecake', 10.00, 'Sobremesa'),
(19, 'Guarana 2L', 12.00, 'Bebida'),
(20, 'Coca 2L', 12.00, 'Bebida'),
(21, 'Fanta Uva Lata', 5.00, 'Bebida'),
(22, 'H2O', 8.0, 'Bebida');

-- Tabela ACOMPANHAMENTO_PEDIDO
INSERT INTO ACOMPANHAMENTO_PEDIDO (ID_PEDIDO, ID_ACOMP, Quantidade_ACOMP) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 2, 3),
(4, 4, 1),
(5, 5, 2),
(6, 6, 1),
(7, 7, 2),
(8, 8, 1),
(9, 9, 3),
(10, 10, 1),
(11, 11, 2),
(12, 12, 1),
(13, 13, 2),
(14, 14, 3),
(15, 15, 1),
(16, 16, 2),
(17, 17, 2),
(18, 18, 1),
(19, 19, 1),
(20, 20, 1),
(21, 21, 2),
(22, 2, 1),
(23, 4, 2),
(24, 6, 1),
(25, 8, 3),
(26, 10, 2),
(27, 12, 1),
(28, 14, 1),
(29, 16, 2),
(30, 18, 1),
(31, 2, 1),
(32, 4, 2),
(33, 6, 1),
(34, 8, 3),
(35, 10, 2),
(36, 12, 1),
(37, 14, 1),
(38, 16, 2),
(39, 18, 1),
(40, 20, 1);

-- Tabela PIZZA
INSERT INTO PIZZA (ID_PIZZA, NOME_PIZZA, PRECO_PIZZA) VALUES
(1, 'Margherita', 45.00),
(2, 'Pepperoni', 45.00),
(3, 'Quatro Queijos', 55.00),
(4, 'Frango com Catupiry', 50.00),
(5, 'Calabresa', 45.00),
(6, 'Portuguesa', 50.00),
(7, 'Vegetariana', 48.00),
(8, 'Bacon', 48.00),
(9, 'Strogonoff', 55.00),
(10, 'Camarão', 60.00),
(11, 'Napolitana', 45.00),
(12, 'Baiana', 50.00),
(13, 'Milho e Bacon', 50.00),
(14, 'Rúcula com Tomate Seco', 50.00),
(15, 'Chocolate', 38.00),
(16, 'Três Queijos', 50.00),
(17, 'Brocolis', 48.00),
(18, 'Atum', 44.00),
(19, 'Lombo com Abacaxi', 50.00),
(20, 'Doce de Leite', 50.00),
(21, 'Banana', 50.00);

-- Tabela PIZZA_PEDIDO
INSERT INTO PIZZA_PEDIDO (ID_PEDIDO, ID_PIZZA, Quantidade_PIZZA) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 1),
(7, 7, 2),
(8, 8, 1),
(9, 9, 3),
(10, 10, 1),
(11, 11, 2),
(12, 12, 1),
(13, 13, 2),
(14, 14, 1),
(15, 15, 2),
(16, 16, 1),
(17, 17, 2),
(18, 18, 1),
(19, 19, 1),
(20, 20, 1),
(21, 21, 2),
(22, 1, 1),
(23, 3, 1),
(24, 5, 2),
(25, 7, 1),
(26, 9, 2),
(27, 11, 1),
(28, 13, 1),
(29, 15, 2),
(30, 17, 1),
(31, 6, 1),
(32, 7, 2),
(33, 8, 1),
(34, 9, 3),
(35, 10, 1),
(36, 11, 2),
(37, 12, 1),
(38, 13, 2),
(39, 14, 1),
(40, 15, 2);

-- Tabela INGREDIENTE
INSERT INTO INGREDIENTE (ID_INGREDIENTE, NOME_INGREDIENTE, PRECO_UNIDADE, UNIDADE_MEDIDA) VALUES
(1, 'Mussarela', 35.00, 'kg'),
(2, 'Tomate', 12.50, 'kg'),
(3, 'Presunto', 45.00, 'kg'),
(4, 'Calabresa', 45.00, 'kg'),
(5, 'Azeitona', 45.00, 'kg'),
(6, 'Bacon', 60.00, 'kg'),
(7, 'Cebola', 20.00, 'kg'),
(8, 'Catupiry', 50.00, 'kg'),
(9, 'Camarão', 150.00, 'kg'),
(10, 'Alho', 100.00, 'kg'),
(11, 'Chocolate', 40.00, 'kg'),
(12, 'Rúcula', 50.00, 'kg'),
(13, 'Milho', 35.00, 'kg'),
(14, 'Tomate Seco', 60.00, 'kg'),
(15, 'Pimenta', 100.00, 'kg'),
(16, 'Provolone', 66.00, 'kg'),
(17, 'Requeijao', 35.00, 'kg'),
(18, 'Salaminho', 50.00, 'kg'),
(19, 'Lombo', 63.00, 'kg'),
(20, 'Doce de Leite', 50.00, 'kg'),
(21, 'Brocolis', 36.00, 'kg'),
(22, 'Atum', 70.00, 'kg'),
(23, 'Abobrinha', 22.00, 'kg'),
(24, 'Banana', 23.00, 'kg'),
(25, 'Massa', 15.00, 'kg');



-- Tabela PIZZA_INGREDIENTE
INSERT INTO PIZZA_INGREDIENTE (ID_PIZZA, ID_INGREDIENTE, QUANTIDADE_INGREDIENTE) VALUES
-- Margherita
(1, 25, 0.3),  -- Massa
(1, 1, 0.2),   -- Mussarela
(1, 2, 0.1),   -- Tomate
(1, 5, 0.05),  -- Azeitona

-- Pepperoni
(2, 25, 0.3),  -- Massa
(2, 1, 0.2),   -- Mussarela
(2, 18, 0.15), -- Calabresa
(2, 7, 0.05),  -- Cebola

-- Quatro Queijos
(3, 25, 0.3),  -- Massa
(3, 1, 0.2),   -- Mussarela
(3, 8, 0.1),   -- Catupiry
(3, 16, 0.1),  -- Provolone
(3, 11, 0.05), -- Chocolate (para contraste)

-- Frango com Catupiry
(4, 25, 0.3),  -- Massa
(4, 1, 0.2),   -- Mussarela
(4, 8, 0.15),  -- Catupiry
(4, 17, 0.1),  -- Frango

-- Calabresa
(5, 25, 0.3),  -- Massa
(5, 1, 0.2),   -- Mussarela
(5, 4, 0.15),  -- Calabresa
(5, 7, 0.05),  -- Cebola

-- Portuguesa
(6, 25, 0.3),  -- Massa
(6, 1, 0.2),   -- Mussarela
(6, 3, 0.1),   -- Presunto
(6, 7, 0.05),  -- Cebola
(6, 5, 0.05),  -- Azeitona
(6, 2, 0.1),   -- Tomate

-- Vegetariana
(7, 25, 0.3),  -- Massa
(7, 1, 0.2),   -- Mussarela
(7, 21, 0.1),  -- Brocolis
(7, 12, 0.05), -- Rúcula
(7, 23, 0.1),  -- Abobrinha
(7, 2, 0.05),  -- Tomate

-- Bacon
(8, 25, 0.3),  -- Massa
(8, 1, 0.2),   -- Mussarela
(8, 6, 0.15),  -- Bacon
(8, 7, 0.05),  -- Cebola

-- Strogonoff
(9, 25, 0.3),  -- Massa
(9, 1, 0.2),   -- Mussarela
(9, 17, 0.15), -- Frango
(9, 8, 0.1),   -- Catupiry
(9, 10, 0.05), -- Alho

-- Camarão
(10, 25, 0.3),  -- Massa
(10, 1, 0.2),  -- Mussarela
(10, 9, 0.15), -- Camarão
(10, 5, 0.05), -- Azeitona
(10, 2, 0.05), -- Tomate

-- Napolitana
(11, 25, 0.3),  -- Massa
(11, 1, 0.2),  -- Mussarela
(11, 2, 0.1),  -- Tomate
(11, 5, 0.05), -- Azeitona
(11, 10, 0.05),-- Alho

-- Baiana
(12, 25, 0.3),  -- Massa
(12, 1, 0.2),  -- Mussarela
(12, 4, 0.15), -- Calabresa
(12, 15, 0.05),-- Pimenta
(12, 7, 0.05), -- Cebola

-- Milho e Bacon
(13, 25, 0.3),  -- Massa
(13, 1, 0.2),  -- Mussarela
(13, 13, 0.1), -- Milho
(13, 6, 0.1),  -- Bacon

-- Rúcula com Tomate Seco
(14, 25, 0.3),  -- Massa
(14, 1, 0.2),  -- Mussarela
(14, 12, 0.1), -- Rúcula
(14, 14, 0.1), -- Tomate Seco

-- Chocolate
(15, 25, 0.3),  -- Massa
(15, 11, 0.2), -- Chocolate

-- Três Queijos
(16, 25, 0.3),  -- Massa
(16, 1, 0.2),  -- Mussarela
(16, 8, 0.1),  -- Catupiry
(16, 16, 0.1), -- Provolone

-- Brocolis
(17, 25, 0.3),  -- Massa
(17, 1, 0.2),  -- Mussarela
(17, 21, 0.15),-- Brocolis

-- Atum
(18, 25, 0.3),  -- Massa
(18, 1, 0.2),  -- Mussarela
(18, 22, 0.15),-- Atum
(18, 5, 0.05), -- Azeitona

-- Lombo com Abacaxi
(19, 25, 0.3),  -- Massa
(19, 1, 0.2),  -- Mussarela
(19, 19, 0.15),-- Lombo
(19, 24, 0.1), -- Abacaxi

-- Doce de Leite
(20, 25, 0.3),  -- Massa
(20, 20, 0.2), -- Doce de Leite

-- Banana
(21, 25, 0.3),  -- Massa
(21, 24, 0.2), -- Banana
(21, 20, 0.15); -- Doce de Leite


-- Tabela FORNECEDOR
INSERT INTO FORNECEDOR (NOME_FORNECEDOR, CNPJ_FORNECEDOR, TELEFONE_FORNECEDOR, EMAIL_FORNECEDOR) VALUES
('Fornecedor Alpha', '12345678000199', '(11) 3456-7890', 'contato@fornecedora.com'),
('Fornecedor Beta', '23456789000188', '(21) 2345-6789', 'contato@fornecedorb.com'),
('Fornecedor Ceta', '34567890000177', '(11) 8765-4321', 'contato@fornecedorc.com'),
('Fornecedor Domino', '45678901000166', '(21) 7654-3210', 'contato@fornecedord.com'),
('Fornecedor Eliseu', '56789012000154', '(11) 2345-9876', 'contato@fornecedore.com'),
('Fornecedor Firmeza', '67890123000144', '(21) 3234-4567', 'contato@fornecedorf.com'),
('Fornecedor Gama', '78901234000166', '(11) 2123-4567', 'contato@fornecedorg.com'),
('Fornecedor Holambra', '89012345000177', '(21) 3344-5678', 'contato@fornecedorh.com'),
('Distribuidora Forte', '12345678000191', '(11) 91234-5678', 'contato@distforte.com'),
('Logística Rápida', '23456789000182', '(21) 92345-6789', 'contato@logisrapid.com'),
('Alimentos Vitória', '34567890000173', '(31) 93456-7890', 'contato@alimentosvitoria.com'),
('Bebidas Premium', '45678901000164', '(71) 94567-8901', 'contato@bebidapremium.com'),
('Empório Saúde', '56789012000159', '(41) 95678-9012', 'contato@emporiosaude.com'),
('Mercado União', '67890123000146', '(51) 96789-0123', 'contato@mercadouniao.com'),
('Distribuidora Fresco', '78901234000137', '(61) 97890-1234', 'contato@distfresco.com'),
('Fornecedor Central', '89012345000128', '(81) 98901-2345', 'contato@fornecedorcentral.com'),
('Produtos Norte', '90123456000119', '(85) 99012-3456', 'contato@produtosnorte.com'),
('Comércio Sul', '01234567000101', '(91) 90123-4567', 'contato@comerciosul.com'),
('Laticínios Qualidade', '09876543000189', '(21) 93456-1234', 'contato@laticiniosqualidade.com'),
('Frutas Brasil', '87654321000109', '(31) 94567-2345', 'contato@frutasbrasil.com'),
('Distribuidora Atual', '76543210000190', '(71) 95678-3456', 'contato@distatual.com'),
('Produtos Especiais', '65432100000180', '(41) 96789-4567', 'contato@produtosespeciais.com'),
('Verduras e Legumes', '54321000000170', '(51) 97890-5678', 'contato@verlegumes.com'),
('Empório Natural', '43210000000160', '(61) 98901-6789', 'contato@emporionatural.com'),
('Cereais Gourmet', '32100000000150', '(81) 99012-7890', 'contato@cereaisgourmet.com'),
('Bebidas do Campo', '21000000000140', '(85) 90123-8901', 'contato@bebidasdocampo.com'),
('Distribuidora Nacional', '10000000000130', '(91) 91234-1234', 'contato@distnacional.com'),
('Fornecedor Regional', '00987654000120', '(11) 92345-2345', 'contato@fornecedorregional.com');


-- Tabela FORNECE_INGREDIENTE
INSERT INTO FORNECE_INGREDIENTE (CNPJ_FORNECEDOR, ID_INGREDIENTE, PRECO_FORNECEDOR, QUANTIDADE_FORNECEDOR) VALUES
('12345678000199', 1, 18.00, 10),  -- Mussarela
('12345678000199', 2, 12.00, 15),  -- Tomate
('12345678000199', 3, 25.00, 8),   -- Presunto
('12345678000199', 4, 22.50, 6),   -- Calabresa
('23456789000188', 5, 10.00, 10),  -- Azeitona
('23456789000188', 6, 35.00, 5),   -- Bacon
('23456789000188', 7, 8.00, 12),   -- Cebola
('23456789000188', 8, 45.00, 4),   -- Catupiry
('34567890000177', 5, 90.00, 3),   -- Camarão
('34567890000177', 10, 5.00, 20),  -- Alho
('34567890000177', 11, 30.00, 6),  -- Chocolate
('34567890000177', 12, 12.00, 10), -- Rúcula
('45678901000166', 13, 10.00, 8),  -- Milho
('45678901000166', 14, 18.00, 6),  -- Tomate Seco
('54321000000170', 15, 7.20, 15),  -- Pimenta
('43210000000160', 16, 50.00, 5),  -- Provolone
('32100000000150', 17, 48.00, 8),  -- Frango
('21000000000140', 18, 32.00, 7),  -- Calabresa (opcional)
('10000000000130', 19, 38.00, 9),  -- Lombo
('00987654000120', 20, 20.00, 5),  -- Doce de Leite
('67890123000144', 21, 15.00, 8),  -- Brócolis
('67890123000144', 22, 40.00, 10), -- Atum
('67890123000144', 23, 18.00, 12), -- Abobrinha
('67890123000144', 24, 8.00, 15),  -- Banana
('67890123000144', 25, 30.00, 45),  -- Massa
('67890123000144', 14, 18.00, 6),  -- Tomate Seco
('54321000000170', 14, 7.20, 15),  -- Pimenta
('43210000000160', 15, 50.00, 5),  -- Provolone
('43210000000160', 17, 48.00, 8),  -- Frango
('21000000000140', 19, 32.00, 7),  -- Calabresa (opcional)
('00987654000120', 19, 38.00, 9),  -- Lombo
('00987654000120', 21, 20.00, 5),  -- Doce de Leite
('10000000000130', 21, 15.00, 8),  -- Brócolis
('32100000000150', 22, 40.00, 10), -- Atum
('21000000000140', 23, 18.00, 12), -- Abobrinha
('54321000000170', 24, 8.00, 15),  -- Banana
('34567890000177', 25, 30.00, 45);  -- Massa


-- Tabela FORNECE_ACOMP
INSERT INTO FORNECE_ACOMP (CNPJ_FORNECEDOR, ID_ACOMP, PRECO_FORNECEDOR, QUANTIDADE_FORNECEDOR) VALUES
('12345678000199', 1, 3.50, 20),  -- Coca Lata
('12345678000199', 2, 5.00, 15),  -- Suco de Laranja
('12345678000199', 3, 5.50, 10),  -- Sorvete Creme
('12345678000199', 4, 5.50, 10),  -- Coca 600
('23456789000188', 5, 4.50, 15),  -- Suco de Uva
('23456789000188', 6, 2.00, 20),  -- Água s/ Gas
('23456789000188', 7, 4.50, 12),  -- Chá Pêssego
('23456789000188', 8, 6.00, 8),   -- Pudim
('34567890000177', 9, 4.50, 14),  -- Chá Limão
('34567890000177', 10, 3.50, 18), -- Fanta Laranja Lata
('34567890000177', 11, 3.50, 20), -- Coca Zero Lata
('34567890000177', 12, 2.00, 22), -- Água c/ Gás
('45678901000166', 13, 5.50, 10), -- Bolo de Chocolate
('45678901000166', 14, 3.50, 15), -- Guarana Zero Lata
('45678901000166', 15, 3.50, 18), -- Sprite Lata
('45678901000166', 16, 6.50, 12), -- Guarana 600
('43210000000160', 17, 3.50, 15), -- Guarana Lata
('21000000000140', 18, 7.50, 5),  -- Cheesecake
('10000000000130', 19, 9.00, 6), -- Guarana 2L
('00987654000120', 20, 9.00, 7), -- Coca 2L
('67890123000144', 21, 3.50, 14), -- Fanta Uva Lata
('67890123000144', 22, 5.50, 10), -- H2O
('90123456000119', 22, 3.50, 20),
('89012345000177', 19, 5.00, 15),
('89012345000128', 20, 5.50, 10),
('87654321000109', 19, 5.50, 10),
('78901234000166', 18, 4.50, 15),
('78901234000137', 17, 2.00, 20),
('76543210000190', 16, 4.50, 12),
('67890123000146', 15, 6.00, 8),
('67890123000144', 14, 4.50, 14),
('65432100000180', 13, 3.50, 18),
('56789012000159', 12, 3.50, 20),
('56789012000154', 11, 2.00, 22),
('54321000000170', 10, 5.50, 10),
('43210000000160', 9, 3.50, 15),
('45678901000164', 8, 3.50, 18),
('34567890000177', 7, 6.50, 12),
('34567890000173', 6, 3.50, 15),
('23456789000182', 5, 7.50, 5),
('21000000000140', 4, 9.00, 6),
('12345678000199', 13, 9.00, 7),
('12345678000191', 2, 3.50, 14),
('10000000000130', 1, 5.50, 10),
('34567890000177', 1, 6.50, 23),  -- Chá Limão
('87654321000109', 10, 2.50, 11), -- Fanta Laranja Lata
('67890123000144', 11, 3.80, 25), -- Coca Zero Lata
('67890123000144', 12, 2.50, 20), -- Água c/ Gás
('12345678000199', 14, 4.50, 17), -- Bolo de Chocolate
('43210000000160', 14, 6.50, 11), -- Guarana Zero Lata
('43210000000160', 15, 3.80, 12), -- Sprite Lata
('43210000000160', 16, 6.90, 09), -- Guarana 600
('87654321000109', 17, 2.90, 15), -- Guarana Lata
('21000000000140', 19, 8.00, 6),  -- Cheesecake
('87654321000109', 20, 8.70, 6), -- Guarana 2L
('00987654000120', 21, 9.80, 12), -- Coca 2L
('00987654000120', 22, 4.50, 14), -- Fanta Uva Lata
('10000000000130', 9, 6.00, 10), -- H2O
('87654321000109', 9, 7.50, 13);  -- Chá Limão
