<template>
    <input 
        type="text"
        maxlength="30"
        :value="modelValue"
        @input="updateInput">
</template>

<script>
    export default {
        name: 'input-conf',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style lang="scss" >

input{
    min-width: 200px ;
    font-size: 16px;
    line-height: 26px;
    padding: 5px 5px 5px 10px;
    background-color: transparent;
    color: var(--color-white);
    border: 1.5px solid var(--color-blue);
    border-radius: 8px;
    margin: 5px 0px 20px;

    &:focus{
        border: 1.5px solid var(--color-yellow);
    }

}

</style>