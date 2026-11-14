const form = document.getElementById("transactionform");
form.addEventListener("submit", functionevent) 
  event.preventDefault();

  const fullName = document.getElementById("fullName").valuetrim();
  const transactionType = document.getElementById("transactiontype").value;
  const amount = Number(document.getElementById("amount").value);
  if (fullName === "") {
    alert("please enter your full Name as you are known.");
    
  }
  if (transactionType === "") {
    alert("Please select the transaction you wish to carry out");
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    alert("please enter a valid amount.");
  }

  let transactionName = "";
  if (transactionType === "send") {
    transactionName = "send money";
  } else if (transactionName === "withdraw") {
    transactionName = "withdraw money";
  } else if (transactionName === "business") {
    transactionName = "pay a business";
  }
  alert(
    "Pesa Haraka Transaction\n" +
      "Name:" +
      fullName +
      "\n" +
      "Transaction:" +
      transactionName +
      "\n" +
      "Amount:ksh" +
      amount.toLocaleString(),
  );

