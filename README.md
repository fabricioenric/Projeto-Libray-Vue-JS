# Projeto-Libray-Vue-JS

Aplicação simples feita com Vue.Js e Express.Js para persistir dados dos livros de uma biblioteca na base de dados PostgreSQL

===== Instalação:
  1) Instalar o PostgreSQL:
    ----- sudo apt update
    ----- sudo apt install postgresql postgresql-contrib
    ----- sudo -u postgres psql
    
  2) Criar o Banco de Dados biblioteca:
    ----- sudo -u postgres createdb biblioteca
    ----- Criar a tabela livro do script SQL
    
  3) Instalar o Node.Js e npm:
    ----- sudo apt install nodejs
    ----- node --version
    ----- npm --version
    
  4) Instalar o Express.Js via npm:
    ----- npm install -g express-generator@4.13.4
    ----- cd projeto-library/backend/node
    ----- npm install
    ----- npm start
  
  5) Instalar o Vue.Js via npm:
    ----- npm install -g @vue/cli
    ----- vue --version
    ----- cd projeto-library
    ----- npm install
    ----- npm run serve
    
Acesse a Url: http://localhost:8080/ em qualquer browser.
