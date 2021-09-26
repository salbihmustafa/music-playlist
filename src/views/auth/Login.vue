<template>
  <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <div class="error" v-if="error">{{ error }}</div>
      <button>Log in</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin.js'; //@/ is in src folder
import { ref } from 'vue';

export default {
    setup(){
        const { error, login } = useLogin();

        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            const response = await login(email.value, password.value);
            if(!error.value){
                //no error
                console.log('User logged in');
            }
        }

        return { email, password, handleSubmit, error }
    }

}
</script>

<style>

</style>