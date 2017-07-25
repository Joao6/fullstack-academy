const produtos = [
    {
        id: 1,
        preco: 10.0,
        qtd: 2
    },
    {
        id: 2,
        preco: 10.0,
        qtd: 2
    },
    {
        id: 3,
        preco: 10.0,
        qtd: 2
    },
    {
        id: 4,
        preco: 10.0,
        qtd: 0
    }
]

const vetor = produtos.map(produto => {
    return {
        id: produto.id,
        subTotal: produto.qtd * produto.preco
    }
})

const vetSubTotal = vetor.map(valor => valor.subTotal)

const soma = (v1, v2) => v1 + v2

const total = vetSubTotal.reduce(soma, 0)

console.log(total)

