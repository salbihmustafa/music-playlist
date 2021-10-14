<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <input type="text" placeholder="Display Name" v-model="displayName">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <div class="error" v-if="error">{{ error }}</div>
      <button v-if="!isPending">Sign Up</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const { error, signup, isPending } = useSignup();
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        const displayName = ref('');

        const handleSubmit = async () => {
            const response = await signup(email.value, password.value, displayName.value);
            if(!error.value){
                //no error
                console.log('User signed up');
                //Route to home page
                router.push({ name: 'UserPlaylists'} );
            }
        }

        return { email, password, displayName, error, isPending, handleSubmit }
    }
}
</script>

<style>

</style>