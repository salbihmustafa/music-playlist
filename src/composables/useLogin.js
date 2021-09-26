import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

const login = async (email, password) => {
    error.value = null; //reset error message

    try{
        const response = await projectAuth.signInWithEmailAndPassword(email, password); //goes to firebase
        error.value = null; //reset error message
        return response; //return value to our component
    }catch(err){
        console.log(err.message);
        error.value = 'Incorrect login credentials';
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin;