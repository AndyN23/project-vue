<template>
    <div class="content">
        <h2 class="content__title">Настройки</h2>
        <div class="content__info">
        </div>

        <div class="settings">
            <div class="settings__total settings__block">
                <div class="ping">
                    <p class="settings__name">Пинг и трассировка</p>
                    <div class="ping__request">
                        <input-conf 
                            v-model="ipAddress"
                            @input="enterIP($event)"
                            placeholder="IP address"
                            type="text" 
                            id="ip" 
                            class="input ping__input">
                        </input-conf>
                    
                        <button 
                            class="ping__button"
                            :class= "{active: ipChange}"
                            @click="pingClick">
                                Ping
                        </button>
                        <button 
                            class="ping__button trace"
                            :class= "{active: ipChange}"
                            @click="tracerouteClick">
                                Traceroute
                        </button>
                    </div>

                    <div class="ping__text" v-html="pingText">
                    </div>
                </div>

                <div class="settings__total-bottom">
                    <div class="dump">
                        <p class="settings__name">TCP dump</p>
                        <div class="dump__request">

                            <input-conf 
                                v-model="countDump"
                                @input="enterCount($event)"
                                placeholder="Количество"
                                type="text" 
                                id="countDump" 
                                class="input dump__input">
                            </input-conf>
                    
                            <button 
                                class="dump__button ping__button"
                                :class= "{active: isDump}"
                                @click="dumpClick">
                                    TCP dump
                            </button>

                            <a
                                href="#"
                                class="dump__button dump__button-save"
                                :class= "{active: isActiveDump}"
                                @click.prevent="downloadTcpDump()"
                                download="">
                                    Скачать
                            </a>
                        </div>
                    </div>

                    <div class="database">
                        <p class="settings__name">База данных</p>
                        <div class="database__request">
                            <a
                                href="#"
                                class="database__button download"
                                @click.prevent="downloadDb(item)"
                                download="">
                                    Скачать БД
                            </a>
                            <div class="database__upload">
                                <label>
                                    
                                    <input 
                                        type="file" 
                                        id="file" 
                                        class="database__upload-file" 
                                        ref="file" 
                                        v-on:change="handleFileUpload($event)"/>
                                </label>
                                <button 
                                    class="database__button upload" 
                                    @click="uploadDb()" 
                                    :class= "{active: isActiveUploadDB}"
                                    >Загрузить БД
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>

            </div>

            <div class="settings__system settings__block">
                <div class="net">
                    <p class="settings__name settings__name-net">Настройка сети</p>

                    <select v-model="selected" class="net__select" @change="doSelectNet($event)">
                        <option disabled value="">Выберите один из вариантов</option>
                        <option 
                            v-for="net in nets" 
                            :key="net.id"
                            >
                            {{net.name}}
                        </option>
                    </select>
                    <label for="netIP">ip</label>
                    <input-conf 
                        v-model="ip"             
                        type="text" 
                        id="netIP" 
                        class="input net__input"
                        :value="net.ip"
                        @change="changeNet($event)">
                    </input-conf>
                    <label for="netMask">netmask</label>
                    <input-conf 
                        v-model="netmask"                       
                        type="text" 
                        id="netMask" 
                        class="input net__input"
                        :value="net.netmask"
                        @change="changeNet($event)">
                    </input-conf>
                    <label for="broadcast">broadcast</label>
                    <input-conf 
                        v-model="broadcast"
                        type="text" 
                        id="broadcast" 
                        class="input net__input"
                        :value="net.broadcast"
                        @change="changeNet($event)">
                    </input-conf>
                    <label for="gateway">gateway</label>
                    <input-conf 
                        v-model="gateway"
                        type="text" 
                        id="gateway" 
                        class="input net__input"
                        :value="net.gateway"
                        @change="changeNet($event)">
                    </input-conf>

                    <button 
                        class="ping__button" 
                        :class= "{active: netInputChange}"
                        @click="netChange">
                            Изменить
                    </button>
                </div>

                <div class="server">
                    <p class="settings__name settings__name-net">Настройка сервера</p>
                    <div class="server__buttons">
                        <button class="server__btn ping__button active" @click="serverReboot">Перезагрузка</button>
                        <button class="server__btn ping__button active" @click="serverOff">Отключение</button>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="window__help help" :class= "{active: isHelp}">
            <p class="help__text db" :class= "{active: isHelpDb}"> <span></span>  База данных загружена</p>
            <p class="help__text net" :class= "{active: isHelpNet}"> <span></span> Настройки сети изменены</p>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { emitter } from "@/event-bus.js";

    export default {
        name: 'content-settings',
        data(){
            return{
                addDialogVisible: false,
                editDialogVisible: false,
                pingText: '',
                ipAddress: '',
                countDump: '',
                file: '',
                selected: '',
                nets: [],
                net: {
                    ip: '',
                    netmask: '',
                    broadcast: '',
                    gateway: '',
                },

                ipChange: false,
                isDump: false,
                isActiveDump: false,
                isActiveUploadDB: false,
                netInputChange: false,

                isHelp: false,
                isHelpDb: false,
                isHelpNet: false,
            }
        },
        mounted() {
            const e =  (args) => {               
                if (args === 4) {
                    var that = this
                    axios.get('/net')
                    .then(function(response) {
                        that.nets = response.data.msg
                    })
                    .catch(function(error) {
                        console.log('net-error', error)
                    })
                }
            };

            e(4);

            emitter.on('show-settings', e);
        },
        methods: { 
            enterIP(event){
                if (event.target.value != ''){
                    this.ipChange =  true
                } else{
                    this.ipChange =  false
                }
            },

            changeNet(){
                this.netInputChange = true;
            },

            enterCount(event){
                if (event.target.value != ''){
                    this.isDump =  true
                } else{
                    this.isDump =  false
                }
            },

            doSelectNet(e) {
                this.net = this.nets[e.target.selectedIndex -1]
            },

            replaceTr(data) {
                return data.replace(new RegExp('\r?\n','g'), '<br />');
            },

            pingClick(){
                const that = this
                that.pingText = '';

                if(this.ipAddress != 0){
                    axios.post(`/ping`, {
                        ip: that.ipAddress,
                        count: '3',
                    })
                    .then((response) => {
                        that.pingText = that.replaceTr(response.data.msg);
                    })
                    .catch((error) => {
                        console.log('ping-error', error)
                        that.pingText = error;
                    })
                }
                
            },

            tracerouteClick(){
                const that = this
                that.pingText = '';

                if(this.ipAddress != 0){
                    axios.post(`/traceroute`, {
                        ip: that.ipAddress
                    })
                    .then((response)=>{
                        that.pingText = that.replaceTr(response.data.msg);
                    })
                    .catch((error) => {
                        console.log('trace-error', error)
                        that.pingText = error;
                    })
                }
            },

            dumpClick(){
                const that = this
                axios.post(`/tcpdump`, {
                    count: that.countDump
                })
                .then((response)=>{
                    that.isActiveDump = true
                })
                .catch((error) => {
                    that.isActiveDump = false;
                })
            },

            downloadTcpDump () {    
                if(this.isActiveDump = true) {
                    axios.get('/tcpdump', { responseType: 'blob' })      
                    .then(response => {        
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'tcpdump.txt');
                        document.body.appendChild(link);
                        link.click();  
                    }).catch(console.error)  
                }
            },

            downloadDb(){
                axios.get('/db', { responseType: 'blob' })      
                .then(response => {        
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'extensions.sqlite3');
                    document.body.appendChild(link);
                    link.click();  
                }).catch(console.error)  
            },

            uploadDb(){
                let formData = new FormData();
                formData.append('file', this.file);
                const that = this
                axios.post( '/db',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    ).then(function(){
                    console.log('SUCCESS!');

                        setTimeout(() => {
                            that.isHelp = true,
                            that.isHelpDb = true
                        }, 3000);
                    })
                    .catch(function(){
                    console.log('FAIL!');
                    });
            },

            handleFileUpload(event){    

                this.file = this.$refs.file.files[0];

                if (event.target.value != ''){
                    this.isActiveUploadDB =  true
                } else{
                    this.isActiveUploadDB =  false
                }
            },

            netChange(index){
                var that = this
                axios.put('/net', this.net)
                .then(function(response) {
                    that.nets = response.data.msg
                    const index = this.nets.findIndex((net, index, array) => net.id === this.id);
                    this.nets[index] = net;

                    setTimeout(() => {
                        that.isHelp = true,
                        that.isHelpNet = true
                        }, 3000);
                })
                .catch(function(error) {
                    console.log('net-error', error)
                })
            },

            serverReboot(){
                axios.post('/reboot')
                .then((response)=>{
                    console.log(response)
                })
                .catch((error) => {
                    console.log('reboot-click', error);
                })

            },
            serverOff(){
                axios.post('/stop')
                .then((response)=>{
                    console.log(response)
                })
                .catch((error) => {
                    console.log('stop-click', error);
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

.settings{
    display: flex;
    align-items: center;
    justify-content: center;

    &__block{
        padding: 30px;
        border: 1px solid rgba(128, 128, 128, 0.568);
    }

    &__total{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        border-radius: 4px 0px 0px 4px;
    }

    &__system{
        max-width: 350px;
        width: 100%;
        height: 100%;
        border-radius: 0px 4px 4px 0px;
        display: flex;
        flex-direction: column;
    }

    &__name{
        font-size: 14px;
        color: #cecccc;
        position: relative;
        margin-bottom: 5px;

        &:after{
            content: '';
            position: absolute;
            width: 520px;
            height: 1px;
            background-color: hsla(0,0%,50.2%,.685);
            bottom: 1px;
            right: 0;
        }

        &-net{
            &:after{
                content:'';
                width: 0;
                height: 0;
            }
        }
    }
}

.ping{
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    height: 100%;

    &__request{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__button{
        padding: 10px 30px;
        border-radius: 8px;
        border: 1px solid var(--color-dark-grey);
        color: var(--color-light-grey);
        background-color: var(--color-dark-grey);
        cursor: not-allowed;
        max-width: 350px;
        margin: 10px 0px;
        font-size: 15px;

        &:hover{
            border: 1px solid var(--color-dark-grey);
            color: var(--color-light-grey);
            background-color: var(--color-dark-grey);
        }

        &.active{
            border: 1px solid var(--color-yellow);
            color: var(--color-dark-grey);
            background-color: var(--color-yellow);
            cursor: pointer;
        }

        // &-save{
        //     margin-left: 50px;
        //     background-color: #6b6b6b69;
        //     cursor: not-allowed;
        //     color: var(--color-dark-grey);
        //     max-width: 200px;
        //     border: none;
        //     border-radius: 8px;
        //     padding: 14px;

        //     &.active{
                
        //         cursor: pointer;
        //         background-color: #209920;

        //         &:hover{
        //             background-color: #209920;
        //         }
        //     }

        //     &:hover{
        //         background-color: #6b6b6b69;
        //     }
        // }

    }

    &__text{
        width: 680px;
        background-color: #e7e7e72d;
        border-radius: 6px;
        padding: 20px 20px;
        font-size: 14px;
        height: 100%;
        min-height: 120px;
}

    &__input{
        margin-right: 20px;
        margin-bottom: 5px;
        min-width: 350px;
        height: 45px;
        font-size: 14px;
    }
}

.dump{
    margin-bottom: 20px;

    &__request{
        display: flex;
        margin-bottom: 20px;
        align-items: center;
    }
    &__button{
        padding: 10px 30px;
        border-radius: 8px;
        border: 1px solid var(--color-dark-grey);
        color: var(--color-light-grey);
        background-color: var(--color-dark-grey);
        cursor: not-allowed;
        max-width: 350px;
        margin: 10px 0px;
        font-size: 15px;

        &:hover{
            border: 1px solid var(--color-dark-grey);
            color: var(--color-light-grey);
            background-color: var(--color-dark-grey);
        }

        &.active{
            border: 1px solid var(--color-yellow);
            color: var(--color-dark-grey);
            background-color: var(--color-yellow);
            cursor: pointer;
        }


        &-save{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 20px;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 15px;
            border: 1px solid var(--color-dark-grey);
            color: var(--color-light-grey);
            background-color: var(--color-dark-grey);
            cursor: not-allowed;

            &:hover{
                border: 1px solid var(--color-dark-grey);
                color: var(--color-light-grey);
                background-color: var(--color-dark-grey);
            }

            &.active{
                background-color: #176813;
                border: 1px solid #176813;
                color: var(--color-white);
                cursor: pointer;

                &:hover{
                    background-color: #176813;
                    border: 1px solid #176813;
                    color: var(--color-white);
                    cursor: pointer;
                }
            }
        }
    }

    &__input{
        height: 45px;
        max-width: 100px;
        width: 100%;
        margin: 0px 20px 0px 0px;
        font-size: 14px;
    }
}

.database{
    display: flex;
    flex-direction: column;

    &__request{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 30px;
        border-radius: 8px;
        font-size: 15px;
        border: 1px solid var(--color-dark-grey);
        background-color: var(--color-dark-grey);

        &.download{
            max-width: 180px;
            width: 100%;
            height: 45px;
            margin: 20px 0px 0px;
            background-color: #176813;
        }
        &.upload{
            max-width: 220px;
            width: 100%;
            height: 45px;
            margin: 18px 0px 0px;
            color: var(--color-light-grey);
            cursor: not-allowed;

            &:hover{
                border: 1px solid var(--color-dark-grey);
                color: var(--color-light-grey);
                background-color: var(--color-dark-grey);
            }       


            &.active{
                background-color: var(--color-yellow);
                color: var(--color-dark-grey);
                cursor: pointer;
            }
        }
    }

    &__upload{
        display: flex;


        &-file{
            max-width: 200px;
            font-size: 12px;
            width: 100%;
            margin:17px 15px 0px;
            height: 45px;
            padding: 8px;
        }
        
    }

}

.net{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    &__input{
        height: 35px;
        margin-bottom: 12px;
        font-size: 14px;
    }

    &__select{
        width: 100%;
        max-width: 220px;
        height: 25px;
        margin: 13px 0px;
    }

    label{
        font-size: 12px;
        width: 100%;
        color: #cecccc;
        margin-left: 27%;
    }
}

.server{
    text-align: center;
    margin-top: 20px;

    &__buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    &__btn{
        padding: 10px 12px;
        font-size: 14px;
    }
}

.help{
    display: none;
    width: 0;
    height: 0;

    &.active{
        display: flex;
        width: 300px;
        height: 150px;
        background-color: var(--color-dark-grey);
        align-items: center;
        justify-content: center;
        font-size: 14px;

        position: absolute;
        bottom: 30px;
        right: 30px;

        .help__text{
            display: none;

            &.active{
                display: flex;  

                span{
                    display: block;
                    height: 14px;
                    width: 14px;
                    background-color: #129912;
                    border-radius: 50%;
                    margin: 0px 7px;
                }
            }
        }
    }
}

</style>
