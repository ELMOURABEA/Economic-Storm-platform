const { getPool, sql } = require('../config/database');

class Project {
  static async findAll() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query('SELECT * FROM Projects ORDER BY created_at DESC');
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Projects WHERE project_id = @id');
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error fetching project: ${error.message}`);
    }
  }

  static async create(projectData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('title', sql.NVarChar, projectData.title)
        .input('description', sql.NVarChar, projectData.description)
        .input('status', sql.NVarChar, projectData.status || 'active')
        .input('budget', sql.Decimal(18, 2), projectData.budget)
        .input('start_date', sql.Date, projectData.start_date)
        .input('end_date', sql.Date, projectData.end_date)
        .input('category', sql.NVarChar, projectData.category)
        .query(`
          INSERT INTO Projects (title, description, status, budget, start_date, end_date, category)
          OUTPUT INSERTED.*
          VALUES (@title, @description, @status, @budget, @start_date, @end_date, @category)
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  static async update(id, projectData) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, projectData.title)
        .input('description', sql.NVarChar, projectData.description)
        .input('status', sql.NVarChar, projectData.status)
        .input('budget', sql.Decimal(18, 2), projectData.budget)
        .input('start_date', sql.Date, projectData.start_date)
        .input('end_date', sql.Date, projectData.end_date)
        .input('category', sql.NVarChar, projectData.category)
        .query(`
          UPDATE Projects 
          SET title = @title, 
              description = @description, 
              status = @status, 
              budget = @budget,
              start_date = @start_date,
              end_date = @end_date,
              category = @category,
              updated_at = GETDATE()
          OUTPUT INSERTED.*
          WHERE project_id = @id
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Projects WHERE project_id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`);
    }
  }

  static async getStatistics() {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .query(`
          SELECT 
            COUNT(*) as total_projects,
            SUM(budget) as total_budget,
            AVG(budget) as avg_budget,
            COUNT(CASE WHEN status = 'active' THEN 1 END) as active_projects,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_projects
          FROM Projects
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error fetching project statistics: ${error.message}`);
    }
  }
}

module.exports = Project;
