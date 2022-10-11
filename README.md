
# API de Blog

O objetivo deste projeto é construir uma API e um banco de dados para a produção de conteúdo para um blog.
Seguindo os principios de REST e utilizando o pacote sequelize para fazer um CRUD de posts. 
 


## Tecnologias

- Node: ^16.0.0
- Express: 4.17.1
- Sequelize: 6.3.4
- Mysql2: 2.1.0
- Jsonwebtoken: ^8.5.1

## Rode Localmente

Clone o projeto - utilizando SSH, para baixar com HTTPS é necessário utilizar outro link

```bash
  git clone git@github.com:leoblima/blogs-api.git
```

Vá ao diretório do projeto

```bash
  cd blogs-api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Se você quiser utilizar os dados que já estão nos arquivos de seeders, então antes de inicializar rode o seguinte comando:

```bash
  npm run prestart
```
Como você pode conferir no package.json, o banco de dados será criado e os dados serão migrados para lá. No package.json, você pode ver outras funcionalidades que estão disponíveis pelo npm. Elas foram feitas pela Trybe.


## Rodando com Docker

O projeto conta com um docker-compose pronto para fazer os containers da aplicação, tanto o do banco de dados quanto do backend. Esse arquivo foi fornecido pela Trybe. 

O banco de dados está utilizando as imagem mysql na versão 8.0.21 e está rodando na porta standard 3306 e o backend está utilizando a imagem node na versão 16, como está descrito nas tecnologias.


```bash
  cd blogs-api 
  docker-compose up -d --build
```
Caso queira usar os comandos disponíveis no package.json, como o **npm start**, use:

```bash
  docker exec -it blogs_api bash
```
Isso vai te dar acesso ao terminal dentro do container e vai poder usar normalmente todos os comandos npm.
## Referência para a API

#### Faz o login

```http
  POST /login
```

O endpoint deve receber no body da requisição a seguinte estrutura:

```json
{
  "email": "string",
  "password": "string"
}
```
Algumas validações vão ser feitas: 
 - todos os campos devem estar preenchidos;
 - o usuário deve existir no banco de dados;

Caso o login seja feito com sucesso, passando pelas validações das regras de negócio, retorna um objeto com o token: 

```json
{
  "token": "string - resultado do jsonwebtoken"
}
```

#### Adiciona novo usuário

```http
  POST /user
```
O endpoint deve receber no body da requisição a seguinte estrutura:

```json
{
  "displayName": "string",
  "email": "string",
  "password": "string",
  "image": "string"
}
```
Algumas validações vão ser feitas: 
 - displayName tem que ter no mínimo 8 caracteres;
 - email deve ter o formato válido de email;
 - password tem que ter no mínimo 6 caracteres;
 - o email não pode já existir no banco de dados;

Caso o usuário seja cadastrado com sucesso, passando pelas validações das regras de negócio, retorna um objeto com o token: 

```json
{
  "token": "string - resultado do jsonwebtoken"
}
```

#### Lista os usuários

```http
  GET /user
```
Este endpoint pede que seja enviado no header, como authorization, um token válido.

Caso o token seja válido, é retornado um array com os usuários, sem a senha presente. Como no exemplo:

```json
[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },

  /* ... */
]
```

#### Lista um usuário pelo id

```http
  GET /user/:id
```
Este endpoint pede que seja enviado no header, como authorization, um token válido.

Caso o token seja válido e o usuário com id requisitado exista, é retornado um objeto com o usuário, sem a senha presente. Como no exemplo:

```json
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  }
```
#### Adiciona uma categoria

```http
  POST /categories
```
Este endpoint pede que seja enviado no header, como authorization, um token válido e a seguinte estrutura no corpo da requisição:

```json
{
  "name": "string",
}
```
Caso o token seja válido e o corpo também, retorna um objeto como no exemplo: 

```json
  {
      "id": 3,
      "name": "C++",
  }
```
#### Lista as categorias

```http
  GET /categories
```
Este endpoint pede que seja enviado no header, como authorization, um token válido.

Caso o token seja válido, é retornado um array com as categorias. Como no exemplo:

```json
[
  {
      "id": 1,
      "name": "Programação"
  },
  {
      "id": 2,
      "name": "Música"
  },

  /* ... */
]
```
#### Adiciona um post

```http
  POST /post
```
Este endpoint pede que seja enviado no header, como authorization, um token válido e a seguinte estrutura no corpo da requisição:

```json
{
  "title": "string",
  "content": "string",
  "categoryIds": [1, 2] //array de números
}
```
Algumas validações vão ser feitas: 
 - Todos os campos devem estar preenchidos;
 - Não pode haver ter ids ide categorias que não existem;

Caso o token seja válido e o corpo também, retorna um objeto como no exemplo: 

```json
{
  "id": 5,
  "title": "O input",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "updated": "2022-06-18T18:00:01.196Z",
  "published": "2022-06-18T18:00:01.196Z"
}
```
#### Lista os posts

```http
  GET /post
```
Este endpoint pede que seja enviado no header, como authorization, um token válido.

Caso o token seja válido, é retornado um array com os posts. Como no exemplo:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },
  
  /* ... */
]
```
