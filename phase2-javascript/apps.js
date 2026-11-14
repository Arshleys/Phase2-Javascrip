functioncalculateDeliveryfee(distancekm){
  if (distance <= 0) {
    return null;
  } 
  if(distance<=2){
    return 0;
  }
    else if(distance<=5){
      return 100;
  }
  else if(distance<=10){
    return 200;
  }
  else{
    return null;
  }
}
functioncalculateDiscount(subtotal, isregular)
{if(isregular && subtotal >= 1000){
  return subtotal * 0.1;
}
}
function formatKsh(amount) {
  const options ={
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return amount.toLocaleString('en-KE', options);
  }

functionprintreceipt(customer,subtotal,discount,fee){
const total =subtotal - discount + fee;
console.log('customer:${customer}');
console.log('subtotal:Ksh.${formatKsh(subtotal)}');
console.log('discount:Ksh.${formatKsh(discount)}');
console.log('delivery fee:Ksh.${formatKsh(fee)}');
console.log('total:Ksh.${formatKsh(total)}');
}

const subtotal = 3 * 120 + 2 * 80;
const discount = calculateDiscount(subtotal, true);
const fee = calculatedeliveryfee(4.5);
printreceipt('Wanjiru', subtotal, discount, fee);
