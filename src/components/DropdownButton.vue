<template>
    <button class="dropdown-button" @click="sendButtonClick">
        <div :class="openCloseIndicator"></div>
    </button>
</template>

<script>
export default {
    name: 'dropdownButton',

    props: ['dropped'],

    methods: {
        sendButtonClick() {
            this.$emit('dropdownClick');
        },
    },

    computed: {
        openCloseIndicator() {
            return 'arrow' + (this.dropped ? ' close' : ' open');
        },
    },
};
</script>

<style lang="scss" scoped>
.dropdown-button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
    width: 70px;
    border-left: 1px solid #42b942;

    color: inherit;
    font: inherit;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;

    .arrow {
        position: relative;
        width: 8px;
        height: 8px;
        transform: rotate(-45deg);
        transition: top 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .open {
        top: -6px;
        box-shadow: -3px 3px #42b942
    }

    .close {
        top: 6px;
        box-shadow: 3px -3px #42b942
    }
}
</style>
