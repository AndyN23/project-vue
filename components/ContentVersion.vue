<template>
    <p class="content__version">
        {{version}}
    </p> 
</template>

<script>
    export default {
        name: 'content-version',
        data(){
            return{
                version: 'Confer-5.4'
            }
        }
    }
</script>

<style lang="scss" scoped>
.content__version{
    font-size: 12px;
    text-align: end;
    bottom: 50px;
    right: 50px;
    position: fixed;
}
</style>