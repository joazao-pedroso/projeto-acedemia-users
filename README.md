# Pulse Fit

Projeto desenvolvido com **Next.js 14 (App Router)** para validar o CPF de usuários e mostrar status de acesso (liberado, negado ou não encontrado) a partir de uma API externa.

[Link do site da Catraca na Vercel](https://pulse-fit-catraca.vercel.app/)

[Link do site Adm na Vercel](https://pulse-fit-adm.vercel.app/)


## ✨ Funcionalidades

- Interface moderna com Tailwind CSS.
- Entrada de CPF via teclado numérico customizado.
- Validação de CPF com API externa.
- Exibição de informações do usuário (nome, foto, telefone, CPF e status).
- Mensagens de acesso dinâmicas (liberado, negado ou usuário não encontrado).

## 🧩 Tecnologias

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/joazao-pedroso/projeto-acedemia-users.git

cd projeto-acedemia-users
```

2. **Instale as dependências**

```bash
npm install
```

ou

```bash
yarn
```

3. **Rode o projeto em ambiente de desenvolvimento**

```bash
npm run dev
```

ou

```bash
yarn dev
```

4. **Abra no navegador**

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx        # Layout global
│   ├── page.tsx          # Página principal com a lógica do CPF
│   └── globals.css       # Estilos globais com Tailwind
```

---

## 🔗 API Externa

Este projeto consome a seguinte API para validação de CPF:

```
GET https://api-academia-alpha.vercel.app/gym/user/cpf/{cpf}
```
API feita por [Pedro Vitor](https://github.com/Pedro-Vitor-Ribeiro-Silva):
[Repositório da API](https://github.com/Pedro-Vitor-Ribeiro-Silva/API_ACADEMIA) 
---

## 📌 Notas

- O campo de CPF aceita no máximo 11 dígitos numéricos.
- A entrada é feita via botões na tela (não usa teclado físico).
- As mensagens desaparecem automaticamente após alguns segundos.
- O botão de "Limpar" reinicia o campo de CPF.

---

## 💡 Sugestões ou Melhorias?

Sinta-se à vontade para abrir uma issue ou enviar um pull request! 💬

---

## 📄 Licença

MIT License. © [João Pedro]([https://github.com/Pedro-Vitor-Ribeiro-Silva](https://github.com/joazao-pedroso))
