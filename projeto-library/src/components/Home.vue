<template>
     <div id="principal">
         <section v-if="isSomethingWrong" id="error-msg">
                    Algum erro ocorreu!
        </section>
        <h1>A Biblioteca de Livros</h1>
        <router-link to="/lista">Ir para a biblioteca</router-link>
        <form>
            <div class="form-intern-div">
                <label for="title" title="Título do Livro"><b>Título:</b></label><br>
                <input type="text" id="title" title="Título do Livro" v-model="livro.titulo" name="Titulo" maxlength="100" minlength="2" required><br>
            </div>
            <div class="form-intern-div">
                <label for="author" title="Autor do Livro"><b>Autor:</b></label><br>
                <input type="text" id="author" title="Autor do Livro" v-model="livro.autor" name="Autor" @keypress="isLetterKey($event)"  maxlength="100" minlength="2" required/><br>
            </div>
            <div class="form-intern-div">
                <label for="pages" title="Número de Páginas do Livro"><b>Páginas:</b></label><br>
                <input type="number" id="pages" title="Número de Páginas do Livro" v-model="livro.numeropaginas" name="NumeroPaginas" @keypress="isNumberKey($event)" min="10" max="5000" required/><br>
            </div>
            <div class="form-intern-div">
                <label for="estado" title="Estado de Conservação do Livro"><b>Estado:</b></label><br>
                <select name="EstadoBook" id="estado" title="Estado de Conservação do Livro" v-model="livro.estado" required>
                    <option value="Péssimo">Pessimo</option>
                    <option value="Ruim">Ruim</option>
                    <option value="Regular">Regular</option>
                    <option value="Bom">Bom</option>
                    <option value="Ótimo">Otimo</option>
                </select>
            </div>
            <div class="form-intern-div">
                <label for="status" title="Status"><b>Status:</b></label><br>
                <select name="StatusBook" id="status" title="Status do Livro" v-model="livro.status" required>
                    <option value="Lido">Lido</option>
                    <option value="Não Lido">Nao Lido</option>
                </select>
            </div>
            <div class="form-intern-div">
                <button id="submit" @click="submitActions">Cadastrar livro na biblioteca</button>
            </div>
        </form>
    </div>
</template>

<script>
import {http} from '../http-common'

export default {
    name: 'home',
    data(){
        return{
            isSomethingWrong: false,
            livro: {
                id: 0,
                titulo: '',
                autor: '',
                numeropaginas: 0, 
                estado: '',
                status: ''           
            }
        }
    },
    methods: {
        
        // salva um novo livro na base de dados
        salvar() {
            http.post('/api/library/livros', {
                titulo: this.livro.titulo,
                autor: this.livro.autor,
                numeropaginas: this.livro.numeropaginas,
                estado: this.livro.estado,
                status: this.livro.status
            })
                .then(reponse => {})
                .catch(e => {
                    console.log('Erro ao salvar: '+e)
                    this.isSomethingWrong = true
                })

                this.redirect()
        },

        // edita os dados de um livro da base de dados
        editar() {
            http.put('/api/library/livros/'+this.$route.params.id, {
                titulo: this.livro.titulo,
                autor: this.livro.autor,
                numeropaginas: this.livro.numeropaginas,
                estado: this.livro.estado,
                status: this.livro.status
            })
                .then((reponse) => {})
                .catch((e) => {
                    console.log('Erro ao editar: '+e)
                    this.isSomethingWrong = true
                })

                this.redirect()
        },

        // determina qual operacao ira ocorrer apos submeter o preenchimento do cadastro
        // de acordo com a operacao em rota
        submitActions() {
            if(this.$route.params.operacao == 'editar') {
                this.editar()
            }
            else {
                this.salvar()
            }
        },

        // apos a operacao redirecionar para a pagina de listagem
        redirect() {
            this.$router.push('/lista')
        },

        // permite que um campo apenas seja escrito caracteres numericos
        isNumberKey(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();
            } 
            else {
                return true;
            }
        },

        // permite que um campo apenas seja escrito caracteres nao numericos 
        // e espacos em branco
        isLetterKey(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && charCode != 32 && (charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122) {
                evt.preventDefault();
            } 
            else {
                return true;
            }
        }
    },
    mounted(){

        // coleta o id do livro a ser editado
        // e preenche os campos com os dados desse livro
        if(this.$route.params.operacao == 'editar') {
            http.get('/api/library/livros/'+this.$route.params.id)
            .then(response => {
                let arr = response.data
                this.livro = arr[0]
            })
            .catch(e => {
                console.log(e)
            })
        }
        else{
           this.$route.params.operacao = 'cadastrar' 
        }
    },
}
</script>

<style scoped>

#principal{
    margin: 0 5%;
    text-align: center;
}

h1{
    font-size: 40px;
    text-transform: uppercase; 
}

.form-intern-div{
    margin: 27px 0;
}

label{
    text-align: left;
    font-size: 20px;
}

input{
    line-height: 30px;
}

input, select{
    width: 50%;
    border-radius: 5px;
}

#submit{
    color: white;
    background-color: midnightblue;
    margin-top: 15px;
    text-transform: uppercase;
}

#error-msg{
    color: white;
    background-color: red;
    border-radius: 90px;
    margin: auto;
}
</style>