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
        <span style="font-size: 22px; font-weight: bold">Goin</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn text v-text="`Hello ${this.my_name}`"></v-btn>
      <v-btn text v-text="'logout'" @click="logout"></v-btn>
    </v-app-bar>

    <v-main style="margin-bottom: 120px">
      <v-container>
        <p style="font-size: 1.5rem">Dashboard</p>
        <v-data-table
          dense
          :headers="table_headers"
          :items="table_items"
          item-key="name"
          class="elevation-3"
        ></v-data-table>
      </v-container>
    </v-main>
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
    table_items: [],
    table_headers: [
      {
        text: "SPARCS Nickname",
        align: "start",
        sortable: false,
        value: "sparcs_id",
      },
      { text: "Commits", value: "commits" },
      { text: "PRs", value: "prs" },
      { text: "# of Repos", value: "repos_num" },
      { text: "Games Score", value: "games" },
      { text: "total pts", value: "total_pt" },
    ],
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
      http.get("githubid?github_id=" + this.githubid).then(async (res) => {
        console.log(res);
        if (res.data.ok) this.githubdialog = false;

        const gres = await http.get("getall");
        this.table_items = gres.data.users;
      });
    },
  },
  async mounted() {
    //Load user id from server (to check api working)
    http
      .get("id")
      .then(async (res) => {
        this.my_name = res.data.id[0];
        if (!res.data.id[1]) {
          this.githubdialog = true;
        }

        const gres = await http.get("getall");
        this.table_items = gres.data.users;
      })
      .then()
      .catch((err) => {
        if (err.response.data.reason === "not-logged-in") {
          console.log("not-logged-in from api");
        }
      });
  },
};
</script>
