# WanderNest

WanderNest is a full-stack travel and stay listing web application built with **Node.js** and **Express.js**.  
It enables users to discover, share, and manage travel accommodations through a modern and user-friendly interface.
---

## Features

- User authentication (Signup / Login)
- Owners can create, edit, and delete their own listings
- Create listings with complete details:
  - Title  
  - Description  
  - Image upload  
  - Location  
  - Price  
- Browse all available stays
- View detailed listing pages
- Logged-in users can add reviews to listings
- Users can only delete **their own reviews**
- Review system with user name & comments
- Secure authorization for listings and reviews
- Modern and responsive navbar & footer UI

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Image Storage:** Cloudinary
- **Other:** Mongoose, Multer

---

## Project Structure
WanderNest/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── app.js
├── package.json
├── .env
└── README.md

---

## ⚙ Installation

1. **Clone the repository**
```bash
# git clone https://github.com/your-username/WanderNest.git

2. Go to project folder
 - cd WanderNest

3. Install dependencies
 - npm install

4. Create a .env file
 - MONGO_URL=your_mongodb_url
 - CLOUDINARY_CLOUD_NAME=your_cloud_name
 - CLOUDINARY_KEY=your_key
 - CLOUDINARY_SECRET=your_secret
 - SESSION_SECRET=your_secret

5. Run the project
 - nodemon app.js

## Usage

  Open browser and go to: http://localhost:8080
  - Sign up / Login
  - Create listings
  - Explore stays
  - Add reviews