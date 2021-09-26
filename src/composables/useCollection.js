import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';


const useCollection = (myCollection) => {
    const error = ref(null); //put inside function because there will be multiple collections
    const isPending = ref(false);

    const addDocument = async (doc) => {
        error.value = null; //reset
        isPending.value = true;

        try {
            // add document to collections in firestore
            await projectFirestore.collection(myCollection).add(doc);
            isPending.value = false;
        } catch (err) {
            console.log(err.message);
            isPending.value = false;
            error.value = 'Could not send the message';
        }
    }

    return { error, addDocument, isPending }
}

export default useCollection;