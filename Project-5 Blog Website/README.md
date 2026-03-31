# Blog Mag 📝

A full-stack blogging platform built with **React (Vite), Node.js, Express, and MongoDB**.

---

## 🚀 Features

- 🔐 Authentication (JWT + localStorage)
- ✍️ Create, Edit, Delete Posts
- 🖼️ Image Upload (Cloudinary)
- 🏷️ Categories & Tags
- 🔍 Search & Advanced Filters
- 📊 Popular Posts (View Count)
- 💬 Comment System
- 📱 Fully Responsive UI
- ⚡ Debounced Search
- 🧠 Optimized Backend Queries

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Multer + Cloudinary (File Uploads)

---

## 📁 Project Structure

### Frontend
```
src/
  components/
  pages/
  context/
  api/
```

### Backend
```
models/
controllers/
routes/
middlewares/
config/
```

---

## 🔑 Environment Variables

### Backend
Create `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```
### Frontend
Create `.env` file in frontend:

```
VITE_API_URL=your_api_url
```

---

## ▶️ Run Project

### Backend
```
npm run server
```

### Frontend
```
npm run dev
```

---

## 🔐 Authentication Note (Important)

Originally authentication was implemented using **cookies**, but due to **cross-origin issues (Vercel frontend + Render backend)** and limitations on some devices (especially iOS Safari), the project now uses:

👉 **JWT stored in localStorage**

### How it works:
- On login → JWT is stored in `localStorage`
- Token is sent via `Authorization` header:
```
Authorization: Bearer <token>
```
- Backend verifies token using middleware

### Why this change?
- Cookies require same-origin or complex CORS setup
- iOS browsers block third-party cookies
- localStorage works reliably across deployments

---

## 🖼️ Image Upload (Cloudinary)

Images are uploaded using **Cloudinary instead of local storage**.

### Why Cloudinary?

- No file loss on server restart (Render safe)
- Fast CDN delivery
- Scalable and production-ready
- Works across different origins (Vercel + Render)

### Flow:

```
Frontend → Backend → Cloudinary → URL → MongoDB
```

### Stored in DB:

```
{
  "image": "https://res.cloudinary.com/.../image.jpg"
}
```

---

## 📌 API Features

- `GET /api/posts`
- `GET /api/posts/:slug`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

### Filters Supported

```
/api/posts?sort=popular&category=webdev&tags=react,node&from=2024-01-01&to=2024-02-01
```

---

## 📈 Advanced Features

- View Count Tracking
- Debounced Search
- Dynamic Filtering
- Optimistic UI Updates
- localStorage-based Authentication
- Cloud-based Image Storage

---

## 📸 Screens

- Home Page
- Dashboard
- Single Post
- About & Contact

---

## 🧠 Future Improvements

- Likes System
- Nested Comments (Replies)
- Bookmark Feature
- Dark/Light Mode
- Real-time Notifications

---

## 👨‍💻 Author

Mahesh Chaudhary

---

## ⭐ If you like this project

Give it a star on GitHub ⭐