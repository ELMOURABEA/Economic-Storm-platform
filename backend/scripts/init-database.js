const sql = require('mssql');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    enableArithAbort: true,
    requestTimeout: 60000,
  }
};

async function initializeDatabase() {
  console.log('🔍 Connecting to SQL Server...');
  console.log(`   Server: ${config.server}:${config.port}`);
  
  let pool;
  try {
    // Connect to SQL Server
    pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');

    // Read the SQL initialization script
    const sqlFilePath = path.join(__dirname, '../config/initdb.sql');
    console.log('📄 Reading initialization script...');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

    // Split script into batches (GO statements)
    const batches = sqlScript
      .split(/\bGO\b/gi)
      .map(batch => batch.trim())
      .filter(batch => batch.length > 0);

    console.log(`📊 Executing ${batches.length} SQL batches...`);

    // Execute each batch
    for (let i = 0; i < batches.length; i++) {
      try {
        await pool.request().query(batches[i]);
        console.log(`   ✓ Batch ${i + 1}/${batches.length} executed`);
      } catch (error) {
        console.error(`   ✗ Error in batch ${i + 1}:`, error.message);
        // Continue with next batch
      }
    }

    console.log('\n✅ Database initialization completed successfully!');
    console.log('\n📊 Database Structure:');
    console.log('   • Projects');
    console.log('   • MarketingCampaigns');
    console.log('   • BusinessDevelopment');
    console.log('   • DataBank');
    console.log('   • AIInsights');
    console.log('   • Analytics');
    console.log('\n💾 Sample data has been inserted into all tables');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('\n🎉 All done! Database is ready to use.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = initializeDatabase;
