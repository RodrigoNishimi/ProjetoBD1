//DETALHES FORNECEDOR
async function carregaDados() {
    // Extrai o parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const cnpj = urlParams.get('cnpj');

    //Pizzas do pedido
    const response = await fetch('http://127.0.0.1:8000/det_ingred?cnpj=' + cnpj)
    const data = await response.json()

    //Acompanhamentos do pedido
    const response2 = await fetch('http://127.0.0.1:8000/det_acomp?cnpj=' + cnpj)
    const data2 = await response2.json()

    document.querySelector('#nome').innerText = data[0].nome_fornecedor
    document.querySelector('#cnpj').innerText = data[0].cnpj_fornecedor

    let total = 0;

    //Tabela Pizzas
    const tabela = document.querySelector('#ingred tbody');

    for (let i = 0; i < data.length; i++) {
        const row = 
        `<tr>
            <td>${data[i].id_ingrediente}</td>
            <td>${data[i].nome_ingrediente}</td>
            <td>${data[i].quantidade_fornecedor}</td>
            <td>${data[i].preco_fornecedor}</td>
            <td>${data[i].preco_total}</td>
        </tr>`

        tabela.innerHTML += row
        total++;
    }

    //Tabela Acompanhamentos
    const tabela2 = document.querySelector('#acomp tbody');

    for (let i = 0; i < data2.length; i++) {
        const row = 
        `<tr>
            <td>${data2[i].id_acomp}</td>
            <td>${data2[i].nome_acomp}</td>
            <td>${data2[i].tipo_acomp}</td>
            <td>${data2[i].quantidade_fornecedor}</td>
            <td>${data2[i].preco_fornecedor}</td>
            <td>${data2[i].preco_total}</td>
        </tr>`

        tabela2.innerHTML += row
        total++;
    }

    document.querySelector('#itens').innerText = total
}
carregaDados()