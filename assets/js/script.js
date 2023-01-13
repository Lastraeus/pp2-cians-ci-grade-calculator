let selectedResults = []
const resultStrings = ["Pass", "Merit", "Distinction"];
let lowerCaseResults = [];
let tableBody = document.querySelector("grade-table-body");
let gradeSelectors = document.querySelectorAll(".grade-select");
let sumSpan = document.querySelector("#total-result-points"); // Span where Summed Points Are displayed
let resultP = document.querySelector("#displayed-result"); // Span where Final Grade Word is displayed
let finalSum = sumSpan.innerText;
let finalResult = resultP.innerText;
let randomButtons = document.querySelectorAll(".random-input-buttons");
let buttonsNotSet = false;
let tablePointsNodes = document.querySelectorAll("tr td:nth-of-type(4)");
let tableTotalsNodes = document.querySelectorAll("tr td:nth-of-type(5)");
let scrollTarget = document.querySelector("#scroll-to-me");

/** starts the table reading and update systems */
function startTableGradeSystem() {
    tableGradeRead();
    readTableGradeAfterChange();
    lowerCaseResults = toLowerCaseArray(resultStrings);
    initializeRandomButtons();
}

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
 * This class creates individualised grade ID selectors (including the missing '#'), 
 * assigns unique change listeners to them which is
 * necessary so each has a unique output upon change
 * */
class GradeChangeInterpreter {
    constructor(gradeId) {

        let specificGradeId = document.querySelector(`#${gradeId}`)

        // add unique listener to each that resets the 
        specificGradeId.addEventListener("change", e => {
            selectedResults = []
            tableGradeRead()
        });
    }
}
/** 
 * inputs array of strings to arrive at array of total points for each project
 * Makes an array of values after turning "pass" to int 4 (for points per grade) etc
 * Makes a new array after multiplying creds per project by points
 * Returns total points summed from previous array.
 * */
function calculateResults(rawResults) {
    let selectedResultPointsIntArray = translateResultArray(rawResults); 
    let multipliedResultsArray = multiplyCreditsByCases(selectedResultPointsIntArray);
    let sumTotalPoints = multipliedResultsArray.reduce((a, b) => { 
        return a + b;
    });
    insertDataToTable(selectedResultPointsIntArray, multipliedResultsArray, sumTotalPoints);
}

/** Insert all the arrays and figures back into the html table*/
function insertDataToTable(selectedResultPointsIntArray, multipliedResultsArray, sumTotalPoints) {
    insertPointsToTable(selectedResultPointsIntArray);
    insertTotalsToTable(multipliedResultsArray);
    insertSumToPage(sumTotalPoints);
    insertResultToPage(sumTotalPoints);
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

function initializeRandomButtons() {
    randomButtons.forEach(button => {
        new randomButtonInterpreter(button.id);
    });
}

/**
 * add missing "#" to passed buttonId value
 * add unique listener to each that runs the relevant randomiser
 * last number of id equals which function to run
 */
class randomButtonInterpreter {
    constructor(button) {
        let specificButtonNode = document.querySelector(`#${button}`);

        specificButtonNode.addEventListener("click", e => {
            let selectedButtonNumber = button.charAt(button.length - 1)
            randomiseResults(selectedButtonNumber);

            scrollTarget.scrollIntoView({
                behavior: 'smooth'
              });
        });
    }
}

function randomiseResults(whichButton) {
    newLowerCaseResults = []
    for (i = 0; i < selectedResults.length; i++) {
        let random = (Math.floor(Math.random() * lowerCaseResults.length));
        newLowerCaseResults.push(lowerCaseResults[random])
    }
    calculateResults(newLowerCaseResults);

    switch (whichButton) {
        case "0":
            break;
        case "1":
            if (!(resultP.innerText === "Pass")) {
                randomiseResults("1")
            }
            break;
        case "2":
            if (!(resultP.innerText === "Merit")) {
                randomiseResults("2")
            }
            break;
        case "3":
            if (!(resultP.innerText === "Distinction")) {
                randomiseResults("3")
            }
            break;
    }

    updateSelectors()
};

/**sets each td text in points column to equivlent int from pointsArray */
function insertPointsToTable(pointsArray) {
    let i = 0;
    tablePointsNodes.forEach(pointsCell => {
        pointsCell.innerText = pointsArray[i];
        i++;
    })
}
/**sets each td text in totals column to equivlent int from multipliedTotalsArray */
function insertTotalsToTable(multipliedTotalsArray) {
    let i = 0;
    tableTotalsNodes.forEach(totalsCell => {
        totalsCell.innerText = multipliedTotalsArray[i];
        i++;
    })
}

/** inserts final sum to page * */
function insertSumToPage(inSum) {
    sumSpan.innerText = inSum;
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


/** 
 * Wait for the DOM to finish loading, then run the initial system
 * */
document.addEventListener("DOMContentLoaded", startTableGradeSystem);