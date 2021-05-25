<template>
    <div class="h-screen w-full flex items-center justify-start flex-col p-4 bg-white dark:bg-gray-900 space-y-5">
      
      <div class="flex w-full bg-light-gray dark:bg-gray-800 p-10 justify-between items-center">
        <div><h1 class="text-3xl font-bold dark:text-white"><code>Vue Task</code></h1></div>
        <div class="flex space-x-3">
          <DecreaseFontSizeButton />
          <IncreaseFontSizeButton />
          <DarkModeButton />
        </div>
        
      </div>

      <div class="flex w-full space-x-5">
        <div class="userList">
          <div class="flex space-x-3">
            <button v-on:click="getUsers" class="px-5 py-2 rounded-sm shadow-xs text-white font-bold mb-5 bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-500 hover:to-yellow-500 ">Get current users</button>
            <button v-on:click="hideList" class="px-5 py-2 rounded-sm shadow-xs text-white font-bold mb-5 bg-gray-400 hover:bg-gray-500">{{ hidden ? 'Show list' : 'Hide list'}}</button>
            <button v-on:click="sortByID" class="px-5 py-2 rounded-sm shadow-xs text-white font-bold mb-5 bg-gray-400 hover:bg-gray-500">Sort by ID: {{ sortBy }}</button>
            <button v-on:click="addUser" class="px-5 py-2 rounded-sm shadow-xs text-white font-bold mb-5 bg-gray-400 hover:bg-gray-500">Add user</button>
          </div>

          <div id="addUserForm">
            <form
              @submit="checkForm"
              novalidate="true"
            >
              <input value="" placeholder="test" />
              <button typu="submit" v-on:submit="addUser">Add user</button>
            </form>
          </div>

          <ul class="w-full" v-bind:class="{ hidden: hidden }">
            <li v-for="user in users" :key="user.id" class="flex items-center justify-between space-x-20 cursor-pointer">
              <span><router-link to="{
                  path: '/view/',
                  params: {
                      user: user
                  }
                }">{{ user.name }}</router-link></span> <button v-on:click="deleteUser(user.id)">delete</button>
            </li>
          </ul>
        </div>
        <div class="flex w-2/5 bg-light-gray dark:bg-gray-800 p-10 justify-between items-center">
          Select user. The details will be show here. 
        </div>
      </div>
      
      
    </div>
</template>

<script>
    import axios from 'axios';
    import DarkModeButton from '../components/buttons/DarkModeButton';
    import IncreaseFontSizeButton from '../components/buttons/IncreaseFontSizeButton';
    import DecreaseFontSizeButton from '../components/buttons/DecreaseFontSizeButton';

    export default {
        name: 'Home',
        data () {
            return {
              users: null,
              hidden: false,
              sortBy: 'Ascending'
            }
        },
        methods: {
            getUsers () {
              axios
                .get('https://jsonplaceholder.typicode.com/users').then(response => (this.users = response.data));
            },
            hideList () {
              this.hidden = !this.hidden;
            },
            deleteUser (id) {
              this.users = this.users.filter(user => user.id !== id);
            },
            sortByID () {
              if(this.sortBy === 'Ascending') {
                this.users = this.users.sort((a,b) => {
                  return a.id - b.id
                })
                this.sortBy = 'Descending'
              }
              else {
                this.users = this.users.sort((a,b) => {
                  return b.id - a.id
                })
                this.sortBy = 'Ascending'
              }
            },
            addUser (user) {
              this.users.push(user);
            },
            checkForm: (e) => {
              this.errors = [];

              if (!this.name) {
                this.errors.push("Name required.");
              }
              if (!this.email) {
                this.errors.push('Email required.');
              } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
              }

              if (!this.errors.length) {
                return true;
              }

              e.preventDefault();
            },
            validEmail: function (email) {
              var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(email);
            }

        },
        components: {
          DarkModeButton,
          DecreaseFontSizeButton,
          IncreaseFontSizeButton
        }
    }
</script>