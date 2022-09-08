<h1 align="center"> Projeto Trybe Futebol Clube ⚽ </h1>

Essa é uma aplicação <strong>full stack</strong>, onde me foi entregue o front-end e o desafio de contruir a parte back-end do projeto, desde popular e consumir os dados diretamente do banco de dados através da ORM Sequelize até criar testes de integração.

 <div align="center">
 
 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
 ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
 ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
 
</div>
<br/> <br/>

<h2 align="left"> Sobre: </h2>

O TFC é um site informativo sobre partidas e classificações de futebol!

Nesse projeto, foi desenvolvido um back-end dockerizado utilizando modelagem de dados através do Sequelize.

O desenvolvimento foi feito aplicando e respeitando as regras de negócios providas no projeto e a API construída foi capaz de ser consumida por um front-end.

Só é possível adicionar uma partida caso seja passado um token, este que é obtido através do login, então só após a pessoa estar logada que se torna possível criar e alterar partidas.

📊 **BANCO DE DADOS**
  - Relacional, construído através do SequelizeORM com migrations, models e seeders para cada entidade;

🔙 **BACK-END**
 - Construído seguindo modelo REST, tentando ao mámixo respeitar os preceitos de SOLID, sendo feito 100% em Typescript;
 
🐋 **DOCKER**
 - Cada camada da aplicação (front, back e db) conta com um Dockerfile, além de orquestração docker para dar conta de subir tudo junto ao mesmo tempo;
 
🧪 **TESTES**
 - Por último mas não menos importante, a API conta com uma bateria de testes de intergração, cobrindo mais de 80% das linhas de código da aplicação!
 

## Instalando o projeto localmente:
 
Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido, caso tenha dificuldades e o exemplo não seja suficiente, não hesite em me contatar em através do gmail: pedrodc1236@gmail.com 

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
  ```
  mkdir projetos
  ```
2. Entre no diretório que acabou de criar e depois clone o projeto:
  ```
  cd projetos
  ```
  ```
  git clone git@github.com:pedrodc1236/trybe-futebol-clube.git
  ```
  
3. Acesse o diretório do projeto e depois utilize o comando **npm install** para instalar todas as dependências necessárias:

  ```
  cd trybe-futebol-clube
  ```
  ```
  npm install
  ```
  
- ✨ **Dica:** Caso queira utilizar _Docker_ para rodar os testes localmente e validar as funcionalidades, basta seguir as seguintes instruções:

 **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar os containers do banco de dados (MySQL), do backend e frontend.
  
  > :information_source: Instale as dependências [**Caso existam**] com `npm install`

  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.
<h2 align="left">Rodando o projeto de forma local: </h2>

🚪 **FRONT-END**
 - Acesse o caminho `http://localhost:3000/` no navegador que preferir;
 

🔙 **BACK-END**
 - Caso queira, é possível acessar no `http://localhost:3001/` através de algum cliente HTTP como Insomnia, Postman ou Thunder Client;
 
 
📊 **BANCO DE DADOS**
  - Possível acessar através do MySQL Workbench ou qualquer outro método de visualização de banco de dados;


🧪 **TESTES**
 - Com a aplicação em pé, basta rodar `npm test` na pasta raiz para rodar os testes de integração;

## Habilidades Desenvolvidas

- Realizar a dockerização dos apps, network, volume e compose;
- Modelar dados com MySQL através do Sequelize;
- Criar e associar tabelas usando models do sequelize;
- Construir uma API REST com endpoints para consumir os models criados;
- Construir um CRUD com TypeScript, utilizando ORM;
- Validar e autenticar as requisições do usuário, utilizando middlewares de manipulação de erros e JWT;
- Aplicar a metodolodia TDD (Test Driven Development), utilizando Mocha, Chai e Sinon.


