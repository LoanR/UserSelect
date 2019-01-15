<template>
    <div class="user-container" :class="additionalClass" @click="sendClick">
        <img :src="user.avatar">
        <ul>
            <li>
                {{user.first_name}}
            </li>
            <li>
                <strong>{{user.last_name}}</strong>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'userEntityBase',

    props: ['user', 'additionalClass'],

    methods: {
        sendClick() {
            this.$emit('clickedUser', this.user);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/select.scss';
</style>
