var number = {
  mag: 0,
  tlayer: 0
};
var mlt = 1;
var dnm = 4620;
var prc = 1.01;
var frs = 0;
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
    number.mag*=Math.pow(10,1/4620);
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
  mlt = 1+(number.tlayer/5);
  prc = 1+(mlt/100);
  dnm = 1/Math.log10(prc)*20;
  if(number.tlayer == 0){
    document.getElementById("number").innerHTML = commaNumber(Math.round(number.mag));
  } else if(number.tlayer == 1) {
    document.getElementById("number").innerHTML = Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup>";
  } else if(number.tlayer == 2) {
    document.getElementById("number").innerHTML = "10<sup>" + Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + commaNumber(Math.floor(number.mag)) + "</sup></sup>";
  }
};
