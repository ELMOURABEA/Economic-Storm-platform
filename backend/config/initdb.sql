-- Economic Storm Platform Database Schema
-- SQL Server Database Initialization Script

USE master;
GO

-- Create database if not exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EconomicStorm')
BEGIN
    CREATE DATABASE EconomicStorm;
    PRINT 'Database EconomicStorm created successfully';
END
GO

USE EconomicStorm;
GO

-- Create Projects table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Projects')
BEGIN
    CREATE TABLE Projects (
        project_id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        status NVARCHAR(50) DEFAULT 'active',
        budget DECIMAL(18, 2),
        start_date DATE,
        end_date DATE,
        category NVARCHAR(100),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        CONSTRAINT chk_status CHECK (status IN ('active', 'completed', 'on-hold', 'cancelled'))
    );
    PRINT 'Table Projects created';
END
GO

-- Create Marketing Campaigns table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'MarketingCampaigns')
BEGIN
    CREATE TABLE MarketingCampaigns (
        campaign_id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        platform NVARCHAR(100),
        budget DECIMAL(18, 2),
        impressions INT DEFAULT 0,
        clicks INT DEFAULT 0,
        conversions INT DEFAULT 0,
        start_date DATE,
        end_date DATE,
        status NVARCHAR(50) DEFAULT 'draft',
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        CONSTRAINT chk_campaign_status CHECK (status IN ('draft', 'active', 'paused', 'completed'))
    );
    PRINT 'Table MarketingCampaigns created';
END
GO

-- Create Business Development table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BusinessDevelopment')
BEGIN
    CREATE TABLE BusinessDevelopment (
        bd_id INT PRIMARY KEY IDENTITY(1,1),
        opportunity_name NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        partner_name NVARCHAR(255),
        potential_value DECIMAL(18, 2),
        probability INT CHECK (probability BETWEEN 0 AND 100),
        stage NVARCHAR(50) DEFAULT 'prospecting',
        contact_info NVARCHAR(MAX),
        notes NVARCHAR(MAX),
        expected_close_date DATE,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        CONSTRAINT chk_stage CHECK (stage IN ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'))
    );
    PRINT 'Table BusinessDevelopment created';
END
GO

-- Create Data Bank table (flexible data storage)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DataBank')
BEGIN
    CREATE TABLE DataBank (
        data_id INT PRIMARY KEY IDENTITY(1,1),
        data_type NVARCHAR(100) NOT NULL,
        title NVARCHAR(255) NOT NULL,
        content NVARCHAR(MAX),
        metadata NVARCHAR(MAX),
        tags NVARCHAR(500),
        category NVARCHAR(100),
        created_by NVARCHAR(100),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        INDEX idx_data_type (data_type),
        INDEX idx_category (category)
    );
    PRINT 'Table DataBank created';
END
GO

-- Create AI Insights table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AIInsights')
BEGIN
    CREATE TABLE AIInsights (
        insight_id INT PRIMARY KEY IDENTITY(1,1),
        entity_type NVARCHAR(100) NOT NULL,
        entity_id INT NOT NULL,
        insight_type NVARCHAR(100),
        content NVARCHAR(MAX),
        confidence_score DECIMAL(5, 2),
        generated_at DATETIME DEFAULT GETDATE(),
        INDEX idx_entity (entity_type, entity_id)
    );
    PRINT 'Table AIInsights created';
END
GO

-- Create Analytics table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Analytics')
BEGIN
    CREATE TABLE Analytics (
        analytics_id INT PRIMARY KEY IDENTITY(1,1),
        metric_name NVARCHAR(100) NOT NULL,
        metric_value DECIMAL(18, 2),
        metric_type NVARCHAR(50),
        dimension NVARCHAR(100),
        date_recorded DATE DEFAULT CAST(GETDATE() AS DATE),
        created_at DATETIME DEFAULT GETDATE(),
        INDEX idx_metric (metric_name, date_recorded)
    );
    PRINT 'Table Analytics created';
END
GO

-- Insert sample data for Projects
INSERT INTO Projects (title, description, status, budget, start_date, category)
VALUES 
    ('Digital Transformation Initiative', 'Complete digital transformation of business processes', 'active', 500000.00, CAST(GETDATE() AS DATE), 'Technology'),
    ('Market Expansion Project', 'Expand business operations to new markets', 'active', 750000.00, CAST(GETDATE() AS DATE), 'Business Growth'),
    ('Cost Optimization Study', 'Analyze and optimize operational costs', 'active', 100000.00, CAST(GETDATE() AS DATE), 'Operations');
GO

-- Insert sample data for Marketing Campaigns
INSERT INTO MarketingCampaigns (name, description, platform, budget, status, start_date)
VALUES 
    ('Summer Launch Campaign', 'Q3 product launch marketing campaign', 'Multi-channel', 150000.00, 'active', CAST(GETDATE() AS DATE)),
    ('Brand Awareness Initiative', 'Increase brand visibility across digital platforms', 'Digital', 200000.00, 'active', CAST(GETDATE() AS DATE)),
    ('Customer Retention Program', 'Engage existing customers with targeted content', 'Email & Social', 75000.00, 'draft', CAST(GETDATE() AS DATE));
GO

-- Insert sample data for Business Development
INSERT INTO BusinessDevelopment (opportunity_name, description, partner_name, potential_value, probability, stage)
VALUES 
    ('Strategic Partnership - TechCorp', 'Technology integration partnership', 'TechCorp Industries', 1000000.00, 75, 'negotiation'),
    ('Distribution Agreement - GlobalRetail', 'Expand retail distribution network', 'Global Retail Solutions', 500000.00, 60, 'proposal'),
    ('Joint Venture - Innovation Labs', 'Research and development collaboration', 'Innovation Labs Inc', 2000000.00, 40, 'qualification');
GO

-- Insert sample data for Data Bank
INSERT INTO DataBank (data_type, title, content, category, tags)
VALUES 
    ('report', 'Q2 Financial Analysis', 'Comprehensive financial performance analysis for Q2', 'Finance', 'finance,quarterly,analysis'),
    ('document', 'Market Research Report', 'Detailed market research findings and recommendations', 'Research', 'market,research,strategy'),
    ('template', 'Project Proposal Template', 'Standard template for project proposals', 'Templates', 'template,project,proposal');
GO

PRINT 'Database initialization completed successfully!';
PRINT 'Sample data inserted into all tables';
GO
