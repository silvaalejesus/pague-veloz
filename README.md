# Consulta de Corretoras CVM

Uma aplicação web para visualizar, buscar e filtrar informações de corretoras de valores mobiliários listadas na CVM, consumindo dados públicos da [BrasilAPI](https://brasilapi.com.br/docs#tag/Corretoras).

## Funcionalidades Implementadas

- **Listagem em Cards Responsivos:** Exibição clara das corretoras em um layout de grade que se adapta a desktops, tablets e celulares.
- **Busca Multi-campo:** Campo de busca que filtra em tempo real por Nome Comercial, Razão Social e CNPJ.
- **Filtros Múltiplos:** Painel de filtros avançado que permite ao usuário refinar a busca por um ou mais Estados (UF) e por Status da Corretora (ex: "Em Funcionamento Normal", "Cancelada").
- **Paginação:** A paginação é calculada dinamicamente e se ajusta automaticamente aos resultados dos filtros aplicados. Como a API de corretoras retorna o conjunto de dados completo de uma só vez, a paginação foi implementada inteiramente no front-end. Esta estratégia garante uma navegação instantânea entre as páginas após o carregamento inicial, proporcionando uma experiência de usuário fluida e sem a necessidade de novas requisições à rede.
- **Página de Detalhes Dinâmica:** Ao clicar em um card, o usuário navega para uma página dedicada com todas as informações detalhadas da corretora selecionada.
- **Tratamento de Erros e Loading States:** A aplicação possui uma interface de usuário amigável que exibe indicadores de carregamento e mensagens de erro amigáveis (com opção de tentar novamente) em caso de falhas de rede.
- **Página 404 Personalizada:** Uma página de "Não Encontrado" amigável é exibida para rotas inválidas.

## Tecnologias e Bibliotecas

- **Framework Principal:** [**Next.js 15+**](https://nextjs.org/) (com App Router)
- **Linguagem:** [**TypeScript**](https://www.typescriptlang.org/)
- **Gerenciamento de Estado:** [**Jotai**](https://jotai.org/)
- **UI & Componentes:** [**Material-UI (MUI)**](https://mui.com/)
- **Requisições HTTP:** [**Axios**](https://axios-http.com/) (com interceptadores para tratamento global de erros e timeouts)
- **Testes Unitários:** [**Jest**](https://jestjs.io/) e [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/)
- **Mocking de API (Testes):** `jest.mock` para simulação da camada de serviço.

## Arquitetura e Padrões

A arquitetura do projeto foi pensada para ser fácil de entender e usar, aproveitando os recursos do Next.js App Router.

- **"Server fetches, Client interacts"**: o servidor busca os dados e os passa como props para os componentes de cliente, que então gerenciam a interatividade (painel de filtros, busca, paginação).
- **Gerenciamento de Estado Atômico (Jotai):** O estado dos filtros e os dados da API são armazenados em átomos. Os **Átomos derivados** foram utilizados para criar um fluxo de dados reativo, onde a lista de itens exibidos é uma consequência automática das mudanças nos filtros de busca, UF e status.
- **Camada de Serviço Dedicada:** Toda a lógica de comunicação com a API está isolada em `src/services/axiosClient.ts`. Isso centraliza a configuração do Axios (baseURL, timeout, interceptadores) e torna o código mais limpo e fácil de testar.
- **Estrutura de Pastas Lógica:** O projeto segue uma organização clara de pastas por responsabilidade (`/app` para rotas, `/components` para UI reutilizável, `/store` para estado, `/services` para a API).

## Como Rodar a Aplicação

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [Yarn](https://yarnpkg.com/) (ou `npm`)

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/silvaalejesus/pague-veloz.git
    cd pague-veloz
    ```

2.  **Instale as dependências:**

    ```bash
    yarn install
    ```

    _ou, se estiver usando npm:_

    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**

Crie um arquivo chamado **.env** na raiz do projeto e adicione a seguinte variavel:

```
NEXT_PUBLIC_API_URL=https://brasilapi.com.br/api
```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    yarn dev
    ```

    _ou:_

    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## Como Rodar os Testes

Os testes unitários foram configurados com Jest para garantir a qualidade e a estabilidade da lógica de negócio e dos componentes.

**Para rodar todos os testes uma única vez:**

```bash
yarn test
```

_ou:_

```bash
npx test
```
