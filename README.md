# Delivery Much Tech Challenge

### Arquitetura

O sistema foi construido com Typescript e dividido em 3 camadas, sendo Controller -> Service -> Repository. Também há entidades com as propriedades dos objetos e injeção de dependências para os testes unitários. A estrutura de pastas está conforme o diagrama abaixo.

```
project
└───src
│   └───config -> configurações do inversify (IOC)
│   └───controller -> controllers para as dynamic routes do express
|   	└───base
│   └───interfaces -> interfaces de service e repository, necessario apra IOC
|   	└───repositories
|   	└───services
│   └───models -> entidades

|   	└───responses
│   └───repositories -> acessos a bases de dados, dbs ou apis
│   └───services -> regras de negócios do sistema
```

### O SETUP

Após clonar o projeto será necessário instalar as dependências

```bash
cd challenge
npm install
```

Também será necessário adicionar um arquivo de configuração, para isso crie um arquivo `.env` e adicione os parâmetros abaixo

```
GIPHY_APIKEY=<Sua api key do giphy>
GIPHY_BASEURL=https://api.giphy.com/v1/gifs/
RECIPEPUPPY_BASEURL=http://www.recipepuppy.com/api/
HOST_PORT=3000
```

### Linter

O projeto conta com o eslint instalado

```bash
npm run lint
```

### Testes unitários

O projeto contem testes unitário disponíveis na testa `/src/tests` e cobertura de código, para executar basta executar os comandos abaixo

```bash
npm run test
```

Irá executar os testes unitários

```bash
npm run test:covarage
```

Irá executar os testes unitários e verificar a cobertura de testes do código. O relatório de cobertura estará disponível em :

```
/coverage/lcov-report/index.html
```

### Run docker

Executando o comando abaixo, irá executar o projeto, note que caso algum teste unitário falhe, a instancia não irá executar

```bash
docker-compose up --build
```
