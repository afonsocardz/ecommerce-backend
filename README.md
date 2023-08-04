# Desafio Ecommerce - README

Este projeto é o backend de um ecommerce desenvolvido para atender as operações do carrinho de compras. Ele oferece endpoints para pesquisa e paginação produtos, adicionar produtos ao carrinho, atualizar quantidades e finalizar compras.

## Tecnologias Utilizadas

- [Nest.js](https://nestjs.com): Um framework de backend em Node.js que oferece uma arquitetura modular e escalável.
- [Prisma](https://www.prisma.io): Um ORM (Object-Relational Mapping) para bancos de dados, facilitando a interação com o PostgreSQL.
- [PostgreSQL](https://www.postgresql.org): Um sistema de gerenciamento de banco de dados relacional.
- [Ethereal](https://ethereal.email/): Um serviço para testes de e-mails em ambiente de desenvolvimento.

## Configuração do Ambiente

1. Clone este repositório.
2. Renomeie o arquivo `.env-example` para `.env` e configure as variáveis de ambiente necessárias, como as credenciais do banco de dados, informações de autenticação e as credenciais do Ethereal para envio de e-mails.
3. Certifique-se de ter o [Docker](https://www.docker.com) instalado na versão mais recente.

## Requisitos para Execução

Certifique-se de ter o Docker instalado e configurado corretamente.

## Instalação das Dependências

As dependências já estão configuradas no Docker, portanto, não é necessário instalar nada manualmente.

## Configuração das Variáveis de Ambiente

Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env`, incluindo as credenciais do Ethereal.

## Executando Migrações do Banco de Dados

O Docker já está configurado para executar as migrações automaticamente. Para garantir que o banco de dados esteja atualizado.

## Iniciando o Servidor

Para iniciar o servidor do backend, execute:

```bash
docker compose --env-file .env up --build
```

## Visualizando os Endpoints com Swagger

Após iniciar o servidor, você pode acessar a documentação dos endpoints utilizando o Swagger. Basta abrir o seu navegador e acessar o seguinte URL:

```
http://localhost:PORTA/api
```

Isso abrirá a interface do Swagger, onde você poderá explorar e testar os endpoints disponíveis, verificando os detalhes de cada rota, os parâmetros esperados e os exemplos de respostas.

Certifique-se de substituir `PORTA` pelo número da porta em que o servidor está sendo executado.

Através do Swagger, você terá uma visão completa das funcionalidades da API e poderá testar as requisições diretamente na interface, facilitando o desenvolvimento e a compreensão das operações disponíveis.

Lembre-se de consultar o Swagger sempre que precisar verificar detalhes ou testar os endpoints da API.

## Autenticação de Usuários

A autenticação é realizada por meio de tokens JWT (JSON Web Tokens), enviados via cookie com `http-only`. O servidor verifica a validade do token e a existência do usuário antes de permitir o acesso aos endpoints protegidos.

## Credenciais Padrão para Login

- E-mail: `example@example.com`
- Senha: `StrongP@assw0rd`

## Envio de E-mails

O projeto utiliza o serviço Ethereal para testes de envio de e-mails em ambiente de desenvolvimento. As credenciais do Ethereal devem ser configuradas no arquivo `.env`.

## Próximos Passos e Melhorias

- Implementar testes unitários e de integração para serviços e rotas.
- Adicionar módulos do administrador para gerenciamento de produtos.
- Implementar filtros de produtos e funcionalidades avançadas de busca.
- Configurar integrações com SMTP e gateways de pagamento.

## Implantação em Ambiente de Produção

O projeto já possui a configuração necessária para implantação em ambiente de produção utilizando Docker.
