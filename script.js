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
const announcement = document.getElementById("announcement");
const selectPlanBtns = document.querySelectorAll("[data-select-plan]");

