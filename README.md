# event-organizer

Este é um projeto de uma API REST com objetivo de gerenciar a programação de um evento.
Para rodar o projeto em sua maquina é necessário as ferramentas abaixo:

# Como configurar o projeto:

### 1. Instale o NodeJS

- _NodeJS:_ https://nodejs.org/en/

### 2. Instale o yarn ou npm

- _yarn:_ https://yarnpkg.com/lang/en/

- _npm:_ https://www.npmjs.com/get-npm

# Rodando o projeto:

Antes de iniciar instale as dependências do projeto:

`yarn install`

ou

`npm install`

## Comandos disponíveis

Abaixo temos alguns comandos úteis para debug, execução, build e executar testes.

- Criar o build do projeto para deploy:
  `yarn build`

* Executar o projeto localmente:
  `yarn dev`

- Executar os testes com o jest:
  `yarn test`

# Requisição dos dados

A chamada é do tipo HTTP/POST e deve ser feita pela url abaixo:

- Localhost:
  `http://localhost:5000/api/organize/event`

* Produção:
  `https://event-organizer-quero.herokuapp.com/api/organize/event`

> Obs: a porta pode ser configurada no arquivo server.js

Basicamente ela recebe um array de string, onde cada string deve conter como titulo da palestra, e separado por `espaço`, o tempo de duração.

Exemplo:

```
{
  "data":[
    "Writing Fast Tests Against Enterprise Rails 60min",
    "Overdoing it in Python 45min",
    "Lua for the Masses 30min",
    "Ruby Errors from Mismatched Gem Versions 45min",
    "Common Ruby Errors 45min",
    "Rails for Python Developers lightning",
    "Communicating Over Distance 60min",
    "Accounting-Driven Development 45min",
    "Woah 30min",
    "Sit Down and Write 30min",
    "Pair Programming vs Noise 45min",
    "Rails Magic 60min",
    "Ruby on Rails: Why We Should Move On 60min",
    "Clojure Ate Scala (on my project) 45min",
    "Programming in the Boondocks of Seattle 30min",
    "Ruby vs. Clojure for Back-End Development 30min",
    "Ruby on Rails Legacy App Maintenance 60min",
    "A World Without HackerNews 30min",
    "User Interface CSS in Rails Apps 30min"
  ]
}
```

O retorno da chamada será conforme o exemplo abaixo:

```
{
"data": [
  {
    "title": "Track 1",
    "data": [
      "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
      "10:00AM Overdoing it in Python 45min",
      "10:45AM Lua for the Masses 30min",
      "11:15AM Ruby Errors from Mismatched Gem Versions 45min",
      "12:00PM Lunch 60min",
      "01:00PM Common Ruby Errors 45min",
      "01:45PM Rails for Python Developers 5min",
      "01:50PM Communicating Over Distance 60min",
      "02:50PM Accounting-Driven Development 45min",
      "03:35PM Woah 30min",
      "04:05PM Sit Down and Write 30min",
      "04:35PM Networking Event 60min"
    ]
  }
]
}
```

Informações extras

O serviço pode criar varios tracks conforme a quantidade de itens para serem encaixados no evento.

O evento sempre começa as _09:00AM, com pausa ás \*\*12:00AM_ para o almoço e terminando no máximo até as _05:00PM_, fechando sempre com o happy hour.

Obs: O tempo minimo de uma palestra é 'lightning' que são 5 minutos.
