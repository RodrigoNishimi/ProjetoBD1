//DETALHES PEDIDO
async function carregaDados() {
    // Extrai o parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const id_pedido = urlParams.get('id_pedido');

    //Pizzas do pedido
    const response = await fetch('http://127.0.0.1:8000/pedido/detalhep?id_pedido=' + id_pedido)
    const data = await response.json()
    console.log(data)

    //Acompanhamentos do pedido
    const response2 = await fetch('http://127.0.0.1:8000/pedido/detalhea?id_pedido=' + id_pedido)
    const data2 = await response2.json()

    let total = 0;

    //Tabela Pizzas
    const tabela = document.querySelector('#detalhe_ped_p tbody');

    for (let i = 0; i < data.length; i++) {
        const row = 
        `<tr>
            <td>${data[i].nome_pizza}</td>
            <td>${data[i].quantidade_pizza}</td>
            <td>${data[i].preco_pizzas}</td>
        </tr>`

        tabela.innerHTML += row

        total += parseFloat(data[i].preco_pizzas)
    }

    //Tabela Acompanhamentos
    const tabela2 = document.querySelector('#detalhe_ped_a tbody');

    for (let i = 0; i < data2.length; i++) {
        const row = 
        `<tr>
            <td>${data2[i].nome_acomp}</td>
            <td>${data2[i].quantidade_acomp}</td>
            <td>${data2[i].tipo_acomp}</td>
            <td>${data2[i].preco_acomps}</td>
        </tr>`

        tabela2.innerHTML += row

        total += parseFloat(data2[i].preco_acomps)
    }

    //Preço total
    document.querySelector('#preco_total').innerText = total.toFixed(2)
}

carregaDados()