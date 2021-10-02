<template>
  <div class="home">
    <p>Home Page</p>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.userId">
        <div>{{ doc.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import getCollection from "@/composables/getCollection.js"; //get database information
import { computed, ref } from "vue";

export default {
  name: "Home",
  setup() {
    const { documents, error } = getCollection("playlists"); //get real data collection from database

    return { documents, error };
  },
};
</script>
