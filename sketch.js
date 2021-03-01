/* have input where u type currency code and get their exchange rates */

var main_url = "https://v6.exchangerate-api.com/v6/eed2f0f6f0bdf922d09d199b/latest/"
var currCode = "USD";
var rateData;
var input; //define outside ?
var bills = [];

var y;

function preload() {
  var url = main_url + currCode;
  loadJSON(url, getRate);
  dollar = loadImage("dollar2.png");
}

function getRate(data) {
  rateData = data;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  input = select('#code');
  input.position(windowWidth / 2 - 100, 80)
  var button = select('button');
  button.position(windowWidth / 2 + 50, 80)
  button.mousePressed(updateCode);

  bills.push(new Bill(rateData.conversion_rates.USD, 150,550));
  bills.push(new Bill(rateData.conversion_rates.EUR, 250,550));
  bills.push(new Bill(rateData.conversion_rates.CAD, 350,550));
  bills.push(new Bill(rateData.conversion_rates.GBP, 450,550));
  bills.push(new Bill(rateData.conversion_rates.CHF, 550,550));
  bills.push(new Bill(rateData.conversion_rates.NZD, 150,1250));
  bills.push(new Bill(rateData.conversion_rates.AUD, 250,1250));
  bills.push(new Bill(rateData.conversion_rates.CNY, 350,1250));
  bills.push(new Bill(rateData.conversion_rates.SEK, 450,1250));
  bills.push(new Bill(rateData.conversion_rates.JPY, 600,1260));

}

function updateCode() {
  currCode = input.value();
  var url = main_url + currCode;
  loadJSON(url, getRate);
}

function draw() {
  background(82, 183, 136);
  fill(255);
  textFont("Georgia")
  textSize(24)
  textAlign(CENTER)
  text("Enter any Currency Code and get the $1 exchange rate!", windowWidth / 2, 50)
  textAlign(LEFT)

  text("USD: $" + rateData.conversion_rates.USD, 150, 150);
  text("EUR (Euro): $" + rateData.conversion_rates.EUR, 150, 250);
  text("CAD (Canadian Dollar): $" + rateData.conversion_rates.CAD, 150, 350);
  text("GBP (Pound Sterling): $" + rateData.conversion_rates.GBP,150, 450);
  text("CHF (Swiss Franc): $" + rateData.conversion_rates.CHF, 150, 550);
  text("NZD (New Zealand Dollar): $" + rateData.conversion_rates.NZD, 750, 150);
  text("AUD (Australian Dollar): $" + rateData.conversion_rates.AUD,750, 250);
  text("CNY (Chinese Remnminbi): $" + rateData.conversion_rates.CNY, 750, 350);
  text("SEK (Swedish Krona): $" + rateData.conversion_rates.SEK, 750, 450);
  text("JPY (Japanese Yen): $" + rateData.conversion_rates.JPY, 750, 550);

  for (let i = 0; i < bills.length; i++) {
    bills[i].render();
  }
}

class Bill {
  constructor(value, yVal, xVal) {
    this.x = xVal;
    this.y = yVal;
    this.size = map(value, 0, 10, 20, 50); //idk how to put the updated inputted currency code and map it in accordance to that, tried to map from 0 to rateData.conversion_rates.currCode but doesnt work
  }

  render() {
    image(dollar, this.x, this.y, this.size, this.size);
  }
}