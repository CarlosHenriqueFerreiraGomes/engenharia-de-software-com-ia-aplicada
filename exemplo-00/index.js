import { train } from './train.js';
import { predict } from './predict.js';

// Treina o modelo
const model = await train();

// Nova entrada (simulação de uso real)
const pessoa = {
    idade: 28,
    cor: "verde",
    localizacao: "Curitiba"
};

// Faz previsão
const result = await predict(model, pessoa);

// Exibe resultado
console.log(result);

// node generate-data.js

// TensorFlow não é a primeira escolha na maioria dos casos para NFS-e, normalmente é melhor começar com:
// Random Forest
// XGBoost
// Isolation Forest
