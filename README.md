# Essência da Confeitaria — site

Site institucional de página única (one-page) para a **Essência da Confeitaria**
(Uvaranas, Ponta Grossa - PR), construído com **HTML5, CSS3 e JavaScript puro** —
sem frameworks, sem dependências e sem funcionalidades falsas.

## Estrutura

```
essencia-confeitaria/
├── index.html      → estrutura de todas as seções + SEO + dados estruturados
├── css/styles.css  → design system, layout, animações e responsividade
├── js/main.js      → interações (menu, filtros, lightbox, slider, WhatsApp)
└── README.md
```

## Seções

Início (hero) · Diferenciais · Sobre nós · Cardápio (com filtro) · Galeria (com lightbox) ·
Avaliações (slider com resenha do Google) · Encomendas · Localização e contato ·
Rodapé · Botão flutuante de WhatsApp.

## Informações da casa (conforme o perfil público no Google Maps)

| Dado          | Valor                                                          |
|---------------|----------------------------------------------------------------|
| Nome          | Essência da Confeitaria                                        |
| Endereço      | R. Alm. Barroso, 1770 — Uvaranas, Ponta Grossa - PR, 84020-030 |
| Plus code     | WVFF+32 Uvaranas, Ponta Grossa - PR                            |
| Telefone/WhatsApp | (42) 98424-4337 (`wa.me/5542984244337`)                    |
| Avaliação     | 4,6 ★ · 1.166 avaliações no Google                             |
| Serviços      | Refeição no local · Entrega sem contato                        |
| Encerramento  | Fecha às 20h                                                   |

### Pontos a confirmar com a casa antes de publicar

- **Horário de abertura**: o Google só informa "fecha às 20h". O site exibe
  "Aberto · fecha às 20h" e pede confirmação pelo WhatsApp. Ajuste se souber os
  horários completos (seção `#contato` e JSON-LD `openingHoursSpecification`).
- **Valores**: o cardápio usa "valores sob consulta" — nenhum preço foi inventado.
- **Instagram/redes sociais**: não havia link público; o card correspondente foi
  substituído por "Google Maps" (rotas e avaliações).
- **Domínio**: a `canonical` e a `og:url` usam `essenciadaconfeitaria.com.br` como
  placeholder — substitua pelo domínio real quando existir.
- **Fotos**: as imagens são ilustrativas (Unsplash) e indicadas como tal no site.
  Para produção, substitua por fotos reais dos produtos em `assets/`.

## Avaliações

Os três depoimentos exibidos são trechos de **avaliações públicas reais do Google
Maps**, identificados como tal, com link para o perfil completo. Para editar,
procure a seção `#depoimentos` no `index.html`.

## Como usar

Basta abrir `index.html` no navegador — não há etapa de build. Para desenvolvimento
local com recarga automática:

```bash
npx serve .
```

## Recursos incluídos

- Navegação funcional entre todas as seções, com link ativo conforme o scroll
- Menu mobile em tela cheia (hambúrguer animado, fecha com ESC ou ao navegar)
- Botões de WhatsApp com mensagens pré-preenchidas (geral e por produto)
- Animações suaves ao rolar (IntersectionObserver, com `prefers-reduced-motion`)
- Lightbox acessível na galeria (teclado: ESC, setas; foco devolvido ao fechar)
- Slider de avaliações (setas, dots, autoplay com pausa no hover, swipe no mobile)
- Filtro de categorias no cardápio (Bolos & Fatias, Doces, Salgados, Bebidas)
- SEO local: meta tags, Open Graph, dados estruturados (Schema.org `Bakery` com
  endereço, telefone, `hasMap` e `aggregateRating`)
- Imagens com `loading="lazy"`, dimensões explícitas e fallback
- Acessibilidade: skip link, ARIA, foco visível, contraste
