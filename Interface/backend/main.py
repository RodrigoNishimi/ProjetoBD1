from flask import Flask, jsonify
from flask_cors import CORS 
from rotas.pedido import pedido_blueprint
from rotas.fornecedor import fornecedor_blueprint
from rotas.estoque import estoque_blueprint
from rotas.entregador import entregador_blueprint
from rotas.dashboard import dashboard_blueprint
from rotas.cliente import cliente_blueprint
from rotas.pizza import pizza_blueprint

app = Flask(__name__)
CORS(app, origins="*")

app.register_blueprint(pedido_blueprint)
app.register_blueprint(fornecedor_blueprint)
app.register_blueprint(estoque_blueprint)
app.register_blueprint(entregador_blueprint)
app.register_blueprint(dashboard_blueprint)
app.register_blueprint(cliente_blueprint)
app.register_blueprint(pizza_blueprint)

app.run("0.0.0.0", port=8000, debug=False)
