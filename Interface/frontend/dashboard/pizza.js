//INGREDIENTE
// Filtrar produtos com quantidade <= 0
// Cada ingrediente (linha da tabela) tem uma página detalhe_ingred que mostra os fornecedores

// Tabela de ingredientes
async function getIngredientes() {
    const response = await fetch('http://127.0.0.1:8000/pizza')
    const data = await response.json()

    const tabela = document.querySelector('#tpizza tbody');

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `../pizza/detalhe_pizza.html?id_pizza=${data[i].id_pizza}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_pizza}</td>
        <td>${data[i].quantidade_vendida}</td>
        <td>${data[i].preco_pizza}</td>
        <td>${data[i].total_vendido}</td>`;

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
    if (ordenar == 'q_asc') queryParams += 'qtde=ASC';
    if (ordenar == 'q_desc') queryParams += 'qtde=DESC';
    if (ordenar == 'v_asc') queryParams += 'vendas=ASC';
    if (ordenar == 'v_desc') queryParams += 'vendas=DESC';

    // Definir a rota do Flask com os parâmetros
    let url = 'http://127.0.0.1:8000/pizza' + queryParams;

    // Fazer a requisição GET
    const response = await fetch(url)
    const data = await response.json()
      

    const tabela = document.querySelector('#tpizza tbody');
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    for (let i = 0; i < data.length; i++) {
        // Cria uma linha da tabela
        const row = document.createElement("tr");

        // Define o evento de clique na linha para redirecionar com o ID
        row.addEventListener("click", function() {
            window.location.href = `../pizza/detalhe_pizza.html?id_pizza=${data[i].id_pizza}`;
        });

        // Popula a linha com dados
        row.innerHTML = 
        `<td>${data[i].nome_pizza}</td>
        <td>${data[i].quantidade_vendida}</td>
        <td>${data[i].preco_pizza}</td>
        <td>${data[i].total_vendido}</td>`;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    }
});


// Gráfico PIZZAS MAIS VENDIDAS
// Obtém os dados do backend e cria o gráfico
const createChart = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/pizza');
        const data = await response.json();
    
        // Ordena os dados pelas vendas em ordem decrescente
        const sortedData = data.sort((a, b) => b.quantidade_vendida - a.quantidade_vendida);
    
        // Seleciona as 5 pizzas mais vendidas
        const topPizzas = sortedData.slice(0, 5);
        const worstPizzas = sortedData.slice(-5);
  
      // Prepara os dados para o gráfico
        const pizzaNames = topPizzas.map(item => item.nome_pizza);
        const pizzaSales = topPizzas.map(item => item.quantidade_vendida);
        const pizzaNames2 = worstPizzas.map(item => item.nome_pizza);
        const pizzaSales2 = worstPizzas.map(item => item.quantidade_vendida);
  
      // Configuração do gráfico
      const ctx = document.getElementById('pizzaChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pizzaNames, // Nomes das pizzas
          datasets: [{
            label: 'Vendas',
            data: pizzaSales, // Quantidade de vendas
            backgroundColor: [
                "#3498db", // Azul
                "#e74c3c", // Vermelho
                "#f1c40f", // Amarelo
                "#2ecc71", // Verde
                "#9b59b6", // Roxo
            ],
            borderWidth: 1,
            hoverOffset: 10,
          }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true, // Exibe o título
                    text: '5 Pizzas Mais Vendidas', // Texto do título
                    font: {
                        size: 18, // Tamanho da fonte
                        family: 'Arial', // Fonte personalizada
                        weight: 'bold' // Negrito
                    },
                    color: '#2c3e50', // Cor do texto
                    padding: {
                        top: 5,
                        bottom: 15 // Espaçamento abaixo do título
                    }
                },
                legend: {
                    position: 'top' // Posição da legenda
                },
                tooltip: {
                    backgroundColor: "#34495e",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#ffffff",
                    borderWidth: 1,
                }
            }
        }
    });
    }
    catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
}
      
  
  // Chama a função para criar o gráfico
  createChart();
  

  const createChart2 = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/pizza');
        const data = await response.json();
    
        // Ordena os dados pelas vendas em ordem decrescente
        const sortedData = data.sort((a, b) => b.quantidade_vendida - a.quantidade_vendida);
    
        // Seleciona as 5 pizzas mais vendidas
        const worstPizzas = sortedData.slice(-5);
  
      // Prepara os dados para o gráfico
        const pizzaNames = worstPizzas.map(item => item.nome_pizza);
        const pizzaSales = worstPizzas.map(item => item.quantidade_vendida);
  
      // Configuração do gráfico
      const ctx2 = document.getElementById('pizzaChart2').getContext('2d');
      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: pizzaNames, // Nomes das pizzas
          datasets: [{
            label: 'Vendas',
            data: pizzaSales, // Quantidade de vendas
            backgroundColor: [
                "#3498db", // Azul
                "#e74c3c", // Vermelho
                "#f1c40f", // Amarelo
                "#2ecc71", // Verde
                "#9b59b6", // Roxo
            ],
            borderWidth: 1,
            hoverOffset: 10,
          }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true, // Exibe o título
                    text: '5 Pizzas Menos Vendidas', // Texto do título
                    font: {
                        size: 18, // Tamanho da fonte
                        family: 'Arial', // Fonte personalizada
                        weight: 'bold' // Negrito
                    },
                    color: '#2c3e50', // Cor do texto
                    padding: {
                        top: 30,
                        bottom: 15 // Espaçamento abaixo do título
                    }
                },
                legend: {
                    position: 'top' // Posição da legenda
                },
                tooltip: {
                    backgroundColor: "#34495e",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#ffffff",
                    borderWidth: 1,
                }
            }
        }
    });
    }
    catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
}
      
  
  // Chama a função para criar o gráfico
  createChart2();