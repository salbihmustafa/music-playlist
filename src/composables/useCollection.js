import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';


const useCollection = (myCollection) => {
    const error = ref(null); //put inside function because there will be multiple collections

    const addDocument = async (doc) => {
        error.value = null; //reset

        try {
            // add document to collections in firestore
            await projectFirestore.collection(myCollection).add(doc);
        } catch (err) {
            console.log(err.message);
            error.value = 'Could not send the message';
        }
    }

    return { error, addDocument }
}

export default useCollection;