const form = document.querySelector('form');

form.addEventListener('focusin', (event) => {
    if (event.target.tagName.toLowerCase() === 'input') {
        document.getElementById("warning").textContent = "";
    }
})

/* function to add a row to table */
function addRow() {
    var table = document.getElementById("table");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Grade (Percent): <input class=\"grade\" type=\"number\" min=\"0\" max=\"100\" required>";
    cell2.innerHTML = "Weight: <input class=\"weight\" type=\"number\" min=\"1\" max=\"100\" required>";
}

/* function to calculate 9.0 and 4.0 scale GPAs given correct inputs */
function calculateGPAs() {
    /* grab course grades and weights */
    const gradeValues = Array.from(document.querySelectorAll('.grade'))
        .map(input => input.value)
    const weightValues = Array.from(document.querySelectorAll('.weight'))
        .map(input => input.value)

    var gradeTotal9Scale = 0;
    var gradeTotal4Scale = 0;
    var weightTotal = 0;

    const gradeToPoints9Scale = [
        { min: 90, max: 100, points: 9 },
        { min: 80, max: 89, points: 8 },
        { min: 75, max: 79, points: 7 },
        { min: 70, max: 74, points: 6 },
        { min: 65, max: 69, points: 5 },
        { min: 60, max: 64, points: 4 },
        { min: 55, max: 59, points: 3 },
        { min: 50, max: 54, points: 2 },
        { min: 40, max: 49, points: 1 },
        { min: 0, max: 49, points: 0 },
    ];

    const gradeToPoints4Scale = [
        { min: 90, max: 100, points: 4 },
        { min: 85, max: 89, points: 3.9 },
        { min: 80, max: 84, points: 3.7 },
        { min: 77, max: 79, points: 3.3 },
        { min: 73, max: 76, points: 3 },
        { min: 70, max: 72, points: 2.7 },
        { min: 67, max: 69, points: 2.3 },
        { min: 63, max: 66, points: 2 },
        { min: 60, max: 62, points: 1.7 },
        { min: 57, max: 59, points: 1.3 },
        { min: 53, max: 56, points: 1 },
        { min: 50, max: 52, points: 0.7 },
        { min: 0, max: 49, points: 0 },
    ];

    /* map grades to correct grade points and aggregate total grade points and course weight for each scale */
    for (var i = 0; i < gradeValues.length; i++) {
        var currGrade = parseInt(gradeValues[i]);
        var currWeight = parseInt(weightValues[i]);

        if (isNaN(currGrade) || isNaN(currWeight) || currWeight <= 0) {
            continue;
        }

        const grade9 = gradeToPoints9Scale.find(grade => currGrade >= grade.min && currGrade <= grade.max);
        gradeTotal9Scale += grade9 ? grade9.points * currWeight : 0;

        const grade4 = gradeToPoints4Scale.find(grade => currGrade >= grade.min && currGrade <= grade.max);
        gradeTotal4Scale += grade4 ? grade4.points * currWeight : 0;

        weightTotal += currWeight;
    }
    /* return GPAs for 4.0 and 9.0 scale rounded to 2 decimal places for clarity */
    var result = document.getElementById("result");
    result.textContent = "9.0 Scale GPA - " + (gradeTotal9Scale / weightTotal).toFixed(2) + "\n4.0 Scale GPA - " + (gradeTotal4Scale / weightTotal).toFixed(2);
    result.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

/* function to check inputs for GPA calculator */
function calculate() {
    var errorFlag = false;
    /* grab course grades and weights by classname */
    gradeInputs = document.getElementsByClassName('grade');
    weightInputs = document.getElementsByClassName('weight');

    /* check for incorrect grade inputs */
    for (index = 0; index < gradeInputs.length; index++) {
        var cellVal = gradeInputs[index].value;
        if (!(cellVal >= 0 && cellVal <= 100) || cellVal == "") {
            gradeInputs[index].value = "";
            errorFlag = true;
        }
    }

    /* check for incorrect weight inputs */
    for (index = 0; index < weightInputs.length; index++) {
        var cellVal = weightInputs[index].value;
        if (!(cellVal >= 1 && cellVal <= 100) || cellVal == "") {

            weightInputs[index].value = "";
            errorFlag = true;
        }
    }

    /* if no incorrect inputs do GPA calculations return them and reload page */
    if (!errorFlag) {
        calculateGPAs();
    } else {
        /* if incorrect inputs warn user to re-enter correct inputs */
        document.getElementById("warning").textContent = "Enter values between 0 and 100 for grades and values between 1 and 100 for weights.";
    }
}