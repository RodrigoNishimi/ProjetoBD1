//Fornecedores do ingrediente

async function carregaFornecedores() {
    const urlParams = new URLSearchParams(window.location.search)
    const id_pizza = urlParams.get('id_pizza')


    const response = await fetch('http://127.0.0.1:8000/detalhe_pizza?id_pizza=' + id_pizza)
    const data = await response.json()

    document.querySelector('#pizza').innerText = data[0].nome_pizza

    const tableBody = document.querySelector("#content tbody")

    custo_total = 0

    for (let i = 0; i < data.length; i++) {
        custo = parseFloat(data[i].preco_total).toFixed(2)
        const row =
        `<tr>
            <td>${data[i].nome_ingrediente}</td>
            <td>${data[i].quantidade_ingrediente}</td>
            <td>${data[i].preco_unidade}</td>
            <td>${custo}</td>
        </tr>`

        tableBody.innerHTML += row
        custo_total += parseFloat(data[i].preco_total)
    }

    document.querySelector('#custo_total').innerText = custo_total.toFixed(2)
    document.querySelector('#preco_pizza').innerText = data[0].preco_pizza
}
carregaFornecedores();