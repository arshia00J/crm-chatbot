# CRM Chatbot — Frontend

This is the **frontend** for the CRM Chatbot web application, built using **Next.js (App Router)**. It provides a chat interface, session management UI, and authentication logic. Zustand is used for global state (auth/session), and TailwindCSS handles styling.

---

## 🚀 Features

- 🔐 JWT Authentication (client-side + token validation on load)
- 💬 Chat sessions (create, select, delete)
- 🧠 Zustand for global state management
- 🎨 TailwindCSS for styling + Material UI icons
- 🧭 App Router with dynamic routes and loading states
- 📦 Modular, scalable architecture


---

## 🛠️ Setup & Development

### 1. Install Dependencies

```bash
cd crm-chatbot
npm install
````

### 2. Configure API Base URL



### 3. Run the Development Server

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🔒 Authentication Flow

* User logs in → token is stored in `localStorage`
* On load, app checks and validates token with backend
* Zustand stores user state globally
* Protected routes/components depend on `authStore` state

---

## ⚙️ Tech Stack

* [Next.js 14 (App Router)](https://nextjs.org/docs/app)
* [React 18](https://reactjs.org/)
* [Zustand](https://github.com/pmndrs/zustand)
* [TailwindCSS](https://tailwindcss.com/)
* [Material UI Icons](https://mui.com/material-ui/material-icons/)

---

## 📌 TODO (Frontend)


* [ ] Add error handling UI
* [ ] Show loading indicators per API call
* [ ] Enhance chat experience (typing indicator, streaming response)
* [ ] Add dark mode toggle

---

## 📄 License

MIT — use freely for personal or commercial projects.

