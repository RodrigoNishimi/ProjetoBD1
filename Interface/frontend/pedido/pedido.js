//PEDIDOS
// Função para buscar pedidos

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:8000/pedido')
        .then(response => {
            if (!response.ok) throw new Error("Erro na resposta da API");
            return response.json();
        })
        .then(data => {
            const tabela = document.getElementById('tabela-pedidos').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

            data.forEach(item => {
                let row = tabela.insertRow();

                // ao clicar em uma linha da tabela redireciona para a página do pedido
                row.addEventListener('click', () => {
                    window.location.href = 'detalhe_ped.html?id_pedido=' + item.id_pedido;
                });
                
                // Definindo as células de acordo com as colunas de dados do backend
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                let cell8 = row.insertCell(7);

                // Mapeando os campos JSON corretos
                cell1.textContent = item.id_pedido || "N/A";
                cell2.textContent = item.cpf_cliente || "N/A";
                cell3.textContent = item.nome_cliente || "N/A";
                cell4.textContent = item.telefone_cliente || "N/A";
                cell5.textContent = item.endereco_pedido || "N/A";

                const dataCompleta = item.data_pedido;
                const data = new Date(dataCompleta);
                const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(data);

                cell6.textContent = dataFormatada || "N/A";
                cell7.textContent = item.status_pedido || "N/A";
                cell8.textContent = item.cpf_entregador || "N/A";
                //cell6.textContent = (item.preco_pedido * item.quantidade_pedido + item.preco_acomp * item.quantidade_acomp) || "N/A";     // Preço total do pedido
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});



// FUNÇÃO DE FILTRAR E ORDENAR OS PEDIDOS DA TABELA
document.getElementById("btn-pesquisar").addEventListener("click", function() {
    // Obter os valores dos elementos de filtro e ordenação
    let id = document.getElementById("id").value;
    let cpf = document.getElementById("cpf").value;
    let status = document.querySelector("#status[name='status']").value;
    let ordenar = document.querySelector("#order[name='order']").value;

    // Montar os parâmetros da URL
    let queryParams = '?';
    if (id) queryParams += 'id=' + id + '&';
    if (cpf) queryParams += 'cpf=' + cpf + '&';
    if (status) queryParams += 'status=' + status + '&';
    if (ordenar) queryParams += 'order=' + ordenar;
    

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/pedido' + queryParams;

    // Fazer a requisição GET
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('tabela-pedidos').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

            data.forEach(item => {
                let row = tabela.insertRow();

                // ao clicar em uma linha da tabela redireciona para a página do pedido
                row.addEventListener('click', () => {
                    window.location.href = 'detalhe_ped.html?id_pedido=' + item.id_pedido;
                });
                
                // Definindo as células de acordo com as colunas de dados do backend
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                let cell8 = row.insertCell(7);

                // Mapeando os campos JSON corretos
                cell1.textContent = item.id_pedido || "N/A";
                cell2.textContent = item.cpf_cliente || "N/A";
                cell3.textContent = item.nome_cliente || "N/A";
                cell4.textContent = item.telefone_cliente || "N/A";
                cell5.textContent = item.endereco_pedido || "N/A";

                const dataCompleta = item.data_pedido;
                const data = new Date(dataCompleta);
                const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(data);

                cell6.textContent = dataFormatada || "N/A";
                cell7.textContent = item.status_pedido || "N/A";
                cell8.textContent = item.cpf_entregador || "N/A";
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
    }
    );
});