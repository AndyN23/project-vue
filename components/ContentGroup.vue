<template>

    <nav class="navbar">
        <div class="navbar__list">
            <div 
                v-for="(group, index) in groups" 
                :key="group.id"
                @click="showGroupVisible(index)"
                class="navbar__item">
                <div>{{group.name}}</div>
                <div class="navbar__item-btns">
                    <a 
                        href="#" 
                        class="navbar__item-btn edit"
                        @click="editNavItem(index)"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M22.9 1.1c-1.4-1.4-3.7-1.4-5.1 0L1.5 17.4c-1 .9-1.5 2.2-1.5 3.5V23c0 .6.4 1 1 1h2.1c1.3 0 2.6-.5 3.5-1.5L22.9 6.3c1.4-1.4 1.4-3.7 0-5.2zm-17.7 20c-.6.6-1.4.9-2.1.9H2v-1.1c0-.8.3-1.6.9-2.1L15.2 6.5l2.3 2.3L5.2 21.1zM21.4 4.9l-2.5 2.5-2.3-2.3 2.5-2.5c.6-.6 1.7-.6 2.3 0 .7.6.7 1.6 0 2.3z"/>
                        </svg>
                    </a>
                    <a 
                        href="#" 
                        class="navbar__item-btn delete"
                        @click="deleteNavItem(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M23.7.3c-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L12 13.4l10.3 10.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13.4 12 23.7 1.7c.4-.4.4-1 0-1.4z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <a 
            href="#" 
            class="navbar__button"
            @click="showAddNavDialog">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.7.3c-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L12 13.4l10.3 10.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13.4 12 23.7 1.7c.4-.4.4-1 0-1.4z"/></svg>
        </a>

        <mod-dialog v-model:show = "addNavDialogVisible" class="dialog">
            <h3 class="dialog__title">Добавить группу</h3>

            <label for="name">Название группы</label>
            <input-conf 
                v-model="name"
                id="name" 
                class="input dialog__input">
            </input-conf>

            <label for="in_num">Добавление</label>
            <input-conf 
                v-model="in_num"
                id="in_num" 
                class="input dialog__input" 
                pattern="[0-9]{10}">
            </input-conf>

            <label for="out_num">Отбой</label>
            <input-conf 
                v-model="out_num"
                id="out_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <label for="beg_add_user_num">Добавление пользователя</label>
            <input-conf 
                v-model="beg_add_user_num"
                id="beg_add_user_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <label for="end_add_user_num">Отбой добавления пользователя</label>
            <input-conf 
                v-model="end_add_user_num"
                id="end_add_user_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <mod-btn 
                class="button dialog__btn"
                @click="createNavItem">
                Создать
            </mod-btn>
        </mod-dialog>

        <mod-dialog v-model:show = "editNavDialogVisible" class="dialog">
            <h3 class="dialog__title">Редактировать группу</h3>

            <label for="name">Название группы</label>
            <input-conf 
                v-model="name"
                id="name" 
                class="input dialog__input">
            </input-conf>

            <label for="in_num">Добавление</label>
            <input-conf 
                v-model="in_num"
                id="in_num" 
                class="input dialog__input" 
                pattern="[0-9]{10}">
            </input-conf>

            <label for="out_num">Отбой</label>
            <input-conf 
                v-model="out_num"
                id="out_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <label for="beg_add_user_num">Добавление пользователя</label>
            <input-conf 
                v-model="beg_add_user_num"
                id="beg_add_user_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <label for="end_add_user_num">Отбой добавления пользователя</label>
            <input-conf 
                v-model="end_add_user_num"
                id="end_add_user_num" 
                class="input dialog__input"
                pattern="[0-9]{10}">
            </input-conf>

            <mod-btn 
                class="button dialog__btn"
                @click="closeEditNavDialog">
                Редактировать
            </mod-btn>
        </mod-dialog>

    </nav>

    <div 
        class="content"  
        v-show="groupVisible">

        <h2 class="content__title">Группа {{current_group.name}}</h2>
        <div class="content__info">
            <p class="content__info-block">
                Номер вызова: <span>{{current_group.in_num}}</span>
            </p>
            <p class="content__info-block">
                Номер отбоя: <span>{{current_group.out_num}}</span>
            </p>
            <p class="content__info-block">
                Номер добавления пользователя: <span>{{current_group.beg_add_user_num}}</span>
            </p>
            <p class="content__info-block">
                Номер отбоя добавления пользователя: <span>{{current_group.end_add_user_num}}</span>
            </p>
        </div>

        <div class="table">
            <div class="table__head">
                <ul class="table__head-list">
                    <li>
                        <p>Номер добавления</p>
                    </li>
                    <li>
                        <p>Номер отбоя</p>
                    </li>
                    <li>
                        <p>Администратор</p>
                    </li>
                    <li>
                        <p>По умолчанию</p>
                    </li>
                    <li>
                        <p>Описание</p>
                    </li>
                </ul>
                <div class="table__head-btns">
                    <a href="#" class="table__head-btn deactive"> 

                    </a>
                    <a 
                        href="#" 
                        class="table__head-btn"
                        @click="showAddDialog">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M23.7.3c-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L12 13.4l10.3 10.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13.4 12 23.7 1.7c.4-.4.4-1 0-1.4z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="table__body">
                <ul class="table__body-list">
                    <li class="table__body-item" v-for="(autodial, index) in autodials" :key="autodial.room_id">
                        <ul class="table__body-line" >
                            <li>
                                {{autodial.add_num}}
                            </li>
                            <li>
                                {{autodial.del_num}}
                            </li>
                            <li>
                                {{autodial.is_admin}}
                            </li>
                            <li>
                                {{autodial.is_def}}
                            </li>
                            <li>
                                {{autodial.desc}}
                            </li>
                        </ul>
                        <div class="table__head-btns">
                            <a href="#" class="table__head-btn " @click="editListItem(index)"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.9 1.1c-1.4-1.4-3.7-1.4-5.1 0L1.5 17.4c-1 .9-1.5 2.2-1.5 3.5V23c0 .6.4 1 1 1h2.1c1.3 0 2.6-.5 3.5-1.5L22.9 6.3c1.4-1.4 1.4-3.7 0-5.2zm-17.7 20c-.6.6-1.4.9-2.1.9H2v-1.1c0-.8.3-1.6.9-2.1L15.2 6.5l2.3 2.3L5.2 21.1zM21.4 4.9l-2.5 2.5-2.3-2.3 2.5-2.5c.6-.6 1.7-.6 2.3 0 .7.6.7 1.6 0 2.3z" />
                                </svg>
                            </a>
                            <a href="#" class="table__head-btn" @click="deleteListItem(index)">
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
            <h3 class="dialog__title">Создать автодозвон</h3>

            <label for="prefix">Prefix</label>
            <input-conf 
                v-model="prefix"
                type="text" 
                id="prefix" 
                class="input dialog__input">
            </input-conf>

            <label for="add_num">Номер добавления</label>
            <input-conf 
                v-model="add_num"
                type="text" 
                id="add_num"
                class="input dialog__input">
            </input-conf>

            <label for="del_num">Номер отбоя</label>
            <input-conf 
                v-model="del_num"
                type="text" 
                id="del_num"
                class="input dialog__input">
            </input-conf>

            <div class="dialog__checkboxes">
                <div class="checkbox__admin checkbox">
                    <label for="checkbox">Администратор
                        <input type="checkbox" id="checkbox" class="checkbox__input" v-model="is_admin" :true-value="admin" :false-value="none">
                        <span class="checkbox__span"></span>
                    </label>
                </div> 
                <div class="checkbox__default checkbox">
                    <label >По умолчанию
                        <input type="checkbox" class="checkbox__input" v-model="is_def">
                        <span class="checkbox__span"></span>
                    </label>
                </div>
            </div>

            <label for="desc">Описание</label>
            <input-conf 
                v-model="desc"
                @input="desc = $event.target.value"
                type="text" 
                id="desc"
                maxlength="10"  
                class="input dialog__input">
            </input-conf>

            <mod-btn 
                class="button dialog__btn"
                @click="createTableItem">
                Создать
            </mod-btn>
        </mod-dialog>

        <mod-dialog v-model:show="editDialogVisible" class="dialog">
            <h3 class="dialog__title">Редактировать автодозвон</h3>

            <label for="prefix">Prefix</label>
            <input-conf 
                :value="prefix"
                @input="prefix = $event.target.value"
                type="text" 
                id="prefix" 
                class="input dialog__input">
            </input-conf>

            <label for="add_num">Номер добавления</label>
            <input-conf 
                v-model="add_num"
                type="text" 
                id="add_num"
                maxlength="10" 
                class="input dialog__input">
            </input-conf>

            <label for="del_num">Номер отбоя</label>
            <input-conf 
                v-model="del_num"
                type="text" 
                id="del_num"
                class="input dialog__input">
            </input-conf>

            <div class="dialog__checkboxes">
                <div class="checkbox__admin checkbox">
                    <label for="checkbox">Администратор
                        <input 
                            type="checkbox" 
                            id="checkbox" 
                            class="checkbox__input" 
                            v-model="is_admin">
                        <span class="checkbox__span"></span>
                    </label>
                </div> 
                <div class="checkbox__default checkbox">
                    <label for="checkbox__def">По умолчанию
                        <input 
                            type="checkbox" 
                            class="checkbox__input"
                            id="checkbox__def" 
                            v-model="is_def">
                        <span class="checkbox__span"></span>
                    </label>
                </div>
            </div>

            <label for="desc">Описание</label>
            <input-conf
                :value="desc"
                @input="desc = $event.target.value"
                type="text" 
                id="desc"
                maxlength="10"  
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
import { emitter } from "@/event-bus.js";
import axios from 'axios';

    export default {
        name: 'content-group', 
        data() {
            return{
                admin: true,
                none:false,
                is_admin: false,
                is_def: false,
                group: {
                    id: "",
                    name: "",
                    in_num: "",
                    out_num: "",
                    beg_add_user_num: "",
                    end_add_user_num: "",

                },
                groups:[],
                current_group: {"ok": "ob"},
                autodial: {
                    room_id: '',
                    prefix: '',
                    add_num: '',
                    del_num: '',
                    is_admin: '',
                    is_def: '',
                    desc: ''
                },
                autodials: [],
                room_id: '',
                groupVisible: false,
                addDialogVisible: false,
                addNavDialogVisible:false,
                editDialogVisible: false,
                editNavDialogVisible: false,
            }
        },
        mounted() {
            const e =  (args) => {               
                if (args === 1) {
                    var that = this
                    axios.get('/groups')
                    .then(function(response) {
                        that.groups = response.data
                    })
                    .catch(function(error) {
                        console.log('errrrorrr')
                    })
                }
            };

            e(1);

            emitter.on('show-group', e);
        },
        methods: {
            showGroupVisible(index){
                this.groupVisible = true;
                this.current_group = this.groups[index];

                const room_id = this.groups[index].id

                const that = this
                    axios.get(`/autodials/${room_id}`)
                    .then(function(response) {
                        that.autodials = response.data
                    })
                    .catch(function(error) {
                        console.log('errrrorrr')
                    })
            },
            showAddNavDialog() {
                this.addNavDialogVisible = true;
                this.name= '';
                this.in_num= '';
                this.out_num= '';
                this.beg_add_user_num= '';
                this.end_add_user_num= '';
            },
            showEditNavDialog(){
                this.editNavDialogVisible = true;
            },
            createNavItem(){
                const newItem = {
                    name: this.name,
                    in_num: this.in_num,
                    out_num: this.out_num,
                    beg_add_user_num: this.beg_add_user_num,
                    end_add_user_num: this.end_add_user_num,
                }


                if (newItem.name.trim() != '' && 
                    newItem.in_num.trim() != '' &&  
                    newItem.out_num.trim() != '' &&
                    newItem.beg_add_user_num.trim() != '' &&  
                    newItem.end_add_user_num.trim() != '')
                    {

                    const that = this
                    axios.post('/group', {
                        in_num: newItem.in_num
                        , out_num: newItem.out_num
                        , name: newItem.name
                        , beg_add_user_num: newItem.beg_add_user_num
                        , end_add_user_num: newItem.end_add_user_num

                    })
                    .then(function(response) {        
                        that.groups.push( {...newItem
                            , id: response.data.id
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.addDialogVisible = false;
                }
                
                this.name= '';
                this.in_num= '';
                this.out_num= '';
                this.beg_add_user_num= '';
                this.end_add_user_num= '';
                this.addNavDialogVisible = false;
            },
            editNavItem(index){
                const group = this.groups[index]
                const that = this

                axios.get(`/group/${group.id}`)
                    .then((response) => {
                        that.group = response.data;
                        
                        this.id = this.groups[index].id;
                        this.name = this.groups[index].name;
                        this.in_num = this.groups[index].in_num;
                        this.out_num = this.groups[index].out_num;
                        this.beg_add_user_num = this.groups[index].beg_add_user_num;
                        this.end_add_user_num = this.groups[index].end_add_user_num;
                        that.editNavDialogVisible = true;

                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            deleteNavItem(index){
                const group = this.groups[index]
                const that = this

                axios.delete(`/group/${group.id}`)
                    .then(() => {
                        that.groups.splice(index, 1);
                        that.current_group = {}
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            closeEditNavDialog(){
                const group = {
                    id: this.id,
                    name: this.name,
                    in_num: this.in_num,
                    out_num: this.out_num,
                    beg_add_user_num: this.beg_add_user_num,
                    end_add_user_num: this.end_add_user_num,
                }

                axios.put(`/group/${group.id}`, {
                    in_num: group.in_num,
                    out_num: group.out_num,
                    beg_add_user_num: group.beg_add_user_num,
                    end_add_user_num: group.end_add_user_num,
                    name: group.name
                })
                .then(()=>{
                    const index = this.groups.findIndex((group, index, array) => group.id === this.id);
                    this.groups[index] = group;
                    this.current_group = group;
                })

                
                this.name= '';
                this.in_num= '';
                this.out_num= '';
                this.beg_add_user_num= '';
                this.end_add_user_num= '';
                this.editNavDialogVisible = false;
            },



            showAddDialog(){
                this.addDialogVisible = true;

                this.autodial.is_admin = false;
                this.autodial.is_def = false;
            },
            showEditDialog(){
                this.editDialogVisible = true;
            },
            createTableItem(){
                const that = this;
                const room_id = this.current_group.id;

                const newAutodial = {
                    room_id: room_id,
                    id: this.id,
                    prefix: this.prefix,
                    add_num: this.add_num,
                    del_num: this.del_num,
                    is_admin: this.is_admin,
                    is_def: this.is_def,
                    desc: this.desc,
                }

                if (newAutodial.add_num.trim() != '' && 
                    newAutodial.del_num.trim() != '' )
                    {

                    const that = this
                    axios.post('/autodial', {
                        id: newAutodial.id,
                        prefix: newAutodial.prefix,
                        add_num: newAutodial.add_num,
                        del_num: newAutodial.del_num,
                        is_admin: newAutodial.is_admin,
                        is_def: newAutodial.is_def,
                        desc: newAutodial.desc,
                        room_id: newAutodial.room_id
                    })
                    .then((data) => {
                        const res = {...data}
                        newAutodial.id = res.data.id
                        that.autodials.push(newAutodial)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.addDialogVisible = false;
                }


                this.prefix= '';
                this.add_num= '';
                this.del_num= '';
                this.is_admin =  false;
                this.is_def = false;
                this.desc= '';
                this.addDialogVisible = false;
            },
            editListItem(index){
                const autodial = this.autodials[index]
                const that = this

                axios.get(`/autodial/${autodial.id}`)
                    .then((response) => {
                        that.autodial = response.data;
                        that.editDialogVisible = true;

                        this.id = this.autodials[index].id;
                        this.room_id = this.autodials[index].room_id;
                        this.prefix = this.autodials[index].prefix;
                        this.add_num = this.autodials[index].add_num;
                        this.del_num = this.autodials[index].del_num;
                        this.is_admin = this.autodials[index].is_admin;
                        this.is_def = this.autodials[index].is_def;
                        this.desc = this.autodials[index].desc;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            deleteListItem(index){
                const autodial = this.autodials[index]
                const that = this

                axios.delete(`/autodial/${autodial.id}`)
                    .then(() => {
                        that.autodials.splice(index, 1);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            closeEditDialog(){
                const autodial = {
                    id: this.id,
                    desc: this.desc,
                    is_def: this.is_def,
                    prefix: this.prefix,
                    room_id: this.room_id,
                    add_num: this.add_num,
                    del_num: this.del_num,
                    is_admin: this.is_admin,
                }

                axios.put(`/autodial/${autodial.id}`, {
                    id: autodial.id,
                    room_id: autodial.room_id,
                    prefix: autodial.prefix,
                    add_num: autodial.add_num,
                    del_num: autodial.del_num,
                    is_admin: autodial.is_admin,
                    is_def: autodial.is_def,
                    desc: autodial.desc,
                })
                .then(()=>{
                    const index = this.autodials.findIndex((autodial, index, array) => autodial.id === this.id);
                    this.autodials[index] = autodial;
                })
                
                this.prefix= '';
                this.room_id= '';
                this.add_num= '';
                this.del_num= '';
                this.is_admin= '';
                this.is_def= '';
                this.desc= '';

                this.editDialogVisible = false;
            }
        }
    }
</script>

<style lang="scss">


    .navbar{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        background-color: var(--color-dark-grey);
        box-shadow: inset 0px 2px 12px 0px var(--color-blue);

        &__button{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            padding: 14px;
            background-color: var(--color-blue);
            svg{
                fill: var(--color-white);
                transform: rotate(-45deg);
            }

            &:hover{
                background-color: var(--color-yellow);

                svg{
                    fill: var(--color-dark-grey);
                }
            }
        }

        &__list{
            width: 100%;
            padding: 20px 0px;
        }

        &__item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 10px;
            cursor: pointer;
            width: 100%;

            &:hover{
                background-color: var(--color-grey);
            }
        
            &-btns{
                display: flex;
            }

            &-btn{
                padding: 4px 8px;

                & svg{
                    width: 16px;
                    height: 16px;
                    fill: var(--color-light-grey);
                }

                &:hover{

                    & svg{
                        fill: var(--color-yellow);
                    }
                }

            }
        }
    }

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
            font-size: 13px;

            span{
                color: var(--color-yellow);
                font-weight: bold;
            }
        }
    }

    &__version{
        font-size: 12px;
        text-align: end;
        bottom: 50px;
        right: 50px;
        position: fixed;
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
            font-size: 10px;
            text-transform: uppercase;

            li{
                padding: 10px 0;
                background-color: var(--color-blue);
                overflow:hidden;
                display: flex;
                justify-content: center;
                align-items: center;
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

        &-list{
            display: flex;
            width: 100%;
            flex-direction: column;
        }

        &-item{
            margin-bottom: 6px;
            display: flex;
            width: 100%;
        }

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
            fill: var(--color-white);
        }
    }
}
</style>