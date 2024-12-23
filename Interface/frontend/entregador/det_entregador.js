//DETALHES ENTREGADOR
async function carregaPedidos() {
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');

    const response = await fetch('http://127.0.0.1:8000/det_entregador?cpf=' + cpf)
    const data = await response.json()

    const tabela = document.querySelector('#tpedidos tbody');

    for (let i = 0; i < data.length; i++) {
        const dataCompleta = data[i].data_pedido;
        const datac = new Date(dataCompleta);
        const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(datac);

        const row =
        `<tr>
            <td>${data[i].id_pedido}</td>
            <td>${data[i].cpf_cliente}</td>
            <td>${dataFormatada}</td>
            <td>${data[i].endereco_pedido}</td>
            <td>${data[i].status_pedido}</td>
        </tr>`

        tabela.innerHTML += row
    }
}
carregaPedidos();


async function carregaEntregador() {
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');

    const response = await fetch('http://127.0.0.1:8000/entregador?cpf=' + cpf)
    const data = await response.json()

    document.querySelector('#nome').innerText = data[0].nome_entregador
    document.querySelector('#cpf').innerText = data[0].cpf_entregador
    document.querySelector('#num_entregas').innerText = data[0].num_entregas

}
carregaEntregador();