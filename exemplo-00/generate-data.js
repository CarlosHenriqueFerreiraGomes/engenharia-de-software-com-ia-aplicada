import fs from 'fs';

// pseudo-random determinístico (SEMPRE igual)
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const cores = ["azul", "vermelho", "verde"];
const locais = ["São Paulo", "Rio", "Curitiba"];

const dataset = [];

for (let i = 0; i < 1000; i++) {

    const idade = Math.floor(seededRandom(i) * 50) + 18;
    const cor = cores[Math.floor(seededRandom(i + 1) * cores.length)];
    const localizacao = locais[Math.floor(seededRandom(i + 2) * locais.length)];

    let label;

    if (
        (idade > 40 && localizacao === "São Paulo") ||
        (idade > 35 && cor === "azul")
    ) {
        label = 0;
    } else if (idade >= 25) {
        label = 1;
    } else {
        label = 2;
    }

    dataset.push({ idade, cor, localizacao, label });
}

// salva arquivo FIXO
fs.writeFileSync('dataset.json', JSON.stringify(dataset, null, 2));

console.log("Dataset gerado com sucesso!");