<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Playlist Title" v-model="title" required>
      <textarea placeholder="Playlist description" v-model="description" required></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file">
      <div class="error"></div>
      <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const title = ref('');
        const description = ref('');

        const handleSubmit = () => {
            console.log('Title: ', title.value);
            console.log('Description: ', description.value);
        }
        
        return { title, description, handleSubmit }
    }

}
</script>

<style scoped>
    input[type='file'] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>