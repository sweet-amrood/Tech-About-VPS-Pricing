This is a simple pricing page for PK Hosting VPS plans. It is hand coded with plain HTML, CSS, and JavaScript. No backend and no build step.

This is PKHosting VPS pricing static page coded in html, css and js

The main site is https://www.pkhosting.com/. Links from header and footer redirect to original there.

<!-- files -->

- index.html - page structure and content
- style.css - all styling
- script.js - currency switch, billing toggle, plan select, mobile menu, FAQ toggle

<!-- how to run -->

Open index.html in your browser.

<!-- funtions -->

- Header with PK Hosting text logo (no image logo)
- Nav links that redirect to pkhosting.com
- Hero section with VPS intro and trust points
- Four VPS plans: Starter, Growth, Scale, Dedicated Core
- Monthly and annual billing toggle
- Currency switch: PKR, USD, GBP
- Plan comparison table
- FAQ section
- Footer with company links and contact info

<!-- javascript -->

- Change currency
- Switch between monthly and annual pricing
- Select a plan (saved in localStorage)
- Open and close mobile menu on small screens
- Open and close nav dropdowns on mobile
- Expand and collapse FAQ answers


- Prices are written in html only, in case of need to change the prices it can be changed in html



- Exchange rates in script.js are hardcoded aas required
- Annual billing uses 10 months paid for 12 months of service as per instructions
- JavaScript is needed for currency, billing, and interactive parts. Basic content still works without it
