<template>
    <ul class="users-list"
        @mouseover="resetArrowHover"
        @mouseout="authorizeArrowHover">
        <li v-for="(user, index) in users" :key="user.id">
            <user-entity-clickable-component
                :user="user"
                :additionalClass="{'arrow-hover': arrowHoveredItemIndex === index}"
                @clickedUser="clickedUser">
            </user-entity-clickable-component>
        </li>
    </ul>
</template>

<script>
import userEntityClickable from '@/components/UserEntityClickable.vue';

export default {
    name: 'dropdownContent',

    data() {
        return {
            arrowableUsers: true,
            arrowHoveredItemIndex: -1,
        };
    },

    components: {
        'user-entity-clickable-component': userEntityClickable,
    },

    methods: {
        clickedUser(user) {
            this.$emit('clickedUser', user);
            this.arrowableUsers = true;
        },

        resetArrowHover() {
            this.arrowableUsers = false;
            this.arrowHoveredItemIndex = -1;
        },

        authorizeArrowHover() {
            this.arrowableUsers = true;
        },

        arrowSelect(event) {
            switch (event.keyCode) {
            case 38:
                if (this.arrowableUsers) {
                    if (this.arrowHoveredItemIndex > 0) {
                        this.arrowHoveredItemIndex--;
                    } else {
                        this.arrowHoveredItemIndex = this.users.length - 1;
                    }
                }
                break;
            case 40:
                if (this.arrowableUsers) {
                    if (this.arrowHoveredItemIndex < this.users.length - 1) {
                        this.arrowHoveredItemIndex++;
                    } else {
                        this.arrowHoveredItemIndex = 0;
                    }
                }
                break;
            case 27:
                this.$emit('closeDropdown');
                this.arrowableUsers = true;
                this.arrowHoveredItemIndex = -1;
                break;
            case 13:
                if (this.arrowHoveredItemIndex > -1 && this.arrowHoveredItemIndex < this.users.length) {
                    this.clickedUser(this.users[this.arrowHoveredItemIndex]);
                    this.arrowHoveredItemIndex = -1;
                }
                break;
            default:
                break;
            }
        },
    },

    computed: {
        users() {
            return JSON.parse(localStorage.getItem('users'));
        },
    },

    mounted() {
        document.addEventListener('keyup', this.arrowSelect);
    },
};
</script>

<style lang="scss" scoped>
.users-list {
    list-style-type: none;
    padding: 0;
    z-index: -1;
    background-color: #fafafa;
    max-width: 300px;
    margin: 0 10px;
    border-radius: 0 0 2px 2px;
    border: 1px solid #ddd;
    border-top: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.05), 0 0 20px 0 rgba(0,0,0,.1);
}
</style>
