# 🔐 Safer

Landing page fictícia criada para ensinar UX e DX de forma simplificada com IA, em React, TypeScript, Vite e Tailwind.

> [TIP]
>
> Os exemplos usam o Claude Code, mas os dois instaladores suportam dezenas de agentes. Troque o identificador do agente pelo que você preferir, lembrando que cada CLI tem a sua própria lista: no Lagune o Claude Code é `claude`, no `skills` é `claude-code`.

---

## Instalação

Instale as dependências do projeto:

```sh
npm ci
npx -y playwright install chromium
```

---

## Preparação

### Lagune

O [**Lagune**](https://lagune.ai) reforça a segurança dentro do fluxo de desenvolvimento de ponta a ponta, guiando o agente do levantamento de riscos até a verificação de correções aplicadas.

Para este projeto, vamos usar as especializações `owasp` e `javascript`:

```sh
npx -y lagune@latest init claude --skills owasp javascript
```

Ao clonar o projeto com o **Lagune** já configurado, execute:

```sh
npx -y lagune@latest pull
```

---

### Skills

As convenções de código, interface e escrita vêm de [**wellwelwel/skills**](https://github.com/wellwelwel/skills):

```sh
npx skills@latest add wellwelwel/skills --agent claude-code --skill engineering ui cdp writer -y
```

| Skill         | Para que serve                                                           |
| ------------- | ------------------------------------------------------------------------ |
| `engineering` | Convenções de código, tipos, testes e mensagens de commit.               |
| `ui`          | Detalhes visuais e de interação que fazem a interface parecer acabada.   |
| `cdp`         | Verificação do que o navegador realmente renderiza, via Chrome DevTools. |
| `writer`      | Como a prosa do projeto é escrita e revisada.                            |

---

## Exemplos de Prompts _(em ordem de execução)_

- [**resources/prompts.md**](./resources/prompts.md)
- [**PRD**](./PRD.md)
