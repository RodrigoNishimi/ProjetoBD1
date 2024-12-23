//INGREDIENTE
// Filtrar produtos com quantidade <= 0
// Cada ingrediente (linha da tabela) tem uma página detalhe_ingred que mostra os fornecedores

// Tabela de ingredientes
async function getIngredientes() {
    const response = await fetch('http://127.0.0.1:8000/cliente')
    const data = await response.json()

    const tabela = document.querySelector('#tcliente tbody');

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `detalhe_cliente.html?cpf=${data[i].cpf_cliente}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_cliente}</td>
        <td>${data[i].cpf_cliente}</td>
        <td>${data[i].telefone_cliente}</td>
        <td>${data[i].email_cliente}</td>
        <td>${data[i].endereco_cliente}</td>
        <td>${data[i].num_pedidos}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
}
getIngredientes()


// Filtrar e Ordenar
document.getElementById("btn-pesquisar").addEventListener("click", async function() {
    // Obter os valores dos elementos de filtro e ordenação
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let order = document.getElementById("order").value;

    // Montar os parâmetros da URL
    let queryParams = '?';
    if (nome) queryParams += 'nome=' + nome + '&';
    if (cpf) queryParams += 'cpf=' + cpf + '&';
    if (order) queryParams += 'order=' + order + '&';


    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/cliente' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()
      

    const tabela = document.querySelector('#tcliente tbody');
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `detalhe_cliente.html?cpf=${data[i].cpf_cliente}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_cliente}</td>
        <td>${data[i].cpf_cliente}</td>
        <td>${data[i].telefone_cliente}</td>
        <td>${data[i].email_cliente}</td>
        <td>${data[i].endereco_cliente}</td>
        <td>${data[i].num_pedidos}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
});