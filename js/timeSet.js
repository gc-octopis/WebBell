function TimeSet(timeSet = {}) {
    this.set = timeSet;
    !(get("timeSets")) ? set("timeSets", "{}") : 0;
}

// Fetch a time set from a JSON file and save its path to localStorge.
TimeSet.prototype.fromFile = async function (path) {
    await fetch(path)
    .then(r => r.json())
    .then(x => { 
        this.set = x;
        this.saveToLocal(path, x);
     });
}

// Append a time set to localStorge with the right format. 
TimeSet.prototype.saveToLocal = function (name, content) {
    let local = JSON.parse(get("timeSets"));
    local[name] = content;
    set("timeSets", JSON.stringify(local));
}

// Load the time set into the bell.
TimeSet.prototype.load = function (times, timesInSec, subjects) {
    let x = this.set;

    Object.keys(x.regular).forEach(d => {
        times[d] = [];
        timesInSec[d] = [];
        subjects[d] = [];
        Object.keys(x.regular[d]).forEach((e, i) => {
            times[d].push(x.regular[d][e]["time"]);
            timesInSec[d].push(toSecond(...times[d][i]));
            subjects[d].push(x.regular[d][e]["subject"]);
        });
    });

    if (x.exception != undefined) {
        x.exception.forEach(e => {
            e.date.forEach(k => {
                if (new Date(k).isToday()) {
                    Object.keys(e.modification).forEach(s => {
                        subjects[weekEn[new Date().getDay()]][s - 1] = e.modification[s];
                    });
                }
            });
        });
    }
}