<template>
    <!-- https://codesandbox.io/s/0q4kvj8n0l?file=/src/main.js -->
    <v-app id="inspire">
        <v-main>
            <v-container fluid fill-height>

                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-img src="https://sparcs-public.s3.ap-northeast-2.amazonaws.com/SPARCS_Branding/1_SPARCS/SPARCS_white.png" max-width="120"></v-img>
                                <v-toolbar-title class="ml-2">Login</v-toolbar-title>
                            </v-toolbar>
                            <v-form @submit="submit">
                                <v-card-text>
                                    <v-text-field
                                            name="login"
                                            label="ID"
                                            type="text"
                                            v-model="id"
                                    ></v-text-field>
                                    <v-text-field
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            v-model="pw"
                                    ></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" type="submit">로그인</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return({
                id: '',
                pw: ''
            })
        },
        methods: {
            submit(e){
                e.preventDefault()
                this.$store
                    .dispatch("login", {
                        id: this.id,
                        password: this.pw,
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push({
                                name: "Home",
                            })
                        } else if(response.data.reason === 'no-such-user-or-wrong-password') alert("Wrong ID or Password!")
                    })
                    .catch(error => alert(error))
            },
        }
    }
</script>

<style scoped>
</style>
