import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocument = (myCollection, id) => {
    const document = ref(null); //for documents from database
    const error = ref(null);

    //register the firestore collection reference
    let collectionRef = projectFirestore.collection(myCollection).doc(id)

    const unsubscribe = collectionRef.onSnapshot(doc => {
        if(doc.data()){
            //if the document exists
            document.value = {...doc.data(), id: doc.id}
            error.value = null;
        }else {
            error.value = 'that document does not exist';
        }
    }, (err) => {
        console.log(err.message);
        error.value = 'could not fetch document';
    })

    watchEffect((onInvalidate) => {
        // unsubscribe from previous collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsubscribe()); //only fires when the component uses this gets unmounted
    })

    return { document, error }
}

export default getDocument;