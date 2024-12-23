from servicos.database.conector import DatabaseManager

class pizzaDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider 
    
    def get_pizza(self, nome:str, qtde: str, vendas: str):
        query = f"""
                SELECT p.*, SUM(pp.quantidade_pizza) AS quantidade_vendida, 
                (SUM(pp.quantidade_pizza) * p.preco_pizza) AS total_vendido
                FROM pizza p
                LEFT JOIN pizza_pedido pp ON pp.id_pizza = p.id_pizza
                JOIN pedido pe ON pe.id_pedido = pp.id_pedido
                WHERE pe.status_pedido != 'Cancelado'
                GROUP BY p.id_pizza, p.nome_pizza
                """
        if nome:
            query += f"HAVING p.nome_pizza ILIKE '%{nome}%'\n"
        if qtde:
            query += f"ORDER BY quantidade_vendida {qtde}\n"
        if vendas:
            query += f"ORDER BY total_vendido {vendas}\n"
            
        return self.db.execute_select_all(query)
    
    
    def get_detalhe_pizza(self, id_pizza:str):
        query = f"""
                SELECT p.nome_pizza, p.preco_pizza, i.nome_ingrediente, pi.quantidade_ingrediente, i.preco_unidade, (pi.quantidade_ingrediente * i.preco_unidade) AS preco_total
                FROM pizza p
                JOIN pizza_ingrediente pi ON pi.id_pizza = p.id_pizza
                JOIN ingrediente i ON i.id_ingrediente = pi.id_ingrediente
                """
        if id_pizza:
            query += f"WHERE p.id_pizza = {id_pizza}\n"
            
        return self.db.execute_select_all(query)