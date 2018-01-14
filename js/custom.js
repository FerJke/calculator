// Price range
function ChangePrice(num, range){
  var number = num;
  var range = range;

  function changeNumber(){
    range.value = parseInt(this.value, 10);
  }

  function changeRange(){
    number.value = parseInt(this.value, 10);
  }

  number.addEventListener("input", changeNumber);
  range.addEventListener("input", changeRange);
}

// Change installment term
var installmentTerm = (function(){
  var wrapper;

  function chengeNumber(item) {
    var text  = wrapper.querySelector("p"),
        num = parseInt(text.innerHTML, 10);
    if( item.target.classList.contains("plus") ) {
      if( num < 25 ) {
        ++num;
        text.innerHTML = num;
      }
    } else {
      if( num > 1 ) {
        --num;
        text.innerHTML = num;
      }
    }
  }

  return {
    init : function(obj) {
      wrapper = obj;
    },
    click : function(item) {
      return chengeNumber(item);
    }
  }
})();

window.onload = (function(){

  installmentTerm.init(document.querySelector(".calculator__year"));
  var termButton = document.querySelectorAll(".calculator__year button");
  termButton.forEach(function(item, i, arr){
    item.addEventListener("click", installmentTerm.click);
  });

  // Add event on input range and number input
  var priceHouse = new ChangePrice(document.querySelector("#houseCost"), document.querySelector("#houseRange"));
  var pricePlace = new ChangePrice(document.querySelector("#placeCost"), document.querySelector("#placeRange"));

  // Calculator
  calculator.inputData({
    button : document.querySelector("#calculate"),
    houseCost : document.querySelector("#houseCost"),
    placeCost : document.querySelector("#placeCost"),
    year : document.querySelector(".calculator__year p"),
    percent : document.querySelectorAll(".calculator__half input[type='radio']")
  });
  calculator.outputData({
    percent : document.querySelector("#outPercent"),
    firstPay : document.querySelector("#outFirstPay"),
    payAll : document.querySelector("#outAll"),
    overPay : document.querySelector("#outOver"),
    everyMonth : document.querySelector("#outEvery")
  });
  calculator.init();

})();
