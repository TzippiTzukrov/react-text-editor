# React Text Editor (with Keyboard Manager)

A modern, lightweight **React-based text editor** with a fully integrated **keyboard panel**, live styling controls, and an intuitive login/signup flow.

✅ **Live demo:** https://TzippiTzukrov.github.io/react-text-editor

---

## 🚀 What it is

This project is a clean, responsive text editor built with **React + Vite**, featuring:

- ✅ A **real-time text editor** with styling controls (font, color, emoji, undo/redo)
- ✅ A **virtual keyboard manager** that mirrors keyboard input and provides a customizable typing experience
- ✅ A **login/signup UI** with local storage user persistence
- ✅ A **password visibility toggle** inside the password field
- ✅ Fully responsive layout with polished UI transitions

---

## 🧩 Key Features

### ✍️ Editor + Formatting
- Rich text typing area
- Font selection, text color and background controls
- Undo/redo history

### 🎹 Keyboard Manager
- Virtual keyboard display that responds to typed keys
- Custom styling controls for keyboard appearance

### 🔐 Auth Flow
- Login / Signup forms
- Uses `localStorage` to remember users
- Includes password visibility toggle icon inside the password field

---

## 🛠 Tech Stack

- **React 19**
- **Vite**
- **CSS Modules** (plain `.css` files)
- **GH Pages** for deployment

---

## 🏁 Getting Started

### 1) Install

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

> Open http://localhost:5173/ (default Vite dev server)

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build locally

```bash
npm run preview
```

---

## 🚀 Deploy (GitHub Pages)

This project is configured to deploy to GitHub Pages using `gh-pages`.

```bash
npm run deploy
```

Live demo: **https://TzippiTzukrov.github.io/react-text-editor**

---

## 🧱 Project Structure

- `src/` - source code
  - `components/` - reusable UI components
  - `components/Login/` - login/signup form
  - `components/KeyboardManager/` - keyboard panel + controls
  - `App.jsx` - root app component

---

## 🧪 Future Enhancements (Ideas)

- Add **server-side authentication** instead of local storage
- Support **rich text formatting** (bold, italics, lists)
- Add **keyboard shortcuts** for editor actions
- Add **export/import** (TXT/MD)

---

## 📄 License

MIT License — feel free to use, adapt, and extend.
