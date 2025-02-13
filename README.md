# 📊 Vega Financial Portfolio

Vega Financial Portfolio is a **React + TypeScript** application designed to display a **financial portfolio** in a user-friendly dashboard. The application provides a breakdown of assets via a **Donut Chart**, a **Positions Table**, and a **Historical Performance Chart**.

## 🚀 Features

- **🔐 Authentication**: Simple login mechanism using `localStorage`.
- **📊 Interactive Dashboard**:
  - **Portfolio Donut Chart**: Displays asset allocation with a toggle between individual assets and asset classes.
  - **Positions Table**: Shows current holdings with detailed asset breakdowns.
  - **Historical Performance Chart**: Tracks portfolio value over time.
- **🎨 Vega-Alts Inspired Theme**: Modern, responsive UI styled with **Tailwind CSS**.
- **⚡ Optimized Data Fetching**: Uses a custom `usePortfolioData` hook to fetch and manage API data.
- **🛠️ Modular Components**: Reusable UI components for buttons, cards, and containers.

---

## 🏗️ **Installation & Setup**
Follow these steps to set up and run the application.

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/danielstangaciu/vega-financial-portfolio.git
cd vega-financial-portfolio
```

### 2️⃣ **Install Dependencies**
Ensure you have **Node.js** installed (>= 16.x recommended). Then, install dependencies:
```sh
npm install
```

### 3️⃣ **Run JSON Server (Mock API)**
The app uses **JSON Server** to simulate a backend API.

To start the API:
```sh
npx json-server --watch db.json --port 3000
```

This will serve mock API data on `http://localhost:3000`.

### 4️⃣ **Start the Development Server**
Once the mock API is running, start the **React app**:
```sh
npm start
```
This will open the app in your browser at:
```
http://localhost:5173
```

### 5️⃣ **Ensure TailwindCSS Works Correctly**
Since we are using TailwindCSS with Vite, ensure that your Tailwind setup is correct. If Tailwind styles do not apply, run:
```sh
npx tailwindcss -o output.css --watch
```

If there are issues with `@apply`, make sure to use `@tailwind reference` instead.

---

## 📂 **Project Structure**
```
vega-financial-portfolio/
│── public/                 # Static assets
│── src/
│   ├── components/         # UI Components (Buttons, Cards, Charts, etc.)
│   ├── context/            # Authentication Context
│   ├── hooks/              # Custom Hooks (usePortfolioData)
│   ├── pages/              # Page Components (Login, Dashboard)
│   ├── services/           # API Service Functions
│   ├── styles/             # Global Styles (index.css)
│   ├── App.tsx             # Main Application Entry
│   ├── main.tsx            # React Bootstrap File
│── db.json                 # Mock API Data
│── tailwind.config.ts       # Tailwind CSS Configuration
│── tsconfig.json           # TypeScript Configuration
│── vite.config.ts          # Vite Configuration
│── README.md               # This file
```

---

## 🔑 **Authentication**
- **Username**: `admin`
- **Password**: `password`
- Credentials are stored in **localStorage**.

---

## 📡 **API Endpoints**
This project uses `JSON Server` to mock API responses.

| Endpoint                 | Description                                    |
|--------------------------|------------------------------------------------|
| `GET /assets`           | Fetches all available assets                   |
| `GET /prices`           | Fetches latest prices for assets               |
| `GET /portfolios`       | Fetches portfolio holdings                     |

---

## 🛠️ **Built With**
- ⚡ **[React](https://reactjs.org/)** - Frontend Library
- ⚡ **[TypeScript](https://www.typescriptlang.org/)** - Static Typing
- ⚡ **[Tailwind CSS](https://tailwindcss.com/)** - Styling Framework
- ⚡ **[Recharts](https://recharts.org/)** - Data Visualization
- ⚡ **[Vite](https://vitejs.dev/)** - Build Tool
- ⚡ **[JSON Server](https://github.com/typicode/json-server)** - Mock API

---

## 🎨 **Styling & UI Enhancements**
- The application follows **Vega-Alts theme** with modern, gradient-based UI.
- All **UI components** (Buttons, Cards, Containers) are centralized for **consistency**.
- **TailwindCSS is used** with `@tailwind reference` instead of `@apply`.
- **Colors, Fonts, and Theme** match Vega-Alts.

### **Current Features Implemented**:
- ✅ Dark mode-friendly UI with high contrast.
- ✅ Fully responsive and mobile-friendly.
- ✅ Interactive dashboard with tabs for better user experience.
- ✅ Improved button interaction (hover/focus effects).

---

## 🎯 **Next Steps**
- ✅ Enhance UI components for **better user experience**.
- ✅ Improve **error handling** and **loading states**.
- ✅ Implement **persistent authentication**.
- 🚀 Possible integration with a **real API** in future updates.

---

## 🤝 **Contributing**
Pull requests are welcome! To contribute:
1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

## 📜 **License**
This project is licensed under the **MIT License**.

---

## 🎉 **Acknowledgments**
Thanks to **Vega-Alts** for design inspiration! 🎨










# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
