from servicos.database.conector import DatabaseManager

class estoqueDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
        
    #Estoque de Ingredientes
    def get_estoque_i(self, nome: str, preco: str, qtde: str):
        query = f"""
                SELECT i.*, (SUM(quantidade_fornecedor) - (SELECT SUM(pp.quantidade_pizza * pi.quantidade_ingrediente)
                FROM pizza_pedido pp
                JOIN pizza_ingrediente pi ON pp.id_pizza = pi.id_pizza
                WHERE pi.id_ingrediente = i.id_ingrediente)) AS quantidade_total
                FROM ingrediente i
                LEFT JOIN fornece_ingrediente fi ON fi.id_ingrediente = i.id_ingrediente
                GROUP BY i.id_ingrediente, i.nome_ingrediente
                """
        if nome:
            query += f"HAVING i.nome_ingrediente ILIKE '%{nome}%'\n"
        if preco:
            query += f"ORDER BY i.preco_unidade {preco}\n"
        if qtde:
            query += f"ORDER BY quantidade_total {qtde}\n"
            
        return self.db.execute_select_all(query)
        
        
    #Estoque de Acompanhamentos
    def get_estoque_a(self, nome: str, preco: str, qtde: str):
        query = f"""
                SELECT a.*, (SUM(quantidade_fornecedor) - SUM(ap.quantidade_acomp)) AS quantidade_total 
                FROM acompanhamento a
                JOIN fornece_acomp fa ON fa.id_acomp = a.id_acomp
                JOIN acompanhamento_pedido ap ON ap.id_acomp = a.id_acomp 
                GROUP BY a.id_acomp, a.nome_acomp
                """
        if nome:
            query += f"HAVING a.nome_acomp ILIKE '%{nome}%'\n"
        if preco:
            query += f"ORDER BY a.preco_acomp {preco}\n"
        if qtde:
            query += f"ORDER BY quantidade_total {qtde}\n"
        
        return self.db.execute_select_all(query)
    
    
    #Página de fornecedores para cada ingrediente
    def get_fornecedores_ingred(self, id_ingrediente: str, preco: str, cnpj: str):
        query = f"""
                SELECT i.id_ingrediente, i.nome_ingrediente, f.*, fi.quantidade_fornecedor, fi.preco_fornecedor, (fi.preco_fornecedor * fi.quantidade_fornecedor) AS preco_total
                FROM ingrediente i
                JOIN fornece_ingrediente fi ON fi.id_ingrediente = i.id_ingrediente
                JOIN fornecedor f ON f.cnpj_fornecedor = fi.cnpj_fornecedor
                """
        if id_ingrediente:
            query += f"WHERE i.id_ingrediente = {id_ingrediente}\n"
        if cnpj:
            if 'WHERE' in query:
                query+= f"AND fi.cnpj_fornecedor = '{cnpj}'\n"
            else:
                query+= f"WHERE fi.cnpj_fornecedor = '{cnpj}'\n"
        if preco:
            query += f"ORDER BY preco_fornecedor {preco}\n"
        
        return self.db.execute_select_all(query)
    
    
    #Página de fornecedores para cada acompanhamento
    def get_fornecedores_acomp(self, id_acomp: str, preco: str, cnpj: str):
        query = f"""
                SELECT a.id_acomp, a.nome_acomp, a.tipo_acomp, f.*, fa.quantidade_fornecedor, fa.preco_fornecedor, (fa.preco_fornecedor * fa.quantidade_fornecedor) AS preco_total
                FROM acompanhamento a
                JOIN fornece_acomp fa ON fa.id_acomp = a.id_acomp
                JOIN fornecedor f ON f.cnpj_fornecedor = fa.cnpj_fornecedor
                """
        if id_acomp:
            query += f"WHERE a.id_acomp = {id_acomp}\n"
        if cnpj:
            if 'WHERE' in query:
                query+= f"AND fa.cnpj_fornecedor = '{cnpj}'\n"
            else:
                query+= f"WHERE fa.cnpj_fornecedor = '{cnpj}'\n"
        if preco:
            query += f"ORDER BY preco_fornecedor {preco}\n"
        
        return self.db.execute_select_all(query)