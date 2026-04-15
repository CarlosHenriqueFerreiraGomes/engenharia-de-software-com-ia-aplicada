// predict.js
import * as tf from '@tensorflow/tfjs';
import { encodePessoa } from './encoder.js';
import { labels } from './labels.js';

// Função de inferência (uso do modelo já treinado)
export async function predict(model, pessoa) {

    // Converte pessoa para formato numérico
    const encoded = encodePessoa(pessoa);

    // Converte os dados da pessoa em tensor (formato que a IA entende)
    const input = tf.tensor2d([encoded]);

    // Executa previsão
    const prediction = model.predict(input);

    // Converte resultado para array
    const probs = await prediction.array();

    // Mapeia para label + probabilidade
    return probs[0]
        .map((prob, index) => ({
            label: labels[index],
            prob: (prob * 100).toFixed(2) + '%'
        }))
        .sort((a, b) => parseFloat(b.prob) - parseFloat(a.prob)); // ordena do maior para o menor
}