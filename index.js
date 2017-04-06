// codepen évolué http://codepen.io/Jonathancollinet/pen/JWzEqz

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return (a && b && a / b) || 0;
}

function mod(a, b) {
    return (a && b && a % b) || 0;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function evalExpr(n1, n2, sign) {
    const calculs = {
        "+": add,
        "-": sub,
        "*": mul,
        "/": div,
        "%": mod
    }

    return parseInt((calculs.hasOwnProperty(sign) && calculs[sign](n1, n2)) || 0);
}

function getRandNum() {
    return getRandomIntInclusive(100, 1000);
}

function getRandSign() {
    return getRandomIntInclusive(0, 4);
}

function generateCalculs(desiredCalculs) {
    const signs = ["+", "-", "*", "/", "%"];
    var textCalculs = [];

    for (let i = 0; i < desiredCalculs; i++) {
        var nb1 = getRandNum();
        var nb2 = getRandNum();
        var sign = signs[getRandSign()];
        var result = evalExpr(nb1, nb2, sign);

        textCalculs.push(nb1 + " " + sign + " " + nb2 + " = " + result);
    }

    return textCalculs;
}

function launchCalculs(e) {
    var input = document.getElementById("iterations");
    var desiredCalculs = parseInt(input.value);
    var calculs = generateCalculs(desiredCalculs);
    var container = document.getElementById("container");

    document.getElementById("getNb").setAttribute("disabled", "disabled");
    for (var i = 0, len = calculs.length; i < len; i++) {
        setTimeout((function(i) {
            return function() {

                container.innerHTML = "";
                var newCalcul = document.createElement('div');
                newCalcul.textContent = calculs[i];
                container.appendChild(newCalcul);

                setTimeout(function() {
                    newCalcul.setAttribute("class", "appear");
                });

                console.log(i, desiredCalculs);
                if (i + 1 === desiredCalculs) {
                    document.getElementById("getNb").removeAttribute("disabled");
                }
            }
        })(i), 500 * (i + 1));
    }
}

function toggleToolbox(e) {
    // clicked on toggle button
    var toolbox = document.getElementById("toolbox");
    var currentClass = toolbox.getAttribute("class");

    if (currentClass && currentClass.length > 0) {
        toolbox.removeAttribute("class");
    } else {
        toolbox.setAttribute("class", "open");
    }
}

// main here
function init() {

    // catch click on "click me!" button
    // apply a class if its necessary to open the toolbox
    var openBtn = document.getElementById("toggleToolbox");
    openBtn.addEventListener("click", toggleToolbox);

    var getNb =  document.getElementById("getNb");
    getNb.addEventListener("click", launchCalculs)

}

init();