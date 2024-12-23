from flask import Blueprint, jsonify, request 

from servicos.estoque import estoqueDatabase

estoque_blueprint = Blueprint("estoque",__name__)

#Estoque de Ingredientes
@estoque_blueprint.route("/estoque_i", methods=["GET"])
def get_estoque_i():
    nome = request.args.get("nome", "")
    preco = request.args.get("preco", "")
    qtde = request.args.get("qtde", "")
    return jsonify(estoqueDatabase().get_estoque_i(nome, preco, qtde)), 200


#Estoque de Acompanhamentos
@estoque_blueprint.route("/estoque_a", methods=["GET"])
def get_estoque_a():
    nome = request.args.get("nome", "")
    preco = request.args.get("preco", "")
    qtde = request.args.get("qtde", "")
    return jsonify(estoqueDatabase().get_estoque_a(nome, preco, qtde)), 200


#Página de fornecedores para cada ingrediente
@estoque_blueprint.route("/det_ingred", methods=["GET"])
def get_fornecedores_ingred():
    id_ingrediente = request.args.get("id_ingred", "")
    preco = request.args.get("preco", "")
    cnpj = request.args.get("cnpj", "")
    return jsonify(estoqueDatabase().get_fornecedores_ingred(id_ingrediente, preco, cnpj)), 200


#Página de fornecedores para cada acompanhamento
@estoque_blueprint.route("/det_acomp", methods=["GET"])
def get_fornecedores_acomp():
    id_acomp = request.args.get("id_acomp", "")
    preco = request.args.get("preco", "")
    cnpj = request.args.get("cnpj", "")
    return jsonify(estoqueDatabase().get_fornecedores_acomp(id_acomp, preco, cnpj)), 200