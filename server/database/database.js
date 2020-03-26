const { Pool } = require('pg');

let URL;
if (process.env.NODE_ENV === 'test') {
  URL = 'postgres://tmlubvdo:Ne52qzEf0WNeC-Gp1P2McKHytOgZQe5K@drona.db.elephantsql.com:5432/tmlubvdo';
} else {
  URL = 'postgres://kenhgyvo:tmusXooNdnmQ35ja1k8ILimiD5oIj0yn@drona.db.elephantsql.com:5432/kenhgyvo';
}
const pool = new Pool({ connectionString: URL });

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (query, params, cb) => {
    console.log(query);
    return pool.query(query, params, cb);
  }
};
