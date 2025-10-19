# **SendPro - Gerador de Email Marketing**

Bem-vindo ao **Gerador de Email Marketing**, uma aplicação poderosa e intuitiva para criar, personalizar e enviar campanhas de email marketing que impressionam e geram resultados. Este projeto foi desenvolvido com foco em flexibilidade, usabilidade e eficiência, permitindo que você crie emails visualmente atraentes sem precisar de conhecimentos avançados em HTML ou design.

---

## **🚀 Funcionalidades Principais**

- Criação visual de emails em HTML  
- Edição em tempo real com preview  
- Envio de emails
- Suporte a imagens e botões interativos

---

## 🛠️ Tecnologias Utilizadas


### 🎨 Frontend
- **React + Vite**: criação da interface.
- **DND Kit**: arrastar e soltar elementos.
- **TipTap Editor**: editor de texto com formatação.
- **FontAwesome**: ícones visuais.
- **React Router DOM**: navegação entre páginas.
- **DOMPurify**: proteção contra códigos maliciosos.

### ⚙️ Backend
- **Node.js**: execução do servidor.
- **Express**: framework minimalista para criar APIs REST.
- **Nodemailer**: envio de e-mails.
- **dotenv**: gerenciamento de configurações sensíveis.

---

## **📦 Estrutura Principal do Projeto**

```plaintext
Gerador de Email Marketing/
├── backend/                      # Servidor Node.js para envio de emails
│   ├── server.js                    # Configuração do servidor e rotas
│   └── .env                         # Variáveis de ambiente (Senhas do envio)
├── src/                          # Código-fonte do frontend
│   ├── Components/                  # Componentes reutilizáveis
│   │   ├── ButtonAdd/                  # Botão para adicionar novos elementos
│   │   ├── EditorElemento/             # Editor para cada tipo de elemento
│   │   ├── FormularioDeCriacao/        # Gerenciador principal do editor
│   │   └── HtmlPrevil/                 # Pré-visualização do HTML gerado
│   ├── Pages/                       # Páginas principais (Home, Gerador)
│   └── App.jsx                      # Configuração principal do React
├── public/                       # Arquivos estáticos
└── README.md                     # Documentação do projeto
```

## **📖 Como Usar**
### **1. Clone o Repositório**
```bash
git clone https://github.com/GabrielSantos15/gerador_de_email_marketing.git

cd gerador_de_email_marketing
```
### **2. Instale as Dependências do Backend**
```bash
cd backend
npm install
```
### **3. Configure as Variáveis de Ambiente**
Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:
```plaintext  
EMAIL_USER= seu_email@gmail.com
EMAIL_PASS= sua_senha
```

Observação: Para que o envio de e-mails funcione corretamente, pode ser necessário gerar uma **senha de aplicativo**, especialmente se estiver usando uma conta do Gmail. 

Caso utilize outro provedor de e-mail (como Outlook, Yahoo, etc.), ajuste as configurações no arquivo `server.js` conforme os dados exigidos pelo serviço escolhido.

> 💡 [Veja aqui um vídeo explicando como gerar a senha de aplicativo no Gmail](https://www.youtube.com/watch?v=4Qgz2c7yR7s)

### **4. Inicie o Servidor Backend**
```bash
cd backend
node server.js
```
### **5. Inicie o Frontend**
```bash
cd ..
npm install
npm run dev
```
### **6. Acesse a Aplicação**
Abra seu navegador e vá para `http://localhost:5173` para começar a criar seus
emails marketing personalizados!

## **📈 Roadmap**

Funcionalidades Futuras

- Autenticação de Usuário
- Histórico de Emails Enviados
- Rasteiamento de Abertura e Cliques (pixel de tracking)

## **🤝 Contribuição**
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.
