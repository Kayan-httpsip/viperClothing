# ANÁLISE CRÍTICA COMPLETA — VIPER CLOTHING

> Documento permanente de referência gerado em 11/09/2026.
> Base: `index.html` (539 linhas), `css/styles.css` (902 linhas), `js/app.js` (646 linhas).

---

## 0. RESUMO EXECUTIVO

**Estado geral:** front-end visualmente forte, com identidade streetwear consistente (preto + verde neon `#c8ff00`, tipografia Anton/Inter, texturas de spray). Porém é um **e-commerce sem e-commerce**: não existe backend, checkout, pagamento, página de produto real, login, rastreio ou integrações. Boa parte dos CTA e links do rodapé são `href="#"` (mortos).

**Pontos fortes:**
- Identidade visual coesa e diferenciada.
- Range de produtos pensado (camisetas, moletons, calças, acessórios).
- Busca, filtros e ordenação funcionais.
- Carrinho funcional com persistência em `localStorage`.
- Responsividade completa (1024 / 768 / 480 px).
- Countdown, popup VIP, modal de produto.
- `prefers-reduced-motion` contemplado.
- Metatags OG básicas presentes.

**Pontos críticos (P0):**
- 5 dos 8 produtos sem imagem própria (usam placeholder genérico `street-waer.webp`).
- Checkout é um `alert()` fake — nenhuma venda é possível de fato.
- Imagens gigantes (PNGs de até 2,3 MB) sem otimização → site pesado e lento.
- Categoria "ACESSÓRIOS" nas categorias + filtro não funciona por âncora (bug JS).
- Link "O VENENO" do rodapé quebrado (`href="#o veneno"` com espaço).
- Botão "Conta" do header sem nenhuma função.
- Zero metatags de redes sociais com imagem (`og:image`), zero dados estruturados (JSON-LD), zero canonical/sitemap.

---

## 1. HEADER (index.html:20-66 / css:56-168)

### 1.1 Estrutura
- Cabeçalho flutuante fixo com margens (16px), borda-radius 20px e blur. Incomum, porém estiloso.
- Navegação desktop: INÍCIO, SHOP, CAMISETAS, O VENENO.
- Navegação mobile separada (`.mobile-menu`) acionada por `.menu-toggle`.
- Ações: Busca, Conta, Carrinho (com contador), Menu mobile.

### 1.2 Problemas encontrados
| # | Problema | Severidade |
|---|----------|------------|
| H1 | Logo `<a href="#">` — clicar não leva ao topo/início | P2 |
| H2 | Botão **Conta** (`aria-label="Conta"`) não faz absolutamente nada | P1 |
| H3 | Nenhum estado `.active` nos links de navegação (sem scrollspy/highlight da seção atual) | P2 |
| H4 | JS do header só troca opacidade do fundo; variável `lastScroll` declarada e nunca usada (linha 477-490) — código morto, e não esconde o header ao rolar para baixo | P2 |
| H5 | Transparência do fundo manipulada via JS duplica o que já é default em CSS (`.92` inicial → JS seta `.8`/`.95`) — inconsistente | P3 |
| H6 | Fonte dos links muito pequena (12px) para ser alvo de toque confortável no mobile | P3 |

---

## 2. HERO (index.html:112-146 / css:170-252)

### 2.1 Estrutura
- Hero 100vh com: overlay de wallpaper, grain, gradiente, vinheta, cobra SVG animada, badge "NOVA COLEÇÃO 2026", H1 "VIPER CLOTHING", subtítulo "VISTA SUA VERDADE!", tagline, CTA e indicador de scroll.

### 2.2 Problemas encontrados
| # | Problema | Severidade |
|---|----------|------------|
| HR1 | Classe `.hero-wallpaper` definida no CSS (css:176-180) mas **nenhum elemento a usa** — não há imagem de fundo real no hero; o CSS é código morto | P2 |
| HR2 | Texto da tagline duplicado e mal formatado: "QUAL O TAMANHO DA SUA AMBIÇÃO?" + "Por mais venenosa..." + "Qual o tamanho da sua ambição?" + "VISTA SUA VERDADE." — mensagens redundantes e com quebras de linha estranhas (linhas 133-139) | P2 |
| HR3 | A mesma pergunta/lema ("Qual o tamanho da sua ambição?" / "VISTA SUA VERDADE") se repete em Hero, "O Veneno" e Reviews — copy exaustiva, perde impacto | P3 |
| HR4 | CTA "COMPRAR AGORA" → `#shop` funciona. OK. | — |
| HR5 | Imagem de fundo real ausente tira impacto visual (depende só de SVG/gradientes) | P2 |

---

## 3. CATEGORIAS (index.html:149-190 / css:272-294)

### 3.1 Estrutura
- 4 cards: CAMISETAS, MOLETONS, CALÇAS, ACESSÓRIOS, cada um linkando para âncoras.

### 3.2 Problemas encontrados
| # | Problema | Severidade |
|---|----------|------------|
| C1 | **BUG:** `<a href="#acessorios">` não é capturado pelo handler JS (js:551 — só trata `#camisetas`, `#moletons`, `#calcas`, `#O VENENO`). Clicar em ACESSÓRIOS faz limp/âncora para um `<div>` vazio e **não aplica o filtro**; o usuário vê todos os produtos | P1 |
| C2 | CALÇAS e ACESSÓRIOS usam **a mesma imagem** `street-waer.webp` — visual repetido e sem identidade por categoria | P1 |
| C3 | Imagens de CAMISETAS e MOLETONS são PNGs de 2,3 MB e 1,9 MB — lentidão real de carregamento | P1 |
| C4 | URLs com espaço + escape por barra invertida (`'images/contemporanea\ anjo\ 1.png'`) funcionam por sorte do parser CSS, mas são frágeis; o padrão correto é codificar com `%20` | P3 |
| C5 | Imagens de categoria usam `background-image` inline — sem `loading="lazy"`/preload possível | P2 |
| C6 | Card só tem texto sobreposto; sem faixa/preço/contagem de itens da categoria | P3 |

---

## 4. SHOP / PRODUTOS (index.html:193-236 / js:6-98, 185-238, 248-338)

### 4.1 Catálogo (8 produtos em `js/app.js`)
| id | Produto | Categoria | Preço | Tam. | Imagem real? |
|----|---------|-----------|-------|------|--------------|
| 1 | ACHO QUE TEM ALGUEM ME VENDO | camisetas | R$ 189,90 | P,M,G,GG | Sim (`contemporanea anjo 1.png`) |
| 2 | VIPER TRADICIONAL | camisetas | R$ 159,90 (~R$199,90) | P,M,G,GG,XG | Sim (`estampa snake modelo.png`) |
| 3 | FEITA PARA NÃO SE CURVAR | moletons | R$ 329,90 | M,G,GG,XG | Sim (`modelo de estampa.png`) |
| 4 | Venom Hoodie | moletons | R$ 399,90 (~R$499,90) | P,M,G,GG | **Não — placeholder** |
| 5 | CARGO  (nome com espaço sobrando) | calcas | R$ 299,90 | P,M,G,GG | **Não — placeholder** |
| 6 | VEJA A ESTÁTUA | camisetas | R$ 149,90 (~R$189,90) | P,M,G | **Não — placeholder** |
| 7 | Viper Cap | acessorios | R$ 129,90 | U | **Não — placeholder** |
| 8 | Snake Chain | acessorios | R$ 249,90 (~R$299,90) | U | **Não — placeholder** |

### 4.2 Problemas encontrados
| # | Problema | Severidade |
|---|----------|------------|
| P1 | **5 de 8 produtos sem imagem própria** → todos caem no mesmo `street-waer.webp` de 63 KB (js:167-171). Péssimo para conversão e credibilidade | P0 |
| P2 | `getProductImage` injeta `<img style="...">` com `alt="Streetwear"` **genérico para todos** — ruim para acessibilidade e SEO | P2 |
| P3 | Nomes/descrições não escapados em `innerHTML` — com dados estáticos o risco é baixo, mas se produtos virem de API, há **risco XSS** (js:203-233, 377-385, 397-415) | P1 |
| P4 | Nome "CARGO " tem espaço final (linha 56); sem padding/tracking consistente no texto | P3 |
| P5 | Casing dos nomes inconsistente (tudo maiúsculo vs "Venom Hoodie" vs "Viper Cap") | P2 |
| P6 | Adicionar ao carrinho no card usa o **primeiro tamanho como default** silenciosamente se o usuário não escolher — cria troca de tamanho errado | P2 |
| P7 | Botões de tamanho `.size-btn` sem `aria-pressed`/semântica | P2 |
| P8 | Não há página de favoritos: `toggleFavorite` salva mas não existe onde visualizar | P2 |
| P9 | Sem página de produto individual (URL própria) nem rotas — impossível linkar/compartilhar um produto | P1 |

### 4.3 Filtros / Busca / Ordenação
- funcionalidade: ok (filtro por categoria oculta os demais; ordenação por relevância/preço/novidade; busca com debounce 300ms).
- BUG relacionado: filtro de âncora por categoria ignora `acessorios` (ver C1).
- Busca busca em nome/categoria apenas — não em descrição.
- Não há paginação nem "mostrar mais".

### 4.4 Carrinho
| # | Problema | Severidade |
|---|----------|------------|
| K1 | Checkout é `alert()` + zera o carrinho (js:498-508). **Nenhuma venda é possível** — sem cálculo de frete, cupom, pagamento ou confirmação real | P0 |
| K2 | Sem controle de **quantidade** (+/-) no carrinho (só remover) | P2 |
| K3 | Sem campo de **cupom de desconto** — irônico pois o VIP promete "10% OFF" | P2 |
| K4 | Sem cálculo de **frete** nem do piso de "frete grátis acima de R$ 199" prometido na seção VIP | P2 |
| K5 | Remoção usa índice do array (js:279-281) — frágil se o array mudar fora do fluxo atual (ex.: mesclagem de itens) | P3 |
| K6 | Carrinho não mostra subtotal por unidade × quantidade separado do total do item — ok, mas total da página não considera frete/desconto | P3 |
| K7 | Persistência em `localStorage` sem limite de versão/chave por ambiente | P3 |

---

## 5. DROP / COUNTDOWN (index.html:239-269 / css:364-396 / js:426-458)

| # | Problema | Severidade |
|---|----------|------------|
| D1 | Contador grava alvo no `localStorage` e, quando expira, **reinicia sozinho para +14 dias** (js:427-434) — é um teaser eterno, sem data real de lançamento | P1 |
| D2 | CTA "CONHECER O DROP" é `href="#"` (morto) | P1 |
| D3 | "POISON DROP" promete "EM BREVE" sem data definida nem lista de espera além do VIP | P3 |

---

## 6. O VENENO (ABOUT) (index.html:272-299 / css:398-414)

| # | Problema | Severidade |
|---|----------|------------|
| A1 | Título replica o texto do hero; copy com **espaçamento/indentação estranho** dentro do `<p>` (linhas 277-289) | P2 |
| A2 | CTA "CONHECER A MARCA" é `href="#"` (morto) | P1 |
| A3 | Imagem `estampa snake modelo.png` 1,6 MB (mesma do produto id 2) | P2 |

---

## 7. VIP CLUB (index.html:302-335 / css:791-822)

- Estrutura boa (3 benefícios + CTA).
| # | Problema | Severidade |
|---|----------|------------|
| V1 | Influenciar/orquestrar entregas de acesso real é impossível: botão abre popup que só **salva e-mail no localStorage** — não há envio de cupom, e-mail ou cadastro de verdade | P1 |
| V2 | Popup reaparece a cada sessão nova depois que o usuário o fecha (usa preferência de navegador `viperPopupDismissed`); não há cookie/servidor — comportamento inconsistente entre dispositivos | P3 |

---

## 8. BENEFÍCIOS (index.html:338-371 / css:416-429)

- Estrutura ok. Texto "COMPRA 100% SEGURA" e "PAGAMENTO SEGURO" **afirmam** segurança que o site não implementa (não há pagamento). Recomendar revisar copy para não prometer o que não existe ainda. | P2

---

## 9. AVALIAÇÕES/REVIEWS (index.html:374-416 / css:824-840)

- Estrutura ok, avaliações fictícias (comuns em landing).
| # | Problema | Severidade |
|---|----------|------------|
| R1 | Texto: *"Já comprei a cargo"* — crase/gênero incorretos ("a Cargo") | P3 |
| R2 | Sem rich snippets (JSON-LD `Review`/`AggregateRating`) para aparecer no Google | P2 |

---

## 10. NEWSLETTER (index.html:419-442 / js:539-548)

| # | Problema | Severidade |
|---|----------|------------|
| N1 | Ao enviar, salva e-mail e exibe `alert()`. **Nenhum e-mail é enviado** (sem endpoint/API) | P1 |
| N2 | Validação só HTML `required`/`type=email`; sem feedback de sucesso na própria página (usa `alert`) | P2 |
| N3 | `closeVipPopup()` é chamado dentro do submit da newsletter — comportamento sem relação aparente (se os popups fossem separados, seria bug) | P3 |

---

## 11. FOOTER (index.html:446-494 / css:596-695)

| # | Problema | Severidade |
|---|----------|------------|
| F1 | **BUG:** Link "O VENENO" usa `href="#o veneno"` (com espaço) — id não existe; quebra (id real é `o-veneno`). E não é capturado pelo handler JS | P1 |
| F2 | Emails **inconsistentes**: `mailto:contato@viperclothing.com.br` vs texto exibido `contatoviperclothing6@gmail.com` (linhas 486-487) | P1 |
| F3 | WhatsApp é link `href="#"` sem `https://wa.me/...` | P1 |
| F4 | Todos os ícones sociais (Instagram, TikTok, WhatsApp) apontam para `#` — sem perfis | P1 |
| F5 | Links de atendimento (Central de ajuda, Rastrear, Trocas, Privacidade, Termos) todos `href="#"` | P1 |
| F6 | Tagline "Streetwear premium. Vista sua verdade!." — pontuação dupla "!." | P3 |
| F7 | Sem selos de pagamento/segurança, PIX/cartão, ou métodos de pagamento no rodapé | P2 |
| F8 | Rodapé não lista categorias completas (falta Calças, Acessórios) | P3 |

> ✅ **RESOLVIDO em 11/09/2026:** F1 (`#o-veneno`), F2 (e-mail unificado no gmail), F3 (wa.me/5514998867631), F4 (Instagram real + WhatsApp real; TikTok mantido placeholder até existir), F6 (pontuação), F7 (selos PIX/VISA/Master/ELO/BOLETO adicionados + CSS `.footer-payments`), F8 (Camisetas/Moletons/Calças/Acessórios/O VENENO listados). F5 mantido como placeholder por decisão do dono. Ajuste extra no JS (`a[href^="#acessorios"]`) para o link de Acessórios filtrar corretamente.

---

## 12. MODAL / POPUP / EXTRAS

| # | Problema | Severidade |
|---|----------|------------|
| M1 | Modal de produto (`openProductModal`) sem `role="dialog"` e `aria-modal="true"` (o popup VIP tem) | P2 |
| M2 | Botão "ADICIONAR AO CARRINHO" do modal já fecha e adiciona em um clique duplo de handler (js:413) — redundante, mas funcional | P3 |
| M3 | Popup VIP sem redirecionamento nem envio real (ver V1) | P1 |
| M4 | `back-to-top` e overlay funcionais — ok | — |

---

## 13. BUGS CONSOLIDADOS (JS)

1. **`#acessorios` ignorado no handler de âncoras** (js:551) → categoria não filtra, só faz jump.
2. **`a[href^="#O VENENO"]` nunca casa** com nenhum href real (`#o-veneno` minúsculo ou `#o veneno` com espaço) — seletor morto.
3. **Footer "O VENENO"** `href="#o veneno"` → âncora inexistente.
4. **`closeCart` não limpa `body.style.overflow`** correctamente? Sim limpa, mas `openSearch`/`closeSearch` interferem: abrir busca e fechar carrinho podem zerar overflow indevidamente (estados de overflow não empilhados — abrir carrinho + busca simultâneos restauram overflow errado).
5. **`lastScroll`** não usada.
6. **Nome "CARGO "** com espaço.
7. **VipPopup**: fechar sem assinar grava `viperPopupDismissed` e nunca mais mostra — intencional mas usuário que errou o e-mail perde a chance.
8. Countdown reinicia eternamente (+14 dias).
9. `alert()` em checkout e newsletter — kills conversão e é feio.

---

## 14. CSS — CÓDIGO MORTO / INCONSISTÊNCIAS

| # | Item | Local |
|---|------|-------|
| 1 | `.hero-wallpaper` sem uso | css:176-180 |
| 2 | `.about-silhouette` sem uso | css:414 |
| 3 | `.bg-spray::before` e `.header::before` etc.: ok, apenas opacidade — zero risco. | — |
| 4 | Inline `<img style="...">` gerado em JS (getProductImage) misturado com CSS de classe — mover estilos para classes | js:169-171 |
| 5 | Contraste `--text-dim: #555` em texto pequeno (11-12px) pouco acessível (contraste < 4.5:1) | css:9 |
| 6 | `.footer` tem `border-top: 1px solid transparent` (desnecessário) | css:598 |

---

## 15. PERFORMANCE

| Item | Problema | Impacto |
|------|----------|---------|
| `images/contemporanea anjo 1.png` | 2,3 MB PNG | Muito alto |
| `images/modelo de estampa.png` | 1,9 MB PNG | Muito alto |
| `images/estampa snake modelo.png` | 1,6 MB PNG | Alto |
| `images/logo.png` | 165 KB usado como favicon + logo | Médio (deveria ser < 20 KB) |
| `street-waer.webp` | 63 KB | ok |
| Google Fonts | carregadas via `<link>` render-blocking; sem `preload` | Médio |
| CSS/JS | sem minificação (44 KB + 25 KB) | Baixo |
| Lazy loading | só `loading="lazy"` nos `<img>` dos produtos; imagens de categorias são `background-image` (sem lazy) | Médio |

**Recomendado:** converter tudo para WebP/AVIF, redimensionar (produto ~800-1000px), logo/favicon em SVG, `-1` compressão, `preload` das fontes, `fetchpriority="high"` na LCP (hero).

---

## 16. SEO

| Item | Status |
|------|--------|
| Título + meta description | OK |
| H1 único | OK |
| `og:title` / `og:description` / `og:type` | OK |
| **`og:image`** | **Faltando** → compartilhamentos sem imagem |
| Twitter cards | Faltando |
| Canonical | Faltando |
| Sitemap.xml | Faltando |
| robots.txt | Faltando |
| JSON-LD (Product/Offer/Review/Breadcrumb) | Faltando — grande oportunidade |
| Alt texts | Genérico ("Streetwear") nos produtos |
| URLs amigáveis por produto | Faltando (single page) |
| `theme-color`, lang `pt-BR` | OK |

---

## 17. ACESSIBILIDADE

- `prefers-reduced-motion` ✅
- Focus states: filtros têm outline, mas botões/size-btns/icon-btns dependem de cores — falta `:focus-visible` claro.
- Contraste de `--text-dim` (#555) e `--text-muted` (#888) em fontes pequenas abaixo do WCAG AA.
- Modal de produto sem `role="dialog"`.
- `.size-btn` sem `aria-pressed`.
- `alt` genérico nos produtos.
- Popup VIP tem `role="dialog" aria-modal` ✅ e o search overlay fecha com Escape ✅.

---

## 18. SEGURANÇA / DADOS

- XSS potencial em `innerHTML` com dados não escapados (baixo risco hoje, crítico se virar API).
- Dados (carrinho, favoritos, e-mail) só em `localStorage` — sem backup/servidor.
- Nenhum dado sensível de pagamento é tratado (não há pagamento).
- E-mail "VIP" sem consentimento/duplo opt-in (LGPD).

---

## 19. CHECKLIST DE BUGS POR SEVERIDADE

### P0 — Bloqueante
- [ ] 5/8 produtos sem imagem real
- [ ] Checkout falso (`alert()`), sem venda possível

### P1 — Alto
- [ ] Categoria ACESSÓRIOS (âncora) não filtra
- [ ] Link rodapé "O VENENO" quebrado
- [ ] Emails de contato inconsistentes
- [ ] WhatsApp/sociais/CTA mortos (`href="#"`)
- [ ] Botão Conta sem função
- [ ] Drop CTA morto / countdown infinito
- [ ] Newsletters/popups/VIP sem envio real
- [ ] Sem página de produto nem rotas
- [ ] XSS potencial (escape em innerHTML)

### P2 — Médio
- [ ] Sem página de favoritos
- [ ] Sem quantidade/cupom/frete no carrinho
- [ ] Imagens gigantes
- [ ] Og:image, canonical, sitemap, JSON-LD
- [ ] Copy duplicada no hero/about
- [ ] Default de tamanho silencioso no add-to-cart
- [ ] `focus-visible`, contraste, aria no modal/size-btns

### P3 — Baixo
- [ ] Nome "CARGO " com espaço
- [ ] "Vista sua verdade!." pontuação
- [ ] "Já comprei a cargo" texto
- [ ] CSS morto (`.hero-wallpaper`, `.about-silhouette`)
- [ ] `lastScroll` não usada
- [ ] Pasta vazia `css,js,assets/` na raiz (remover)

---

## 20. ESTRUTURA DE ARQUIVOS

```
siteViper/
├─ index.html          (539 linhas)
├─ css/styles.css      (902 linhas)
├─ js/app.js           (646 linhas)
├─ images/
│  ├─ logo.png               (165 KB "favicon")
│  ├─ contemporanea anjo 1.png (2,3 MB)
│  ├─ estampa snake modelo.png(1,6 MB)
│  ├─ modelo de estampa.png   (1,9 MB)
│  └─ street-waer.webp        (63 KB)
└─ css,js,assets/  ← PASTA VAZIA E ESTRANHA (remover)
```

---

## 21. OPORTUNIDADES / MELHORIAS ESTRATÉGICAS

1. **Virar e-commerce de verdade**: backend ou SaaS (Shopify/Next.js + carrinho), gateway de pagamento (Stripe/Mercado Pago/PIX), cálculo de frete (Correios/Plugg.to), e-mail transacional.
2. **Asset pipeline**: WebP/AVIF, sprite/svg, lazy load universal, minify, cache-busting.
3. **SEO técnico**: JSON-LD de produtos, og:image, canonical, sitemap, robots, páginas de produto.
4. **Analytics**: GA4/Plausible + eventos (add_to_cart, begin_checkout, etc.) + Meta Pixel.
5. **Copywriting**: unificar lema (usar 1 vez), corrigir erros, criar storytelling único por coleção.
6. **Provas sociais reais**: fotos enviadas por clientes, avaliações com verificação, integração de reviews.
7. **Legal/UX**: LGPD (consentimento de e-mail), políticas de privacidade reais.