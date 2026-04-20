# OpenRouter API Example

Este exemplo demonstra como fazer uma requisição para a API do OpenRouter usando curl.

## Pré-requisitos

1. Conta no [OpenRouter](https://openrouter.ai/)
2. API Key obtida no dashboard do OpenRouter
3. Arquivo `.env` com a chave da API

## Configuração

1. Copie seu API key para o arquivo `.env`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
   ```

## Como usar

### No Linux/Mac (Bash)
```bash
./request.sh
```

### No Windows (PowerShell)
```powershell
.\request.ps1
```

## O que o script faz

- Faz uma requisição POST para a API do OpenRouter
- Usa o modelo `google/gemma-3-27b-it:free`
- Pergunta uma curiosidade sobre LLMs
- Retorna a resposta em JSON

## Tratamento de Erros

- **429 Too Many Requests**: Você excedeu o limite de requisições. Aguarde alguns minutos.
- **401 Unauthorized**: Verifique se sua API key está correta no arquivo `.env`
- **Arquivo .env não encontrado**: Certifique-se de que o arquivo `.env` existe no mesmo diretório

## Personalização

Você pode modificar o script para:
- Usar diferentes modelos (veja [modelos disponíveis](https://openrouter.ai/models))
- Alterar a mensagem enviada
- Adicionar mais mensagens na conversa