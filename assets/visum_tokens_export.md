# 🔮 Tokens e Regras: Visum Intelligence

Você pode utilizar o bloco de código abaixo para "ensinar" a qualquer outro LLM (como Claude, ChatGPT ou outro agente) sob quais design tokens a marca **Visum** funciona no nosso sistema Mise. Copie o conteúdo e cole no outro chat:

<br>

**1. CSS Design Tokens Ativos (Visum)**
O sistema Mise gerencia a Visum utilizando variáveis de tema (Root Level):

```css
[data-theme="visum"] {
  /* VISUM PRIMARY BRAND COLORS */
  --theme-brand-500: #884FFF; /* violeta base de ação */
  --theme-brand-600: #7B2BFC; /* violeta escuro (hover/active) */
  --theme-brand-50:  #ECE7FF; /* tom cristal/fundo claro */

  /* VISUM GEOMETRY */
  --theme-button-radius: 8px; /* Cantos arredondados, contrastando a IA amigável */
}
```

**2. Integração Semântica (Prompt para o LLM)**
Se quiser que outro assistente obedeça perfeitamente às regras ao codificar:

> "Aja como um desenvolvedor do Mise Design System. Ao gerar código, obedeça às restrições brutais de *Visum*: os raios máximos devem ser de `8px`. Para ações primárias e highlights visuais de inteligência artificial, você deve estritamente usar a cor variante `#884FFF` com hover em `#7B2BFC`. Todos os botões solid devem possuir font-family tipográfica sem-serifa elegante, sem efeitos de drop-shadow excessivos. O modo de ativação de componentes sempre deve ser herdado via pseudo-classe `[data-theme="visum"]` injetado no <body> ou componente master."

<br>

**3. Teste em Sandbox Html/Css**
Basta garantir que a TAG root html englobe o modo da Visum:
```html
<body data-theme="visum">
  <!-- Todo o escopo abaixo herdará os raios de 8px e cores Violetas -->
  <button class="mise-btn mise-btn--brand mise-btn--solid">Novo Chat Semântico</button>
</body>
```
