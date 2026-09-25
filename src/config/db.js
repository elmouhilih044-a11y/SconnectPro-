require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

class Singleton {
    constructor(pool) {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.pool = pool;
        Singleton.instance = this;
    }
}

module.exports = new Singleton(pool);