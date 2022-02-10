<template>
    <main class="main">
        <container-conf></container-conf>
    </main>
</template>

<script>
import ContainerConf from '@/components/ContainerConf';
    export default {
        components: {
            ContainerConf,
        },
        name: 'main-conf',
        props: ['activeEl'],
    }
</script>

<style lang="scss" scoped>

.main{
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-top: 110px;
}

</style>