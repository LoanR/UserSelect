<template>
	<div class="user-select">
        <div>
            <div class="selector" @click="toggleUsers = !toggleUsers">
                <div v-if="selectedUser" class="user-container">
                    <img :src="selectedUser.avatar">
                    <ul>
                        <li>
                            {{selectedUser.first_name}}
                        </li>
                        <li>
                            <strong>{{selectedUser.last_name}}</strong>
                        </li>
                    </ul>
                </div>
                <div v-else class="user-container">
                    <img src="https://via.placeholder.com/128">
                    <ul><li>...</li><li><strong>...</strong></li></ul>
                </div>
                <button>
                    <div :class="openCloseIndicator"></div>
                </button>
            </div>
            <transition name="slide-down-fade">
                <ul v-if="toggleUsers" class="users-list" @mouseover="resetArrowHover" @mouseout="arrowableUsers = true">
                    <li v-for="(user, index) in users" :key="user.id" @click="userSelected(user)" class="user-container clickable" :class="{'arrow-hover': arrowHoveredItem === index}">
                        <img :src="user.avatar">
                        <ul>
                            <li>
                                {{user.first_name}}
                            </li>
                            <li>
                                <strong>{{user.last_name}}</strong>
                            </li>
                        </ul>
                    </li>
                </ul>
            </transition>
        </div>
	</div>
</template>

<script>
export default {
    name: 'userSelect',

    data() {
        return {
            userRequest: new Request('https://reqres.in/api/users/', {method: 'GET'}),
            toggleUsers: false,
            selectedUser: null,
            arrowHoveredItem: -1,
            arrowableUsers: true,
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

        userSelected(user) {
            this.selectedUser = user;
            this.$emit('select', user);
            this.toggleUsers = false;
            this.arrowableUsers = true;
        },

        arrowSelect(event) {
            if (this.toggleUsers) {
                switch (event.keyCode) {
                case 38:
                    if (this.arrowableUsers) {
                        if (this.arrowHoveredItem > 0) {
                            this.arrowHoveredItem--;
                        } else {
                            this.arrowHoveredItem = this.users.length - 1;
                        }
                    }
                    break;
                case 40:
                    if (this.arrowableUsers) {
                        if (this.arrowHoveredItem < this.users.length - 1) {
                            this.arrowHoveredItem++;
                        } else {
                            this.arrowHoveredItem = 0;
                        }
                    }
                    break;
                case 27:
                    this.toggleUsers = false;
                    this.arrowableUsers = true;
                    this.arrowHoveredItem = -1;
                    break;
                case 13:
                    if (this.arrowHoveredItem > -1 && this.arrowHoveredItem < this.users.length) {
                        this.userSelected(this.users[this.arrowHoveredItem]);
                        this.arrowHoveredItem = -1;
                    }
                    break;
                default:
                    break;
                }
            }
        },

        resetArrowHover() {
            this.arrowableUsers = false;
            this.arrowHoveredItem = -1;
        },
    },

    computed: {
        openCloseIndicator() {
            return 'arrow' + (this.toggleUsers ? ' close' : ' open');
        },

        users() {
            return JSON.parse(localStorage.getItem('users'));
        },
    },

    mounted() {
        this.fetchUsers();
        document.addEventListener('keyup', this.arrowSelect);
    },
};
</script>

<style lang="scss" scoped>
ul {
	list-style-type: none;
	padding: 0;
    margin: 0;
}

.user-select {
    display: flex;
    justify-content: center;
}

.selector {
    width: 300px;
    display: flex;
    margin: 0 10px;
    border: 1px solid #42b942;
    border-radius: 2px;
    background-color: #fafafa;

    button {
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

.users-list {
    z-index: -1;
    background-color: #fafafa;
    max-width: 300px;
    margin: 0 10px;
    border-radius: 0 0 2px 2px;
    border: 1px solid #ddd;
    border-top: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.05), 0 0 20px 0 rgba(0,0,0,.1);
}

.user-container {
    max-width: 300px;
    padding: 5px;
    display: flex;
    align-items: flex-end;

    img {
        height: 60px;
        width: 60px;
    }

    &.clickable {
        cursor: pointer;

        &:hover, &.arrow-hover {
            background-color: lighten(#42b942, 20);
        }
    }

    li {
        margin: 0 10px;
    }
}

</style>
