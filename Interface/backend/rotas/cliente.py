from flask import Blueprint, jsonify, request

from servicos.cliente import clienteDatabase

cliente_blueprint = Blueprint("cliente",__name__)

# Tabela cliente
@cliente_blueprint.route("/cliente", methods=["GET"])
def get_cliente():
    nome = request.args.get("nome", "") 
    cpf = request.args.get("cpf", "")
    order = request.args.get("order", "")
    return jsonify(clienteDatabase().get_cliente(nome, cpf, order)), 200


# Tabela detalhe cliente
@cliente_blueprint.route("/detalhe_cliente", methods=["GET"])
def get_detalhe_cliente():
    cpf = request.args.get("cpf", "")
    order = request.args.get("order", "")
    return jsonify(clienteDatabase().get_detalhe_cliente(cpf, order)), 200


@cliente_blueprint.route("/cupom", methods=["POST"])
def add_cupom():
    clienteDatabase().add_cupom()
    return jsonify("Cupom adicionado com sucesso"), 200