number = {
  mag: 0,
  tlayer: 0
};
setInterval(function() {
  number.mag++;
  updt();
}, 50);
function updt() {
  document.getElementById("number").innerHTML = number.mag;
};
