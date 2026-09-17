const {Pool} = require('pg');
const pool=new Pool({

    user:'postgres',
    host:'localhost',
    database:'sportconnect',
    port:5432
})
class Singleton{
    
     constructor(pool){
        if(Singleton.instance){
            return Singleton.instance
        }
        this.pool=pool
           Singleton.instance=this
     }
}

module.exports=new Singleton(pool);