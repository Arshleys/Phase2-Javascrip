// Mama Mboga Fresh: first version of the checkout
const stallName = "Mama Mboga Fresh";
const customerName = "Wanjiru";

// Prices in shillings
const tomatoPrice = 120; // per kilo
const onionPrice = 80; // per kilo
const sukumaPrice = 20; // per bunch
const potatoprice = 100;
const deliveryprice = 200;

let total = 0;
total = total + tomatoPrice; // 1 kg tomatoes
total = total + onionPrice; // 1 kg onions
total = total + sukumaPrice * 3; // 3 bunches of sukuma
total = total + potatoprice;
total = total + deliveryprice;

console.log("Receipt from", stallName);
console.log("Customer:", customerName);
console.log("deliverprice:", deliveryprice);
console.log("Total to pay: KSh", total);
