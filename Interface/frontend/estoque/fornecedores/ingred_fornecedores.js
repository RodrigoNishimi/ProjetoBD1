//Fornecedores do ingrediente

async function carregaFornecedores() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_ingred = urlParams.get('id_ingred');


    const response = await fetch('http://127.0.0.1:8000/det_ingred?id_ingred=' + id_ingred)
    const data = await response.json()

    document.querySelector('#ingred').innerText = data[0].nome_ingrediente

    const tabela = document.querySelector('#tab_fornecedor tbody');

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

        tabela.innerHTML += row

        qtde_total += data[i].quantidade_fornecedor
    }

    //document.querySelector('#qtde_total').innerText = qtde_total
}
carregaFornecedores();



//Ordenar
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_ingred = urlParams.get('id_ingred');
    let ordenar = document.querySelector("#order[name='order']").value;

    // Montar os parâmetros da URL
    let queryParams = '?id_ingred=' + id_ingred;
    if (ordenar) queryParams += '&preco=' + ordenar;

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/det_ingred' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()

    const tabela = document.querySelector('#tab_fornecedor tbody');
    tabela.innerHTML = '';

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

        tabela.innerHTML += row
    }
});