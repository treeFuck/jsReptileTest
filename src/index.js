let app = new Vue({
  el: '#app',
  data: {
    msg: '111'
  },
  methods: {
    fun() {
      axios.get('/getdata').
      then((res)=>{
        let data = res && res.data;
        if (data && data.code === 1) {
          console.log(data.data)
        }
      })
    }
  }
})