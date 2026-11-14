const form = document.querySelector("#transactionForm");
const nameInput = document.querySelector("#fullName");
const phoneInput = document.querySelector("#phone");
const typeSelect = document.querySelector("#transactionType");
const amountInput = document.querySelector("#amount");
const feePreview = document.querySelector("#feePreview");
const receipt = document.querySelector("#receipt");
const receiptDetails = document.querySelector("#receiptDetails");
const newTransactionButton = document.querySelector("#newTransaction");

const MIN_WITHDRAWAL = 50;
const MAX_AMOUNT = 150000;

const TYPE_NAMES = {
  send: "Send money",
  withdraw: "Withdraw cash",
  business: "Pay a business",
};
function calculateFee(type, amount) {
  if (amount < 1 || amount > MAX_AMOUNT) return null;
  if (type === "business") return 0;
  if (type === "withdraw" && amount < MIN_WITHDRAWAL) return null;

  if (amount <= 100) return type === "send" ? 0 : 11;
  if (amount <= 1000) return type === "send" ? 13 : 29;
  if (amount <= 5000) return type === "send" ? 53 : 69;
  if (amount <= 20000) return type === "send" ? 87 : 185;
  return type === "send" ? 108 : 309;
}

function formatMoney(amount) {
  return amount.toLocaleString("en-KE");
}

function formatPhone(phone) {
  return "254" + phone.replaceAll(" ", "").slice(1);
}
function checkName(name) {
  if (name.trim() === "") return "Enter your full name.";
  return "";
}

function checkPhone(phone) {
  const digits = phone.replaceAll(" ", "");
  if (digits === "") return "Enter your phone number.";
  if (digits.length !== 10 || Number.isNaN(Number(digits))) {
    return "Enter 10 digits, for example 0712 345 678.";
  }
  if (!digits.startsWith("07") && !digits.startsWith("01")) {
    return "The number must start with 07 or 01.";
  }
  return "";
}

function checkAmount(type, amountText) {
  const amount = Number(amountText);
  if (amountText.trim() === "") return "Enter an amount.";
  if (Number.isNaN(amount)) return "The amount must be a number.";
  if (amount <= 0) return "The amount must be more than zero.";
  if (amount > MAX_AMOUNT) return "The maximum is KSh 150,000.";
  if (type === "withdraw" && amount < MIN_WITHDRAWAL) {
    return "The minimum withdrawal is KSh 50.";
  }
  return "";
}

function showError(input, message) {
  const errorElement = document.querySelector(`#${input.id}Error`);
  errorElement.textContent = message;
  if (message === "") {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  } else {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorElement.id);
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = typeSelect.value;
  const checks = [
    [nameInput, checkName(nameInput.value)],
    [phoneInput, checkPhone(phoneInput.value)],
    [amountInput, checkAmount(type, amountInput.value)],
  ];

  for (const [input, message] of checks) {
    showError(input, message);
  }

  const firstInvalid = checks.find(([, message]) => message !== "");
  if (firstInvalid) {
    firstInvalid[0].focus();
    return;
  }

  const amount = Number(amountInput.value);
  const fee = calculateFee(type, amount);
  const reference = Math.floor(100000 + Math.random() * 900000);

  currentReceipt = [
    ["Name", nameInput.value.trim().toUpperCase()],
    ["Phone", formatPhone(phoneInput.value)],
    ["Type", TYPE_NAMES[type]],
    ["Amount", `KSh ${formatMoney(amount)}`],
    ["Fee", fee === 0 ? "FREE" : `KSh ${formatMoney(fee)}`],
    ["Total", `KSh ${formatMoney(amount + fee)}`],
    ["Reference", String(reference)],
    ["Date", new Date().toLocaleString("en-KE")],
  ];
  render();
});
function updateFeePreview() {
  const message = checkAmount(typeSelect.value, amountInput.value);
  if (message !== "") {
    feePreview.textContent = message;
    return;
  }
  const fee = calculateFee(typeSelect.value, Number(amountInput.value));
  feePreview.textContent =
    fee === 0 ? "Fee: FREE" : `Fee: KSh ${formatMoney(fee)}`;
}
nameInput.addEventListener("input", () => {
  if (nameInput.hasAttribute("aria-invalid"))
    showError(nameInput, checkName(nameInput.value));
});
phoneInput.addEventListener("input", () => {
  if (phoneInput.hasAttribute("aria-invalid"))
    showError(phoneInput, checkPhone(phoneInput.value));
});
amountInput.addEventListener("input", () => {
  updateFeePreview();
  if (amountInput.hasAttribute("aria-invalid")) {
    showError(amountInput, checkAmount(typeSelect.value, amountInput.value));
  }
});
typeSelect.addEventListener("change", updateFeePreview);
let currentReceipt = null;

function render() {
  form.hidden = currentReceipt !== null;
  receipt.hidden = currentReceipt === null;
  if (currentReceipt === null) return;

  receiptDetails.replaceChildren();
  for (const [label, value] of currentReceipt) {
    const term = document.createElement("dt");
    term.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = value;
    receiptDetails.append(term, detail);
  }
}
newTransactionButton.addEventListener("click", () => {
  currentReceipt = null;
  form.reset();
  feePreview.textContent = "Enter an amount to see the fee.";
  render();
  nameInput.focus();
});
