// currency rate conversion
const rates = {
    PKR: 1,
    USD: 1 / 278.50,
    GBP: 1 / 355.00
};

// base price of plans in pkr
const monthlyPrices = {
    starter: 2400,
    growth: 4800,
    scale: 9600,
    dedicated: 19500
};

// elements
const currencySelect = document.getElementById("currency");
const toggleBtns = document.querySelectorAll(".toggle-btn");
const cards = document.querySelectorAll(".card");
const announcement = document.getElementById("price-announcement");
const selectPlanBtns = document.querySelectorAll("[data-select-plan]");

// state
let currency = localStorage.getItem("vps-currency") || "PKR";
let period = localStorage.getItem("vps-period") || "monthly";
let selectedPlan = localStorage.getItem("vps-selected-plan") || "growth";

// Event Listeners
if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
        currency = e.target.value;
        localStorage.setItem("vps-currency", currency);
        updateDisplay();
    });
}

toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Update active class
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Update state
        period = btn.dataset.period;
        localStorage.setItem("vps-period", period);
        updateDisplay();
    });
});

selectPlanBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        if (card && card.dataset.plan) {
            setSelectedPlan(card.dataset.plan);
        }
    });
});