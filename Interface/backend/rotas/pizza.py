from flask import Blueprint, jsonify, request

from servicos.pizza import pizzaDatabase

pizza_blueprint = Blueprint("pizza",__name__)


@pizza_blueprint.route("/pizza", methods=["GET"])
def get_pizza():
    nome = request.args.get("nome", "") 
    qtde = request.args.get("qtde", "")  
    vendas = request.args.get("vendas", "")

    return jsonify(pizzaDatabase().get_pizza(nome, qtde, vendas)), 200


@pizza_blueprint.route("/detalhe_pizza", methods=["GET"])
def get_detalhe_pizza():
    id_pizza = request.args.get("id_pizza", "")

    return jsonify(pizzaDatabase().get_detalhe_pizza(id_pizza)), 200