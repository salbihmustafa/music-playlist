<template>
  <div v-for="song in playlist.songs" :key="song.id" class="single-song">
    <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
    </div>
    <button v-if="ownership">Delete</button>
  </div>
</template>

<script>
export default {
  props: ["playlist", "ownership"],
};
</script>

<style scoped>
.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>