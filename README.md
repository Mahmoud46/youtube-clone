# 📺 YouTube Clone

A simplified YouTube-like video streaming application built with **React.js**, **TypeScript**, **SASS**, and **React Router**. It fetches video data using the **YouTube Data API** and presents it in a clean, responsive UI — no authentication required.

---

## 🚀 Features

- 🖥️ **Video Playback Page** – Watch selected videos on a dedicated watch screen.
- 🧭 **Routing with React Router** – Smooth navigation between the home page and video details.
- 🎨 **SASS Styling** – Clean, modular, and responsive design using SCSS.
- 🌐 **Data Fetching** – Uses `fetch` to retrieve data directly from the YouTube API.
- 💡 **No Authentication Required** – Open access to browse and watch content.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + TypeScript
- **Styling:** SASS (SCSS)
- **Routing:** React Router DOM
- **API:** [YouTube Data API v3](https://developers.google.com/youtube/v3)

---

## 🔑 YouTube API Key

To use the YouTube API, you'll need an API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable **YouTube Data API v3**
3. Create an API key and add it to your `.env` file:

```env
VITE_YOUTUBE_API_KEY = your_youtube_api_key
```

---

# 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Mahmoud46/youtube-clone.git
cd youtube-clone
```

2. Install dependencies:

```bash
npm install
```

3. Add your `.env` file:<br/>
   Create a `.env` in the root directory and add:

```env
VITE_YOUTUBE_API_KEY = your_youtube_api_key
```

4. Start the development server:

```bash
npm run dev
```

---

# 📁 Folder Structure

```bash
src/
├── apis/
│   └── YouTubeEndpoints.api.ts
├── assets/
├── components/        # Reusable components
├── interfaces/
├── pages/             # Main pages (Home, Watch)
├── styles/            # SCSS modules
├── utils/
├── App.tsx
└── main.tsx
```
