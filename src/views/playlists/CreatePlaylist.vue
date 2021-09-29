<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Playlist Title" v-model="title" required>
      <textarea placeholder="Playlist description" v-model="description" required></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange" accept=".png, .jpeg">
      <div class="error">{{fileError}}</div>
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
        const file = ref(null);
        const fileError = ref(null);

        const handleSubmit = () => {
            if(file.value){
                //if image file is selected, then allow to submit
                console.log('Title: ', title.value);
                console.log('Description: ', description.value);
                console.log('File: ', file.value);
            }
        }

        //Allowed file types
        const fileType = ['image/png', 'image/jpeg'];
        
        const handleChange = (e) => {
            const selected = e.target.files[0];
            //check if selected has a value
            if(selected && fileType.includes(selected.type)){
                file.value = selected;
                fileError.value = null; //correct file type was selected so reset error
            }else {
                file.value = null;
                fileError.value = 'Please select an image file (png or jpeg)';
            }
            
        }
        return { title, description, handleSubmit, handleChange, fileError }
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