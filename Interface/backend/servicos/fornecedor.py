from servicos.database.conector import DatabaseManager

class fornecedorDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
        
    
    def get_fornecedor(self, nome: str, cnpj: str):
        query = f"""
                SELECT f.*, (COUNT(fi.id_ingrediente) + COUNT(fa.id_acomp)) AS num_produtos
                FROM fornecedor f
                LEFT JOIN fornece_ingrediente fi ON fi.cnpj_fornecedor = f.cnpj_fornecedor
                LEFT JOIN fornece_acomp fa ON fa.cnpj_fornecedor = f.cnpj_fornecedor
                GROUP BY f.cnpj_fornecedor
                """
        if nome:
            query+= f"HAVING f.nome_fornecedor LIKE '%{nome}%'\n"
        if cnpj:
            if 'HAVING' in query:
                query+= f"AND f.cnpj_fornecedor = '{cnpj}'\n"
            else:
                query+= f"HAVING f.cnpj_fornecedor = '{cnpj}'\n"
        
        return self.db.execute_select_all(query)