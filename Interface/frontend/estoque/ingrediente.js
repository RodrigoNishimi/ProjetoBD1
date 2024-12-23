//INGREDIENTE
// Filtrar produtos com quantidade <= 0
// Cada ingrediente (linha da tabela) tem uma página detalhe_ingred que mostra os fornecedores

// Tabela de ingredientes
async function getIngredientes() {
    const response = await fetch('http://127.0.0.1:8000/estoque_i')
    const data = await response.json()

    const tabela = document.querySelector('#ingredientes tbody');

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `fornecedores/ingred_fornecedores.html?id_ingred=${data[i].id_ingrediente}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].id_ingrediente}</td>
        <td>${data[i].nome_ingrediente}</td>
        <td>${data[i].preco_unidade}</td>
        <td>${data[i].unidade_medida}</td>
        <td>${data[i].quantidade_total}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
}
getIngredientes()


// Filtrar e Ordenar
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    // Obter os valores dos elementos de filtro e ordenação
    let nome = document.getElementById("nome").value;
    let ordenar = document.querySelector("#order[name='order']").value;

    // Montar os parâmetros da URL
    let queryParams = '?';
    if (nome) queryParams += 'nome=' + nome + '&';
    if (ordenar == 'p_asc') queryParams += 'preco=ASC';
    if (ordenar == 'p_desc') queryParams += 'preco=DESC';
    if (ordenar == 'q_asc') queryParams += 'qtde=ASC';
    if (ordenar == 'q_desc') queryParams += 'qtde=DESC';

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/estoque_i' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()
      

    const tabela = document.querySelector('#ingredientes tbody');
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `fornecedores/ingred_fornecedores.html?id_ingred=${data[i].id_ingrediente}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].id_ingrediente}</td>
        <td>${data[i].nome_ingrediente}</td>
        <td>${data[i].preco_unidade}</td>
        <td>${data[i].unidade_medida}</td>
        <td>${data[i].quantidade_total}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
});