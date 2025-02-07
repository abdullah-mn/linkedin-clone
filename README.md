# LinkedIn Clone

A full-stack LinkedIn clone web application that mimics the core features of LinkedIn, such as user authentication, profile creation, posting updates, connecting with others, and more.

## Features

- **User Authentication**
  - Register and login functionality with secure password hashing.
  - Authentication via JWT (JSON Web Tokens).

- **Profile Management**
  - View and edit personal profiles.
  - Add profile details like about, experience, education, and skills.

- **Posts and Feed**
  - Create, edit, and delete posts.
  - View posts from connections.

- **Connections**
  - Send, accept and reject connection requests.
  - View and manage your network.

- **Notifications**
  - Receive notifications for likes and comments on posts.
  - Notifications for connection requests.
  - Ability to delete and mark notifications as read.

- **Responsive Design**
  - Optimized for both desktop and mobile devices.

## Tech Stack

### Frontend
- React.js
- Tanstack react query (for state management)
- Tailwind CSS
- DaisyUI
- Lucide React (for icons)
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB (database)

### Tools & Libraries
- Vite (build tool)
- JSON Web Token (JWT) for authentication
- Cloudinary (file uploads for profile pictures)

## Future Enhancements

- **Advanced Search**: Implement advanced search functionality to filter users and posts.
- **Video Posts**: Enable users to upload and share videos as part of their posts.
- **Dark Mode**: Add a toggle for dark mode to enhance user experience.
- **Sub-comments and Likes on Comments**: Allow users to add sub-comments and like individual comments.
- **Multiple Reactions**: Implement various post reactions (e.g., love, celebrate, insightful) instead of just likes.
