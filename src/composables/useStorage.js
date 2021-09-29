import { projectStorage } from '../firebase/config.js';

const useStorage = () => {
    const error = ref(null);
    const url = ref(null); //how we are going to access in frontend
    const filePath = ref(null); //the path we will save in firebase

    const uploadImage = async (file) => {
        filePath.value = `covers/`
    }

    return { error, url, filePath }
}

export default useStorage