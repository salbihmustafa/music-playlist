<template>
  <div class="user-playlists">
      <h2>My Playlists</h2>
      <ListView :playlists="playlists" />
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView';

export default {
  components: { ListView },
  setup(){
    const { user } = getUser();
    //second parameter is for a where query - https://firebase.google.com/docs/firestore/query-data/queries
    //Has three parts, the field, operator, and value.
    const { documents: playlists} = getCollection('playlists', ['userId', '==', user.value.uid]);
    //Check your console, you will see a message to add an index. Click it, only one time thing.
    console.log(playlists);

    return { playlists }
  }

}
</script>

<style>

</style>