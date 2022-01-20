
var bps = 0;
var total_minion = 0;
var puissance_click = 1;
var Burgers = localStorage.getItem('burgers') === null ? 0 : parseInt(localStorage.getItem('burgers'));
// si Burgers est null alors affiche rien sinon affiche les infos déjè enregisté 



function addBurgers() {
    Burgers += puissance_click;
    displayBurgers();
}
//function pour afficher le nombre de burgers total//
function displayBurgers() {
    document.getElementById('score-burgers').innerHTML = "Burgers : " + number(Burgers);
}


//function burger par seconde//
function addBps() {
    const bpsinterval = setInterval(() => {
        Burgers += bps;
        displayBurgers();
    }, 1000);
}
addBps();

var minions = localStorage.getItem('minions') === null ?
    [
        { id: 1, name: "Squidward", cost: 20, bps: 1, owned: 0 },
        { id: 2, name: "Sandy", cost: 100, bps: 5, owned: 0 },
        { id: 3, name: "MrKrabs", cost: 500, bps: 10, owned: 0 },
    ] : JSON.parse(localStorage.getItem('minions'));

function getBPS() {
    bps = 0;
    minions.forEach(function (minion) {
        bps += minion.bps * minion.owned;
    });
    displayBps();
}


function displayBps() {
    document.getElementById('bps').innerHTML = "BPS :" + bps;
}
displayBps();


function buyMinion(id) {
    var minion = minions.find(minion => minion.id === id);
    if (Burgers >= minion.cost) {
        minion.owned++;
        Burgers -= minion.cost;
        minion.cost = minion.cost * 1.15;
        total_minion++;
        if (total_minion % 50 == 0) {
            puissance_click *= 2;

        }
        if (minion.owned == 25 || minion.owned == 50 || minion.owned == 100 || minion.owned == 250 || minion.owned == 1000) {
            minion.bps = minion.bps * 2;
        }
    }



    getBPS();
    displayBps();
    document.querySelector('.store-h4-cost-' + minion.name).innerHTML = minion.cost.toFixed(0);
}
function save() {
    localStorage.setItem('burgers', Burgers);
    localStorage.setItem('minions', JSON.stringify(minions));
}

function reset() {
    localStorage.removeItem('burgers');
    localStorage.removeItem('minions');
    location.reload();
}

getBPS();

function number(n) {
    if (n > 1000000 && n < 1000000000) {
        return (n / 1000000).toFixed(3) + " m";
    }
    else if (n >= 1000000000) {
        return (n / 1000000000).toFixed(3) + " M"
    }
    else {
        return n.toFixed(0)
    }
}
