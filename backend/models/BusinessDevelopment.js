const { getPool, sql } = require('../config/database');

class BusinessDevelopment {
  static async findAll() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query('SELECT * FROM BusinessDevelopment ORDER BY created_at DESC');
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching business development opportunities: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM BusinessDevelopment WHERE bd_id = @id');
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error fetching business development opportunity: ${error.message}`);
    }
  }

  static async create(bdData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('opportunity_name', sql.NVarChar, bdData.opportunity_name)
        .input('description', sql.NVarChar, bdData.description)
        .input('partner_name', sql.NVarChar, bdData.partner_name)
        .input('potential_value', sql.Decimal(18, 2), bdData.potential_value)
        .input('probability', sql.Int, bdData.probability)
        .input('stage', sql.NVarChar, bdData.stage || 'prospecting')
        .input('contact_info', sql.NVarChar, bdData.contact_info)
        .input('notes', sql.NVarChar, bdData.notes)
        .input('expected_close_date', sql.Date, bdData.expected_close_date)
        .query(`
          INSERT INTO BusinessDevelopment 
            (opportunity_name, description, partner_name, potential_value, probability, 
             stage, contact_info, notes, expected_close_date)
          OUTPUT INSERTED.*
          VALUES 
            (@opportunity_name, @description, @partner_name, @potential_value, @probability,
             @stage, @contact_info, @notes, @expected_close_date)
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error creating business development opportunity: ${error.message}`);
    }
  }

  static async update(id, bdData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('opportunity_name', sql.NVarChar, bdData.opportunity_name)
        .input('description', sql.NVarChar, bdData.description)
        .input('partner_name', sql.NVarChar, bdData.partner_name)
        .input('potential_value', sql.Decimal(18, 2), bdData.potential_value)
        .input('probability', sql.Int, bdData.probability)
        .input('stage', sql.NVarChar, bdData.stage)
        .input('contact_info', sql.NVarChar, bdData.contact_info)
        .input('notes', sql.NVarChar, bdData.notes)
        .input('expected_close_date', sql.Date, bdData.expected_close_date)
        .query(`
          UPDATE BusinessDevelopment 
          SET opportunity_name = @opportunity_name,
              description = @description,
              partner_name = @partner_name,
              potential_value = @potential_value,
              probability = @probability,
              stage = @stage,
              contact_info = @contact_info,
              notes = @notes,
              expected_close_date = @expected_close_date,
              updated_at = GETDATE()
          OUTPUT INSERTED.*
          WHERE bd_id = @id
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error updating business development opportunity: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM BusinessDevelopment WHERE bd_id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error(`Error deleting business development opportunity: ${error.message}`);
    }
  }

  static async getPipeline() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query(`
          SELECT 
            stage,
            COUNT(*) as count,
            SUM(potential_value) as total_value,
            AVG(probability) as avg_probability,
            SUM(potential_value * probability / 100.0) as weighted_value
          FROM BusinessDevelopment
          GROUP BY stage
          ORDER BY 
            CASE stage
              WHEN 'prospecting' THEN 1
              WHEN 'qualification' THEN 2
              WHEN 'proposal' THEN 3
              WHEN 'negotiation' THEN 4
              WHEN 'closed-won' THEN 5
              WHEN 'closed-lost' THEN 6
            END
        `);
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching pipeline: ${error.message}`);
    }
  }
}

module.exports = BusinessDevelopment;
