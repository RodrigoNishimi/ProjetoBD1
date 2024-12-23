//INGREDIENTE
// Filtrar produtos com quantidade <= 0
// Cada ingrediente (linha da tabela) tem uma página detalhe_ingred que mostra os fornecedores

// Tabela de ingredientes
async function getIngredientes() {
    const response = await fetch('http://127.0.0.1:8000/fornecedor')
    const data = await response.json()

    const tabela = document.querySelector('#tfornecedor tbody');

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `detalhe_fornecedor.html?cnpj=${data[i].cnpj_fornecedor}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_fornecedor}</td>
        <td>${data[i].cnpj_fornecedor}</td>
        <td>${data[i].telefone_fornecedor}</td>
        <td>${data[i].email_fornecedor}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
}
getIngredientes()


// Filtrar e Ordenar
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    // Obter os valores dos elementos de filtro e ordenação
    let nome = document.getElementById("nome").value;
    let cnpj = document.getElementById("cnpj").value;

    // Montar os parâmetros da URL
    let queryParams = '?';
    if (nome) queryParams += 'nome=' + nome + '&';
    if (cnpj) queryParams += 'cnpj=' + cnpj + '&';


    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/fornecedor' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()
      

    const tabela = document.querySelector('#tfornecedor tbody');
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `detalhe_fornecedor.html?cnpj=${data[i].cnpj_fornecedor}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_fornecedor}</td>
        <td>${data[i].cnpj_fornecedor}</td>
        <td>${data[i].telefone_fornecedor}</td>
        <td>${data[i].email_fornecedor}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
});