// Mapeamento de valores categóricos (one-hot encoding)
// Cada chave vira um vetor binário
const corMap = {
    azul: [1, 0, 0],
    vermelho: [0, 1, 0],
    verde: [0, 0, 1]
};

const locMap = {
    "São Paulo": [1, 0, 0],
    "Rio": [0, 1, 0],
    "Curitiba": [0, 0, 1]
};

// Normaliza idade para faixa entre 0 e 1
// Isso evita que valores grandes dominem o aprendizado
function normalizeIdade(idade) {
    const min = 0;
    const max = 100;
    return (idade - min) / (max - min);
}

// Função principal de encoding
// Transforma objeto "humano" em array numérico (features)
export function encodePessoa(pessoa) {
    return [
        normalizeIdade(pessoa.idade),   // 1 feature numérica
        ...corMap[pessoa.cor],          // 3 features categóricas
        ...locMap[pessoa.localizacao]   // 3 features categóricas
    ];
}