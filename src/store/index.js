import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import jwt from "../common/jwt"
import http from "../http"


export default new Vuex.Store({
    state: {
        token: {
            accessToken: jwt.getToken(),
        },
        isAuthenticated: !!jwt.getToken(),
    },
    getters: {
        getAccessToken: function (state) {
            return state.token.accessToken
        },
        isAuthenticated: function (state) {
            return state.isAuthenticated
        },
    },
    mutations: {
        logout: function (state) {
            state.token.accessToken = ""
            state.isAuthenticated = false
            jwt.destroyToken()
        },
        login: function (state, payload = {}) {
            state.token.accessToken = payload.accessToken
            state.isAuthenticated = true
            jwt.saveToken(payload.accessToken)
        },
    },
    actions: {
        logout: function (context, payload) {
            return new Promise(resolve => {
                setTimeout(function () {
                    context.commit("logout", payload)
                    resolve({})
                }, 1000)
            })
        },
        login: function (context, payload) {
            let params = {
                id: payload.id,
                password: payload.password,
            }
            return new Promise((resolve) => {
                http
                    .post("auth", params)
                    .then(response => {
                        const { data } = response
                        context.commit("login", {
                            accessToken: data.token,
                        })
                        resolve(response)
                    })
                    .catch(error => {
                        resolve(error.response)
                    })
            })
        },
    },
})
