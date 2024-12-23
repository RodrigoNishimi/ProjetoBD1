from flask import Blueprint, jsonify, request 

from servicos.fornecedor import fornecedorDatabase

fornecedor_blueprint = Blueprint("fornecedor",__name__)

@fornecedor_blueprint.route("/fornecedor", methods=["GET"])
def get_fornecedor():
    nome = request.args.get("nome", "")
    cnpj = request.args.get("cnpj", "")
    return jsonify(fornecedorDatabase().get_fornecedor(nome, cnpj)), 200


@fornecedor_blueprint.route("/fornecedor_i", methods=["GET"])
def get_fornecedor_i():
    cnpj = request.args.get("cnpj", "")
    return jsonify(fornecedorDatabase().get_fornecedor_i(cnpj)), 200


@fornecedor_blueprint.route("/fornecedor_a", methods=["GET"])
def get_fornecedor_a():
    cnpj = request.args.get("cnpj", "")
    return jsonify(fornecedorDatabase().get_fornecedor_a(cnpj)), 200