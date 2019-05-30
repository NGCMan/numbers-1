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
  number.mag++;
  updt();
}, 50);
function updt() {
  document.getElementById("number").innerHTML = commaNumber(number.mag);
};
