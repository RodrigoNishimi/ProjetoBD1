from servicos.database.conector import DatabaseManager

class dashboardDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_ganho(self, mes: str, ano: str):
        query = """
                SELECT 
                    COALESCE(SUM(pp.Quantidade_PIZZA * p.PRECO_PIZZA), 0) + 
                    COALESCE(SUM(ap.Quantidade_ACOMP * a.PRECO_ACOMP), 0) AS ganho_total
                FROM PEDIDO ped
                LEFT JOIN PIZZA_PEDIDO pp ON ped.ID_PEDIDO = pp.ID_PEDIDO
                LEFT JOIN PIZZA p ON pp.ID_PIZZA = p.ID_PIZZA
                LEFT JOIN ACOMPANHAMENTO_PEDIDO ap ON ped.ID_PEDIDO = ap.ID_PEDIDO
                LEFT JOIN ACOMPANHAMENTO a ON ap.ID_ACOMP = a.ID_ACOMP
                WHERE ped.status_pedido != 'Cancelado'
                """
        
        if mes:
            query += f"AND EXTRACT(MONTH FROM ped.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM ped.data_pedido) = '{ano}'"

        resultado =  self.db.execute_select_all(query)
        ganho_dict = resultado[0]
        return float(ganho_dict['ganho_total'])


    def get_gastos_ing(self, mes: str, ano: str):
        query = """
                SELECT COALESCE(SUM(pi.QUANTIDADE_INGREDIENTE * i.PRECO_UNIDADE * pp.Quantidade_PIZZA), 0) AS gastos_ingrediente

                FROM PEDIDO p
                
                JOIN PIZZA_PEDIDO pp ON pp.ID_PEDIDO = p.ID_PEDIDO
                JOIN PIZZA_INGREDIENTE pi ON pp.ID_PIZZA = pi.ID_PIZZA
                JOIN INGREDIENTE i ON pi.ID_INGREDIENTE = i.ID_INGREDIENTE

                WHERE p.status_pedido != 'Cancelado'
                """
        
        if mes:
            query += f"AND EXTRACT(MONTH FROM p.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM p.data_pedido) = '{ano}'"

        resultado = self.db.execute_select_all(query)
        gasto_dict = resultado[0]
        return float(gasto_dict['gastos_ingrediente'])
        

    def get_gastos_acomp(self, mes: str, ano: str):
        query = """
                SELECT COALESCE(SUM(fa.PRECO_FORNECEDOR * acp.Quantidade_ACOMP), 0) AS gasto_acomp
                                    
                FROM PEDIDO p
                
                JOIN ACOMPANHAMENTO_PEDIDO acp ON p.ID_PEDIDO = acp.ID_PEDIDO
                JOIN ACOMPANHAMENTO ap ON acp.ID_ACOMP = ap.ID_ACOMP
                JOIN FORNECE_ACOMP fa ON fa.ID_ACOMP = ap.ID_ACOMP

                WHERE p.status_pedido != 'Cancelado'
                """
        
        if mes:
            query += f"AND EXTRACT(MONTH FROM p.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM p.data_pedido) = '{ano}'"

        resultado =  self.db.execute_select_all(query)
        gasto_dict = resultado[0]
        return float(gasto_dict['gasto_acomp'])
    

    def get_gastos_salarios(self, mes: str, ano: str):
        query = """
                SELECT COALESCE(SUM(e.SALARIO), 0) AS gastos_salario
                
                FROM ENTREGADOR e
                
                WHERE 1 = 1
                """
        
        if mes:
            1 == 1
        if ano:
            1 == 1

        resultado =  self.db.execute_select_all(query)
        gasto_dict = resultado[0]
        return float(gasto_dict['gastos_salario'])
    

    def get_lucro(self, mes: str, ano: str):
        ganho = self.get_ganho(mes, ano)
        ing = self.get_gastos_ing(mes, ano)
        acomp = self.get_gastos_acomp(mes, ano)
        salario = self.get_gastos_salarios(mes, ano)

        lucro = ganho - ing - acomp - salario
        return lucro
    

    def get_npedidos(self, mes: str, ano: str):
        query = """
                SELECT COUNT(*) AS num_pedidos
                FROM PEDIDO ped
                WHERE ped.status_pedido != 'Cancelado'                
                """
        if mes:
            query += f"AND EXTRACT(MONTH FROM ped.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM ped.data_pedido) = '{ano}'"

        resultado =  self.db.execute_select_all(query)
        gasto_dict = resultado[0]
        return int(gasto_dict['num_pedidos'])


    def get_nclientes(self, mes: str, ano: str):
        query = """
                SELECT COUNT(DISTINCT CPF_CLIENTE) AS num_clientes
                FROM PEDIDO ped
                WHERE ped.status_pedido != 'Cancelado'
                """
        if mes:
            query += f"AND EXTRACT(MONTH FROM ped.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM ped.data_pedido) = '{ano}'"

        resultado =  self.db.execute_select_all(query)
        gasto_dict = resultado[0]
        return int(gasto_dict['num_clientes'])
    

    def get_vendas(self, mes: str, ano: str, cresc: str, decresc: str): #verificar as pizzas mais vendidas e as menos vendidas
        query = """
                SELECT p.NOME_PIZZA, SUM(pp.QUANTIDADE_PIZZA) AS total_vendas, p.PRECO_PIZZA
                FROM PIZZA_PEDIDO pp
                JOIN PIZZA p ON pp.ID_PIZZA = p.ID_PIZZA
                JOIN PEDIDO ped ON pp.ID_PIZZA = ped.ID_PEDIDO
                WHERE 1 = 1
                """
        if mes:
            query += f"AND EXTRACT(MONTH FROM ped.data_pedido) = '{mes}'"

        if ano:
            query += f"AND EXTRACT(YEAR FROM ped.data_pedido) = '{ano}'"

        if cresc:
            query += """
                    GROUP BY p.NOME_PIZZA
                    ORDER BY total_vendas ASC
                    LIMIT 10 -- 
                    """
        if decresc:
            query += """
                    GROUP BY p.NOME_PIZZA
                    ORDER BY total_vendas DESC
                    LIMIT 10 -- 
                    """
        
        resultados = self.db.execute_select_all(query)
        return [{"nome_pizza": row["nome_pizza"], "total_vendas": row["total_vendas"]} for row in resultados]
