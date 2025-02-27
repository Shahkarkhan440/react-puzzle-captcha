import { createRoot } from "react-dom/client"; // ✅ Use named import
import App from "./App"; 
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Bootstrap JS

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement); // ✅ Use createRoot

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
