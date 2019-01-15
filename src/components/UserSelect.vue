<template>
	<div class="user-select">
        <div>
            <div class="selector">
                <user-entity-component
                    :user="selectedUser"
                    @clickedUser="toggleUsers">
                </user-entity-component>
                <dropdown-button-component
                    :dropped="showClickableUsers"
                    @dropdownClick="toggleUsers">
                </dropdown-button-component>
            </div>
            <transition name="slide-down-fade">
                <dropdown-content-component
                    v-if="showClickableUsers"
                    @clickedUser="userSelected"
                    @closeDropdown="closeUsers">
                </dropdown-content-component>
            </transition>
        </div>
	</div>
</template>

<script>
import dropdownButton from '@/components/DropdownButton.vue';
import userEntityBase from '@/components/UserEntityBase.vue';
import dropdownContent from '@/components/DropdownContent.vue';

export default {
    name: 'userSelect',

    components: {
        'dropdown-button-component': dropdownButton,
        'user-entity-component': userEntityBase,
        'dropdown-content-component': dropdownContent,
    },

    data() {
        return {
            userRequest: new Request('https://reqres.in/api/users/', {method: 'GET'}),
            showClickableUsers: false,
            selectedUser: {avatar: 'https://via.placeholder.com/128', first_name: '...', last_name: '...'},
        };
    },

    methods: {
        async fetchUsers() {
            try {
                const response = await (await fetch(this.userRequest)).json();
                localStorage.setItem('users', JSON.stringify(response.data));
            } catch (error) {
                alert(error);
            }
        },

        toggleUsers() {
            this.showClickableUsers = !this.showClickableUsers;
        },

        closeUsers() {
            this.showClickableUsers = false;
        },

        userSelected(user) {
            this.selectedUser = user;
            this.$emit('select', user);
            this.closeUsers();
        },
    },

    computed: {
        users() {
            return JSON.parse(localStorage.getItem('users'));
        },
    },

    mounted() {
        this.fetchUsers();
    },
};
</script>

<style lang="scss" scoped>
.user-select {
    display: flex;
    justify-content: center;

    .selector {
        width: 300px;
        display: flex;
        margin: 0 10px;
        border: 1px solid #42b942;
        border-radius: 2px;
        background-color: #fafafa;

        .user-container {
            flex-grow: 2;
            margin: 0;
        }

        &:hover button {
            background-color: #f1f1f1;
        }
    }

    .slide-down-fade-enter-active, .slide-down-fade-leave-active {
        transition: all 0.3s cubic-bezier(0,0,0.3,1);
    }
    .slide-down-fade-enter, .slide-down-fade-leave-to {
        opacity: 0;
        transform: translateY(-70px);
    }
}

</style>
