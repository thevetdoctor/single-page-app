// alert('Coverter script is active!');

let form = document.getElementById('form');

function get(url){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300){
        resolve(xhr.response, console.log('Resolved in converter.js'));
      } else {
        reject({status : `${this.status}: onload-failed in converter.js`,
               statusText: xhr.statusText
             }, console.log(`${this.status}: onload-failed`));
      }
    };

    xhr.onerror = () => {

      reject({status : `${xhr.status} =>@onerror-rejectedStatus`,
               statusText: `${xhr.statusText}@onerror-rejectedStatusText`
             }
             );
    };

    xhr.send();

  });
}



let rates = {"results":
{
"USD":{"currencyName":"United States Dollar","currencySymbol":"$","id":"USD"},
"GBP":{"currencyName":"British Pound","currencySymbol":"£","id":"GBP"},
"EUR":{"currencyName":"Euro","currencySymbol":"€","id":"EUR"},
"NGN":{"currencyName":"Nigerian Naira","currencySymbol":"₦","id":"NGN"},
"CAD":{"currencyName":"Canadian Dollar","currencySymbol":"$","id":"CAD"},
"XAF":{"currencyName":"Central African CFA Franc","id":"XAF"},
"BTC":{"currencyName":"Bitcoin","currencySymbol":"BTC","id":"BTC"},
"GHS":{"currencyName":"Ghanaian Cedi","id":"GHS"},
"AED":{"currencyName":"UAE Dirham","id":"AED"},
"SAR":{"currencyName":"Saudi Riyal","currencySymbol":"﷼","id":"SAR"},
"JPY":{"currencyName":"Japanese Yen","currencySymbol":"¥","id":"JPY"},
"CNY":{"currencyName":"Chinese Yuan","currencySymbol":"¥","id":"CNY"},
"ZAR":{"currencyName":"South African Rand","currencySymbol":"R","id":"ZAR"},
"CHF":{"currencyName":"Swiss Franc","currencySymbol":"Fr.","id":"CHF"},
"RUB":{"currencyName":"Russian Ruble","currencySymbol":"руб","id":"RUB"},
}};

// "CUP":{"currencyName":"Cuban Peso","currencySymbol":"$","id":"CUP"},
// "IRR":{"currencyName":"Iranian Rial","currencySymbol":"﷼","id":"IRR"},
// "INR":{"currencyName":"Indian Rupee","currencySymbol":"₹","id":"INR"},
// "RWF":{"currencyName":"Rwandan Franc","id":"RWF"},
// "ILS":{"currencyName":"Israeli New Sheqel","currencySymbol":"₪","id":"ILS"},
// "BRL":{"currencyName":"Brazilian Real","currencySymbol":"R$","id":"BRL"},
// "EGP":{"currencyName":"Egyptian Pound","currencySymbol":"£","id":"EGP"},
// "KES":{"currencyName":"Kenyan Shilling","currencySymbol":"KSh","id":"KES"},

  let currFrom = document.getElementById('handle1');
  let currTo = document.getElementById('handle2');


rates = rates.results;

let count = 0;
let ratesArray = [];
let currOptions = '';

for(let rate in rates){
  count++;
if(rates[rate]['currencySymbol'] === undefined){
  rates[rate]['currencySymbol'] = 'NA';
}
  // console.log(rates[rate]['currencyName']);
  // console.log(rates[rate]['currencySymbol']);
  ratesArray.push(rate);



// setting the options of the select element on the DOM

currOptions += `<option value="${ rates[rate]['currencySymbol'] }"> ${ rates[rate]['currencyName'] }  ( ${ rates[rate]['currencySymbol'] } )</option>`;

  }

currFrom.innerHTML = currOptions;
currTo.innerHTML = currOptions;

console.log(count);
console.log(ratesArray);




const convertBtn = document.getElementById('convertBtn');
const amount = document.getElementById('amount').value;
const convertedValue = document.getElementById('convertedValue');







let excha = [];
let exchangeRate;
let factorArray = [];

for(let i = 0; i < ratesArray.length; i++){

  for(let j = 0; j < ratesArray.length; j++){


let factor = ratesArray[i]+ '_' + ratesArray[j];

factorArray.push(factor);

// console.log(factor);



// let factor = currFrom.value + '_' + currTo.value;
// let exchangeRate;
// console.log(factor);


 // let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=[CODE]&compact=y';
 let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=[CODE]&compact=ultra';

  get(url.replace('[CODE]', factor))
  .then((response) => {
    let parsedResponse = JSON.parse(response);

    console.log(parsedResponse[factor]);
    exchangeRate = parsedResponse[factor];
    exchangeRate= exchangeRate.toFixed(2);

    excha.push(`${factor} ${exchangeRate}`);

  })
  .catch((err) => {
    console.log('Error : Conversion not successful', err);
  });

  }

}


console.log(factorArray);
console.log(factorArray.length);
console.log(excha);


// declare the function to convert on clicking submit button

const convert = (e) => {

e.preventDefault();

convertedValue.innerHTML = '';

convertedValue.innerHTML = `<h3> ${currFrom.value} ${amount}  is equivalent to ${currTo.value} ${convertedValue.innerText} ${amount * exchangeRate}</h3>`;

}

convertBtn.addEventListener('click', convert);
