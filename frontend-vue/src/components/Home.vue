<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Sparcs Logo"
          class="shrink mr-2"
          contain
          src="https://sparcs-public.s3.ap-northeast-2.amazonaws.com/SPARCS_Branding/1_SPARCS/SPARCS_white.png"
          transition="scale-transition"
          width="120"
        />
        <span style="font-size: 22px">Goin SPARCS</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn text v-text="`Hello ${this.my_name}`"></v-btn>
      <v-btn text v-text="'logout'" @click="logout"></v-btn>
    </v-app-bar>

    <v-main style="margin-bottom: 120px">
      <v-container>
        <div>Hello world!</div>
      </v-container>
    </v-main>
    <v-sheet
      color="blue darken-1"
      elevation="6"
      height="auto"
      width="100%"
      style="position: fixed; bottom: 0; padding: 8px 16px"
    >
      <div style="display: flex; flex-direction: row; align-items: center">
        <div style="width: 100%; margin-right: 16px">
          <v-text-field
            label="Title"
            hide-details="auto"
            dark
            v-model="title"
            v-on:keyup.enter="send"
            ref="title"
          ></v-text-field>
          <v-text-field
            label="Subtitle"
            hide-details="auto"
            dark
            v-model="subtitle"
            v-on:keyup.enter="send"
          ></v-text-field>
        </div>
        <v-btn class="mx-2" fab dark large color="pink" @click="send">
          <v-icon dark> mdi-send </v-icon>
        </v-btn>
      </div>
    </v-sheet>
    <v-dialog v-model="githubdialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Please Enter Github Account.
        </v-card-title>
        <v-text-field
          id="githubid"
          name="githubid"
          label="GithubID"
          v-model="githubid"
          style="padding: 16px 16px"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="githubsubmit">
            제출
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import http from "../http";

export default {
  name: "Home",

  components: {},
  computed: {
    ...mapGetters(["isAuthenticated", "getAccessToken"]),
  },
  data: () => ({
    my_name: "",
    items: [],
    title: "",
    subtitle: "",
    githubdialog: false,
    githubid: "",
  }),
  methods: {
    send() {
      alert("send");
    },
    logout() {
      this.$store.dispatch("logout", {}).then(() => {
        if (!this.isAuthenticated) {
          this.$router.push({
            name: "Login",
          });
        }
      });
    },
    githubsubmit() {
      http.get("githubid?github_id=" + this.githubid).then((res) => {
        console.log(res);
        if (res.data.ok) this.githubdialog = false;
      });
    },
  },
  mounted() {
    //Load user id from server (to check api working)
    http
      .get("id")
      .then((res) => {
        this.my_name = res.data.id[0];
        if (!res.data.id[1]) {
          this.githubdialog = true;
        }
      })
      .catch((err) => {
        if (err.response.data.reason === "not-logged-in") {
          console.log("not-logged-in from api");
        }
      });
  },
};
</script>
