<template>
    <div class="container">
            <content-group v-if="currentEl==1"
            class="group__list"></content-group> 

        <content-users
            v-else-if="currentEl==2">
        </content-users> 
        
        <content-status
            v-else-if="currentEl==3">
        </content-status>

        <content-settings v-else></content-settings>

        <content-version></content-version>
    </div>
</template>

<script>
import ContentGroup from "@/components/ContentGroup";
import ContentStatus from "@/components/ContentStatus";
import ContentUsers from "@/components/ContentUsers";
import ContentSettings from "@/components/ContentSettings";

import { emitter } from "@/event-bus.js";

import ContentVersion from '@/components/ContentVersion';
    export default {
        name: 'container-conf',
        components: {
            ContentGroup,
            ContentVersion,
            ContentStatus,
            ContentUsers,
            ContentSettings,
        },
        data(){
            return{
                currentEl: localStorage.getItem('current'),
            }
        },
        created(){
            //console.log("container-conf", 1)
            //localStorage.setItem('current', 3);
            emitter.on('show-group', (a) => this.currentEl = a);
            emitter.on('show-user', (a) => this.currentEl = a);
            emitter.on('show-status', (a) => this.currentEl = a);
            emitter.on('show-settings', (a) => this.currentEl = a);

        },
    }
</script>

<style lang="scss" scoped>

    .container{
        background-color: var(--color-grey);
        padding: 0px ;
        width: 100%;
        display: flex;
    }

    .group__list{
        height: 100%;
    }


@media screen and (max-width: 1101px){
    .content {
        padding: 40px 40px;
    }
    .table{
        font-size: 12px;
    }
}
</style>