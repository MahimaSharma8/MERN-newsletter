
# Unified News Management Platform

A web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) to centralize news management, event promotion, and community engagement for colleges, organizations, and large institutions. This platform integrates Big Data technologies to manage extensive datasets, providing efficient information dissemination and enhanced community interaction.

## Features

- **Role-Based Access Control**: Users can authenticate and access the platform based on their role (Admin/User).
- **Real-Time Search**: Powered by MongoDB Atlas Search for quick retrieval of news articles, event details, and user-generated content.
- **Article Submission and Management**: Users can submit articles, and admins can review, approve, or reject them.
- **Analytics Dashboard**: Visualizations (line, bar, donut charts) to monitor engagement trends, author comparisons, and keyword analysis.
- **Responsive Interface**: Built with React.js and Tailwind CSS for a dynamic, user-friendly experience across devices.
- **Interactive Wordle Game**: Engages users with word challenges related to trending articles and keywords.

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, with Atlas Search integration for full-text search
- **Big Data Integration**: Hadoop HDFS and MapReduce for scalable storage and processing
- **Visualization**: D3.js for interactive data charts

## Installation

### Prerequisites

- **Node.js**: Version 16.x or higher
- **MongoDB Atlas**: For database management and Atlas Search functionality
- **Hadoop**: For large-scale data storage and processing (optional based on data size requirements)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unified-news-management-platform.git
   ```
2. Install dependencies:
   ```bash
   cd unified-news-management-platform
   npm install
   ```
3. Set up MongoDB Atlas and configure connection in `.env` file:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Sign In**: Access the application using role-based credentials (Admin/User).
- **Dashboard**: Navigate to the Admin or User dashboard to manage content and view analytics.
- **Article Submission**: Submit articles for review or manage personal article submissions via the User dashboard.
- **Data Analytics**: Admins can view engagement insights on articles, authors, and keyword trends.

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **MongoDB Documentation**: [MongoDB Documentation](https://www.mongodb.com/docs/)
- **React.js Documentation**: [React.js Documentation](https://reactjs.org/docs/)
- **Node.js Documentation**: [Node.js Documentation](https://nodejs.org/en/docs/)
- **Express.js Documentation**: [Express.js Documentation](https://expressjs.com/)
