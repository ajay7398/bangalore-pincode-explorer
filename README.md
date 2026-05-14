#  Bengaluru Pincode Explorer

An interactive full-stack map application to explore Bengaluru's 25 localities and pincodes across the **2026 five-corporation municipal structure**.

---

##  Project Structure

```
bangalore-pincode-explorer/
├── backend/
│   ├── main.py            # FastAPI REST API
│   ├── pincodes.json      # Dataset (25 areas)
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── components/
│   │       ├── MapView.js 
│   │       ├── SearchBar.js 
│   │       ├── InfoPanel.js
│   │       └── Sidebar.js 
│   └── package.json
├── start-backend.sh
├── start-frontend.sh
└── README.md
```

---

##  Quick Start (VS Code)

You need **two terminals** open simultaneously.

### Terminal 1 — Backend (Python / FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend runs at: **http://localhost:8000**

### Terminal 2 — Frontend (React)

```bash
# Requires Node.js 16+
cd frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

##  API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `GET /api/areas` | GET | All 25 areas |
| `GET /api/lookup?pincode=560034` | GET | Lookup by pincode |
| `GET /api/lookup?area=Koramangala` | GET | Lookup by area name (supports partial match) |

---

##  The 5 Corporations (2026)

| Corporation | Color | Key Areas |
|---|---|---|
| Bengaluru Central |  Orange | Cubbon Park, Chickpet, Gandhi Nagar |
| Bengaluru East |  Cyan | Whitefield, Indiranagar, Marathahalli |
| Bengaluru West |  Purple | Rajajinagar, Basavanagudi, Yeshwanthpur |
| Bengaluru North |  Green | Yelahanka, Hebbal, Devanahalli |
| Bengaluru South |  Rose | Koramangala, BTM Layout, Electronic City |

---

##  Features

- **Interactive Map** — Leaflet.js dark map with color-coded markers per corporation
- **Click any marker** → popup with area name, pincode, corporation
- **Search by pincode** → map zooms & highlights the area
- **Search by area name** → supports partial matching (e.g. "Korama" finds Koramangala)
- **Info panel** → styled card showing area details with coordinates
- **Sidebar** → filterable list of all areas, filterable by corporation
- **Mobile responsive** — works on phones and tablets

---

##  Tech Stack

- **Frontend**: React 18, react-leaflet, Leaflet.js
- **Backend**: Python, FastAPI, Uvicorn
- **Map tiles**: CartoDB Dark Matter
- **Fonts**: Syne (display), DM Mono, DM Sans
