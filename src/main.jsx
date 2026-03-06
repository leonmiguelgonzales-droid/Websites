import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

**STEP 6 — Test it locally**

In Command Prompt (make sure you're inside the `sop-website` folder):
```
npm run dev