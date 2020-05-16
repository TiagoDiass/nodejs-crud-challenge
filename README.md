# Node.js CRUD Challenge

- [Português](#portugues) :brazil:
- [English](#english) :us:

<hr>

## <a name="portugues"></a> README - Português :brazil:
Essa é uma API REST que desenvolvi para um desafio, e que basicamente pode, consultar, registrar, alterar e excluir dados de uma entidade no banco de dados, nesse caso a entidade representa equipamentos(equipamentos eletrônicos como impressoras, e afins)


## Tecnologias utilizadas :rocket:

 - [Node.js](https://nodejs.org/pt-br/) utilizando o framework [Express](https://expressjs.com/pt-br/)
 - [Knex.js](http://knexjs.org/) como QueryBuilder para poder fazer as operações no banco de dados de uma forma mais simplificada
 - [SQLite](https://www.sqlite.org/index.html) para o banco de dados

## O que aprendi com este projeto :dart:

Além de ter praticado meus conhecimentos em Javascript com Node.js, também pude praticar a interação com o banco de dados através do Knex.js, e que particularmente, nunca tinha usado em algo sozinho, mas resolvi dar uma chance a ele pois além de simples, é um Query Builder muito eficiente e simples de se trabalhar
   
## Como testar a API em sua máquina :arrow_forward:

Para testá-la, você precisará ter instalado em seu computador o [Git](https://git-scm.com), o [Node.js/NPM](https://nodejs.org/pt-br/) e algum software que possa testar APIs, eu recomendo o [Insomnia](https://insomnia.rest/download/) pois ele é muito fácil de se usar, simples e eficaz, baixe a versão Insomnia Core!

Passo a passo para testar a aplicação:
1. Vá em algum diretório do seu computador, e abra o Git Bash clicando com o botão direito do mouse no diretório que você escolheu, e escolha a opção "Git Bash Here", após isso siga os seguintes passos:

### Baixando o projeto
```bash
# Clone o repositório
$ git clone https://github.com/TiagoDiass/nodejs-crud-challenge.git

# Entre na pasta do repositório
$ cd nodejs-crud-challenge
```

2. Eu preparei algumas seeds para que você possa testar a API sem ter que ficar registrando dados manualmente, então, nós vamos instalar as dependências da API, executar as seeds, e depois iniciar a API, siga os passos abaixo: 

### Instalando as dependências e iniciando a API
```bash
# Instale as dependências
$ npm install 

# Executando as seeds para criação de alguns dados automáticos
$ npx knex seed:run

# Após ter instalado as dependências e executado as seeds, inicie a aplicação
$ npm start
```

3. Abra o Insomnia e siga estes passos:

      - Para testar a API no Insomnia, você pode começar criando um workspace clicando na setinha branca ao lado do nome do seu workspace atual, e dar a ele o nome que você quiser, nesse caso eu coloquei "Node.js Challenge".

      - Após isso você pode criar as requests/requisições, seguindo os seguintes passos, caso queira trocar o nome de alguma delas você pode, o importante é que você preste atenção ao método HTTP que está dando ao criar cada uma das requests, se baseie nos metódos que estão a esquerda dos nomes das requisições no print abaixo :arrow_heading_down:
      
      <img src="screenshots/screenshot_1.png" >
      
      - <strong>Observação:</strong> Na criação das requisições "Create" e "Update", ao lado do método você terá um campo com as opções para o corpo da requisição, escolha a opção <strong>"JSON"</strong>, essa é a forma que enviaremos dados à API.
      
      - Após criar todas as requests como no print acima, coloque essas rotas para cada uma das requisições :arrow_heading_down:
      
- [Requisição List all](#pt-list)<br>
    Método GET<br>
    Rota da requisição: http://localhost:3333/equipments
    
- [Requisição Show one(que nos mostrará um equipamento especifício)](#pt-show)<br>
    Método GET<br>
    Rota da requisição: http://localhost:3333/equipments/id <br> (<strong>Obs:</strong> substitua o "id"  pelo ID do equipamento que você deseja ver)
    
- [Requisição Create](#pt-create)<br>
  Método POST<br>
  Rota da requisição: http://localhost:3333/equipments/new
  
- [Requisição Update](#pt-update)<br>
  Método PUT<br>
  Rota da requisição: http://localhost:3333/equipments/id <br>
  (<strong>Obs:</strong> substitua o "id"  pelo ID do equipamento que você deseja editar)
  
- [Requisição Delete](#pt-delete)<br>
  Método DELETE<br>
  Rota da requição: http://localhost:3333/equipments/id <br>
  (<strong>Obs:</strong> substitua o "id"  pelo ID do paciente que você deseja excluir)
  
  
## Testando a API :on:

Após ter criado todas as requisições, você pode começar a testá-las, o funcionamento da API é bem simples, através das requisições, você pode salvar, editar, mostrar e excluir dados de equipamentos eletrônicos.<br>

Como você executou a seed, alguns registros já estarão no banco de dados

#### Agora irei mostrar os possíveis resultados e retornos da API

### <a name="pt-list"></a>Requisição LIST ALL: 

Como o nome da requisição já diz, ela irá listar todos os registros dos equipments que estão no banco de dados, esse é o resultado ao executá-la(ah, e para executá-la, basta clicar no botão SEND, isso irá enviar a requisição para API) :arrow_heading_down:

<img src="screenshots/screenshot_2.png">


### <a name="pt-show"></a>Requisição SHOW ONE: 

Essa requisição irá mostrar os dados de um equipamento específico, para utilizá-la você deve colocar o ID do paciente que você deseja ver os dados na rota/endereço da requisição, como na imagem abaixo, que também nos mostra o resultado final da requisição passando o ID 3 como parâmetro :arrow_heading_down:

<img src="screenshots/screenshot_3.png">

Caso o ID seja inválido, o resultado será o seguinte:

<img src="screenshots/screenshot_4.png">


### <a name="pt-create"></a>Requisição CREATE: 

Essa é a requisição responsável por adicionar um novo equipamento aos registros, para utilizá-la você deve preencher o corpo da requisição com os seguintes dados: 
- model(<strong>obrigatório</strong>),
- category(<strong>obrigatório</strong>, valores possíveis são "cartucho" e "toner"),
- ppm(que significa páginas por minuto, <strong>NÃO é obrigatório</strong>, e caso não se aplique ao equipamento que você deseja cadastrar, você pode omitir ele da inserção do equipamento, ele ficará como null automaticamente, caso ele se aplique, você deve colocar um número maior do que zero)
- wifi(<strong>não obrigatório</strong>, caso não se aplique você pode omití-lo da inserção e ele resultará em null, caso queira preencher, coloque <strong>true</strong> ou <strong>false</strong>)
- consumption(<strong>não obrigatório</strong>, caso não se aplique você pode omití-lo da inserção e ele resultará em null, caso queira preencher, coloque um número maior do que zero)<br>

Você pode ver o exemplo nas imagens abaixo, após adicionar o equipamento, a resposta da requisição será os dados do equipamento que você adicionou :arrow_heading_down: <br>

Caso algum dado esteja inválido, a resposta indicará qual campo está errado, como na imagem abaixo:

<img src="screenshots/screenshot_6.png">

Caso os dados estejam válidos, a resposta será os dados do equipamento criado, como na imagem abaixo:

<img src="screenshots/screenshot_5.png">

### <a name="pt-update"></a>Requisição UPDATE: 

Essa é a requisição responsável por editar os dados de um equipamento, para utilizá-la você deve colocar o nome do dado que deseja alterar e seu respectivo valor, não se esqueça que o nome dos dados não podem ser diferente de: model, category, ppm, wifi e consumption.
Você pode seguir o exemplo na imagem abaixo, após editar o equipment, a resposta da requisição serão os novos dados do equipamento que você editou, veja abaixo :arrow_heading_down:

Caso o ID passado como parâmetro não exista no banco de dados, a resposta será assim:

<img src="screenshots/screenshot_9.png">

Caso algum dado esteja inválido, a resposta indicará qual campo está errado, como na imagem abaixo:

<img src="screenshots/screenshot_8.png">

Caso os dados escolhidos estejam válidos, a resposta será os novos dados do equipamento editado, como na imagem abaixo:

<img src="screenshots/screenshot_7.png">


### <a name="pt-delete"></a>Requisição DELETE: 

Essa é a requisição responsável por deletar um equipamento, o resultado da requisição será um corpo vazio e o status 204(que significa "No content", sem conteúdo), para utilizar a requisição DELETE você deve colocar o ID do paciente na rota como nas imagens abaixo :arrow_heading_down:

Caso o ID passado como parâmetro não exista no banco de dados, a resposta será assim:

<img src="screenshots/screenshot_11.png">

Caso o ID passado seja válido, a resposta será a seguinte:

<img src="screenshots/screenshot_10.png">

<hr>

### Como parar a aplicação:

Após ter testado ela, você pode parar o seu funcionamento voltando ao terminal Git Bash que você utilizou para iniciar a API, e apertar <kbd>CTRL</kbd>+<kbd>C</kbd>, após isso a API será parada e você não conseguirá mais testá-la enquanto você não a iniciar novamente :)

#### Contato
- [Linkedin](https://www.linkedin.com/in/tiagodiass)
- Email: tiago.costadiasss@gmail.com

##### Espero que tenha gostado do projeto :smiley:
