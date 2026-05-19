# Cursor Rules — FishQuest Mobile (Expo Go / Expo Router / NativeWind)

## Objetivo
Você está trabalhando no **FishQuest Mobile**, um app de pesca recreativa no Brasil. O foco é **rodar simples e estável** no **Expo Go** (managed workflow), com navegação via **Expo Router**, estilização via **NativeWind** e dados via **React Query**.

---

## Setup & Restrições do Projeto (obrigatório)
- **Gerenciador de pacotes:** use **Yarn** sempre (`yarn add`, `yarn install`).
- **Instalação de libs Expo:** sempre preferir **`npx expo install <pkg>`** (para versões compatíveis com o SDK).
- **NÃO usar `expo prebuild`**, **NÃO** editar `ios/` / `android/` manualmente, **NÃO** adicionar `expo-dev-client`.
- O app deve ser compatível com **Expo Go**.
- Ao surgir erro `Unable to resolve "<pkg>"`, resolver instalando com:
  - `npx expo install <pkg>` e depois `npx expo start -c`.

---

## Padrões de Codebase
- **TypeScript** em tudo (`.ts`/`.tsx`).
- **Expo Router** como entrypoint (`"main": "expo-router/entry"`).
- **Navegação por pastas**:
  - `app/_layout.tsx` (Stack raiz)
  - `app/index.tsx` (redirect auth)
  - `app/(auth)/...` (login)
  - `app/(tabs)/...` (tabs: feed, stats, add, achievements, profile)

---

## NativeWind (Tailwind no RN)
- Este projeto **usa NativeWind** (não é lib nativa; funciona no Expo Go).
- Se existir `className`, garantir que o setup esteja correto:

### Obrigatório
1) **Import runtime UMA vez** no topo de `app/_layout.tsx`:
```ts
import 'nativewind/tailwind.css';
babel.config.js deve conter:

presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]]

plugins: ['nativewind/babel']

Não usar expo-router/babel (deprecated no SDK atual)

tailwind.config.js deve incluir content para:

./app/**

./src/**

./components/**
e presets: [require('nativewind/preset')].

Diagnóstico rápido
Erro expected dynamic type 'boolean', but had type 'string' geralmente indica:

className vazando sem NativeWind aplicado, ou

props booleanas passadas como string (enabled="false").

Se ocorrer, procure e corrija:

trocar enabled="false" → enabled={false}

garantir import 'nativewind/tailwind.css' e cache limpo (npx expo start -c)

Dependências comuns do Expo Router
O Expo Router pode exigir, dependendo do setup:

react-native-safe-area-context

expo-linking

react-native-screens

Regra:

Se aparecer Unable to resolve "<pkg>", instalar com:

npx expo install <pkg>
npx expo start -c
Estilo de Resposta (como você deve trabalhar)
Seja sucinto nas explicações: 3–8 linhas no máximo.

Priorize ações (passos e arquivos), não teoria.

Quando editar código:

mostre o arquivo completo se for pequeno;

caso grande, mostre apenas os trechos com contexto suficiente.

Sempre que criar novas telas, siga o padrão de pastas do Expo Router.

Boas práticas específicas do FishQuest
Linguagem: PT-BR nos textos do app.

Pensar no domínio:

“captura”, “espécie”, “local (spot)”, “peso”, “foto”, “nível/XP”, “ranking”, “feed”, “likes/dislikes”.

Manter o app modular:

src/lib/ (clients, query-client)

src/services/ (api)

src/hooks/ (react-query hooks)

components/ (UI reutilizável)

Fluxo de trabalho (prioridade)
Fazer o app subir no Expo Go sem erros

Depois implementar navegação base (auth + tabs)

Depois integrar API + react-query

Depois evoluir telas e features (feed, captura, perfil, stats, achievements)

Comandos padrão (usar no dia a dia)
Instalar deps:

yarn install
Instalar libs Expo:

npx expo install <pkg>
Rodar limpando cache:

npx expo start -c
Regra final
Se uma mudança exigir prebuild, pods, ou expo-dev-client, não faça — proponha alternativa compatível com Expo Go.

