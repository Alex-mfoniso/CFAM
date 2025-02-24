project structure

public/ – Stores static assets like images, manifest files, and favicons.
src/ – The core app code.
assets/ – Stores images, fonts, and icons.
components/ – Houses reusable UI components (buttons, headers, footers, etc.).
layouts/ – Defines common layouts (e.g., MainLayout.jsx, AuthLayout.jsx).
pages/ – Each React page (Home.jsx, Sermons.jsx, Events.jsx, etc.).
hooks/ – Custom React hooks (e.g., useAuth.js, useFetch.js).
contexts/ – Global state management using React Context API.
services/ – Handles API calls (e.g., fetching sermons, events).
utils/ – Helper functions like date formatting, form validation.
styles/ – Global styles or Tailwind customization files.
routes/ – Handles route configurations for react-router-dom.
config/ – Holds configuration files (e.g., Firebase, API endpoints).
.env – Stores environment variables like API keys.
index.html – The main HTML entry file for the React app.
vite.config.js – Vite’s configuration file.