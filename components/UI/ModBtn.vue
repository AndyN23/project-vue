<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'mod-btn'
    }
</script>

<style lang="scss">

button{
    padding: 14px 40px;
    background-color: var(--color-dark-grey);
    border: 1.5px solid var(--color-yellow);
    margin: 20px 0 10px;
    // min-width: 260px;
    border-radius: 20px;
    color: var(--color-yellow);
    font-size: 16px;
    line-height: 20px;

    &:hover{
        background-color: var(--color-yellow);
        color: var(--color-dark-grey);
    }
}
</style>