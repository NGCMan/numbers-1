var number = {
  mag: 0,
  tlayer: 0,
  pelayer: 0
};
var mlt = 1;
var dnm = 4620;
var prc = 1.01;
var frs = 0;
var nlock = 0;
function commaNumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
};
setInterval(function() {
  if(number.mag < 2000 && number.tlayer == 0){
    number.mag++;
  } else if(number.tlayer == 0) {
    number.mag*=Math.pow(10,1/dnm);
  } else {
    number.mag*=1+(1/(1/Math.pow((dnm*10)/(2000/mlt),frs/(36000/mlt))*(dnm*10)));
    if(frs <= 36000/mlt){
      frs++;
    }
  }
  updt();
}, 50);
function updt() {
  if(number.mag >= 1e10){
    number.mag = Math.log10(number.mag);
    number.tlayer++;
    frs = 0;
  }
  if(number.mag == Infinity){
    number.mag = number.tlayer;
    number.pelayer++;
    number.tlayer = 0;
    frs = 0;
    if(nlock == 0){
      nlock++;
    }
  }
  mlt = Math.pow(1.1,number.tlayer);
  prc = 1+(mlt/100);
  dnm = 1/Math.log10(prc)*20;
  if(number.tlayer == 0 && number.pelayer == 0){
    document.getElementById("number").innerHTML = commaNumber(Math.round(number.mag));
  } else if(number.tlayer == 1 && number.pelayer == 0) {
    document.getElementById("number").innerHTML = Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup>";
  } else if(number.tlayer == 2 && number.pelayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup>";
  } else if(number.tlayer == 3 && number.pelayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup>";
  } else if(number.tlayer == 4 && number.pelayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup></sup>";
  } else if(number.tlayer == 5 && number.pelayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup></sup></sup>";
  } else if(number.pelayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(4) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1);
  } else if(number.pelayer > 0 && number.tlayer == 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1);
  } else if(number.pelayer > 0 && number.tlayer > 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(4) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1);
  }
};
