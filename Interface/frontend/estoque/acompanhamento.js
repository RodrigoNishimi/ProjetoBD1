// Filtrar produtos com quantidade <= 0
// Cada acompanhamento (linha da tabela) vai para uma página com os fornecedores

// Tabela de ingredientes
async function getAcomp() {
    const response = await fetch('http://127.0.0.1:8000/estoque_a')
    const data = await response.json()

    const tabela = document.querySelector('#tab_acomp tbody');

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `fornecedores/acomp_fornecedores.html?id_acomp=${data[i].id_acomp}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].id_acomp}</td>
        <td>${data[i].nome_acomp}</td>
        <td>${data[i].tipo_acomp}</td>
        <td>${data[i].preco_acomp}</td>
        <td>${data[i].quantidade_total}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
}
getAcomp()


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
    let url = 'http://127.0.0.1:8000/estoque_a' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()
      

    const tabela = document.querySelector('#tab_acomp tbody');
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `fornecedores/acomp_fornecedores.html?id_acomp=${data[i].id_acomp}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].id_acomp}</td>
        <td>${data[i].nome_acomp}</td>
        <td>${data[i].tipo_acomp}</td>
        <td>${data[i].preco_acomp}</td>
        <td>${data[i].quantidade_total}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
});