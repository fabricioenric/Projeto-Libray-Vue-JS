<template>
    <div id="principal">
        <h1>Lista de Livros Cadastrados</h1>
        <router-link to="/"><img src="../assets/cadastro.png" title="Ir para o cadastro"  width="30" alt="Cadastro da Biblioteca"/> Ir para o cadastro de livros<br><br></router-link>
        <label style="font-size: 20px;" for="busca">Busca de livro(s)</label><input type="text" id="busca" v-model="textFragment" @keyup="buscarNaBiblioteca" placeholder="Digite o título, nome do autor, estado ou número de páginas"/>
        <table id="library">
            <tr>
                <th class="other-cells">#</th>
                <th class="titulo-cells">Título</th>
                <th class="autor-cells">Autor</th>
                <th class="other-cells">Páginas</th>
                <th class="other-cells">Estado</th>
                <th class="other-cells">Status</th>
                <th style="color: red;">Ações</th>
            </tr>
            <tr v-for="(livro, index) in livros" :key="livro.id">
                <td> {{index+1}} </td>
                <td> {{livro.titulo}} </td>
                <td> {{livro.autor}} </td>
                <td> {{livro.numeropaginas}} </td>
                <td> {{livro.estado}} </td>
                <td> {{livro.status}} </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button title="Editar dados do livro" class="editButton btn" @click="toEdit(livro.id)"><i class="fa fa-edit"></i></button><button title="Deletar dados do livro" class="trashButton btn" @click="deleteLivro(livro.id, index)"><i class="fa fa-trash"></i></button></td>
            </tr> 
        </table>
    </div>
</template>

<script>
import {http} from '../http-common'
import { log } from 'util'

export default {
    name: 'lista',
    data(){
        return{
            livros: [],
            textFragment: ''
        }
    },
    methods: {

        // envia para a pagina de cadastro o id do livro a ser editado
        // ao ser clicado no botao de edit
        toEdit(id){
            this.$router.push({ name: 'editar', params: { operacao: 'editar',  id: id } })
        },

        // ao clicar no botao de deletar
        // deletar livro do backend com determinado id
        // deletar livro do array com determinado index
        deleteLivro(id, index){
            var areYouSureAboutThat = confirm("Deseja apagar dados do livro?")
            
            if(areYouSureAboutThat){
                var getLivro = this.livros.find(livro => livro.id === id)

                http.delete('/api/library/livros/'+id, getLivro)
                    .then(response => {
                        this.livros.splice(index, 1)
                    })
                    .catch(e => {
                        console.log('Erro ao deletar livro: '+e)
                    })
            }
            else{
                return 
            }
        },

        buscarNaBiblioteca(){
            if(this.textFragment.length > 0){
                http.get('/api/library/livros/busca/'+this.textFragment) 
                    .then(response => {
                        this.livros = response.data
                })
                    .catch(e => {
                        console.log('Erro ao mostrar a listagem: '+e)
                })
            }
            else{
                http.get('/api/library/livros') 
                    .then(response => {
                        this.livros = response.data
                })
                    .catch(e => {
                        console.log('Erro ao mostrar a listagem: '+e)
                })    
            }
        }
    },
    
    // Quando montado recuperar a lista de livros do backend
    // e a renderiza na tela
    mounted(){ 
        http.get('/api/library/livros') 
            .then(response => {
                this.livros = response.data
            })
            .catch(e => {
                console.log('Erro ao mostrar a listagem: '+e)
            })
    }
}
</script>

<style scoped>
#principal{
    margin: 0 5%;
    text-align: center;
}

input{
    margin-left: 10px;
    line-height: 30px;
    width: 37%;
    border-radius: 5px;
}

h1{
    font-size: 40px;
    text-transform: uppercase; 
}

#library{
    margin: auto;
    margin-top: 25px;
    border-collapse: collapse;
    color: snow;
}
tr{
    border-bottom: 2px white solid;
}
.titulo-cells{
    padding-right: 120px;
}
.autor-cells{
    padding-right: 77px;
}
.other-cells{
    padding-right: 35px;
}

.trashButton, .editButton{
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
}

#buscando{
    margin-left: 25px;
}
</style>