# 📚 StudantApp — Sistema de Estudos

**StudantApp** é um sistema web completo voltado para estudantes que desejam organizar seu processo de aprendizado de forma prática, visual e eficiente. Ele oferece recursos de cadastro de matérias, criação de anotações com formatação, controle de tempo de estudo com temporizador e visualização de desempenho em gráficos.

---

## 🔧 Funcionalidades

- 📘 **Cadastro de Matérias**  
  Organize as disciplinas que você estuda com um sistema simples e direto.

- 📝 **Editor de Anotações**  
  Crie anotações vinculadas às matérias, com suporte a **negrito**, *itálico* e <u>sublinhado</u>.

- ⏱️ **Temporizador de Estudo**  
  Meça seu tempo de estudo com um cronômetro elegante e funcional.

- 📊 **Gráfico de Desempenho**  
  Visualize seu tempo dedicado aos estudos ao longo da semana via gráfico interativo (Chart.js).

- 🌙 **Modo Noturno**  
  Interface com alternância de tema claro/escuro para conforto visual.

---

## 📁 Estrutura de Arquivos

```
/
├── index.html           # Estrutura principal da aplicação
├── css/
│   └── style.css        # Estilo visual e responsividade
├── src/
│   ├── script.js        # Lógica da aplicação (materias, anotações, timer, gráficos)
│   └── theme.js         # Gerenciador do tema claro/escuro
```

---

## 💻 Tecnologias Utilizadas

- **HTML5** + **CSS3**
- **JavaScript Vanilla (ES6+)**
- **Chart.js** (para gráficos)
- **LocalStorage** (armazenamento local do navegador)
- **Font Awesome** (ícones)
- **Responsivo** para telas menores (media queries)

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Jotapehh/StudentApp.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd studantapp
   ```
3. No `vscode` utilizando a extensão `Live Server`, inicie um `localhost`;

---

## 🧠 Visão Futurista

Esse projeto é uma fundação sólida. Para versões futuras, considere:

- Sincronização com banco de dados (Firebase ou PostgreSQL)
- Exportação/backup de anotações
- Relatórios semanais de estudo
- Sistema de login com contas personalizadas

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
