import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';


const useDocument = (myCollection, id) => {
    const error = ref(null);
    const isPending = ref(false);

    //document reference
    let docRef = projectFirestore.collection(myCollection).doc(id);

    const deleteDoc = async () => {
        isPending.value = true; //starting to do something
        error.value = null;
        
        try{
            const response = await docRef.delete(); //this will delete from firebase
            isPending.value = false; //done doing task
            return response;
        }catch(err){
            console.log(err.message);
            isPending.value = false;
            error.value = 'could not delete the document';
        }
    }

    return { error, isPending, deleteDoc }
}

export default useDocument;