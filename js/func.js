// If it's single digit, add a "0" before it.
function zero(x) {
    return x.toString().padStart(2, '0');
}

// When subtract time that cross a day (e.g. 00:00:10 - 23:59:50), make it positive and meaningful.
function crossDay(x) {
    if (x < 0) return x + 86400;
    return x;
}

// Return a 2 digit hex number from base 10. 
function hex(Num) {
    return parseInt(Num).toString(16).padStart(2, '0');
}

// Sort array by from small number to big number. 
function sort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                set[j + 1] = temp;
            }
        }
    }
}

// turn hh:mm:ss to seconds.
function toSecond(hh, mm, ss) {
    return 3600 * hh + 60 * mm + 1 * ss;
}

// turn seconds to hh:mm:ss.
function toHHMMSS(second) {
    let hh = parseInt(second / 3600);
    let mm = parseInt((second % 3600) / 60);
    let ss = parseInt(second % 60);
    return [hh, mm, ss];
}

// find an element's position in its parent.
function findNthElement(element) {
    let parent = element.parentNode;
    let siblings = Array.from(parent.children);
    let nthIndex = siblings.indexOf(element);
  
    return nthIndex;
  }

// The 5 functions below are setup to make the code shorter.
id = (id) => document.getElementById(id);

qs = (selector) => document.querySelector(selector);

qsAll = (selector) => document.querySelectorAll(selector);

get = (item) => localStorage.getItem(item);

set = (item, data) => localStorage.setItem(item, data);

// Add isToday function to Date object.
Date.prototype.isToday = function () {
    const today = new Date()
    return this.getDate() === today.getDate() && 
        this.getMonth() === today.getMonth() && 
        this.getFullYear() === today.getFullYear()
  }