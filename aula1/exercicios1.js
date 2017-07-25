const produtos = [
  {
    nome: 'Bicicleta',
    preco: 1200.0
  },
  {
    nome: 'Capacete',
    preco: 450.0
  }
]

const precos = produtos.map(produto => produto.preco)

const soma = (anterior, atual) => anterior + atual

const total = precos.reduce(soma, 0)

console.log("O valor total dos produtos é:", total)