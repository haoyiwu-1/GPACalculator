function addRow() {
    var table = document.getElementById("table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Grade (Percentage): <input class=\"grade\" type=\"number\" min=\"0\" max=\"100\" required>";
    cell2.innerHTML = "Weight: <input class=\"weight\" type=\"number\" min=\"1\" max=\"100\" required>";
}

function calculateGPAs() {
    const gradeValues = Array.from(document.querySelectorAll('.grade'))
        .map(input => input.value)
    const weightValues = Array.from(document.querySelectorAll('.weight'))
        .map(input => input.value)

    var gradeTotal9Scale = 0;
    var gradeTotal4Scale = 0;
    var weightTotal = 0;

    for (var i = 0; i < gradeValues.length; i++) {
        var currGrade = parseInt(gradeValues[i]);
        var currWeight = parseInt(weightValues[i]);
        if (currGrade >= 90 && currGrade <= 100) {
            gradeTotal9Scale += 9 * currWeight;
            gradeTotal4Scale += 4 * currWeight;
        } else if (currGrade >= 80 && currGrade <= 89) {
            gradeTotal9Scale += 8 * currWeight;
            gradeTotal4Scale += 3.8 * currWeight;
        } else if (currGrade >= 75 && currGrade <= 79) {
            gradeTotal9Scale += 7 * currWeight;
            gradeTotal4Scale += 3.3 * currWeight;
        } else if (currGrade >= 70 && currGrade <= 74) {
            gradeTotal9Scale += 6 * currWeight;
            gradeTotal4Scale += 3 * currWeight;
        } else if (currGrade >= 65 && currGrade <= 69) {
            gradeTotal9Scale += 5 * currWeight;
            gradeTotal4Scale += 2.3 * currWeight;
        } else if (currGrade >= 60 && currGrade <= 64) {
            gradeTotal9Scale += 4 * currWeight;
            gradeTotal4Scale += 2 * currWeight;
        } else if (currGrade >= 55 && currGrade <= 59) {
            gradeTotal9Scale += 3 * currWeight;
            gradeTotal4Scale += 1.3 * currWeight;
        } else if (currGrade >= 50 && currGrade <= 54) {
            gradeTotal9Scale += 2 * currWeight;
            gradeTotal4Scale += 1 * currWeight;
        } else {
            gradeTotal9Scale += 0 * currWeight;
            gradeTotal4Scale += 0 * currWeight;
        }
        weightTotal += currWeight;
    }
    alert("9.0 Scale GPA - " + (gradeTotal9Scale / weightTotal).toFixed(2) + "\n4.0 Scale GPA - " + (gradeTotal4Scale / weightTotal).toFixed(2));
}

function checkInputs() {
    var errorFlag = false;
    gradeInputs = document.getElementsByClassName('grade');
    weightInputs = document.getElementsByClassName('weight');

    for (index = 0; index < gradeInputs.length; index++) {
        var cellVal = gradeInputs[index].value;
        if (!(cellVal >= 0 && cellVal <= 100) || cellVal == "") {
            gradeInputs[index].value = "";
            errorFlag = true;
        }
    }

    for (index = 0; index < weightInputs.length; index++) {
        var cellVal = weightInputs[index].value;
        if (!(cellVal >= 0 && cellVal <= 100) || cellVal == "") {

            weightInputs[index].value = "";
            errorFlag = true;
        }
    }

    if (!errorFlag) {
        calculateGPAs();
        window.location.reload();
    } else {
        alert("Enter values between 0 and 100 for grades and values between 1 and 100 for weights.");
    }
}