from flask import Blueprint, jsonify, request

from servicos.dashboard import dashboardDatabase

dashboard_blueprint = Blueprint("dashboard",__name__)

@dashboard_blueprint.route("/ganho", methods=["GET"])
def get_ganho():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_ganho(mes, ano)), 200

@dashboard_blueprint.route("/gastos_ing", methods=["GET"])
def get_gastos_ing():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_gastos_ing(mes, ano)), 200

@dashboard_blueprint.route("/gastos_acomp", methods=["GET"])
def get_gastos_acomp():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_gastos_acomp(mes, ano)), 200

@dashboard_blueprint.route("/gastos_salarios", methods=["GET"])
def get_gastos_salarios():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_gastos_salarios(mes, ano)), 200

@dashboard_blueprint.route("/gastos_fornecedor", methods=["GET"])
def get_gastos_fornecedor():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_gastos_fornecedor(mes, ano)), 200

@dashboard_blueprint.route("/lucro", methods=["GET"])
def get_lucro():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_lucro(mes, ano)), 200

@dashboard_blueprint.route("/nclientes", methods=["GET"])
def get_nclientes():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_nclientes(mes, ano)), 200

@dashboard_blueprint.route("/npedidos", methods=["GET"])
def get_npedidos():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")

    return jsonify(dashboardDatabase().get_npedidos(mes, ano)), 200

@dashboard_blueprint.route("/vendas", methods=["GET"])
def get_vendas():
    mes = request.args.get("mes", "")
    ano = request.args.get("ano", "2024")
    cresc = request.args.get("cresc", "")
    decresc = request.args.get("decresc", "")

    return jsonify(dashboardDatabase().get_vendas(mes, ano, cresc, decresc)), 200
