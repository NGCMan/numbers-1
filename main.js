var number = {
  mag: 0,
  tlayer: 0,
  pelayer: 0,
  hxlayer: 0,
  hplayer: 0,
  olayer: 0,
  nlayer: 0
};
var mlt = 1;
var dnm = 4620;
var prc = 1.01;
var frs = 0;
var nlock = 0;
var amo = 0;
function commaNumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
setInterval(function() { // If you're here (Noah?) hi
  if(number.mag < 1/mlt*2000 && number.tlayer == 0){
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
  if(isNaN(number.mag)){
    number.mag = number.pelayer;
    number.hxlayer++;
    number.pelayer = 0;
    number.tlayer = 0;
    frs = 0;
    if(nlock == 1){
      nlock++;
    }
  }
  if(number.mag == 0 && nlock > 0){
    number.mag = number.hxlayer;
    number.hplayer++;
    number.hxlayer = 0;
    number.pelayer = 0;
    number.tlayer = 0;
    frs = 0;
    if(nlock == 2){
      nlock++;
    }
  }
  if(amo == 2){
    number.mag = number.hplayer;
    number.olayer++;
    number.hplayer = 0;
    number.hxlayer = 0;
    number.pelayer = 0;
    number.tlayer = 0;
    frs = 0;
    if(nlock == 3){
      nlock++;
    }
  }
  if(amo == 2){
    number.mag = number.olayer;
    number.nlayer++;
    number.olayer = 0;
    number.hplayer = 0;
    number.hxlayer = 0;
    number.pelayer = 0;
    number.tlayer = 0;
    frs = 0;
    if(nlock == 4){
      nlock++;
    }
  }
  if(nlock == 0){
    mlt = Math.pow(1.1,number.tlayer);
  } else if(nlock == 1){
    mlt = Math.pow(Math.pow(1.21,number.pelayer),number.tlayer+1);
  } else if(nlock == 2){
    mlt = Math.pow(Math.pow(Math.pow(1.4641,number.hxlayer),number.pelayer+1),number.tlayer+1);
  } else if(nlock == 3){
    mlt = Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(1.1,8),number.hplayer),number.hxlayer+1),number.pelayer+1),number.tlayer+1);
  } else if(nlock == 4){
    mlt = Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(1.1,16),number.olayer),number.hplayer+1),number.hxlayer+1),number.pelayer+1),number.tlayer+1);
  } else if(nlock == 5){
    mlt = Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(1.1,32),number.nlayer),number.olayer+1),number.hplayer+1),number.hxlayer+1),number.pelayer+1),number.tlayer+1);
  }
  prc = 1+(mlt/100);
  dnm = 1/Math.log10(prc)*20;
  if(number.mag == 1){
    amo++;
  } else {
    amo=0;
  }
  if(number.tlayer == 0 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0){
    document.getElementById("number").innerHTML = commaNumber(Math.round(number.mag));
  } else if(number.tlayer == 1 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup>";
  } else if(number.tlayer == 2 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup>";
  } else if(number.tlayer == 3 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup>";
  } else if(number.tlayer == 4 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup></sup>";
  } else if(number.tlayer == 5 && number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "10<sup>10<sup>10<sup>10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup></sup></sup></sup>";
  } else if(number.pelayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(4) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1);
  } else if(number.pelayer > 0 && number.tlayer == 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1);
  } else if(number.pelayer > 0 && number.tlayer > 0 && number.hxlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(4) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1);
  } else if(number.hxlayer > 0 && number.tlayer == 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1) + "#" + (number.hxlayer+1);
  } else if(number.hxlayer > 0 && number.tlayer > 0 && number.hplayer == 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(3) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1) + "#" + (number.hxlayer+1);
  } else if(number.tlayer == 0 && number.hplayer > 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1);
  } else if(number.tlayer > 0 && number.hplayer > 0 && number.olayer == 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(3) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1);
  } else if(number.tlayer == 0 && number.olayer > 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1) + "#" + (number.olayer+1);
  } else if(number.tlayer > 0 && number.olayer > 0 && number.nlayer == 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(1) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1) + "#" + (number.olayer+1);
  } else if(number.tlayer == 0 && number.nlayer > 0) {
    document.getElementById("number").innerHTML = "E" + commaNumber(Math.round(number.mag)) + "#0#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1) + "#" + (number.olayer+1) + "#" + (number.nlayer+1);
  } else if(number.tlayer > 0 && number.nlayer > 0) {
    document.getElementById("number").innerHTML = "E" + Math.pow(10,number.mag%1).toFixed(0) + "E" + commaNumber(Math.floor(number.mag)) + "#" + (number.tlayer-1) + "#" + (number.pelayer+1) + "#" + (number.hxlayer+1) + "#" + (number.hplayer+1) + "#" + (number.olayer+1) + "#" + (number.nlayer+1);
  }
}
