//puxar os produtos do JSON:
const json = require('./produtos.json');
const express = require('express')

// Itens e suas "colunas"
class Produto {
    constructor(id, nome, valor_unit) {
      this.id = id;
      this.nome = nome;
      this.valor_unit = valor_unit;
    }
  }
  
  // Criação do Carrinho
  class Carrinho {
    constructor() {
      this.itens = [];
    }
  
    // Adiciona um item 
    adicionarItem(produto) {
      this.itens.push(produto);
    }
  
    // Calcula o total da compra
    calcularTotal() {
      const total = 0;
      for (const i = 0; i < this.itens.length; i++) {
        total = total + this.itens[i].preco * this.itens[i].quantidade;
      }
      return total;
    }
  }
  
  const meuCarrinho = new Carrinho();
  
// Array de produtos:
  const prods = {
   arroz: new Produto(1,"Arroz", 20.5),
   feijao: new Produto(2,"feijao", 8.5),
   suco: new Produto(3,"suco", 1.5),
   leite: new Produto(4,"leite", 4.5),
   bolacha: new Produto(5,"bolacha", 2.5),
   ovo: new Produto(6,"ovo", 12.0),
  };
  

  // Adiciona os produtos ao carrinho
  //Exemplo com a implantação do front: body.meuCarrinho.adicionarItem(prods.arroz);
 
  meuCarrinho.adicionarItem(prods.arroz);
  meuCarrinho.adicionarItem(prods.feijao);
  meuCarrinho.adicionarItem(prods.suco);
  
  // Total da compra:
  const totalDaCompra = meuCarrinho.calcularTotal();
  console.log("Total da compra: R$ " + totalDaCompra.toFixed(2));



  