<template>
  <div v-for="song in playlist.songs" :key="song.id" class="single-song">
    <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
    </div>
    <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
  </div>
</template>

<script>
// attach a click handler to the delete (song) button called handleClick - DONE
// inside the function, use the updateDoc function to delete that song
// you'll need to pass the song id into the handleClick function - DONE
// HINT: use the filter method
import useDocument from '@/composables/useDocument.js';

export default {
  props: ["playlist", "ownership", "id"],
  setup(props){

    const { updateDoc } = useDocument('playlists', props.id);

    const handleClick = async (songid) => {
      const updatedSongs = props.playlist.songs.filter((song) => song.id !== songid)
      console.log('Deleted song...', updatedSongs);
      await updateDoc({ songs: updatedSongs });
    }

    return { handleClick }
  }
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