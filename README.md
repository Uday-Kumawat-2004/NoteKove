# 📝 NoteKove

> A **full-stack note-taking app** with labels, checklists, archive/trash, search, and authentication.
> Built with **React (Vite)** on the frontend and **Node.js/Express + MongoDB** on the backend.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646cff?logo=vite" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4ea94b?logo=mongodb" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## ✨ Features

✅ Authentication (signup/signin with JWT + cookies)
✅ Create / Edit / Delete notes
✅ Labels & color coding
✅ Rich text editor + checklist support
✅ Archive & Trash functionality (auto-clean with cron)
✅ Search notes (server-side regex search)
✅ Dark / Light mode toggle
✅ Responsive, animated UI (Framer Motion)

---

## ⚙️ Tech Stack

* **Frontend:** React 19, Vite, React Router, Tailwind CSS, Draft.js, Framer Motion
* **Backend:** Node.js, Express 5, MongoDB/Mongoose
* **Auth:** JWT + Cookie based sessions
* **Extras:** node-cron (auto cleanup), validator (password rules)

---

## 📂 Monorepo Layout

```
NoteKove/
  ├── Backend/    # Express API + MongoDB
  └── Frontend/   # React app (Vite)
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js **18+**
* npm **9+**
* MongoDB database (local or Atlas)

### ▶️ Backend Setup

```bash
cd Backend
npm install
```

Create `.env` in `Backend/`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace_this_with_a_long_random_secret
Port=5000
```

Run server:

```bash
# Dev
npm run dev
# Prod
npm start
```

---

### 🎨 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)**.
Make sure backend CORS allows this origin + cookies.

---

## 🔑 Authentication Flow

* `POST /api/users/signup` → register new user
* `POST /api/users/signin` → sets **httpOnly JWT cookie**
* Protected routes require the cookie
* Strong password validation via `validator.isStrongPassword`

---

## 📑 API Reference

<details>
<summary><b>Auth</b></summary>

* **Signup** → `POST /api/users/signup` `{ name, email, password }`
* **Signin** → `POST /api/users/signin` `{ email, password }`

</details>

<details>
<summary><b>Notes</b></summary>

* `POST /api/notes` → create note
* `GET /api/notes` → fetch notes (with filters `trashed=true`, `archived=true`)
* `PUT /api/notes/:id` → update
* `DELETE /api/notes/:id` → soft delete (move to trash)
* `PUT /api/notes/restore/:id` → restore
* `GET /api/notes/search?q=term` → search

</details>

<details>
<summary><b>Labels</b></summary>

* `POST /api/labels` `{ labelName }`
* `GET /api/labels`
* `PUT /api/labels/:id` `{ newName }`
* `DELETE /api/labels/:id`

</details>

---

## 🖼 Frontend Highlights

* Pages: Home, Archive, Trash, Labels, Search, Auth (Signin/Signup)
* Components: Rich text editor, checklist UI, label/tag manager
* Hooks: `useGetNotes`, `useUpdateNote`, `useGetLabels`

---

## 🧭 Roadmap

🚧 Coming Soon:

* 👤 **Profile management** (update picture, name, password, account settings)
* ⏰ **Reminders** (date/time picker, dedicated reminders page, optional notifications)
* 🖼 **Image support in notes** (upload + preview)
* 🎨 **UI polish** (keyboard shortcuts, animations, accessibility, empty states)
* ⚡ **Performance** (debounced autosave, pagination, optimistic updates)
* ✅ **Testing** (unit + e2e smoke tests)

---

## 🤝 Contributing

Pull requests are welcome! Please:

* Use [conventional commits](https://www.conventionalcommits.org/)
* Keep PRs focused and documented
* Run linters before pushing

---

## 📜 License

MIT © 2025 [Uday Kumawat](https://github.com/Uday-Kumawat-2004)
