//DETALHES CLIENTE
async function carregaPedidos() {
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');

    //atualiza o numero de cupoms
    const sendJson = {}
    const post = await fetch('http://127.0.0.1:8000/cupom ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendJson)
    })


    const response = await fetch('http://127.0.0.1:8000/pedido?cpf=' + cpf)
    const data = await response.json()

    document.querySelector('#cliente').innerText = data[0].nome_cliente

    const tabela = document.querySelector('#tpedidos tbody');

    for (let i = 0; i < data.length; i++) {
        const dataCompleta = data[i].data_pedido;
        const datac = new Date(dataCompleta);
        const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(datac);

        const row =
        `<tr>
            <td>${data[i].id_pedido}</td>
            <td>${dataFormatada}</td>
            <td>${data[i].endereco_pedido}</td>
            <td>${data[i].cpf_entregador}</td>
            <td>${data[i].status_pedido}</td>
        </tr>`

        tabela.innerHTML += row
    }
}
carregaPedidos();


// FUNÇÃO DE FILTRAR E ORDENAR OS PEDIDOS DA TABELA
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');

    let id = document.getElementById("id").value;
    let status = document.querySelector("#status[name='status']").value;

    let queryParams = '?cpf=' + cpf;
    if (id) queryParams += '&id=' + id;
    if (status) queryParams += '&status=' + status;

    let url = 'http://127.0.0.1:8000/pedido' + queryParams;

    const response = await fetch(url)
    const data = await response.json()

    const tabela = document.querySelector('#tpedidos tbody');
    tabela.innerHTML = '';

    
    for (let i = 0; i < data.length; i++) {
        const dataCompleta = data[i].data_pedido;
        const datac = new Date(dataCompleta);
        const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(datac);

        const row =
        `<tr>
            <td>${data[i].id_pedido}</td>
            <td>${dataFormatada}</td>
            <td>${data[i].endereco_pedido}</td>
            <td>${data[i].cpf_entregador}</td>
            <td>${data[i].status_pedido}</td>
        </tr>`

        tabela.innerHTML += row
    }
});


async function carregaCliente() {
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');

    const response = await fetch('http://127.0.0.1:8000/cliente?cpf=' + cpf)
    const data = await response.json()

    //let cupons = Math.floor(data[0].num_pedidos / 5);

    document.querySelector('#num_pedidos').innerText = data[0].num_pedidos
    document.querySelector('#cupom').innerText = data[0].cupon_desconto
}
carregaCliente();