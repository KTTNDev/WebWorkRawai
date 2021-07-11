(function() {
    const numbers = { 
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety"
  };
  const numberScales = [
    '', '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecilion', 'tredecilion', 'quattuordecilion', 'quindecilion', 'sexdecillion', 'septendecilion', 'octodecilion', 'novemdecilion', 'vigintilion'
  ];
  
  const convertNumberToString = amount => {
    let result = '';
    let isString = typeof amount === 'string' || amount instanceof String;
    
    if (isNaN(amount)) {
      return `'${amount}' is not a valid number.`;
    }
    if (!isNaN(amount) && !isString && amount > Number.MAX_SAFE_INTEGER) {
      return `'${amount}' is past the bounds of MAX_SAFE_INTEGER. Please pass in the number wrapped in quotes (ex: '954.34') for an accurate conversion.`;
    }
    
    const amountString = amount.toString();  
    const splitAmountArray = amountString.split('.');
    const amountIntegerString = splitAmountArray[0];
    const amountDecimalString = splitAmountArray[1] || 0;
    if (amountDecimalString > 99) {
      return `'${amount}' contains an invalid decimal amount. Please re-enter a value of 0-99 cents.`;
    }
    
    const tripleStack = [];
    
    for (let i = amountIntegerString.length; i > 0; i -= 3) {
      const startIndex = (i - 3) < 0 ? 0 : i - 3;
      const tripleString = amountIntegerString.slice(startIndex, i);
      const tripleNum = parseInt(tripleString, 10);
      
      tripleStack.push(tripleNum);
    }
    
    tripleStack.reverse();
    tripleStack.forEach(function(triple, index) {
      const scalePosition = tripleStack.length - index;
      
      if (triple < 20) {
        result += ` ${numbers[triple]}`;
      } else if (triple < 100) {
        const tensValue = Math.floor(triple / 10) * 10;
        const onesValue = triple - tensValue;
        if (onesValue === 0) {
          result += ` ${numbers[tensValue]}`;
        } else {
          result += ` ${numbers[tensValue]}-${numbers[onesValue]}`;
        }
      } else {
        const hundredsValue = Math.floor(triple / 100) * 100;
        const realTensValue = triple - hundredsValue;
        console.log('triple ' + triple + ' hundreds: ' + hundredsValue + ' realTens: ' + realTensValue);
        const tensValue = Math.floor(realTensValue / 10) * 10;
        const onesValue = realTensValue - tensValue;
        
        if (hundredsValue > 0) {
          result += ` ${numbers[hundredsValue / 100]} hundred`;
        }      
        if (realTensValue < 20) {
          result += ` ${numbers[realTensValue]}`;
        } else {
          if (onesValue === 0) {
            result += ` ${numbers[tensValue]}`; 
          } else {
            result += ` ${numbers[tensValue]}-${numbers[onesValue]}`;
          }
        }
      }
      let scale = numberScales[scalePosition];
      if (scale === undefined) scale = 'bajillion';
      result += ` ${scale}`;
    })
    
    if (result) {
      result += ` and ${amountDecimalString}/100`;
    }
    
    return result;
  }
  
  const convertAndDisplay = event => {
    const amount = event.currentTarget.value;
    const output = convertNumberToString(amount);
    const outputContainer = document.getElementById('stringOutput');
    outputContainer.innerHTML = output;
  }
  
  const searchInput = document.getElementById('numberInput');
  searchInput.addEventListener('change', convertAndDisplay);
  searchInput.addEventListener('keyup', convertAndDisplay);
  
  const outputContainer = document.getElementById('stringOutput');
  outputContainer.innerHTML = convertNumberToString('987654321210087654321109876543212109871098765432121008765432110987654321210987654321.45');
  })();