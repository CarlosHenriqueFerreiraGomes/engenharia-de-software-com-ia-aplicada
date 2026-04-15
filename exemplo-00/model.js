import * as tf from '@tensorflow/tfjs';

// Função responsável por criar a arquitetura do modelo
export function createModel(inputSize, outputSize) {

    // Cria um modelo sequencial (camada após camada)
    const model = tf.sequential();

    // Adiciona a PRIMEIRA camada da rede neural
    model.add(tf.layers.dense({
        units: 16,                 // quantidade de "neurônios"
        inputShape: [inputSize],   // quantidade de dados de entrada (7 características). Isso define que cada entrada tem 7 features (colunas)
        activation: 'relu'         // função de ativação (ajuda o modelo a aprender padrões)
    }));

    // Camada intermediária (ajuda a aprender padrões mais complexos)
    model.add(tf.layers.dense({
        units: 8,
        activation: 'relu'
    }));

    // Camada de saída
    model.add(tf.layers.dense({
        units: outputSize,         // 3 possíveis resultados (premium, medium, basic)
        activation: 'softmax'      // transforma a saída em probabilidades (soma = 100%)
    }));

    // Configura como o modelo vai aprender
    model.compile({
        optimizer: 'adam',                  // algoritmo que ajusta os pesos automaticamente
        loss: 'categoricalCrossentropy',    // mede o erro da previsão
        metrics: ['accuracy']               // mostra a taxa de acerto
    });

    return model;
}