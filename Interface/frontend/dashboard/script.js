// efeito de botões do menu
// Seleciona todos os botões do menu
const menuButtons = document.querySelectorAll('.menu-button[data-submenu]');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        menuButtons.forEach(btn => btn.classList.remove('active'));

        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');

        // Obtém o ID do submenu associado
        const submenuId = button.getAttribute('data-submenu');
        const submenu = document.getElementById(submenuId);
        
        // Fecha outros submenus abertos
        document.querySelectorAll('.submenu').forEach(sm => {
            if (sm !== submenu) {
                sm.style.display = 'none';
            }
        });

        // Alterna a visibilidade do submenu atual
        submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
    });
});

// Função para carregar o conteúdo no iframe
const contentFrame = document.getElementById('contentFrame');
const allButtons = document.querySelectorAll('.menu-button, .submenu-button');

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const url = button.getAttribute('data-url');
        if (url) {
            contentFrame.src = url;

            // Remove a classe active de todos os botões e adiciona ao clicado
            allButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }
    });
});

// Gráfico de vendas por dia
(async function () {
    try {
        // Requisição para o backend
        const response = await fetch('http://127.0.0.1:8000/preco');
        const data = await response.json();

        // Verificação do conteúdo dos dados recebidos
        console.log("Dados recebidos do backend:", data);

        // Objeto para armazenar vendas por dia
        const vendasPorDia = {};

        data.forEach(item => {
            const dataPedido = new Date(item.data_pedido); // Converte a data para objeto Date
            const dia = dataPedido.toISOString().split('T')[0]; // Formato YYYY-MM-DD

            const preco = parseFloat(item.preco_pedido) || 0; // Garante que o preço seja um número válido

            // Soma os valores por dia
            if (!vendasPorDia[dia]) {
                vendasPorDia[dia] = 0;
            }
            vendasPorDia[dia] += preco;
        });

        // Dados para o gráfico
        const labels = Object.keys(vendasPorDia)
            .sort()
            .map(data => {
                const [ano, mes, dia] = data.split('-'); // Divide a data no formato YYYY-MM-DD
                return `${dia}/${mes}`; // Retorna no formato dd/mm
            });

        const valores = Object.values(vendasPorDia);

        // Verificação das labels e valores para o gráfico
        console.log("Labels para o gráfico:", labels);
        console.log("Valores para o gráfico:", valores);

        // Criação do gráfico
        new Chart(document.getElementById('grafico'), {
            type: 'line',
            data: {
                labels: labels, // Datas no formato dd/mm
                datasets: [{
                    label: 'Vendas por Dia (R$)',
                    data: valores, // Valores totais das vendas
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data (dd/mm)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total em R$'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao criar o gráfico:", error);
    }
})();


(async function () {
    try {
        // Requisição para o backend
        const response = await fetch('http://127.0.0.1:8000/preco');
        const data = await response.json();

        // Verificação do conteúdo dos dados recebidos
        console.log("Dados recebidos do backend:", data);

        // Objeto para armazenar vendas por mês
        const vendasPorMes = {};

        data.forEach(item => {
            const dataPedido = new Date(item.data_pedido); // Converte a data para objeto Date
            const mes = `${dataPedido.getMonth() + 1}`.padStart(2, '0'); // Mês no formato MM
            const ano = dataPedido.getFullYear(); // Ano no formato YYYY
            const chaveMesAno = `${mes}/${ano}`; // Formato MM/YYYY

            const preco = parseFloat(item.preco_pedido) || 0; // Garante que o preço seja um número válido

            // Soma os valores por mês
            if (!vendasPorMes[chaveMesAno]) {
                vendasPorMes[chaveMesAno] = 0;
            }
            vendasPorMes[chaveMesAno] += preco;
        });

        // Dados para o gráfico
        const labels = Object.keys(vendasPorMes).sort((a, b) => {
            // Ordena os meses no formato MM/YYYY
            const [mesA, anoA] = a.split('/');
            const [mesB, anoB] = b.split('/');
            return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
        });

        const valores = labels.map(label => vendasPorMes[label]);

        // Verificação das labels e valores para o gráfico
        console.log("Labels para o gráfico:", labels);
        console.log("Valores para o gráfico:", valores);

        // Criação do gráfico
        new Chart(document.getElementById('grafico2'), {
            type: 'line',
            data: {
                labels: labels, // Meses no formato MM/YYYY
                datasets: [{
                    label: 'Vendas por Mês (R$)',
                    data: valores, // Valores totais das vendas
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Mês (MM/AAAA)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total em R$'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao criar o gráfico:", error);
    }
})();



document.getElementById("atualizar").addEventListener("click", async () => {
    const mes = document.getElementById("mes").value;
    const ano = document.getElementById("ano").value;

    if (mes && ano && mes >= 1 && mes <= 12 && ano.length === 4 && !isNaN(ano)) {
        await loadGanho(mes, ano);
        await loadPedidos(mes, ano);
        await loadClientes(mes, ano);
        await loadGastoIngredientes(mes, ano);
        await loadGastoAcompanhamentos(mes, ano);
        await loadGastosSalarios(mes, ano);
        await loadLucro(mes, ano);

    } else {
        alert("Inserir mês, ano e filtro validos");
    }
});

// Função para buscar os dados do ganho na API
async function fetchGanho(mes, ano) {
    try {
        // Faz a requisição com os parâmetros mes e ano
        const response = await fetch(`http://127.0.0.1:8000/ganho?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const ganho = await response.text(); // Lê a resposta como texto
        return parseFloat(ganho); // Converte para float
    } catch (error) {
        console.error("Erro ao buscar dados de ganho:", error);
    }
}

// Função para atualizar o card de vendas totais
async function loadGanho(mes, ano) {
    try {
        const ganho = await fetchGanho(mes, ano); // Chama a função de fetch
        if (!isNaN(ganho)) {
            const ganhoElement = document.getElementById("ganho");
            ganhoElement.innerHTML = `R$ ${ganho.toFixed(2)}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de ganho inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar ganho:", error);
    }
}

// Função para buscar os dados do número de pedidos na API
async function fetchPedidos(mes, ano) {
    try {
        // Faz a requisição com os parâmetros mes e ano
        const response = await fetch(`http://127.0.0.1:8000/npedidos?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const pedidos = await response.json(); // Assume que a resposta é um número inteiro em formato JSON
        return pedidos; // Retorna o número de pedidos diretamente
    } catch (error) {
        console.error("Erro ao buscar dados de pedidos:", error);
    }
}

// Função para atualizar o card de pedidos
async function loadPedidos(mes, ano) {
    try {
        const pedidos = await fetchPedidos(mes, ano); // Chama a função de fetch
        if (!isNaN(pedidos)) {
            const pedidosElement = document.getElementById("pedidos");
            pedidosElement.innerHTML = `${pedidos}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de pedidos inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
    }
}

// Função para buscar os dados de clientes na API
async function fetchClientes(mes, ano) {
    try {
        // Faz a requisição com os parâmetros mes e ano
        const response = await fetch(`http://127.0.0.1:8000/nclientes?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const clientes = await response.text(); // Lê a resposta como texto
        return parseInt(clientes); // Converte para inteiro
    } catch (error) {
        console.error("Erro ao buscar dados de clientes:", error);
    }
}

// Função para atualizar o card de clientes
async function loadClientes(mes, ano) {
    try {
        const clientes = await fetchClientes(mes, ano); // Chama a função de fetch
        if (!isNaN(clientes)) {
            const clientesElement = document.getElementById("clientes");
            clientesElement.innerHTML = `${clientes}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de clientes inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}


// Função para buscar os dados do gasto com ingredientes na API
async function fetchGastoIngredientes(mes, ano) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/gastos_ing?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const gasto = await response.text(); // Lê a resposta como texto
        return parseFloat(gasto); // Converte para float
    } catch (error) {
        console.error("Erro ao buscar dados de gasto com ingredientes:", error);
    }
}

// Função para atualizar o card de gasto com ingredientes
async function loadGastoIngredientes(mes, ano) {
    try {
        const gasto = await fetchGastoIngredientes(mes, ano); // Chama a função de fetch
        if (!isNaN(gasto)) {
            const gastoElement = document.getElementById("gastoI");
            gastoElement.innerHTML = `R$ ${gasto.toFixed(2)}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de gasto com ingredientes inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar gasto com ingredientes:", error);
    }
}


// Função para buscar os dados do gasto com acompanhamentos na API
async function fetchGastoAcompanhamentos(mes, ano) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/gastos_acomp?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const gasto = await response.text(); // Lê a resposta como texto
        return parseFloat(gasto); // Converte para float
    } catch (error) {
        console.error("Erro ao buscar dados de gasto com acompanhamentos:", error);
    }
}

// Função para atualizar o card de gasto com acompanhamentos
async function loadGastoAcompanhamentos(mes, ano) {
    try {
        const gasto = await fetchGastoAcompanhamentos(mes, ano); // Chama a função de fetch
        if (!isNaN(gasto)) {
            const gastoElement = document.getElementById("gastoA");
            gastoElement.innerHTML = `R$ ${gasto.toFixed(2)}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de gasto com acompanhamentos inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar gasto com acompanhamentos:", error);
    }
}


// Função para buscar os dados do lucro na API
async function fetchLucro(mes, ano) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/lucro?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const lucro = await response.text(); // Lê a resposta como texto
        return parseFloat(lucro); // Converte para float
    } catch (error) {
        console.error("Erro ao buscar dados de lucro:", error);
    }
}

// Função para atualizar o card de lucro
async function loadLucro(mes, ano) {
    try {
        const lucro = await fetchLucro(mes, ano); // Chama a função de fetch
        if (!isNaN(lucro)) {
            const lucroElement = document.getElementById("Lucro");
            lucroElement.innerHTML = `R$ ${lucro.toFixed(2)}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de lucro inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar lucro:", error);
    }
}


// Função para buscar os dados do gasto com salários na API
async function fetchGastosSalarios(mes, ano) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/gastos_salarios?mes=${mes}&ano=${ano}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const gasto = await response.text(); // Lê a resposta como texto
        return parseFloat(gasto); // Converte para float
    } catch (error) {
        console.error("Erro ao buscar dados de gastos com salários:", error);
    }
}

// Função para atualizar o card de gastos com salários
async function loadGastosSalarios(mes, ano) {
    try {
        const gasto = await fetchGastosSalarios(mes, ano); // Chama a função de fetch
        if (!isNaN(gasto)) {
            const gastoElement = document.getElementById("gastoS");
            gastoElement.innerHTML = `R$ ${gasto.toFixed(2)}`; // Atualiza o valor no HTML
        } else {
            console.warn("Valor de gastos com salários inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar gastos com salários:", error);
    }
}