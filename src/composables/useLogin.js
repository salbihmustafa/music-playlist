import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null; //reset error message
    isPending.value = true; //trying to login

    try{
        const response = await projectAuth.signInWithEmailAndPassword(email, password); //goes to firebase
        error.value = null; //reset error message
        isPending.value = false; //completed the action
        return response; //return value to our component
    }catch(err){
        console.log(err.message);
        isPending.value = false; //completed the action
        error.value = 'Incorrect login credentials';
    }
}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin;