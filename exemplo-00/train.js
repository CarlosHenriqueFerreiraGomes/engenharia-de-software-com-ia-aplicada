import * as tf from '@tensorflow/tfjs';
import { encodePessoa } from './encoder.js';
import { createModel } from './model.js';
import fs from 'fs';

// Função auxiliar para criar vetor one-hot
function oneHot(index, size) {
    const arr = new Array(size).fill(0);
    arr[index] = 1; // ativa apenas a posição correta
    return arr;
}

export async function train() {

    const rawData = fs.readFileSync('dataset.json');
    const dataset = JSON.parse(rawData);

    // Converte dataset para arrays numéricos (features)
    const xs = dataset.map(d => encodePessoa(d));

    // Converte labels para one-hot
    const ys = dataset.map(d => oneHot(d.label, 3));

    // Cria tensores (estrutura que o TensorFlow usa)
    const inputTensor = tf.tensor2d(xs);
    const outputTensor = tf.tensor2d(ys);

    // Cria o modelo com base no tamanho da entrada
    const model = createModel(xs[0].length, 3);

    // Treinamento
    await model.fit(inputTensor, outputTensor, {
        epochs: 100,            // quantidade de vezes que o modelo aprende com os dados
        shuffle: true,          // embaralha os dados a cada ciclo
        // validationSplit: 0.2,   // separa parte dos dados para validaçã
        verbose: 0,             // não mostra logs padrão
        // Executa algo a cada época (ciclo de treino)
        callbacks: [
            // // Para treino automático se parar de melhorar
            // tf.callbacks.earlyStopping({
            //     monitor: 'val_loss',
            //     patience: 10
            // }),
            // Log customizado por época
            {
                onEpochEnd: (epoch, logs) => {
                    console.log(
                        `Epoch ${epoch} | loss: ${logs.loss.toFixed(4)} | acc: ${logs.acc?.toFixed(4)}`
                    );
                }
            }
        ]
    });

    return model
}