<script>
import UserEntityBase from '@/components/UserEntityBase.vue';

export default {
    extends: UserEntityBase,

    name: 'userEntityClickable',
};
</script>

<style lang="scss" scoped>
@import '@/styles/select.scss';

.user-container {
    cursor: pointer;

    &:hover, &.arrow-hover {
        background-color: lighten(#42b942, 20);
    }
}
</style>
