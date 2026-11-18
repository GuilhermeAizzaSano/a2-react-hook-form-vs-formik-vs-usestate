# A2 - React Hook Form vs Formik vs useState

## Integrantes
- Guilherme Sano
- Mateus Avanzi
- Arthur Prado
- Diego Castro

## Tema
**6. React Hook Form vs Formik vs useState (Frontend)** — Investigação técnica, comparação de performance/DX e justificativa da adoção do React Hook Form + Zod no projeto SocialConnect.

## Objetivo
Demonstrar na prática as diferenças entre formulários *controlled* (`useState` e `Formik`) e *uncontrolled* com `ref` (`React Hook Form` + `Zod`) aplicados ao cadastro de beneficiários da SocialConnect API, medindo re-renderizações ao vivo durante a digitação.

## Como Executar
### Pré-requisitos
- Node.js 20+
- npm
- (Opcional) SocialConnect API rodando na porta `8080` (`Java 21` + `./mvnw spring-boot:run`) — o mini-laboratório também possui **Modo Simulação** integrado caso queira testar sem o back-end ativo.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/GuilhermeAizzaSano/a2-react-hook-form-vs-formik-vs-usestate.git
   cd a2-react-hook-form-vs-formik-vs-usestate
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o mini-laboratório:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`.
   - Para enviar requisições reais para a SocialConnect API (`POST http://localhost:8080/api/v1/beneficiarios`), mantenha o back-end da SocialConnect em execução.
   - Para testar localmente sem o back-end, ative a chave **"Modo Simulação (sem API)"** no topo da tela.

## Estrutura
- `src/`: Código do mini-laboratório (RHF + Zod, Formik, `useState` e contador de renders)
- `docs/`: Documentação e slides
- `AI_USAGE.md`: Declaração de uso de IA

## Slides
- [Slides da Apresentação (PDF)](docs/slides.pdf)

## Relatório
- [Relatório Técnico (Markdown)](docs/relatorio.md)
