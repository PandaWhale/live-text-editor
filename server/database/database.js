const { Pool } = require('pg');
const URL = 'postgres://yttfztlt:B9l5BgOjVwBO5hmMcaVa9rO8iwEpr7ty@drona.db.elephantsql.com:5432/yttfztlt';
const pool = new Pool({ connectionString: URL });

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (query, params, cb) => {
    console.log(`this is the query: ${query}`);
    return pool.query(query, params, cb);
  }
}