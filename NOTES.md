These obersvation come from looking at the live pricing section on https://www.pkhosting.com/pricing/ and comparing it with this static VPS page.

<!-- observations -->

1. Original price next to the discounted price
   Result: the customer sees a discount right away and the deal feels good.

2. Save percentage badge on each plan
   Result: savings are easy to compare.

3. Renews at the same price note under the price
   Result: people trust the offer more because they know renewal will not jump back to the crossed-out amount.

4. Monthly / Annually toggle with a save up to label
   Result: annual billing looks like the better choice and people are pushed toward thinking about annual plan more.

5. Plan badges such as Most Popular, Best Value, Economical
   Result: the user gets a quick hint about which plan to pick instead of reading every feature list first.

6. Hosting, Domains, Servers tabs on the pricing page
   Result: one page covers more products, but VPS is only one section, so a visitor looking only for VPS has to find that block among shared hosting, reseller, dedicated, and domains.

<!-- trade offs -->

State persistence
We store the currency, billing period and selected plan in localStorage. This is useful because after a refresh the page will remember what you selected. But the issue with this is that it will only be on same browser, if user move to another borwser it will change back to default everything it can not be saved or shared across devices.

Dropped payment methods
Visa / Mastercard, Paypal, JazzCash, easypaisa and bank transfer are mentioned in the footer. Monzo, Revolut and cryptocurrency they were left from the list of payment methods because these are available for the local customer base of Pakistan and excluding these make it easy for user to decide and make them decide easily. this also comes with a downside that some foreign buyers might not find the method they prefer on this main site ut it can be added later.
