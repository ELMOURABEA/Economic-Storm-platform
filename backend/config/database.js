const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  database: process.env.DB_DATABASE || 'EconomicStorm',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    enableArithAbort: true,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let poolPromise;

const getPool = async () => {
  if (!poolPromise) {
    poolPromise = sql.connect(config)
      .then(pool => {
        console.log('✅ Connected to SQL Server successfully');
        return pool;
      })
      .catch(err => {
        console.error('❌ SQL Server connection failed:', err.message);
        poolPromise = null;
        throw err;
      });
  }
  return poolPromise;
};

const closePool = async () => {
  if (poolPromise) {
    await poolPromise.then(pool => pool.close());
    poolPromise = null;
    console.log('SQL Server connection closed');
  }
};

module.exports = {
  sql,
  getPool,
  closePool,
  config
};
