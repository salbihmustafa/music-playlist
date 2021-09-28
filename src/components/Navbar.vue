<template>
  <div class="navbar">
    <nav>
      <h1><router-link :to="{ name: 'Home' }">Salbih's Blog</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click.prevent="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Signup</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }"
            >Log in</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout.js";
import getUser from "@/composables/getUser.js";

export default {
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    const { user } = getUser();

    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        //No error trying to logout
        console.log("user logged out");
        router.push({ name: "Login" });
      } else {
        //Error trying to logout
        console.log("ERROR ", error.value);
      }
    };

    return { handleLogout, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>