//Fornecedores do ingrediente

async function carregaFornecedores() {
    const urlParams = new URLSearchParams(window.location.search)
    const id_acomp = urlParams.get('id_acomp')


    const response = await fetch('http://127.0.0.1:8000/det_acomp?id_acomp=' + id_acomp)
    const data = await response.json()

    document.querySelector('#acomp').innerText = data[0].nome_acomp

    const tableBody = document.querySelector("#content tbody")

    qtde_total = 0

    for (let i = 0; i < data.length; i++) {
        const row =
        `<tr>
            <td>${data[i].cnpj_fornecedor}</td>
            <td>${data[i].nome_fornecedor}</td>
            <td>${data[i].telefone_fornecedor}</td>
            <td>${data[i].quantidade_fornecedor}</td>
            <td>${data[i].preco_fornecedor}</td>
            <td>${data[i].preco_total}</td>
        </tr>`

        tableBody.innerHTML += row
        qtde_total += data[i].quantidade_fornecedor
    }

    //document.querySelector('#qtde_total').innerText = qtde_total
}
carregaFornecedores();



//Ordenar
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    const urlParams = new URLSearchParams(window.location.search)
    const id_acomp = urlParams.get('id_acomp')
    let ordenar = document.querySelector("#order[name='order']").value

    // Montar os parâmetros da URL
    let queryParams = '?id_acomp=' + id_acomp
    if (ordenar) queryParams += '&preco=' + ordenar

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/det_acomp' + queryParams

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()

    const tableBody = document.querySelector("#content tbody")
    tableBody.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
        const row =
        `<tr>
            <td>${data[i].cnpj_fornecedor}</td>
            <td>${data[i].nome_fornecedor}</td>
            <td>${data[i].telefone_fornecedor}</td>
            <td>${data[i].quantidade_fornecedor}</td>
            <td>${data[i].preco_fornecedor}</td>
            <td>${data[i].preco_total}</td>
        </tr>`

        tableBody.innerHTML += row
    }
});
