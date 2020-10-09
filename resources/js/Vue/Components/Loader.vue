<template>
    <transition name="fade">
        <div class="vue-loading" v-if="loading" :style="css_styles">
        <span>
            <div class="lds-ripple"><div></div><div></div></div>
            <span class="message">{{message}}</span>
        </span>
        </div>
    </transition>

</template>

<script>
    export default {
        props: {
            loading: {
                default: true,
                type: Boolean
            },
            message: {
                default: 'Loading...',
                type: String
            },
            css_styles: {
                default: '',
                type: String
            },
            color: {
                default: '#164C98',
                type: String
            }
        },
    }
</script>

<style scoped lang="scss">
    .vue-loading {
        background-color: rgba(#fff, 0.3);
        position: fixed;
        backdrop-filter: blur(34px);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100vh;
        opacity: 1;
        z-index: 10000;
    }

    .message {
        color: #fff;
        font-weight: 500;
    }

    .vue-loading > span {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: -50px;
        text-align: center;
    }
    .fade-enter-active {
        transition: none;
    }
    .fade-leave-active {
        transition: opacity .6s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .lds-ripple {
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: auto;
        margin-bottom: 10px;
    }

    .lds-ripple div {
        position: absolute;
        border: 4px solid #FFFFFF;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }

</style>
