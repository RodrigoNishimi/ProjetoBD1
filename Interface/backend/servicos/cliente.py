from servicos.database.conector import DatabaseManager

class clienteDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
        
    # TABELA CLIENTE
    def get_cliente(self, nome : str, cpf : str, order : str):
        query = f"""
                SELECT c.*, COUNT(p.id_pedido) as num_pedidos
                FROM cliente c LEFT JOIN pedido p on c.cpf_cliente = p.cpf_cliente
                GROUP BY c.cpf_cliente
                """
        if nome:
            query+= f"HAVING c.nome_cliente ILIKE '%{nome}%'\n"
        if cpf:
            if "HAVING" in query:
                query+= f"AND c.cpf_cliente = '{cpf}'\n"
            else:
                query+= f"HAVING c.cpf_cliente = '{cpf}'\n"
        if order:
            query+= f"ORDER BY num_pedidos {order}\n"
        
        return self.db.execute_select_all(query)
        
        
        
    # TABELA DETALHE CLIENTE
    def get_detalhe_cliente(self, cpf : str, order : str):
        query = f"""
                SELECT c.nome_cliente, p.id_pedido, p.endereco_pedido, p.data_pedido, p.status_pedido, p.cpf_entregador
                FROM pedido p LEFT JOIN cliente c on c.cpf_cliente = p.cpf_cliente
                """
        if cpf:
            query+= f"WHERE c.cpf_cliente = {cpf}\n"
        if order:
            query+= f"ORDER BY p.data_pedido {order}\n"

        return self.db.execute_select_all(query)
    
    
    def add_cupom(self):
        statement = f"""
                UPDATE cliente SET cupon_desconto = (SELECT (COUNT(*) / 5) 
                FROM pedido WHERE pedido.cpf_cliente = cliente.cpf_cliente) 
                WHERE cpf_cliente IN (SELECT cpf_cliente FROM pedido GROUP BY cpf_cliente HAVING COUNT(*) >= 5)
                """
        return self.db.execute_statement(statement)