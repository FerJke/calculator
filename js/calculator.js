'use strict';
var calculator = (function(){
  var DOMElements, total, percent, percentState, firstPay, credit, howLong, monthPercent, everyMonth, amoutAll, overPay, OutputElements;

  // Values alive and positive
  function isset() {
    if( parseInt(DOMElements.houseCost.value, 10) <= 0 && parseInt(DOMElements.placeCost.value, 10) <= 0 ) return;
  }

  // Get percent
  function getPercent(radio) {
    radio.forEach(function(item){
      if(item.checked) percent = parseInt(item.value);
    });

    switch (percent) {
    case 27:
      percentState = 11.5;
      break;
    case 37:
      percentState = 10;
      break;
    case 52:
      percentState = 9;
      break;
    }
  }

  // First payment
  function firstPayment() {
    firstPay = total / 100 * percent;
  }

  // Credit
  function calcCredit() {
    credit = total - firstPay;
  }

  // Get year
  function getHowLong() {
    howLong = parseInt(DOMElements.year.textContent, 10) * 12;
  }

  // Month persent
  function getMonthPersent() {
    monthPercent = percentState / 100 / 12;
  }

  // Every month pay
  function everyMonthPay() {
    everyMonth = credit * (monthPercent / (1 - Math.pow((1 + monthPercent), - howLong)));
  }

  // Amout all
  function getAmount() {
    amoutAll = everyMonth * howLong;
  }

  // Over payment
  function getOverPay() {
    overPay = amoutAll - credit;
  }

  // Calculator body
  function calculate() {
    isset();
    total = parseInt(DOMElements.houseCost.value, 10) + parseInt(DOMElements.placeCost.value, 10);
    getPercent(DOMElements.percent);
    firstPayment();
    calcCredit();
    getHowLong();
    getMonthPersent();
    everyMonthPay();
    getAmount();
    getOverPay();
    outputVal();
  }

  // Output vaules
  function outputVal() {
    OutputElements.percent.innerHTML = percentState + "%";
    OutputElements.firstPay.innerHTML = firstPay.toFixed(0);
    OutputElements.everyMonth.innerHTML = everyMonth.toFixed(0);
    OutputElements.payAll.innerHTML = amoutAll.toFixed(0);
    OutputElements.overPay.innerHTML = overPay.toFixed(0);
  }

  // Click on button
  function initCalc() {
    DOMElements.button.addEventListener("click", calculate);
  }

  return {
    inputData : function (obj) {
      DOMElements = obj;
    },

    outputData : function (obj) {
      OutputElements = obj;
    },

    init : function () {
      initCalc();
    }
  }
})();
