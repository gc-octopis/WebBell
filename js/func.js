// DIR:
// 1. Simple functions
// 3. Time sets



// 1. Simple functions


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


// END

// 3. Time sets


// Add a time set for user to edit.
// function timeSetAdd() {
//     let newFileName = `new-${parseInt(new Date().getTime())}`;
//     timeSetsEditItems.push(newFileName);
//     timeSetsEditIndex = timeSetsEditItems.length - 1;
//     let local = JSON.parse(get("timeSets"));
//     local[newFileName] = { times: [[0, 0, 0]] };
//     set("timeSets", JSON.stringify(local));
//     timeSetsEditUpdate();
// }

// // Save a time set. Append to localStoarge.
// function timeSetSave() {
//     let local = JSON.parse(get("timeSets"));
//     local[timeSetsEditItems[timeSetsEditIndex]]["times"] = [];
//     qsAll(".oneTime input").forEach(e => {
//         local[timeSetsEditItems[timeSetsEditIndex]]["times"].push(e.value.split(":").map(r => Number(r)));
//     });
//     set("timeSets", JSON.stringify(local));
// }

// // Save the current time set as a copy.
// function timeSetSaveAs() {
//     let local = JSON.parse(get("timeSets"));
//     let newFileName = prompt("檔案名稱：", `new-${parseInt(new Date().getTime())}`);
//     timeSetsEditItems.push(newFileName);
//     timeSetsEditIndex = timeSetsEditItems.length - 1;
//     local[newFileName] = {};
//     local[newFileName]["times"] = [];
//     qsAll(".oneTime input").forEach(e => {
//         local[newFileName]["times"].push(e.value.split(":").map(r => Number(r)));
//     });
//     set("timeSets", JSON.stringify(local));
// }

// // Delete a time set.
// function timeSetDel() {
//     if (confirm("你確定要刪除這組時間？")) {
//         let local = JSON.parse(get("timeSets"));
//         delete local[timeSetsEditItems[timeSetsEditIndex]];
//         timeSetsEditItems.pop(timeSetsEditIndex);
//         set("timeSets", JSON.stringify(local));
//     }
// }

// // Move the current edit time set to the last one.
// function up() {
//     if (timeSetsEditIndex > 0) timeSetsEditIndex--;
//     timeSetsEditUpdate();
// }

// // Move the current edit time set to the next one.
// function down() {
//     if (timeSetsEditIndex < timeSetsEditItems.length - 1) timeSetsEditIndex++;
//     timeSetsEditUpdate();
// }

// // Save the new name of a time set after user change it.
// function timeSetsOnchange() {
//     local = JSON.parse(get("timeSets"));
//     local[event.target.value] = local[timeSetsEditItems[timeSetsEditIndex]];
//     delete local[timeSetsEditItems[timeSetsEditIndex]];
//     set("timeSets", JSON.stringify(local));
//     timeSetsEditItems[timeSetsEditIndex] = event.target.value;
// }

// // Load a time set into the edit field.
// function timeSetsEditUpdate() {
//     setName = id("setName");
//     setName.value = timeSetsEditItems[timeSetsEditIndex];
//     timeSetsEditValues();
// }

// // When loaded, display the time set as the right format.
// function timeSetsEditValues() {
//     x = JSON.parse(get("timeSets"))[timeSetsEditItems[timeSetsEditIndex]];
//     var timeEles = qsAll(".oneTime");
//     timeEles.forEach(
//         (e, i) => {
//             (i == 0) ? () => { } : e.remove();
//         }
//     );
//     x.times.forEach(
//         (e) => {
//             timeEles = qsAll(".oneTime");
//             var anotherTime = timeEles[0].cloneNode(true);
//             let input = anotherTime.querySelector("input");
//             selection(input, {
//                 'durationFormat': 'hh:mm:ss',
//                 'max': 3600 * 24,
//                 'value': e[0] * 3600 + e[1] * 60 + e[2] * 1
//             });
//             input.addEventListener("keyup", inputHotkeys);
//             timeEles[timeEles.length - 1].after(anotherTime);
//         }
//     );
//     timeEles[0].remove();
//     timeIndex();

// }

// // Display the bell ring index in a time set.
// function timeIndex() {
//     allTime = qsAll(".oneTime p");
//     allTime.forEach((e, i) => {
//         e.innerHTML = `第 ${i + 1} 次鐘響`;
//     });
// }

// // Add a bell ring timing in a time set.
// function addTime() {
//     var lastTime = event.target.closest(".oneTime");
//     var anotherTime = lastTime.cloneNode(true);
//     let input = anotherTime.querySelector("input");
//     selection(input, {
//         'durationFormat': 'hh:mm:ss',
//         'max': 3600 * 24
//     });
//     input.addEventListener("keyup", inputHotkeys);
//     lastTime.after(anotherTime);
//     timeIndex();
// }

// // Remove a bell ring timing in a time set.
// function removeTime() {
//     var oneTime = qsAll(".oneTime");
//     if (oneTime.length > 1) {
//         event.target.closest(".oneTime").remove();
//     }
//     timeIndex();
// }

// // Add the enter hotkey to an element.
// function inputHotkeys(e) {
//     if (e.keyCode === 13) {
//         addTime();
//     }
// }


// END