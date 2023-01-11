let selectedResults = []
const resultStrings = ["Pass", "Merit", "Distinction"];
let lowerCaseResults = [];
const tableBody = document.getElementById('grade-table-body');
const gradeSelectors = document.querySelectorAll(".grade-select")
const sumSpan = document.querySelector("#total-result-points") // Span where Summed Points Are displayed
const resultP = document.querySelector("#displayed-result") // Span where Final Grade Word is displayed
var finalSum = sumSpan.innerText;
var finalResult = resultP.innerText;

/** starts the table reading and update systems */
function startTableGradeSystem() {

    function tableGradeRead() {

        gradeSelectors.forEach(grade => {
            selectedResults.push(grade.value); // creates an array of the currently selected options
        })
        calculateResults(selectedResults);
    }

    /**
     * This function cycles through each node in the nodelist of "grade" selector elements
     * and makes a new unique instance of GradeChangeInterpreter class from it's id attribute.
     */
    function readTableGradeAfterChange() {
        gradeSelectors.forEach(grade => {
            new GradeChangeInterpreter(grade.id);
        })
    }

    /**
     * This class creates individualised grade ID selectors, 
     * assigns unique change listeners to them which is
     * necessary so each has a unique output upon change
     * */
    class GradeChangeInterpreter {
        constructor(gradeId) {
            // add missing "#" to passed gradeId value
            let specificGradeId = document.querySelector(`#${gradeId}`)
            // add unique listener to each that resets the 
            specificGradeId.addEventListener("change", e => {
                selectedResults = []
                tableGradeRead()
            });
        }
    }
    // initial table read
    tableGradeRead();
    // initialises updating system (adds listeners etc)
    readTableGradeAfterChange();
    /** upon page load, make lower Case version of resultStrings*/
    lowerCaseResults = toLowerCaseArray(resultStrings);
    randomiseResultsInitial(); // sets listener for random buttons being clicked
}

/** inputs array of strings to arrive at array of total points for each project */
function calculateResults(rawResults) {
    let selectedResultPointsIntArray = translateResultArray(rawResults); // Array after turning "pass" to int 4 (for points per grade)
    let multipliedResultsArray = multiplyCreditsByCases(selectedResultPointsIntArray) // Array after multiplying creds per project by points Eg = [ 48, 32, 64, 128, 120 ]
    var sumTotalPoints = multipliedResultsArray.reduce((a, b) => { // Returns total points summed from previous array.
        return a + b;
    });
    /** Insert all the arrays and figures back into the html table*/
    insertPointsToTable(selectedResultPointsIntArray);
    insertTotalsToTable(multipliedResultsArray);
    insertSumToPage(sumTotalPoints);
    insertResultToPage(sumTotalPoints);
    return;
}

/** change "pass" in an array from tableRead() to int 4, etc */
function translateResultArray(wordResults) {
    let translatedResults = []
    for (let result of wordResults) {
        switch (result) {
            case "pass":
                translatedResults.push(4) //Pass is worth 4 Points
                break
            case "merit":
                translatedResults.push(6) //Merit is worth 6 Points
                break
            case "distinction":
                translatedResults.push(8) //Distinction is worth 8 Points
                break
            default:
                translatedResults.push("Error") // Unexpected/Error case
                break
        }
    }
    return translatedResults;
}

function multiplyCreditsByCases(pointsArray) {
    let multipliedCreditsArray = []
    for (let i = 0; i <= pointsArray.length; i++) {
        if (i <= 2) {
            multipliedCreditsArray.push((pointsArray[i]) * 8) // First 3 Projects are 8 credits
            continue;
        } else if (i === 3) {
            multipliedCreditsArray.push((pointsArray[i]) * 16) // 3rd project is 16 credits 
            continue;
        } else if (i === 4) {
            multipliedCreditsArray.push((pointsArray[i]) * 20) // 4th project is 24 credits 
            ;
        } else {
            multipliedCreditsArray.push("Error") // Unexpected/Error case
        }
        return multipliedCreditsArray;
    }
}

function toLowerCaseArray(inArrayOfStrings) {
    let result = []
    for (word of inArrayOfStrings) {
        let resultWord = word.toLowerCase()
        result.push(resultWord)
    }
    return result;
}

function randomiseResultsInitial() {
    // add click listener to each that resets the results array used by calculateResults()

    let randomiseButton0 = document.querySelector("#random-button0");
    randomiseButton0.addEventListener("click", e => randomiseResults0()) // Totally Randomise Buttion

    let randomiseButton1 = document.querySelector("#random-button1");
    randomiseButton1.addEventListener("click", e => randomiseResults1()) // Random Final Pass Buttion

    let randomiseButton2 = document.querySelector("#random-button2");
    randomiseButton2.addEventListener("click", e => randomiseResults2()) // Random Final Merit Buttion

    let randomiseButton3 = document.querySelector("#random-button3");
    randomiseButton3.addEventListener("click", e => randomiseResults3()) // Random Final Distinction Buttion
}

function updateSelectors() {
    gradeSelectors.forEach(grade => {
        let gradeCell = grade.parentElement;
        let newPointsCell = gradeCell.nextElementSibling
        let newSelection = reverseTranslateResult(newPointsCell.innerText)
        for (let i = 0; i < grade.options.length; ++i) {
            if (grade.options[i].text === newSelection)
                grade.options[i].selected = true;
        }
    });
}

function reverseTranslateResult(gradeValue) {
    switch (gradeValue) {
        case "4":
            return "Pass" //Pass is worth 4 Points
        case "6":
            return "Merit" //Merit is worth 6 Points
        case "8":
            return "Distinction" //Distinction is worth 8 Points
        default:
            return "Error" // Unexpected/Error case
    }
}

function randomiseResults0() {
    newLowerCaseResults = []
    for (i = 0; i < selectedResults.length; i++) {
        let random0 = (Math.floor(Math.random() * lowerCaseResults.length)); // full random index int for array
        newLowerCaseResults.push(lowerCaseResults[random0])
    }
    calculateResults(newLowerCaseResults);
    updateSelectors()
};

function randomiseResults1() {
    newLowerCaseResults = []
    for (i = 0; i < selectedResults.length; i++) {
        let random0 = (Math.floor(Math.random() * lowerCaseResults.length)); // full random index int for array
        newLowerCaseResults.push(lowerCaseResults[random0])
    }
    calculateResults(newLowerCaseResults);
    if (!(resultP.innerText === "Pass")) { // if not a pass run again
        randomiseResults1()
    }
    updateSelectors()
};

function randomiseResults2() {
    newLowerCaseResults = []
    for (i = 0; i < selectedResults.length; i++) {
        let random0 = (Math.floor(Math.random() * lowerCaseResults.length)); // full random index int for array
        newLowerCaseResults.push(lowerCaseResults[random0])
    }
    calculateResults(newLowerCaseResults);
    if (!(resultP.innerText === "Merit")) { // if not a merit run again
        randomiseResults2()
    }
    updateSelectors()
};

function randomiseResults3() {
    newLowerCaseResults = []
    for (i = 0; i < selectedResults.length; i++) {
        let random0 = (Math.floor(Math.random() * lowerCaseResults.length)); // full random index int for array
        newLowerCaseResults.push(lowerCaseResults[random0])
    }
    calculateResults(newLowerCaseResults);
    if (!(resultP.innerText === "Distinction")) { // if not a distinction run again
        randomiseResults3()
    }
    updateSelectors()
};

function insertPointsToTable(pointsArray) {
    let tablePointsNodes = document.querySelectorAll("tr td:nth-of-type(4)") // Points Column
    let i = 0;
    tablePointsNodes.forEach(pointsCell => {
        pointsCell.innerText = pointsArray[i]; // sets each td text in column to equivlent int from pointsArray
        i++;
    })
}

function insertTotalsToTable(multipliedTotalsArray) {
    let tableTotalsNodes = document.querySelectorAll("tr td:nth-of-type(5)") // Points Column
    let i = 0;
    tableTotalsNodes.forEach(totalsCell => {
        totalsCell.innerText = multipliedTotalsArray[i]; // sets each 
        i++;
    })

}

function insertSumToPage(inSum) {
    sumSpan.innerText = inSum; // sets final sum
}

function insertResultToPage(inSum) {
    if (inSum <= 311) {
        resultP.innerText = resultStrings[0];
    } else if (inSum <= 383) {
        resultP.innerText = resultStrings[1];
    } else {
        resultP.innerText = resultStrings[2];
    }
    resultP.innerText
}

// Wait for the DOM to finish loading, then run the initial system
document.addEventListener("DOMContentLoaded", startTableGradeSystem());