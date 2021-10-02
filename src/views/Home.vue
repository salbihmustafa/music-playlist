<template>
  <div class="home">
    <p>Playlists</p>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListView from '@/components/ListView';
import getCollection from "@/composables/getCollection.js"; //get database information
import { computed, ref } from "vue";

export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { documents, error } = getCollection("playlists"); //get real data collection from database

    return { documents, error };
  },
};
</script>
