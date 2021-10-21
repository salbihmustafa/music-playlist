import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (myCollection, query) => {
    const documents = ref(null); //for documents from database
    const error = ref(null);

    //register the firestore collection reference
    let collectionRef = projectFirestore.collection(myCollection).orderBy('createdAt')

    if(query) {
        //only if they pass in query
        collectionRef = collectionRef.where(...query); //this will spread the array into three separate parts
    }

    const unsubscribe = collectionRef.onSnapshot(snap => {
        console.log('snapshot');
        let results = [];

        snap.docs.forEach(doc => {
            //check for valid createdAt property and then push document data and id
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results;
        error.value = null; //reset error if any data
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = 'could not fetch data';
    })

    watchEffect((onInvalidate) => {
        // unsubscribe from previous collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsubscribe()); //only fires when the component uses this gets unmounted
    })

    return { documents, error }
}

export default getCollection;