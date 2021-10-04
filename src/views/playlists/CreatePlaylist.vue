<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Playlist Title" v-model="title" required>
      <textarea placeholder="Playlist description" v-model="description" required></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange" accept=".png, .jpg">
      <div class="error">{{fileError}}</div>
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Creating...</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage.js';
import useCollection from '@/composables/useCollection.js';
import getUser from '@/composables/getUser.js';
import { timestamp } from '@/firebase/config.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { error, addDocument } = useCollection('playlists');
        const { filePath, url, uploadImage } = useStorage();
        const { user } = getUser();
        const router = useRouter();

        const title = ref('');
        const description = ref('');
        const file = ref(null);
        const fileError = ref(null);
        const isPending = ref(false); //local timer

        const handleSubmit = async () => {
            if(file.value){
                debugger;
                isPending.value = true;
                //if image file is selected, then allow to submit
                await uploadImage(file.value); // pass the file to useStorage.js
                const response = await addDocument({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid, //unique id
                    userName: user.value.displayName,
                    coverUrl: url.value, //firebase url of the file
                    filePath: filePath.value, //covers/uid/filename
                    songs: [], //will be empty when they create playlist
                    createdAt: timestamp() //when this document was created
                })
                isPending.value = false; //when everything is done
                if(!error.value){
                    console.log('playlist added');
                    router.push({ name: 'PlaylistDetails', params: {id: response.id} }); //get id of collection from response
                }
                
                //console.log('image uploaded, url: ', url.value); //comes from useStorage.js
                //console.log('image uploaded, url: ' + url.value); //this does not work
            }
        }

        //Allowed file types
        const fileType = ['image/png', 'image/jpeg'];
        
        //Input type file
        const handleChange = (e) => {
            const selected = e.target.files[0];
            console.log(selected.type);
            //check if selected has a value
            if(selected && fileType.includes(selected.type)){
                file.value = selected;
                console.log(file.value);
                fileError.value = null; //correct file type was selected so reset error
            }else {
                file.value = null;
                fileError.value = 'Please select an image file (png or jpeg)';
            }
            
        }
        
        return { title, description, handleSubmit, handleChange, fileError, isPending }
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