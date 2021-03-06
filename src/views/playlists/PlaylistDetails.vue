<template>
  <div class="class" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>
    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <SongList v-if="playlist.songs.length" :ownership="ownership" :playlist="playlist" :id="id"/>
      <AddSong v-if="ownership" :playlist="playlist" :id="id"/>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/SongList.vue";
import AddSong from "@/components/AddSong.vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  components: { AddSong, SongList },
  setup(props) {
    const { user } = getUser();
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { deleteDoc } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      //all three have to be true in order to return true
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" }); //redirect to home page
    };

    return { playlist, error, ownership, handleDelete };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>