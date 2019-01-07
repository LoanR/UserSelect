<template>
	<div>
		<ul v-if="toggleUsers">
			<li v-for="user in users" :key="user.id" @click="userSelected">
				<img :src="user.avatar">
				<p>
                    {{user.first_name}}
                    {{user.last_name}}
				</p>
			</li>
		</ul>
		<button @click="toggleUsers = !toggleUsers">
			<span class="plus-or-close">
				&times;
			</span>
		</button>
	</div>
</template>

<script>
export default {
    name: 'userSelect',

    data() {
        return {
            apiUrl: '​https://reqres.in/api/users',
            users: localStorage.getItem('users'),
            toggleUsers: false,
        };
    },

    methods: {
        async fetchUsers() {
            try {
                const data = await (await fetch(this.apiUrl)).json();
                console.log(data);
                return data;
                // fetch(this.apiUrl).then(function(response) {
                //     return response.json();
                // }).then(function(data) {
                //     console.log(data);
                //     return data;
                // });
            } catch (error) {
                alert(error);
            }
        },

        userSelected() {
            this.$emit('select');
        },
    },

    mounted() {
        localStorage.setItem('users', this.fetchUsers());
    },
};
</script>

<style scoped>
h1, h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
