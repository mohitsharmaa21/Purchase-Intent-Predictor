# Purchase Intent Predictor | AI-Powered E-Commerce Insights

A premium, portfolio-quality AI SaaS frontend dashboard designed for real-time online shopper behavior prediction. This application takes digital browsing metrics, performs on-the-fly feature engineering, and connects to a deployed **Databricks Model Serving Endpoint** running a LightGBM classifier to predict whether a visitor is likely to make a purchase.

![Purchase Intent Predictor Showcase](https://raw.githubusercontent.com/mohitsharmaa21/Purchase-Intent-Predictor/main/public/showcase_preview.png) *(Placeholder for your preview screenshot)*

## 🚀 Key Features

* **Futuristic AI SaaS Styling**: Built with deep navy backdrops, custom linear SVG gradients, glowing visual nodes, animated shopper flow graphics, and glassmorphic dashboards.
* **On-the-fly Feature Engineering**: Dynamic addition-based calculators compute `TotalPages`, `TotalDuration`, `ValuePerProduct`, `ProductFocusRatio`, `ProductTimeRatio`, and `BounceExitDiff` on each keystroke before sending API requests.
* **Databricks Serving Integration**: Fully structured payload mapping that preserves the exact 34-column schema order used during model training.
* **Robust Input Validation**: Immediate validation feedback preventing negative bounds or out-of-range rates, featuring a subtle container shake animation upon validation failure.
* **Dual-Mode Theme Support**: Full Light Mode (soft gray cards and blue-purple aura) and Dark Mode (navy neon backdrops) persistence.
* **Interactive Analytics Panel**: Displays a circular Buyer Affinity Gauge, friction indicators, and metrics.
* **Session Logs & Exports**: Persisted session history tables with dynamic timestamps, download options for predictions (JSON), settings configurations (JSON), and full tables logs (CSV).
* **Graceful CORS Fallback**: If browser-direct endpoint calls fail due to CORS restrictions, it automatically falls back to local simulation mode so reviewers can still preview the dashboard flow.

---

## 📂 Project Architecture

```text
src/
 ├── components/
 │    ├── Hero.jsx              # Landing split-grid and animated Shopper Flow SVG
 │    ├── PredictionForm.jsx    # Input card fields, tooltips, validation alerts, and actions
 │    ├── FeatureSummary.jsx    # Live calculations panel
 │    ├── PredictionResult.jsx  # Intent outcome, dynamic insights, and confetti burst
 │    ├── VisualAnalytics.jsx   # Buyer Affinity gauge and ratio metrics
 │    ├── PredictionHistory.jsx # Session logs table with CSV downloaders
 │    └── ThemeToggle.jsx       # Persistent light/dark mode controller
 ├── services/
 │    └── api.js                # Databricks Serving endpoint client & mock simulation logic
 ├── utils/
 │    ├── featureEngineering.js # Addition-based calculators
 │    ├── validation.js         # Input bounds check
 │    └── samples.js            #Shopper session profile presets
 ├── styles/
 │    ├── index.css             # Light/dark variables, keyframes, scrollbars, and dot grid
 │    └── App.css               # Dashboard layout grids, input glows, and card lifts
 ├── App.jsx                    # State coordinator
 └── main.jsx                   # Mount entrypoint
```

---

## 🛠️ Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohitsharmaa21/Purchase-Intent-Predictor.git
   cd Purchase-Intent-Predictor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Compile production build**:
   ```bash
   npm run build
   ```

---

## 🔌 Connecting Your Databricks Endpoint

To connect the dashboard to your live Databricks serving model:
1. Open `src/services/api.js`.
2. Paste your endpoint URL and Personal Access Token (PAT):
   ```javascript
   export const DATABRICKS_ENDPOINT_URL = "https://your-databricks-instance/serving-endpoints/your-endpoint/invocations";
   export const DATABRICKS_TOKEN = "dapi...";
   ```
3. Save the file. The dashboard will automatically transition from local simulation to query your live API!

---

## 👨‍💻 Author

Designed & Developed by **Mohit Sharma**
* **LinkedIn**: [linkedin.com/in/mohit-sharma2005](https://www.linkedin.com/in/mohit-sharma2005)
* **GitHub**: [@mohitsharmaa21](https://github.com/mohitsharmaa21)

*Built for Machine Learning Deployment Learning and Professional Portfolio Showcases.*
