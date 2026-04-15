# Demo: Next.js + Better Auth + GitHub OAuth + SQLite

Um projeto extremamente simples demonstrando autenticação com GitHub usando Better Auth e SQLite localmente.

## 🚀 Setup Rápido

### 1. Clonar/Preparar o projeto

```bash
cd demo-auth
npm install
```

### 2. Configurar GitHub OAuth

1. Acesse [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Clique **"New OAuth App"**
3. Preencha:
   - **Application name**: `Demo Auth Local`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copie **Client ID** e **Client Secret**
5. Crie o arquivo `.env.local` na raiz do projeto:

```env
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui
BETTER_AUTH_SECRET=demo-key-12345
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### 3. Executar migração do banco de dados

```bash
npm run migrate
```

Isso criará o arquivo `better-auth.sqlite` com as tabelas necessárias.

### 4. Iniciar o servidor

```bash
npm run dev
```

A aplicação estará disponível em **`http://localhost:3000`**

---

## 📁 Estrutura

```
demo-auth/
├── app/
│   ├── api/auth/[...all]/route.ts    # Handler Better Auth
│   ├── components/
│   │   └── LogoutButton.tsx           # Botão de logout
│   ├── page.tsx                        # Home page
│   ├── layout.tsx                      # Layout principal
│   └── globals.css                     # Tailwind styles
├── lib/
│   ├── auth.ts                         # Config Better Auth (server)
│   └── auth-client.ts                  # Client Better Auth
├── better-auth.sqlite                 # DB local (criado no migrate)
├── .env.local                          # Variáveis de ambiente
└── package.json
```

---

## 💻 Fluxo da aplicação

1. **Não logado**: Clica "Entrar com GitHub"
2. **GitHub OAuth**: Redireciona para login GitHub
3. **Callback**: Volta para `/` com sessão criada
4. **Logado**: Mostra nome, email e foto do perfil GitHub
5. **Logout**: Clica "Sair" e limpa a sessão

---

## 🔧 Dependências

- **Next.js 15**: Framework web
- **Better Auth 1.3+**: Autenticação
- **Tailwind CSS**: Estilos

**Nota**: Este demo roda sem banco de dados (stateless). Para persistência, adicione SQLite.

---

## 📝 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `GITHUB_CLIENT_ID` | ID da aplicação OAuth GitHub |
| `GITHUB_CLIENT_SECRET` | Secret da aplicação OAuth GitHub |
| `BETTER_AUTH_SECRET` | Chave para assinar sessões (mínimo 32 chars em produção) |
| `BETTER_AUTH_URL` | URL base da aplicação (server) |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | URL base da aplicação (client) |

---

## 🛠️ Troubleshooting

### Sessão não persiste
Este demo roda sem banco de dados. Sessões são perdidas ao reiniciar o servidor.

Para persistência, adicione SQLite:
```bash
npm install better-sqlite3
npm run migrate
```

E altere `lib/auth.ts` para usar `new Database("./better-auth.sqlite")`.

### Erro ao fazer migrate
```bash
npx @better-auth/cli migrate --force
```

### Limpar cache do navegador
Ctrl+Shift+Del (ou Cmd+Shift+Delete no Mac)

---

## 📚 Recursos

- [Better Auth Docs](https://better-auth.com)
- [GitHub OAuth Setup](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Next.js Docs](https://nextjs.org/docs)

---

**Nota**: Este é um demo educacional. Em produção, use variáveis de ambiente seguras, considere usar um DB remoto e implemente rate limiting.
