from servicos.database.conector import DatabaseManager

class entregadorDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_entregador(self, cpf: str, salario: str):
        query = f"""
                SELECT e.*, COUNT(p.cpf_entregador) AS num_entregas
                FROM entregador e
                JOIN pedido p ON e.cpf_entregador = p.cpf_entregador
                GROUP BY e.cpf_entregador
                """
        if cpf:
            query += f"HAVING e.cpf_entregador = '{cpf}'"
        if salario:
            query += f"ORDER BY e.salario {salario}\n"
            
        return self.db.execute_select_all(query)
    
    
    def get_pedidos_entregador(self, cpf: str):
        query = f"""
                SELECT p.id_pedido, p.cpf_cliente, p.data_pedido, p.endereco_pedido, p.status_pedido
                FROM pedido p, entregador e
                WHERE p.cpf_entregador = e.cpf_entregador
                """
        if cpf:
            query += f"AND e.cpf_entregador = '{cpf}'"
        
        return self.db.execute_select_all(query)