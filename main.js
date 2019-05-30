var number = {
  mag: 0,
  tlayer: 0
};
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
    number.mag+=1/4620;
  }
  updt();
}, 50);
function updt() {
  if(number.mag >= 1e10){
    number.mag = Math.log(number.mag);
    number.tlayer++;
  }
  if(number.tlayer == 0){
    document.getElementById("number").innerHTML = commaNumber(Math.round(number.mag));
  } else {
    document.getElementById("number").innerHTML = Math.pow(10,number.mag%1).toFixed(6) + " × 10<sup>" + Math.floor(number.mag) + "</sup>";
  }
};
