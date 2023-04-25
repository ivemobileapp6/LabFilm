<template>
  <div v-if="error">
    <q-banner inline-actions class="text-white bg-red">
  Sorry that there is a problem connecting to the API
      </q-banner>
  </div>

  <div v-if="!error">
    <template v-for="(row) in filmsList">
      <div class="row">
        <template v-for="(item) in row">
          <div class="col-3">
            <q-card>
              <q-img :src="item.poster"/>
              <q-card-actions>
                <q-btn flat @click="$router.replace(`/d/${item.id}`)">{{item.name}}</q-btn>
              </q-card-actions>
            </q-card>
           </div>
        </template>
      </div>
    </template>
  </div>
</template>


<script>
  import axios from 'axios';
  import url from '../http-common.js'
  let films = [];

  
  export default {
    data(){
      return {
        error: false,
        filmsList: []
      }
    },
    created(){
      
      let rowItems = [];
      
      axios.get(`${url}/films`)
      .then((response) => {
        films = response.data
        for(let i = 0; i< films.length; i++) {
          const filmObj = {
            name: films[i].title,
            poster: films[i].poster,
            id: films[i]._id
          }
          rowItems.push(filmObj)
          if(i%4==3){
             this.filmsList.push(rowItems)
             rowItems= []
          }
        }
         })
         .catch((err)=> {
         this.error = true
         console.log(err)
         });
      }
  }
</script> 