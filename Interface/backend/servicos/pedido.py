from servicos.database.conector import DatabaseManager

class pedidoDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
        
    # TABELA PEDIDOS
    def get_pedido(self, idpedido : str, cliente : str, status : str, order : str, count : str):
        query = f"""
                SELECT p.id_pedido, c.cpf_cliente, c.nome_cliente, c.telefone_cliente, p.endereco_pedido, p.data_pedido, p.status_pedido, p.cpf_entregador
                FROM pedido p LEFT JOIN cliente c on c.cpf_cliente = p.cpf_cliente
                """
        if idpedido:
            query+= f"WHERE p.id_pedido = {idpedido}\n"
        if cliente:
            if "WHERE" in query:
                query+= f"AND p.cpf_cliente = '{cliente}'\n"
            else:
                query+= f"WHERE p.cpf_cliente = '{cliente}'\n"
        if status:
            if "WHERE" in query:
                query+= f"AND p.status_pedido = '{status}'\n"
            else: 
                query+= f"WHERE p.status_pedido = '{status}'\n"
        if order:
            query+= f"ORDER BY p.data_pedido {order}\n"

        return self.db.execute_select_all(query)
        
    
    # DETALHE PEDIDO
    
    # Pizzas do pedido
    def get_detalhe_pedido_p(self, idpedido : str):
        query = """
                SELECT nome_pizza, quantidade_pizza, (preco_pizza * quantidade_pizza) AS preco_pizzas
                FROM pedido p
                LEFT JOIN pizza_pedido pzp on pzp.id_pedido = p.id_pedido
                LEFT JOIN pizza pz on pz.id_pizza = pzp.id_pizza
                """
        if idpedido:
            query+= f"WHERE p.id_pedido = {idpedido}\n"
                
        return (self.db.execute_select_all(query))
    
    # Acompanhamentos do pedido
    def get_detalhe_pedido_a(self, idpedido : str):
        query = """
                SELECT nome_acomp, tipo_acomp, quantidade_acomp, (preco_acomp * quantidade_acomp) AS preco_acomps 
                FROM pedido p
                LEFT JOIN acompanhamento_pedido ap on ap.id_pedido = p.id_pedido 
                LEFT JOIN acompanhamento a on a.id_acomp = ap.id_acomp
                """
        if idpedido:
            query+= f"WHERE p.id_pedido = {idpedido}\n"
                
        return (self.db.execute_select_all(query))
    
    
    #Gráfico de vendas
    def get_preco_pedido(self):
        query = """
                SELECT p.id_pedido, data_pedido,
                COALESCE(SUM(pp.quantidade_pizza * pi.preco_pizza), 0) + COALESCE(SUM(ap.quantidade_acomp * ac.preco_acomp), 0) AS preco_pedido
                FROM pedido p
                LEFT JOIN pizza_pedido pp ON pp.id_pedido = p.id_pedido
                LEFT JOIN pizza pi ON pi.id_pizza = pp.id_pizza
                LEFT JOIN acompanhamento_pedido ap ON ap.id_pedido = p.id_pedido
                LEFT JOIN acompanhamento ac ON ac.id_acomp = ap.id_acomp
                GROUP BY p.id_pedido;
                """
        return self.db.execute_select_all(query)