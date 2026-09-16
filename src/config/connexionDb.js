const {Pool} = require('pg');
const pool=new Pool({

    user:'postgres',
    host:'localhost',
    database:'sportconnect',
    port:5432
})
class Singlton{
    
     constructor(pool){
        if(Singlton.instance){
            return Singlton.instance
        }
        this.pool=pool
           Singlton.instance=this
     }
}

module.exports=new Singlton(pool);