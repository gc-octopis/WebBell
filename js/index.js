// Current edit time set Variables
// let timeSetsEditIndex = 0;
// let timeSetsEditItems = Object.keys(JSON.parse(get("timeSets")));


async function main() {

    loadTabs();
    loadEasterEgg();
    AudioPlayer.init();


    // let input = qs(".oneTime input");

    // selection(input, {
    //     'durationFormat': 'hh:mm:ss',
    //     'max': 3600 * 24
    // });

    // input.addEventListener("keyup", inputHotkeys);

    // timeSetsEditUpdate();
    currentSet = get("currentSet");
    currentSet ? id("timeSets").value = currentSet : id("timeSets").selectedIndex = 0;

    // this makes a dialog to prevent accidently closing the tab
    // also makes user unable to close the electron window
    // window.onbeforeunload = () => "prevent leaving";

    /*

    remember to enable onbeforeunload later.


    */

    // Week name array
    let week = ["日", "一", "二", "三", "四", "五", "六"];
    let weekEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let timeSets = {};
    let times = {}, timesInSec = {}, subjects = {};

    timeSets["高二A.json"] = new TimeSet();
    await timeSets["高二A.json"].fromFile("高二A.json");

    timeSets["empty.json"] = new TimeSet();
    await timeSets["empty.json"].fromFile("empty.json");

    timeSets["高中部.json"] = new TimeSet();
    await timeSets["高中部.json"].fromFile("高中部.json");

    timeSets[id("timeSets").value].load(times, timesInSec, subjects);

    id("timeSets").onchange = () => {
        set("currentSet", event.target.value); // Save the last time set user stayed in. When next time open (this app) , target to it.
        timeSets[event.target.value].load(times, timesInSec, subjects); // load new set to the bell
    };

    function loop() {

        const time = new Date();
        let hour = zero(time.getHours());
        let min = zero(time.getMinutes());
        let sec = zero(time.getSeconds());
        let year = time.getFullYear();
        let month = zero(time.getMonth() + 1);
        let date = zero(time.getDate());
        let day = time.getDay();

        let lastHour, lastMin, lastSec;
        let nextHour, nextMin, nextSec;

        let timesToday = times[weekEn[day]];
        let timesInSecToday = timesInSec[weekEn[day]];

        // this loop was complicate, but I added an variable called nowInSec, and it's now much more simple.
        nowInSec = toSecond(hour, min, sec);
        let len = timesToday.length;
        for (let i = 0; i <= len; i++) {

            id("current-class").innerText = showSubject(i - 1, day, subjects);
            id("next-class-1").innerText = showSubject(i, day, subjects);
            id("next-class-2").innerText = showSubject(i + 1, day, subjects);

            // i == len is for the for loop to run until the last round, so the value of i won't mess up.
            let isAfterClass = nowInSec > timesInSecToday.at(-1) && i == len;
            let isBeforeClass = nowInSec < timesInSecToday[0];

            let subjectTimeLength = crossDay(timesInSecToday[i] - timesInSecToday.at(i - 1));
            let subjectTimePass = crossDay(nowInSec - timesInSecToday.at(i - 1));

            if (isBeforeClass || isAfterClass || len == 0) {
                qs(".info").style.display = "none";
                id("progressBar").style.display = "none";
                break;
            } else if (timesInSecToday[i] >= nowInSec) {
                qs(".info").style.display = "";
                id("progressBar").style.display = "";
                lastHour = timesToday.at(i - 1)[0], lastMin = timesToday.at(i - 1)[1], lastSec = timesToday.at(i - 1)[2];
                nextHour = timesToday[i][0], nextMin = timesToday[i][1], nextSec = timesToday[i][2];
                lastHour = zero(lastHour); lastMin = zero(lastMin); lastSec = zero(lastSec);
                nextHour = zero(nextHour); nextMin = zero(nextMin); nextSec = zero(nextSec);
                let percent = (subjectTimePass / subjectTimeLength * 100) + "%";
                id("progressFill").style.width = percent;
                break;
            }
        }

        if (hour == nextHour && min == nextMin && sec == nextSec) AudioPlayer.playAudio();
        id("time-day").innerHTML = `${year}/${month}/${date}（${week[day]}）`;
        id("time-time").innerHTML = `${hour}:${min}:${sec}`;
        id("last").innerHTML = `${lastHour}:${lastMin}:${lastSec}`;
        id("next").innerHTML = `${nextHour}:${nextMin}:${nextSec}`;

        setTimeout(loop, 1);
        return;
    }

    // Display current subject and the next two.
    function showSubject(nth, day, subjects) {
        if (nth >= subjects[weekEn[day]].length) {
            return "";
        } else if (nth < 0) {
            return "本日課程尚未開始";
        } else {
            return subjects[weekEn[day]].at(nth);
        }
    }

    loop();
}