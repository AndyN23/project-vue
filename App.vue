<template>
  <div class="wrapper" >
    <router-view></router-view>
    <login-conf></login-conf>
    <header-conf></header-conf>
    <main-conf></main-conf>
  </div> 



</template>

<script>
import HeaderConf from '@/components/HeaderConf';
import MainConf from '@/components/MainConf';
import LoginConf from '@/components/LoginConf';

  export default {
    components:{
      HeaderConf,
      MainConf,
      LoginConf
    },
    data() {
      return{
        groupVisible: true,
      }
    }
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  *,
  *:after,
  *:before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all .3s ease;
    font-family: Arial, sans-serif;
  }

  :root{
    --color-white: #fff;
    --color-dark-grey: #272e3a;
    --color-grey: #38404d;
    --color-light-grey: #abb2bc;
    --color-yellow: #eeba30;
    --color-blue: #12222e;
  }

  body, html {
    font-family: 'Roboto', sans-serif;
    color: var(--color-white);
    font-size: 16px;
    height: 100%;
  }

  ul{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: var(--color-white);
  }

  input{
    outline: none;
    border-radius: 12px;
  }

  .hidden{
    display: none;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .wrapper{
    width: 100%;
    min-width: 900px;
    min-height: 100%;
    height: 100%;
    background-color: var(--color-dark-grey);
    position: relative;

    &__block{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
}
.dialog__input{
  max-width: 450px;
  width: 100%;
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
