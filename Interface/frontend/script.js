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
