import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);

//this function will be used to sign someone up
const signup = async (email, password, displayName) => {
    error.value = null; //will reset the error message
    isPending.value = true;

    try {
        const response = await projectAuth.createUserWithEmailAndPassword(email, password); //goes to firebase
        if (!response) {
            throw new Error('Could not complete signup'); //goes to catch block
        }
        await response.user.updateProfile({ displayName });//update with user input displayName
        error.value = null; //reset error message
        isPending.value = false;
        return response; //returns entire response
    } catch (err) {
        debugger;
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }
}

const useSignup = () => {

    return { error, signup, isPending }
}

export default useSignup;