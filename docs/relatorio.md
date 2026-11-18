# Relatório Técnico — Avaliação A2: React Hook Form vs Formik vs useState

**Disciplina:** Tópicos Especiais em Sistemas para Internet III  
**Projeto:** SocialConnect API + Front-end (`socialconnect-front`)  
**Tema:** 6. React Hook Form vs Formik vs useState (Frontend)  
**Integrantes:**
- Guilherme Sano
- Mateus Avanzi
- Arthur Prado
- Diego Castro

---

## 1. Objetivo

Investigar em profundidade as três principais abordagens de gerenciamento de formulários em React (**React Hook Form**, **Formik** e **`useState` puro**), comparar performance, API, validação, tipagem TypeScript e experiência de desenvolvimento (DX), e validar na prática por meio de um mini-laboratório conectado ao módulo de **Beneficiários** da SocialConnect.

---

## 2. Investigação Conceitual

### 2.1 Controlled vs. Uncontrolled Components

No React, há dois modelos para capturar dados de inputs:

1. **Controlled Components (`useState` e Formik):**  
   O React mantém o valor de cada campo em estado (`state`). Cada evento `onChange` dispara `setState`, que agenda uma nova renderização do componente de formulário para atualizar o `value` do input.
2. **Uncontrolled Components com `ref` (React Hook Form):**  
   O valor fica armazenado no próprio elemento DOM, acessado via `ref` (`register('campo')`). O React não precisa re-renderizar o formulário a cada tecla digitada; o RHF coleta os valores apenas quando necessário (submissão, validação configurada ou campos observados explicitamente com `watch`).

### 2.2 Comparação Técnica

| Critério | React Hook Form | Formik | `useState` puro |
|---|---|---|---|
| **Estratégia** | Uncontrolled (`ref` nativa no DOM) | Controlled (estado centralizado) | Controlled (estado por campo) |
| **Re-renders ao digitar** | Mínimos (isolados; zero no form por tecla) | Alto (re-renderiza o form a cada tecla) | Alto (re-renderiza o form a cada tecla) |
| **Tamanho de pacote (dependências)** | Leve, zero dependências externas | Moderado, acoplado a helpers internos | Zero dependências extras |
| **Validação de Schema** | Nativa para Zod, Yup, Joi via `@hookform/resolvers` | Foco histórico em Yup (`validationSchema`); Zod exige adaptador manual | Totalmente imperativa e manual |
| **Tipagem TypeScript** | Excelente: inferência direta via `z.infer<typeof schema>` | Boa (`FormikProps<T>`), porém mais verbosa | Manual para valores, erros e toque |
| **Boilerplate / DX** | Baixo (`register`, `handleSubmit`, `errors`) | Médio (`values`, `touched`, `handleChange`, `handleBlur`) | Alto (cresce linearmente com nº de campos) |
| **Integração com UI libs (MUI)** | Direta com `register` ou `<Controller />` | Passagem manual de `value`, `onChange`, `onBlur`, `error` | Passagem manual de `value`, `onChange`, `error` |

### 2.3 Casos de Uso Recomendados

- **`useState` puro:** formulários mínimos (1–2 campos, ex.: barra de busca simples, filtro único ou toggle) onde adicionar uma biblioteca não traz ganho.
- **Formik:** sistemas legados já padronizados em Formik + Yup ou fluxos em que cada tecla precisa sincronizar estado global controlado sem `watch`.
- **React Hook Form:** formulários médios/grandes, cadastros com múltiplas validações (CPF, telefone, tamanho de texto), integração com Material UI e projetos TypeScript com Zod.

---

## 3. Mini-Laboratório na SocialConnect

O mini-laboratório foi implementado dentro de `src/components/forms-comparison/` consumindo o mesmo endpoint real do back-end (`POST /api/v1/beneficiarios`) com os campos `nome`, `cpf` e `telefone` (além de contar com um modo de simulação offline para demonstração rápida):

- [BeneficiarioFormRHF.tsx](../src/components/forms-comparison/BeneficiarioFormRHF.tsx) — utiliza `useForm<BeneficiarioFormData>` com `zodResolver(beneficiarioSchema)`.
- [BeneficiarioFormFormik.tsx](../src/components/forms-comparison/BeneficiarioFormFormik.tsx) — utiliza `useFormik<FormValues>` com `validate`, `touched`, `handleChange` e `handleBlur`.
- [BeneficiarioFormUseState.tsx](../src/components/forms-comparison/BeneficiarioFormUseState.tsx) — utiliza `useState` individual por campo e função `validate()` manual.
- [FormsComparison.tsx](../src/components/forms-comparison/FormsComparison.tsx) — exibe os três formulários lado a lado com um **contador de renders em tempo real** (`useRef`) e tabela resumo.

### Resultado Observado no Laboratório

Ao digitar um nome de 15 caracteres + CPF de 11 dígitos + telefone de 11 dígitos (37 teclas):
- **`useState` e `Formik`:** executam **37+ re-renderizações** do formulário inteiro durante a digitação.
- **`React Hook Form`:** permanece com **1 render inicial** enquanto o usuário digita, re-renderizando apenas ao submeter ou quando o estado de erro muda.

---

## 4. Conexão com a SocialConnect

A SocialConnect atende ONGs, bancos de alimentos, CRAS e abrigos, onde operadores cadastram beneficiários em máquinas variadas e muitas vezes com conexão ou hardware limitados. A escolha do **React Hook Form + Zod** no formulário principal da SocialConnect se justifica por:

1. **Contrato único entre Front-end e Back-end:** o schema [beneficiarioSchema.ts](../src/schemas/beneficiarioSchema.ts) replica exatamente as validações de `BeneficiarioRequestDTO.java` (`nome` 3–150 chars, `cpf` 11 dígitos, `telefone` 10–11 dígitos, `endereco` máx. 255, `situacaoVulnerabilidade` máx. 500), evitando requisições inválidas desnecessárias à API.
2. **Fluidez com Material UI:** componentes `TextField` do MUI são mais pesados que `<input>` nativo; evitar re-renders a cada tecla elimina travamentos perceptíveis em formulários maiores.
3. **Acessibilidade (WCAG 2.1):** combinado ao `TextField` do MUI, `error={!!errors.campo}` e `helperText={errors.campo?.message}` vinculam automaticamente mensagens de erro aos inputs para leitores de tela.

---

## 5. Guia para o Debate Técnico (Trade-offs)

- **Qual a principal desvantagem do React Hook Form?**  
  Por ser baseado em inputs *uncontrolled* (`ref`), integrações com componentes customizados que não expõem `ref` diretamente (como alguns `Select` ou `DatePicker` controlados) exigem o wrapper `<Controller />`, aumentando um pouco a verbosidade nesses casos específicos.
- **Em que cenário NÃO usaríamos React Hook Form?**  
  Em um campo isolado de busca/filtro instantâneo (onde `useState` + debounce resolve em 3 linhas) ou quando um projeto legado já possui dezenas de formulários em Formik + Yup sem gargalo de performance.
- **Qual o impacto de migrar de `useState`/Formik para React Hook Form?**  
  A migração pode ser feita formulário a formulário (sem reescrever a aplicação inteira), reduzindo código repetitivo de handlers (`onChange`, `onBlur`, `touched`) e centralizando regras no schema Zod.
