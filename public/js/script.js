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
function finalizarCompra(){
    const cpf = document.getElementById("cpfInput").value;
    const tel = document.getElementById("telInput").value;
    const nome = document.getElementById("nameInput").value;
    const paymentMethod = getPaymentMethod();
    if (validarCpf(cpf) && tel.length >= 10 && tel.length <= 11) {
      const xml = new XMLHttpRequest();
      const sendData = {
        cpf,
        tel,
        nome,
        paymentMethod,
        itensComprados: comprasItens
      }
      xml.onload = function () {
        if (this.status === 200) {
          const parsed = JSON.parse(this.response)
          location.pathname = '/finalMessage/'+parsed.idNota
        }
      };
      xml.open("POST", "http://localhost:3000/finalizar");
      xml.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xml.send(JSON.stringify(sendData));
    } 
}


function getPaymentMethod(){
    let opSelected = 0
    document.getElementsByName('paymentMethod').forEach((element, index) => {
        if (element.checked){
            opSelected = index
        }
    })
    if (opSelected == 0){
        return 'Pix'
    }
    else if (opSelected == 1){
        return 'Dinheiro'
    }
    else if (opSelected == 2){
        return 'Débito'
    }
    else if (opSelected == 3){
        return 'Crédito'
    }
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

function validarCpf(vetorCpf){
        const pesos = [10,9,8,7,6,5,4,3,2];
        let somaDigitos = 0;
        let firstVerificationNumber = 0
        for (let i = 0; i < 9; i++){
            somaDigitos += vetorCpf.charAt(i) * pesos[i];
        }

        if (somaDigitos%11 < 2){
            firstVerificationNumber = 0
        }
        else{
            firstVerificationNumber = 11 - somaDigitos%11;
        }
        somaDigitos = 0;
        const pesos2 = [11,10,9,8,7,6,5,4,3,2];
        let secondVerificationNumber = 0
        for (let i = 0; i < 10; i++){
            somaDigitos += vetorCpf.charAt(i) * pesos2[i];
        }
        if (somaDigitos%11 < 2){
            secondVerificationNumber = 0
        }
        else{
            secondVerificationNumber = 11 - somaDigitos%11;
        }
        const cpfPassed = (firstVerificationNumber == vetorCpf.charAt(9)) && (secondVerificationNumber == vetorCpf.charAt(10));
        return cpfPassed;
}