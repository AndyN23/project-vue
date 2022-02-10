<template>
    <div class="content">
        <h2 class="content__title">Статус</h2>
        <div class="content__info">

        </div>

        <div class="table status">
            <div class="table__head">
                <ul class="table__head-list">
                    <li>
                        <p>Номер</p>
                    </li>
                    <li>
                        <p>Пароль</p>
                    </li>
                    <li>
                        <p>IP адрес</p>
                    </li>
                    <li>
                        <p>Статус сервера</p>
                    </li>
                </ul>
                <div class="table__head-btns">
                    <a href="#" class="table__head-btn" @click="updateStatus"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M23 12c-.5 0-.9.4-1 .9-.5 5.5-5.3 9.6-10.8 9.1-2.4-.2-4.6-1.3-6.3-3h2.7c.6 0 1-.4 1-1s-.4-1-1-1h-4c-1.1 0-2 .9-2 2v4c0 .6.4 1 1 1s1-.4 1-1v-2.4c4.7 4.6 12.3 4.6 16.9-.1 1.9-2 3.1-4.6 3.4-7.3.2-.7-.3-1.1-.9-1.2.1 0 0 0 0 0zM21.3 0c-.6 0-1 .4-1 1v2.4C15.6-1.2 8-1.1 3.4 3.6 1.5 5.6.3 8.2 0 10.9c-.1.6.4 1 .9 1.1H1c.5 0 .9-.4 1-.9.5-5.5 5.3-9.5 10.8-9.1 2.4.2 4.6 1.3 6.3 3h-2.7c-.6 0-1 .4-1 1s.4 1 1 1h4c1.1 0 2-.9 2-2V1c-.1-.6-.5-1-1.1-1z"/>
                        </svg>
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
                    <li class="table__body-item" v-for="(extension, index) in allExtensions" :key="extension.id">
                        <ul class="table__body-line">
                            <li>
                                {{extension.num}}
                            </li>
                            <li>
                                {{extension.secret}}
                            </li>
                            <li>
                                <a 
                                    class="table__body-link"
                                    :href="extension.ipAddress">
                                    {{extension.ipAddress}}</a>
                            </li>
                            <li>
                                <div 
                                    class="status__ind"
                                    :class="{active: extension.status}"
                                ></div>
                            </li>
                        </ul>
                        <div class="table__head-btns">
                            <a href="#" class="table__head-btn " @click="editStatusItem(index)"> 
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
            <h3 class="dialog__title"> Создать пользователя </h3>

            <label for="num">Номер</label>
            <input-conf 
                :value="num"
                @input="num = $event.target.value"
                type="text" 
                id="num" 
                class="input dialog__input">
            </input-conf>

            <label for="secret">Пароль</label>
            <input-conf 
                :value="secret"
                @input="secret = $event.target.value"
                type="text" 
                id="secret"
                maxlength="10" 
                class="input dialog__input">
            </input-conf>

            <!-- <label for="ipAddress">IP адрес</label>
            <input-conf 
                :value="ipAddress"
                @input="ipAddress = $event.target.value"
                type="text" 
                id="ipAddress"
                maxlength="12" 
                class="input dialog__input">
            </input-conf> -->

            <mod-btn 
                class="button dialog__btn"
                @click="createStatusItem">
                Создать
            </mod-btn>
        </mod-dialog>

        <mod-dialog v-model:show="editDialogVisible" class="dialog">
            <h3 class="dialog__title">Редактировать </h3>

            <label for="num">Номер</label>
            <input-conf 
                :value="num"
                @input="num = $event.target.value"
                type="text" 
                id="num" 
                class="input dialog__input">
            </input-conf>

            <label for="secret">Пароль</label>
            <input-conf 
                :value="secret"
                @input="secret = $event.target.value"
                type="text" 
                id="secret"
                maxlength="10" 
                class="input dialog__input">
            </input-conf>

            <!-- <label for="ipAddress">IP адрес</label>
            <input-conf 
                v-model="ipAddress"
                type="text" 
                id="ipAddress"
                maxlength="12" 
                class="input dialog__input">
            </input-conf> -->


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
        name: 'content-status',
        data(){
            return{
                allExtensions:[],
                extension: {},
                addDialogVisible: false,
                editDialogVisible: false,
                pingText: '',
                ipAddress: '',
                ipPing: '',
            }
        },
        mounted() {
            const e =  (args) => {               
                if (args === 3) {
                    var that = this
                    axios.get('/extensions')
                    .then(function(response) {
                        that.allExtensions = response.data

                        axios.get('/status')
                        .then(function(response){
                            const arr = response.data

                            that.allExtensions.forEach(e => {
                                arr.forEach(a => {
                                    if(e.num === a.ObjectName){
                                        e["ipAddress"] = a.IPaddress
                                        e['status'] = a.IPaddress !== "-none-" 
                                    }    
                                })
                            });
                        })
                    })
                    .catch(function(error) {
                        console.log('extension-error', error)
                    })
                }
            };

            e(3);

            emitter.on('show-status', e);
        },
        methods: { 
            showAddDialog(){
                this.addDialogVisible = true;
            },
            showEditDialog(){
                this.editDialogVisible = true;
            },

            createStatusItem(){
                const newStatusItem = {
                    num: this.num,
                    secret: this.secret,
                    ipAddress: this.ipAddress,
                }

                if (newStatusItem.num.trim() != '' && 
                    newStatusItem.secret.trim() != '' )
                    {
                    
                    const that = this
                    axios.post('/extension', {
                        num: newStatusItem.num,
                        secret: newStatusItem.secret,
                        ipAddress: newStatusItem.ipAddress,
                        })
                    .then(function(response) {
                        that.allExtensions.push({...newStatusItem,
                        id: response.data.id});

                        // axios.get('/status')
                        //     .then((res)=>{
                        //         const arr = res.data
                        //         // console.log(res)
                        //         console.log(arr.id)
                        //         console.log(arr.newStatusItem.id)
                        //         // console.log(arr[arr.length])
                        //         // console.log(arr[arr.length - 1])
                        //     })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.addDialogVisible = false;
                }
                
                this.num= '';
                this.secret= '';

                this.addDialogVisible = false;
            },
            editStatusItem(index){
                const extension = this.allExtensions[index]
                const that = this

                axios.get(`/extensions/${extension.id}`)
                    .then((response) => {
                        that.extension = response.data;
                        this.id = this.allExtensions[index].id;
                        this.num = this.allExtensions[index].num;
                        this.secret = this.allExtensions[index].secret;

                        that.editDialogVisible = true;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            deleteUserItem(index){
                const extension = this.allExtensions[index]
                const that = this

                axios.delete(`/extension/${extension.id}`)
                    .then(() => {
                        that.allExtensions.splice(index, 1);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            closeEditDialog(){
                const extension = {
                    id: this.id,
                    num: this.num,
                    secret: this.secret,
                }

                axios.put(`/extension/${extension.id}`, {
                    id: extension.id,
                    num: extension.num,
                    secret: extension.secret,
                })
                .then( () => {
                    const index = this.allExtensions.findIndex((extension, index, array) => extension.id === this.id);
                    this.allExtensions[index] = extension;
                })

                this.num= '';
                this.secret= '';
                this.editDialogVisible = false;
            },

            updateStatus(){
                var that = this
                    axios.get('/extensions')
                    .then(function(response) {
                        that.allExtensions = response.data

                        axios.get('/status')
                        .then(function(response){
                            const arr = response.data

                            that.allExtensions.forEach(e => {
                                arr.forEach(a => {
                                    if(e.num === a.ObjectName){
                                        e["ipAddress"] = a.IPaddress
                                        e['status'] = a.IPaddress !== "-none-" 
                                    }    
                                })
                            });
                        })
                    })
                    .catch(function(error) {
                        console.log('extension-error', error)
                    })
            },
        },
    }
</script>

<style lang="scss" scopped>
    .content{
    width: 100%;
    min-height: 80%;
    margin: 0 auto;
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
}


.table{
    display: flex;
    width: 100%;
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
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        & svg{
            width: 14px;
            height: 14px;
            // transform: rotate(-45deg);
            fill: var(--color-white);
        }
    }
}

.table{

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

            &-link{
                color: rgb(30, 74, 184);
                text-decoration-line: underline;
                line-height: 20px;
                width: 80%;
            }
        }
    }
}

.status__ind{
    width: 20px;
    height: 20px;
    border: 4px solid;
    border-radius: 50%;
    border-color: #992020;

    &.active{
        border-color: #209920;
    }

    // &.deactive{
    //     border-color: #992020;
    // }
}

</style>