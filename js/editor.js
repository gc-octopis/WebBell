function loadEditor() {

    function createRow(onColumn = [1, 1, 1, 1, 1, 1, 1]) {
        let tr = document.createElement("tr");

        let leftColumn = document.createElement("td");
        leftColumn.classList.add("left-column");
        leftColumn.innerHTML = qsAll("#subject-list tr").length;
        tr.appendChild(leftColumn);

        for (let i = 1; i <= 7; i++) {
            tr.appendChild(createCls(onColumn[i - 1]));
        }

        return tr;
    }


    function rmEmptyRows() {
        qsAll("#subject tr").forEach(row => {
            if (!row.some(cls => { if (cls.className == "class") return true;})) row.remove();
        });
    }

    function createCls(create = true) {

        let cls = document.createElement("td");

        if (create) {
            clsAddProperties(cls);
        }
        
        return cls;
    }

    function clsAddProperties(cls, timeValue = "00:00:00", subjectValue = "") {
        clsClearProperties(cls);
        cls.classList.add("class");
        let timeInput = document.createElement("input");
        timeInput.classList.add("class-input");
        timeInput.classList.add("time-input");
        selection(timeInput, {
            'durationFormat': 'hh:mm:ss',
            'max': 3600 * 24
        });
        timeInput.value = timeValue;
        cls.appendChild(timeInput);

        let subjectInput = document.createElement("input");
        subjectInput.classList.add("class-input");
        subjectInput.classList.add("subject-input");
        subjectInput.value = subjectValue;
        cls.appendChild(subjectInput);

        let rmBtn = document.createElement("div");
        rmBtn.classList.add("rm-btn");
        rmBtn.innerHTML = "×";
        rmBtn.onclick = () => rmCls(cls);
        cls.appendChild(rmBtn);

        let addBtn = document.createElement("div");
        addBtn.classList.add("add-btn");
        addBtn.innerHTML = "+";
        addBtn.onclick = () => addCls(cls);
        cls.appendChild(addBtn);

        cls.onmouseenter = () => {
            event.target.querySelector(".rm-btn").style.display = "block";
            event.target.querySelector(".add-btn").style.display = "block";    
        }

        cls.onmouseleave = () => {
            event.target.querySelector(".rm-btn").style.display = "none";
            event.target.querySelector(".add-btn").style.display = "none";    
        }
    }

    function clsClearProperties(cls) {
        cls = cls.cloneNode(false);
        cls.removeAttribute("class");
    }


    function addCls(element) {
        let trs = qsAll("#subject-list tr");
        let countTr = trs.length;
        let currentRow = findNthElement(element.closest("tr"));
        let currentColumn = findNthElement(element);
        let bag = [0, 0, 0, 0, 0 ,0 ,0];
        bag[currentColumn - 1] = 1;

        if (countTr - 1 == currentRow) {
            id("subject-list").appendChild(createRow(bag));
        } else {
            let next = clsPos(currentRow + 1, currentColumn);
            if (next.className == "class") addCls(next); 
            else clsAddProperties(next);
        }
    }

    function clsPos(row, column) { // returns an element
        return qsAll("#subject-list tr")[row].querySelectorAll("td")[column];
    }

    id("subject-list").appendChild(createRow());
}