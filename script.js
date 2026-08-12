// currency rates
const rates = {
  PKR: 1,
  USD: 1 / 278.50,
  GBP: 1 / 355.00
};

// currency 
const symbols = {
  PKR: "₨",
  USD: "$",
  GBP: "£"
};

// elements
const currencySelect = document.getElementById("currency");
const toggleBtns = document.querySelectorAll(".toggle-btn");
const cards = document.querySelectorAll(".card");
const selectPlanBtns = document.querySelectorAll("[data-select-plan]");
const announcement = document.getElementById("price-announcement");

// state
let currency = localStorage.getItem("vps-currency") || "PKR";
let period = localStorage.getItem("vps-period") || "monthly";
let selectedPlan = localStorage.getItem("vps-selected-plan") || "growth";

// initialize
if (currencySelect) {
  currencySelect.value = currency;
}

toggleBtns.forEach(btn => {
  if (btn.dataset.period === period) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
});

updateDisplay();
setSelectedPlan(selectedPlan, false);

// event Listeners
if (currencySelect) {
  currencySelect.addEventListener("change", (e) => {
    currency = e.target.value;
    localStorage.setItem("vps-currency", currency);
    updateDisplay();
  });
}

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // update active class
    toggleBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    // update state
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

// mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeNavDropdowns() {
  document.querySelectorAll(".nav-item.open").forEach(item => {
    item.classList.remove("open");
    const btn = item.querySelector(".nav-parent");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    if (!isOpen) closeNavDropdowns();
  });
}

document.querySelectorAll(".nav-parent").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".nav-item");
    if (!item) return;

    const isOpen = item.classList.contains("open");
    closeNavDropdowns();

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// FAQs
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    
    btn.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;
    
    const span = btn.querySelector("span");
    if (span) {
      span.textContent = isExpanded ? "+" : "−";
    }
  });
});

// helper functions
function updateDisplay() {
  cards.forEach(card => {
    const priceEl = card.querySelector(".price");
    const basePkr = Number(priceEl?.dataset.monthlyPkr);
    if (!Number.isFinite(basePkr)) return;
    
    const symbolEl = card.querySelector(".currency-symbol");
    const periodEl = card.querySelector(".period");
    const annualInfo = card.querySelector(".annual-info");
    const oldPriceEl = card.querySelector(".old-price");
    const saveTextEl = card.querySelector(".save-text");
    const originalPkr = basePkr * 1.35;
    const savePercent = Math.round(((originalPkr - basePkr) / originalPkr) * 100);
    
    if (symbolEl) {
      symbolEl.textContent = symbols[currency];
    }

    if (oldPriceEl) {
      oldPriceEl.textContent = `${symbols[currency]}${formatNumber(originalPkr)}`;
    }

    if (saveTextEl) {
      saveTextEl.textContent = `Save ${savePercent}%`;
    }
    
    if (period === "monthly") {
      const converted = basePkr * rates[currency];
      priceEl.textContent = formatNumber(converted);
      periodEl.textContent = "/mo";
      annualInfo.textContent = "";
    } else {
      // annual logic: charge for 10 months, divide by 12 for monthly rate
      const annualTotalPkr = basePkr * 10;
      const effectiveMonthlyPkr = annualTotalPkr / 12;
      
      const convertedMonthly = effectiveMonthlyPkr * rates[currency];
      const convertedAnnual = annualTotalPkr * rates[currency];
      const convertedSave = (basePkr * 2) * rates[currency];
      
      priceEl.textContent = formatNumber(convertedMonthly);
      periodEl.textContent = "/mo";
      
      annualInfo.innerHTML = `
        Annual total: ${symbols[currency]}${formatNumber(convertedAnnual)}<br>
        <span style="color: #1aa54a; font-weight: bold;">Save ${symbols[currency]}${formatNumber(convertedSave)}</span>
      `;
    }
  });
  
  if (announcement) {
    announcement.textContent = `Prices updated to ${period} in ${currency} for ${getPlanName(selectedPlan)}.`;
  }
}

function setSelectedPlan(planId, shouldAnnounce = true) {
  selectedPlan = planId;
  localStorage.setItem("vps-selected-plan", selectedPlan);

  cards.forEach(card => {
    const isSelected = card.dataset.plan === selectedPlan;
    card.classList.toggle("selected", isSelected);
    card.classList.toggle("popular-active", card.dataset.plan === "growth" && isSelected);

    const selectButton = card.querySelector("[data-select-plan]");
    if (selectButton) {
      selectButton.textContent = isSelected ? "Selected" : "Select plan";
      selectButton.setAttribute("aria-pressed", String(isSelected));
    }
  });

  if (shouldAnnounce && announcement) {
    announcement.textContent = `${getPlanName(selectedPlan)} plan selected. Prices updated to ${period} in ${currency}.`;
  }
}

function getPlanName(planId) {
  const card = document.querySelector(`.card[data-plan="${planId}"]`);
  const name = card?.querySelector(".plan-name")?.textContent;
  return name || "Plan";
}

function formatNumber(num) {
  if (currency === "PKR") {
    return Math.round(num).toLocaleString("en-US");
  }
  return num.toFixed(2);
}
