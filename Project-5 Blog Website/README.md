# Blog Mag 📝

A full-stack blogging platform built with **React (Vite), Node.js, Express, and MongoDB**.

---

## 🚀 Features

- 🔐 Authentication (JWT + Cookies)
- ✍️ Create, Edit, Delete Posts
- 🖼️ Image Upload (Multer)
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
- Multer (File Uploads)

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
uploads/
```

---

## 🔑 Environment Variables

### Backend
Create `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
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
- Cookie-based View Tracking

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