
var monthlyPaymentCalculator = (function() {
  // Inputs
  var calculator = document.getElementById('monthly-payment-calculator');
  var numPayments = document.querySelector('#monthly-payment-calculator #num-payments');
  var interestRate = document.querySelector('#monthly-payment-calculator #interest-rate');
  var loanAmount = document.querySelector('#monthly-payment-calculator #loan-amount');
  var calculate = document.querySelector('#monthly-payment-calculator #calculate');
  // Outputs
  var error = document.querySelector('#monthly-payment-calculator #error');
  var monthlyPayment = document.querySelector('#monthly-payment-calculator #monthly-payment');
  // Vars for calculation
  var n, i, p;

  function calcMonthlyPayment() {
    'use strict';

    n = parseInt(numPayments.value);
    i = percentage();
    p = parseFloat(loanAmount.value);

    // M = P[i(1+i)^n] / [(1+i)^n-1]
    var m = p * ( i*(Math.pow((1+i),n)) / ( Math.pow((1+i),n)-1) );
    var totalMonthlyPayment = m;

    // Output
    monthlyPayment.innerHTML = '$' + totalMonthlyPayment.toFixed(2);
  }

  function percentage() {
    'use strict';

    if (interestRate.value < 1.0) {
      i = parseFloat(interestRate.value/12);
    } else {
      i = parseFloat(interestRate.value/12) / 100;
    }
    return i;
  }

  function validate() {
    'use strict';

    // Clear outputs
    var clearOutputs = (function() {
      var outputs = document.querySelectorAll('#outputs span');
      for (var i = 0; i < outputs.length; i++) {
        outputs[i].innerHTML = '';
      }
    }());

    var validateInputs = (function() {
      var re = /^\d+(?:\.\d{1,2})?$/; // Regex to check for valid number
      var reDecPercent = /^(\.\d{1,4})?$/; // Regex for decimal percentage
      var good = 0; // Counter for validated inputs
      var inputs = document.querySelectorAll('#monthly-payment-calculator input[type=text]');

      // Loop text inputs, compare with regex, update status(good)
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.match(re) || inputs[i].value.match(reDecPercent) && inputs[i].value != '') {
          good++;
          if (inputs[i].classList.contains('error')) {
            inputs[i].classList.remove('error');
            error.innerHTML = '&nbsp;';
          }
        } else {
          good--;
          inputs[i].classList.add('error');
        }
      }

      // All inputs pass validation -> calculate, otherwise error message
      if (good == inputs.length) {
        calcMonthlyPayment();
      } else {
        error.innerHTML = '* Please enter valid number(s).';
      }
    }());
  }

  calculate.addEventListener('click', validate);
}());
