from flask import Blueprint, jsonify, request

from servicos.entregador import entregadorDatabase

entregador_blueprint = Blueprint("entregador",__name__)

@entregador_blueprint.route("/entregador", methods=["GET"])

def get_entregador():
    cpf = request.args.get("cpf", "") 
    salario = request.args.get("salario", "")

    return jsonify(entregadorDatabase().get_entregador(cpf, salario)), 200


@entregador_blueprint.route("/det_entregador", methods=["GET"])

def get_pedidos_entregador():
    cpf = request.args.get("cpf", "") 

    return jsonify(entregadorDatabase().get_pedidos_entregador(cpf)), 200