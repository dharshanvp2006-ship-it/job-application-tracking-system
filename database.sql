-- Create database
CREATE DATABASE IF NOT EXISTS job_application_db;

-- Use the database
USE job_application_db;

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    position VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    education VARCHAR(100) NOT NULL,
    cover_letter TEXT NOT NULL,
    resume VARCHAR(500),
    status ENUM('Pending', 'Under Review', 'Accepted', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Insert sample data (optional, can be removed)
INSERT INTO applications (full_name, email, phone, position, experience, education, cover_letter, resume, status) VALUES
('John Doe', 'john.doe@example.com', '+1234567890', 'Software Engineer', 3, 'Bachelor\'s Degree', 'I am passionate about software development...', 'https://example.com/resume1', 'Pending'),
('Jane Smith', 'jane.smith@example.com', '+1987654321', 'Web Developer', 5, 'Master\'s Degree', 'With 5 years of experience in web development...', 'https://example.com/resume2', 'Under Review');

-- Display success message
SELECT 'Database and table created successfully!' AS message;
