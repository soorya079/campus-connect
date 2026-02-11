# Campus Connect

A MERN stack platform for educational institutions featuring lost items reporting, problem reporting, and book sharing between students.

## Features

- **Lost & Found**: Students can report lost items with images and descriptions, and help others find their belongings
- **Problem Reporting**: Report institutional problems and student requirements with voting and comment systems
- **Book Sharing**: Senior students (year 3+) can share their books with juniors
- **User Authentication**: Secure registration and login system
- **Role-based Access**: Different permissions for students, staff, and admins

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for image uploads
- Helmet for security
- Rate limiting and validation

### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for components
- React Router for navigation
- React Query for data fetching
- React Hook Form for forms
- Context API for state management

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-connect
   ```

2. **Install dependencies**
   ```bash
   # Install main project dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file in backend
   cd backend
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/campus-connect
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLIENT_URL=http://localhost:3000
   ```

## Running the Application

1. **Start MongoDB**
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # Or manually
   mongod --dbpath /path/to/your/db/directory
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `POST /api/lost-items` - Create lost item (authenticated)
- `GET /api/lost-items/:id` - Get single lost item
- `PUT /api/lost-items/:id` - Update lost item (owner only)
- `DELETE /api/lost-items/:id` - Delete lost item (owner only)

### Problems
- `GET /api/problems` - Get all problems
- `POST /api/problems` - Create problem (authenticated)
- `GET /api/problems/:id` - Get single problem
- `POST /api/problems/:id/vote` - Vote on problem (authenticated)
- `POST /api/problems/:id/comment` - Add comment (authenticated)

### Books
- `GET /api/books` - Get all available books
- `POST /api/books` - Create book (seniors only)
- `GET /api/books/:id` - Get single book
- `POST /api/books/:id/request` - Request book (authenticated)
- `POST /api/books/:id/like` - Like/unlike book (authenticated)

## User Roles

- **Student**: Can report lost items, problems, and request books
- **Senior Student** (Year 3+): All student privileges + can share books
- **Staff**: Can manage problem statuses
- **Admin**: Full access to all features and user management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/campus-connect](https://github.com/yourusername/campus-connect)
