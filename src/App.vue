<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Bunny Film Shop
        </q-toolbar-title>
        	<q-space />
          	<div v-if="!isLogin">
          	  <q-btn color="secondary" @click="signCard=true" >Sign In</q-btn>
          	</div>
          	<div v-if="isLogin">
          	  <q-btn color="secondary" @click="logout" >Logout</q-btn>
          	</div>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Page One" />
        <q-route-tab to="/about" label="Page Two" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>(C) 2023 PCPD CLASS</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>

  <q-dialog v-model="signCard">
    <q-card class="my-card">      
        <q-card-section>         
          <q-input hint="username" v-model="un" :error="!isUNValid" error-message="Required"/>          
          <q-input :type="isPwd?'password':'text'" hint="Password" v-model="pwd" :error="!isPwdValid" error-message="Required">
            <template v-slot:append>
              <q-icon :name="isPwd? 'visibility_off': 'visibility'" class="cursor-pointer" @click="isPwd=!isPwd" />
            </template>
          </q-input>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <p class="text-negative">{{errMsg}}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Login" @click="onSubmit" />
        </q-card-actions>      
    </q-card>
</q-dialog>
</template>

<script>
  import { computed } from 'vue';
  import axios from 'axios';
  import url from './http-common.js'
  import {Buffer} from 'buffer';

  export default {
    data(){
      return {
        isLogin:false,
        signCard:false,
        isUNValid:true,
        isPwdValid:true,
        isValid:false,
        isPwd:true,
        un:'',
        pwd:'',
        errMsg:''
      }
    },
    methods:{
      onSubmit(){
        this.isUNValid = computed(()=>this.un.length>0)
        this.isPwdValid = computed(()=>this.pwd.length>0) 
        this.isValid= this.isUNValid && this.isPwdValid
        console.log(this.isValid)
        if (this.isValid) {
          //step 1: create token username:password
          const token = `${this.un}:${this.pwd}`;
          //step 2: encode the token to base64 format
          const encodedToken = Buffer.from(token).toString('base64');
          //step 3: put encodedtoken to header section
          const header = {
            'Authorization': `Basic ${encodedToken}`
          }
          //step 4: request login
          axios({
            url: `${url}/user`,
            medthod: 'GET',
            headers: header
          }).then((res)=>{
            console.log(res.data.key);
            console.log(this.$store.getters.getSession); //this.$ all objects from vue defauly
            this.$store.commit('updateSession', res.data.key);
            console.log( this.$store.getters.getSession);
            this.signCard = false;
            this.isLogin = true;
            this.un = '';
            this.pwd = '';
          }).catch((err)=>{
            this.errMsg = "Invalid Information";
            console.log(err);
          })
        }
                                
      },
      logout(){
        this.$store.commit('updateSession', null);
        this.isLogin = false;
        console.log(this.$store.getters.getSession);
      }
    }
  }
</script>