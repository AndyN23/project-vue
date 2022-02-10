<template>
    <div
        class="dialog"
        v-if="show"
        @click="hideDialog"
        >
        <div class="dialog__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'mod-dialog',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            hideDialog(){
                this.$emit('update:show', false)
            }
        }
    }
</script>

<style lang="scss" >

.dialog{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(2, 2, 36, 0.5);
    position: fixed;
    display: flex;
    

    &__content{
        margin: auto;
        background-color: var(--color-dark-grey);
        border-radius: 8px;
        min-height: 300px;
        min-width: 400px;
        padding: 40px 40px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title{
        color: var(--color-yellow);
        margin-bottom: 30px;
    }

    label{
        font-size: 14px;
        color: var(--color-light-grey);
        left: 0;
        display: block;
    }

    &__checkboxes{
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .checkbox{
        display: flex;
        position: relative;
        padding-left: 35px;
        margin: 12px 0px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &:hover .checkbox__input ~.checkbox__span{
            background-color: var(--color-blue);
            cursor: pointer;
        }

        &__span{
            position: absolute;
            top: -6px;
            left: 0;
            height: 24px;
            width: 24px;
            border-radius: 6px;
            border: 2px solid var(--color-blue);
            background-color: transparent;

            &:hover{
                border: 2px solid var(--color-yellow);
            }

            &:after{
                content: "";
                position: absolute;
                width: 24px;
                height: 24px;
                top: 0;
                left: 0;
                z-index: 8;
                display: none;
            }
        }

        &__input{
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        input:checked {
                &~.checkbox__span:after{
                    display: block;
                    background-color: var(--color-yellow);
                    border-radius: 6px;
                    border: 2px solid var(--color-yellow);
                }
            }
    }
}
</style>