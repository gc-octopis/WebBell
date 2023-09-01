// Change between tabs when user click it.

function loadTabs() {
    let tabs = qsAll(".tab");
    let buttons = qsAll(".tabSelector button");

    function tab(index) {
        tabs.forEach(element => {
            element.style.display = "none";
        });
        buttons.forEach(element => {
            element.style.backgroundColor = "";
        });
        buttons[index].style.backgroundColor = "rgba(0,0,0,0.5)";
        tabs[index].style.display = "block";
        if (index === 1) {
            Peaks(peaks);
        }
    }

    buttons.forEach( (e, i) => {
        e.onclick = tab.bind(undefined, i);
        
    });

    tab(0);
}