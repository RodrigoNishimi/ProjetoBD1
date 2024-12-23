from flask import Blueprint, jsonify, request

from servicos.pedido import pedidoDatabase

pedido_blueprint = Blueprint("pedido",__name__)

# Tabela pedidos
@pedido_blueprint.route("/pedido", methods=["GET"])
def get_pedidos():
    idpedido = request.args.get("id", "") 
    cliente = request.args.get("cpf", "")
    status = request.args.get("status", "")
    order = request.args.get("order", "")
    count = request.args.get("count", "")
    return jsonify(pedidoDatabase().get_pedido(idpedido, cliente, status, order, count)), 200


# Detalhe das pizzas do pedido
@pedido_blueprint.route("/pedido/detalhep", methods=["GET"])
def get_detalhe_pedidos_p():
    idpedido = request.args.get("id_pedido", "") 
    return jsonify(pedidoDatabase().get_detalhe_pedido_p(idpedido)), 200


# Detalhe dos acompanhamentos do pedido
@pedido_blueprint.route("/pedido/detalhea", methods=["GET"])
def get_detalhe_pedidos_a():
    idpedido = request.args.get("id_pedido", "") 
    return jsonify(pedidoDatabase().get_detalhe_pedido_a(idpedido)), 200

# Preço pedido
@pedido_blueprint.route("/preco", methods=["GET"])
def get_preco_pedido():
    return jsonify(pedidoDatabase().get_preco_pedido()), 200