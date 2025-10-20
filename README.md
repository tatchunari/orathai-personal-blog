# 🌸 Orathai.Blog — Personal Blog Website

A full-stack personal blog platform where I share the stories, interests, and experiences that shaped who I am.  
This website showcases my development journey, hobbies, and personal reflections — built with a modern stack combining **React 19**, **Tailwind**, and **Supabase**.

---

## 🖥️ Tech Stack

### Frontend

- ⚛️ **React 19**
- 🎨 **Tailwind CSS**
- 🧩 **Shadcn UI**
- 🔗 **Axios**
- 🧭 **React Router**
- 🪶 **Lucide Icons**

### Backend

- 🟢 **Express.js**
- 🐘 **Supabase** (Database & Auth)

Both client and server are deployed separately on **Vercel**.

---

## ✨ Features

### 👤 User

- Sign up / Log in / Log out
- Edit profile & reset password
- View articles by category
- Like and comment on articles

### 🔑 Admin

- Sign up / Log in / Log out
- Edit profile & reset password
- Create / Edit / Delete articles
- Create / Edit categories

---

## 🚀 Deployment

The project is fully deployed on **Vercel**.  
👉 [Live Demo](https://orathai-personal-blog.vercel.app/)

---

## 🧠 How to Run Locally

> ⚠️ Note: Environment variables are private and not shared publicly.

If you’d like to explore the admin dashboard:

---
```
orathai-blog/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI and page components
│ │ ├── context/ # Auth Context
│ │ ├── data/ # mock data
│ │ ├── hooks/ # custom hooks
│ │ ├── lib/ # supabase client & upload image helper
│ │ ├── pages/ # Page routes
│ │ ├── utils/ # jwtInterceptor
│ │ ├── styles/ # Tailwind setup
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Express backend
│ ├── apps/ # API routes
│ ├── middlewares/ # data validation
│ ├── utils/ # connection pool
│ └── app.mjs
│
└── README.md
```
