number = {
  mag: 0,
  tlayer: 0
};
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
  } else {
    number.mag*=Math.pow(1.01,0.05);
  }
  updt();
}, 50);
function updt() {
  document.getElementById("number").innerHTML = commaNumber(Math.round(number.mag));
};
