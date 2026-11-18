# Declaração de Uso de IA - Avaliação A2

**Disciplina:** Tópicos Especiais em Sistemas para Internet III  
**Tema:** 6. React Hook Form vs Formik vs useState (Frontend)  
**Integrantes:** Guilherme Sano, Mateus Avanzi, Arthur Prado, Diego Castro

## Ferramentas utilizadas:
- [ ] ChatGPT / GPT-4
- [ ] Claude (Anthropic)
- [ ] GitHub Copilot
- [ ] Codeium
- [x] Gemini
- [ ] Nenhuma ferramenta de IA foi utilizada

## Como utilizamos:
- Perguntamos ao Gemini como funciona internamente a diferença entre formulários *controlled* (`useState` e `Formik`) e *uncontrolled* com `ref` (`React Hook Form`), e como essa comparação se encaixaria no cadastro de beneficiários da SocialConnect.
- Usamos a IA para estruturar o mini-laboratório comparativo em `src/components/forms-comparison/` com contador de re-renderizações ao vivo (`useRef`) e integração com Material UI e TypeScript.
- Usamos a IA para revisar o relatório técnico (`docs/relatorio.md`) e gerar os slides da apresentação (`docs/slides.pdf`).

## O que entendemos 100%:
- Por que `useState` e `Formik` disparam re-renderizações a cada tecla (`onChange`) enquanto o `React Hook Form` lê valores via `ref` no DOM evitando re-renders desnecessários.
- Como o `zodResolver` conecta o schema `beneficiarioSchema.ts` ao `useForm` garantindo tipagem automática (`z.infer`) alinhada ao `BeneficiarioRequestDTO` da SocialConnect API.
- Quando faz sentido escolher `useState`, `Formik` ou `React Hook Form` no front-end.

## O que precisamos estudar mais:
- Casos em que componentes de UI de terceiros não expõem `ref` diretamente e exigem o uso do wrapper `<Controller />` no React Hook Form.
- Isolamento de re-renderizações com `useWatch` quando há campos dependentes entre si.

## Prompts Utilizados (Exemplos):

**Prompt 1:**
> "Como funciona na prática a diferença de re-renderizações entre React Hook Form, Formik e useState, e como esse comparativo se encaixaria no módulo de cadastro de beneficiários da SocialConnect?"

**Prompt 2:**
> "Como podemos montar um mini-laboratório em React + TypeScript + Material UI mostrando os três formulários lado a lado ligados ao `POST /api/v1/beneficiarios` com um contador visual de renders?"

**Prompt 3:**
> "Quais são as principais desvantagens do React Hook Form e em que cenários NÃO deveríamos usá-lo na SocialConnect?"

## Declaração de Autenticidade:
Declaramos que:
1. Todo o código entregue foi revisado e compreendido pelo grupo.
2. Somos capazes de explicar cada linha do código em uma arguição oral.
3. O uso de IA foi complementar ao nosso aprendizado, não substituto.
4. Não copiamos código de colegas ou de fontes não autorizadas.

**Assinaturas:** Guilherme Sano, Mateus Avanzi, Arthur Prado, Diego Castro  
**Data:** 18/11/2026
