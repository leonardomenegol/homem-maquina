# Leonardo Fiori Menegol

# Diciplina de Interação Homem-Máquina

# Protótipo Front-end: Agendamento de Serviços UBS

Protótipo interativo (somente front-end, sem backend) para demonstração de fluxos de:

- Login (Paciente / Profissional)
- Cadastro de Paciente e Profissional (com senha) + Login com validação
- Dashboard (diferenciado por perfil)
- Cadastro/Edição/Desativação de Serviços (Profissional)
- Agendamento (Wizard em 3 passos – Paciente)
- Edição/Cancelamento de Agendamento (Paciente)
- Acessibilidade (Alto Contraste + Escala de Fonte persistente)

## Stack

React 18 + TypeScript + Vite. Estado simples via Context APIs (Auth, Data, Accessibility, Toasts). Sem dependências de UI externas; design tokens em `styles.css`.

## Executar

1. Instalar dependências:

```
npm install
```

2. Rodar ambiente de desenvolvimento:

```
npm run dev
```

3. Abrir no navegador a URL exibida (geralmente http://localhost:5173).

## Estrutura

```
src/
  App.tsx                Rotas e layout principal
  main.tsx               Bootstrap React
  styles.css             Tokens e estilos globais
  types.ts               Tipos principais (Service, Appointment ...)
  context/               Providers (Auth, Data, Acessibilidade)
  components/            Componentes reutilizáveis
  pages/                 Páginas / Fluxos
```

## Acessibilidade

- Alternador de alto contraste (persistido em localStorage) com ícone.
- Controle contínuo de escala tipográfica (1.0 a 1.4x) acompanhado de ícone de fonte.
- Foco visível e sem remoção via CSS.
- Rótulos explícitos em inputs; sem placeholder como único label.
- Cores com contraste >= AA na paleta base.
- Uso de texto + cor para estados (badges de status).
