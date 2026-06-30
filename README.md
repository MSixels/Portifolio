# Matheus Sixel — Portfólio

Landing page de portfólio para **Matheus Sixel (Desenvolvedor Fullstack)**.
Estética editorial sobre fundo escuro com acento ciano, objeto 3D interativo
(esfera-rede / constelação) que segue o mouse e reage ao scroll, cards com tilt
3D, frosted-glass atrás dos textos, animações de entrada por seção e troca de
idioma **PT / EN / ES**.

Recriação fiel, em código de produção, do protótipo de design (`.dc.html`).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens via `@theme` em `globals.css`)
- **three.js** via **@react-three/fiber** + **@react-three/drei** (objeto 3D de fundo)
- **Framer Motion** (reveals por scroll + hairline animando `scaleX`)
- **next/font/google**: Instrument Serif (display), Hanken Grotesk (corpo), JetBrains Mono (labels)
- i18n com um provider próprio (`src/i18n`) e dicionários JSON PT/EN/ES

## Como rodar

Pré-requisitos: **Node 18.18+** (testado em Node 24) e npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts:

```bash
npm run build    # build de produção (roda type-check)
npm run start    # serve o build de produção
npm run lint     # ESLint
```

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx          # 3 fontes Google → CSS vars, metadata, I18nProvider
│  ├─ page.tsx            # monta as seções na ordem do design
│  └─ globals.css         # tokens (@theme), frosted-glass, keyframes, reduced-motion
├─ components/
│  ├─ Background3D.tsx     # "use client" — canvas R3F fixo (Rede + estrelas + mouse/scroll)
│  ├─ Overlay.tsx          # scrim/vinheta/glows (z-1) + SectionFrost reutilizável
│  ├─ Nav.tsx              # nav fixo + seletor de idioma PT/EN/ES
│  ├─ Hero.tsx             # hero com frosted-glass atrás do texto
│  ├─ SectionHeader.tsx    # nº mono + label + hairline (scaleX 0→1)
│  ├─ Reveal.tsx           # wrapper Framer Motion (fade + Y44 + scale .97→1, ~850ms)
│  ├─ TiltCard.tsx         # tilt 3D (rotateX/Y ~9° + translateZ) + shine ciano
│  └─ sections/            # About, Projects, Stack, Testimonials, Contact, Footer
├─ i18n/
│  ├─ I18nProvider.tsx     # contexto lang pt|en|es (persistido em localStorage)
│  └─ messages/{pt,en,es}.json
public/
├─ projects/escuta-placeholder.svg       # slot de screenshot (trocar por imagem real)
└─ testimonials/avatar-placeholder.svg   # avatares de depoimento (placeholder)
```

## Conteúdo a substituir (placeholders)

- **Screenshot do projeto “escuta…”**: troque `public/projects/escuta-placeholder.svg`
  por uma imagem real (o slot usa `next/image` em `src/components/sections/Projects.tsx`).
- **Depoimentos**: os textos e avatares em `Testimonials.tsx` /
  `src/i18n/messages/*.json` (chaves `words.*`) são reservados — edite com
  depoimentos reais.

## Fidelidade ao protótipo

- Tema escuro `#080A0E`, acento ciano `#2BD9FF`, secundário `#5A8CFF`,
  texto `#EEF1F5` / `#AEB6C2`. Tokens em `globals.css`.
- Objeto 3D “Rede”: ~78 nós em esfera de Fibonacci (raio 2.05), pontos claros +
  linhas ciano ligando nós a menos de `0.62·R`, esfera interna escura, e ~950
  estrelas com deriva/bob. O grupo faz lerp da rotação para o mouse e reage ao
  scroll (rotação + escala `1 → 0.72`).
- Frosted-glass com `backdrop-filter: blur` + `mask` radial (esmaece as bordas)
  atrás do texto em todas as seções e no hero.
- Reveals por `whileInView`, hairline `scaleX`, tilt 3D + shine nos cards.

## Acessibilidade & responsividade

- Mobile-first: as grids viram coluna única em telas estreitas e o 3D fica mais
  sutil (menos estrelas, menor opacidade).
- `prefers-reduced-motion`: desliga reveals, tilt e a animação do 3D, e desativa
  o smooth-scroll.
- Hierarquia de headings, foco visível (`:focus-visible`) e `aria`/`alt` onde cabe.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta o Next.js automaticamente — não há variáveis de ambiente.
   Clique em **Deploy**.
4. (Opcional) Configure um domínio próprio nas configurações do projeto.

Build local equivalente ao da Vercel: `npm run build`.
