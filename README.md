# Job Application Tracking System

A simple job application system built with HTML, Node.js, Express, and MySQL for college projects.

## Features

- ✅ Clean and responsive HTML form
- ✅ Node.js backend with Express
- ✅ MySQL database integration
- ✅ RESTful API endpoints
- ✅ Form validation
- ✅ Success/Error messages

## Prerequisites

- Node.js installed (v14 or higher)
- MySQL installed and running
- Basic knowledge of terminal/command line

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Run the SQL script to create the database and table:

```bash
mysql -u root -p < database.sql
```

Or manually run in MySQL Workbench or command line:
```sql
source database.sql;
```

### 3. Configure Environment Variables

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Edit `.env` and update with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=job_application_db
PORT=3000
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### 5. Access the Application

Open your browser and go to:
```
http://localhost:3000/index.html
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Submit a new job application |
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/:id` | Get single application by ID |
| PATCH | `/api/applications/:id/status` | Update application status |
| DELETE | `/api/applications/:id` | Delete an application |
| GET | `/api/health` | Server health check |

## Form Fields

- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Position Applied For (required)
- Years of Experience (required)
- Highest Education (required)
- Cover Letter (required)
- Resume/CV Link (optional)

## Database Schema

**Table: applications**

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| full_name | VARCHAR(255) | Applicant's full name |
| email | VARCHAR(255) | Email address |
| phone | VARCHAR(50) | Phone number |
| position | VARCHAR(255) | Position applied for |
| experience | INT | Years of experience |
| education | VARCHAR(100) | Highest education level |
| cover_letter | TEXT | Cover letter content |
| resume | VARCHAR(500) | Resume link (optional) |
| status | ENUM | Application status (Pending, Under Review, Accepted, Rejected) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Troubleshooting

### Database Connection Error

If you see database connection errors:
1. Make sure MySQL is running
2. Check your `.env` credentials
3. Verify the database `job_application_db` exists

### Port Already in Use

If port 3000 is already in use, change the PORT in `.env` file:
```env
PORT=3001
```

### CORS Errors

The server has CORS enabled by default. If you still face issues, check your browser console.

## Project Structure

```
job-application-tracking/
├── index.html          # Frontend form
├── server.js           # Backend server
├── package.json        # Dependencies
├── database.sql        # Database schema
├── .env.example        # Environment template
└── README.md          # Documentation
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Libraries**: cors, body-parser, dotenv, mysql2

## License

MIT License - Free for educational and commercial use
