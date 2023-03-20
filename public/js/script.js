const comprasItens = []
function takeProd(){
    const codBarras = document.getElementById('codBarrasInput').value
    fetch('http://localhost:3000/prod/'+codBarras, {method: 'GET'}).then((response)=> response.json()).then((value) => {
        const indexRepeatItens = comprasItens.findIndex((value)=> value.id == codBarras)
        console.log(indexRepeatItens)
        if (indexRepeatItens != -1) {
            const itemRepeated = comprasItens[indexRepeatItens]
            itemRepeated.quantity++
            comprasItens[indexRepeatItens] = itemRepeated
        }
        else comprasItens.push({id: value.id, nome: value.nome, valor_unit: value.valor_unit, quantity: document.getElementById('qtdInput').value ||  1})
        updateTable()
    })
}

function botaoExcluirProd(){
    const idProd = document.getElementById('idProdRemove').value
    const indexForRemove = comprasItens.findIndex((item)=> item.id == idProd)
    if (indexForRemove != -1){
        comprasItens.splice(indexForRemove, 1)
    }
    document.getElementById('modalRemoveProd').classList.toggle('open')
    updateTable()
}

function updateTable() {
  let rows = `
        <tr>
            <th>
                Codigo
            </th>
            <th>
                Nome
            </th>
            <th>
                Quantidade
            </th>
            <th>
                Preço
            </th>
        </tr>
        `;
  comprasItens.forEach((item) => {
    rows += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.quantity}</td>
                <td>R$${(item.quantity * item.valor_unit)
                  .toFixed(2)
                  .replace(".", ",")}</td>
            </tr>`;
  });
  document.getElementsByTagName('tbody').item(0).innerHTML = rows
  return rows
}