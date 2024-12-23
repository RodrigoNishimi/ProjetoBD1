//PEDIDOS
// Função para buscar pedidos

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:8000/entregador')
        .then(response => {
            if (!response.ok) throw new Error("Erro na resposta da API");
            return response.json();
        })
        .then(data => {
            const tabela = document.getElementById('entregadores').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

            data.forEach(item => {
                let row = tabela.insertRow();

                row.addEventListener('click', () => {
                    window.location.href = 'det_entregador.html?cpf=' + item.cpf_entregador;
                });
                
                // Definindo as células de acordo com as colunas de dados do backend
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);

                // Mapeando os campos JSON corretos
                cell1.textContent = item.cpf_entregador || "N/A";
                cell2.textContent = item.nome_entregador || "N/A";
                cell3.textContent = item.telefone_entregador || "N/A";
                cell4.textContent = item.email_entregador || "N/A";
                cell5.textContent = item.endereco_entregador || "N/A";
                cell6.textContent = item.salario || "N/A";
                cell7.textContent = item.num_entregas || "N/A";
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});



// FUNÇÃO DE FILTRAR E ORDENAR OS PEDIDOS DA TABELA
document.getElementById("btn-pesquisar").addEventListener("click", function() {
    // Obter os valores dos elementos de filtro e ordenação
    let cpf = document.getElementById("cpf").value;
    let ordenar = document.querySelector("#order[name='order']").value;

    // Montar os parâmetros da URL
    let queryParams = '?';
    if (cpf) queryParams += 'cpf=' + cpf + '&';
    if (ordenar) queryParams += 'salario=' + ordenar;
    

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/entregador' + queryParams;

    // Fazer a requisição GET
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('entregadores').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

            data.forEach(item => {
                let row = tabela.insertRow();

                row.addEventListener('click', () => {
                    window.location.href = 'det_entregador.html?cpf=' + item.cpf_entregador;
                });
                
                // Definindo as células de acordo com as colunas de dados do backend
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);

                // Mapeando os campos JSON corretos
                cell1.textContent = item.cpf_entregador || "N/A";
                cell2.textContent = item.nome_entregador || "N/A";
                cell3.textContent = item.telefone_entregador || "N/A";
                cell4.textContent = item.email_entregador || "N/A";
                cell5.textContent = item.endereco_entregador || "N/A";
                cell6.textContent = item.salario || "N/A";
                cell7.textContent = item.num_entregas || "N/A";
            })
        .catch(error => console.error("Erro ao buscar dados:", error));
    }
    );
});