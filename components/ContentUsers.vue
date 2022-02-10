<template>
    <div class="content">
        <h2 class="content__title">Пользователи</h2>
        <div class="content__info">

        </div>

        <div class="table users">
            <div class="table__head">
                <ul class="table__head-list">
                    <li>
                        <p>Имя пользователя</p>
                    </li>
                    <li>
                        <p>Пароль</p>
                    </li>
                </ul>
                <div class="table__head-btns">
                    <a href="#" class="table__head-btn deactive"> 
                    </a>


                    <a href="#" class="table__head-btn" @click="showAddDialog">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M23.7.3c-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L12 13.4l10.3 10.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13.4 12 23.7 1.7c.4-.4.4-1 0-1.4z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="table__body">
                <ul class="table__body-list">
                    <li class="table__body-item" v-for="(user, index) in allUsers" :key="user.id">
                        <ul class="table__body-line" >
                            <li>
                                {{user.name}}
                            </li>
                            <li>
                                {{user.password}}
                            </li>
                        </ul>
                        <div class="table__head-btns">
                            <a href="#" class="table__head-btn" @click="editUserItem(index)"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.9 1.1c-1.4-1.4-3.7-1.4-5.1 0L1.5 17.4c-1 .9-1.5 2.2-1.5 3.5V23c0 .6.4 1 1 1h2.1c1.3 0 2.6-.5 3.5-1.5L22.9 6.3c1.4-1.4 1.4-3.7 0-5.2zm-17.7 20c-.6.6-1.4.9-2.1.9H2v-1.1c0-.8.3-1.6.9-2.1L15.2 6.5l2.3 2.3L5.2 21.1zM21.4 4.9l-2.5 2.5-2.3-2.3 2.5-2.5c.6-.6 1.7-.6 2.3 0 .7.6.7 1.6 0 2.3z" />
                                </svg>
                            </a>
                            <a href="#" class="table__head-btn" @click="deleteUserItem(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M23.7.3c-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L12 13.4l10.3 10.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13.4 12 23.7 1.7c.4-.4.4-1 0-1.4z"/>
                                </svg>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <mod-dialog v-model:show="addDialogVisible" class="dialog">
            <h3 class="dialog__title">Создать пользователя </h3>

            <label for="name">Имя пользователя</label>
            <input-conf 
                v-model="name"
                type="text" 
                id="name" 
                class="input dialog__input">
            </input-conf>

            <label for="password">Пароль пользователя</label>
            <input-conf 
                v-model="password"
                type="text" 
                id="password"
                class="input dialog__input">
            </input-conf>

            <mod-btn 
                class="button dialog__btn"
                @click="createUserItem">
                Создать
            </mod-btn>
        </mod-dialog>

        <mod-dialog v-model:show="editDialogVisible" class="dialog">
            <h3 class="dialog__title">Редактировать пользователя</h3>

            <label for="name">Имя пользователя</label>
            <input-conf 
                v-model="name"
                type="text" 
                id="name" 
                class="input dialog__input">
            </input-conf>

            <label for="password">Пароль пользователя</label>
            <input-conf 
                v-model="password"
                type="text" 
                id="password"
                class="input dialog__input">
            </input-conf>

            <mod-btn 
                class="button dialog__btn"
                @click="closeEditDialog">
                Редактировать
            </mod-btn>
        </mod-dialog>

    </div>
</template>

<script>
import axios from 'axios';
import { emitter } from "@/event-bus.js";
    export default {
        name:'content-users',
        data() { 
            return{
                user: {
                    id: "",
                    name: "",
                    password: "",
                },
                allUsers: [],
                addDialogVisible: false,
                editDialogVisible: false,
            }
        },
        mounted() {
            const e =  (args) => {               
                if (args === 2) {
                    const that = this
                    axios.get('/users')
                    .then(function(response) {
                        that.allUsers = response.data
                    })
                    .catch(function(error) {
                        console.log('errrrorrr')
                    })
                }
            };

            e(2);

            emitter.on('show-user', e);

            // emitter.on('show-user', (args) => {
            //     // console.log(args)
            //     if (args === 2) {
            //         var that = this
            //         axios.get('/users')
            //         .then(function(response) {
            //             that.allUsers = response.data
            //         })
            //         .catch(function(error) {
            //             console.log('errrrorrr')
            //         })
            //     }
            // })
        },

        methods: {
            showAddDialog(){
                this.addDialogVisible = true;
            },
            showEditDialog(){
                this.editDialogVisible = true;
            },
            createUserItem(){
                const newUserItem = {
                    name: this.name,
                    password: this.password,
                }
                
                if (newUserItem.name.trim() != '' && 
                    newUserItem.password.trim() != '')
                    {   
                    
                    const that = this
                    axios.post('/user', {
                        name: newUserItem.name
                        , password: newUserItem.password
                    })
                    .then(function(response) {
                        that.allUsers.push({...newUserItem,
                        id: response.data.id})
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }else {
                    this.addDialogVisible = false;
                }

                this.name= '';
                this.password= '';

                this.addDialogVisible = false;
            },
            editUserItem(index){
                const user = this.allUsers[index]
                const that = this

                axios.get(`/user/${user.id}`)
                    .then((response) => {
                        that.user = response.data;
                        this.id = this.allUsers[index].id;
                        this.name = this.allUsers[index].name;
                        this.password = this.allUsers[index].password;

                        that.editDialogVisible = true;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            deleteUserItem(index){
                const user = this.allUsers[index]
                const that = this

                axios.delete(`/user/${user.id}`)
                    .then(() => {
                        that.allUsers.splice(index, 1);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            closeEditDialog(){
                const user = {
                    id: this.id,
                    name: this.name,
                    password: this.password,
                }

                axios.put(`/user/${user.id}`, {
                    id: user.id,
                    name: user.name,
                    password: user.password,
                })
                .then( () => {
                    const index = this.allUsers.findIndex((user, index, array) => user.id === this.id);
                    this.allUsers[index] = user;
                })

                this.name= '';
                this.password= '';
                this.editDialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    min-height: 80%;
    padding: 40px 80px;
    border-radius: 4px;
    display: flex;flex-direction: column;
    box-shadow: 0px 0px 5px 0px var(--color-light-grey);

    &__title{
        font-size: 20px;
        font-weight: 400;
        margin: 20px auto;
        text-transform: uppercase;
    }

    &__info{
        display: flex;
        margin: 10px 0 30px;

        &-block{
            margin-right: 50px;

            span{
                color: var(--color-yellow);
                font-weight: bold;
            }
        }
    }

    &__version{
        font-size: 12px;
        text-align: end;
        // margin-top: 200px;
        bottom: 50px;
        right: 50px;
        position: fixed;
    }
}

.table{
    display: flex;
    width: 100%;
    // max-width: 1100px;
    flex-direction: column;
    font-size: 14px;

    &__head{
        color: var(--color-white);
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        &-list{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 5px;
            text-align: center;
            width: 100%;

            li{
                padding: 10px 0;
                background-color: var(--color-blue);
                overflow:hidden;
            }
        }

        &-btns{
            margin: 0 6px;
            display: flex;
            justify-content: space-between;
        }

        &-btn{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            padding: 0 14px;
            background-color: var(--color-blue);
            margin: 0 6px 0px 0px;

            &:hover{
                background-color: var(--color-yellow);

                svg{
                    fill: var(--color-dark-grey);
                }
            }

            &.deactive{
                background-color: transparent;
                cursor: inherit;
            }
        }

        & svg{
            width: 14px;
            height: 14px;
            transform: rotate(-45deg);
            fill: var(--color-white);
        }
    }

    &__body{
        color: var(--color-white);
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        &-line{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 5px;
            text-align: center;
            width: 100%;
            color: var(--color-dark-grey);

            li{
                padding: 10px 0;
                background-color: var(--color-light-grey);
            }
        }

        & svg{
            width: 14px;
            height: 14px;
            // transform: rotate(-45deg);
            fill: var(--color-white);
        }

    }

    &.users{
        .table__head{

            &-list{
                grid-template-columns: 1fr 1fr;
            }
        }
        .table__body{

            &-line{
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    
    &.status{

        .table__head{

            &-list{
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .table__body{

            &-line{
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
}

</style>