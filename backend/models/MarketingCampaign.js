const { getPool, sql } = require('../config/database');

class MarketingCampaign {
  static async findAll() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query('SELECT * FROM MarketingCampaigns ORDER BY created_at DESC');
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching campaigns: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM MarketingCampaigns WHERE campaign_id = @id');
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error fetching campaign: ${error.message}`);
    }
  }

  static async create(campaignData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('name', sql.NVarChar, campaignData.name)
        .input('description', sql.NVarChar, campaignData.description)
        .input('platform', sql.NVarChar, campaignData.platform)
        .input('budget', sql.Decimal(18, 2), campaignData.budget)
        .input('start_date', sql.Date, campaignData.start_date)
        .input('end_date', sql.Date, campaignData.end_date)
        .input('status', sql.NVarChar, campaignData.status || 'draft')
        .query(`
          INSERT INTO MarketingCampaigns (name, description, platform, budget, start_date, end_date, status)
          OUTPUT INSERTED.*
          VALUES (@name, @description, @platform, @budget, @start_date, @end_date, @status)
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error creating campaign: ${error.message}`);
    }
  }

  static async update(id, campaignData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, campaignData.name)
        .input('description', sql.NVarChar, campaignData.description)
        .input('platform', sql.NVarChar, campaignData.platform)
        .input('budget', sql.Decimal(18, 2), campaignData.budget)
        .input('impressions', sql.Int, campaignData.impressions)
        .input('clicks', sql.Int, campaignData.clicks)
        .input('conversions', sql.Int, campaignData.conversions)
        .input('start_date', sql.Date, campaignData.start_date)
        .input('end_date', sql.Date, campaignData.end_date)
        .input('status', sql.NVarChar, campaignData.status)
        .query(`
          UPDATE MarketingCampaigns 
          SET name = @name, 
              description = @description, 
              platform = @platform,
              budget = @budget,
              impressions = @impressions,
              clicks = @clicks,
              conversions = @conversions,
              start_date = @start_date,
              end_date = @end_date,
              status = @status,
              updated_at = GETDATE()
          OUTPUT INSERTED.*
          WHERE campaign_id = @id
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error updating campaign: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM MarketingCampaigns WHERE campaign_id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error(`Error deleting campaign: ${error.message}`);
    }
  }

  static async getPerformanceMetrics() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query(`
          SELECT 
            COUNT(*) as total_campaigns,
            SUM(budget) as total_budget,
            SUM(impressions) as total_impressions,
            SUM(clicks) as total_clicks,
            SUM(conversions) as total_conversions,
            CASE 
              WHEN SUM(impressions) > 0 
              THEN CAST(SUM(clicks) AS FLOAT) / SUM(impressions) * 100 
              ELSE 0 
            END as avg_ctr,
            CASE 
              WHEN SUM(clicks) > 0 
              THEN CAST(SUM(conversions) AS FLOAT) / SUM(clicks) * 100 
              ELSE 0 
            END as avg_conversion_rate
          FROM MarketingCampaigns
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error fetching campaign metrics: ${error.message}`);
    }
  }
}

module.exports = MarketingCampaign;
