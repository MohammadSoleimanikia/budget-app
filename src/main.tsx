import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BudgetsProvider } from "./features/budgets/context/BudgetProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BudgetsProvider>
            <App />
        </BudgetsProvider>
    </StrictMode>,
);
