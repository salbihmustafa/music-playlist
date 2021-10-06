import { projectStorage } from '../firebase/config.js';
import { ref } from 'vue';
import getUser from './getUser.js';

const { user } = getUser();

const useStorage = () => {
    const error = ref(null);
    const url = ref(null); //how we are going to access in frontend
    const filePath = ref(null); //the path we will save in firebase storage

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`; //.name is a property in the file
        const storageRef = projectStorage.ref(filePath.value);

        try {
            const response = await storageRef.put(file); //uploads data to path
            url.value = await response.ref.getDownloadURL(); //get firebase url
        }catch(err){
            console.log(err.message);
            error.value = err.message;
        }
    }

    const deleteImage = async (path) => {
        const storeageRef = projectStorage.ref(path);
        try{
            storeageRef.delete(); //will delete the image
        }catch(err){
            console.log(err.message);
            error.value = err.message;
        }
    }

    return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage