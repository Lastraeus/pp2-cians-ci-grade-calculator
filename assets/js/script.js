const resultStrings = ["Pass", "Merit", "Distinction"];
let selectedResults = []
let lowerCaseResults = [];
let tableBody = document.querySelector("grade-table-body");
let gradeSelectors = document.querySelectorAll(".grade-select");
let sumSpan = document.querySelector("#total-result-points"); // Span where Summed Points Are displayed
let resultP = document.querySelector("#displayed-result"); // Span where Final Grade Word is displayed
let finalSum = sumSpan.innerText;
let finalResult = resultP.innerText;
let randomButtons = document.querySelectorAll(".random-input-buttons");
let buttonsNotSet = false;
let tablePointsNodes = document.querySelectorAll("tr:nth-child(n+1):nth-child(-n+5) td:nth-of-type(4)");
let tableTotalsNodes = document.querySelectorAll("tr:nth-child(n+1):nth-child(-n+5) td:nth-of-type(5)");
let scrollTarget = document.querySelector("#scroll-to-me");

/** starts the table reading and update systems */
function startTableGradeSystem() {
    tableGradeRead();
    readTableGradeAfterChange();
    lowerCaseResults = toLowerCaseArray(resultStrings);
    initializeRandomButtons();
}

/**
 * Creates an array of the currently selected calculator options then passes them to calculateResults().
 */
function tableGradeRead() {
    gradeSelectors.forEach(grade => {
        selectedResults.push(grade.value); // 
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

        specificGradeId.addEventListener("change", e => {
            selectedResults = []
            tableGradeRead()
        });
    }
}

/**
 * Takes array of strings to generate two new Arrays and and Int of overal total points.
 * 
 * Makes an array of values after turning "pass" to int 4 (for points per grade) etc
 * Makes a new array after multiplying creds per project by points
 * Returns total points summed from previous array.
 * @param {Array} rawResults    Array from tableGradeRead()
 */
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

/**
 * Takes Array of (5) ints representing each result's point value and
 * multiplies them by the correct Credit amount for that module. 
 * 
 * @param {Array} pointsArray Current Array of "points" column values on each line of table.
 * @returns New Array of each lines points value multiplied by correct credit amount.
 */
function multiplyCreditsByCases(pointsArray) {
    let multipliedCreditsArray = []
    for (let i = 0; i <= pointsArray.length; i++) {
        let coefficient = null;
        if (i <= 2) {
            coefficient = 8 // First 3 Projects are 8 credits
        } else if (i === 3) {
            coefficient =  16 // 3rd project is 16 credits 
        } else if (i === 4) {
             coefficient =  20 // 4th project is 20 credits 
        } 
        
        if (coefficient) {
        	multipliedCreditsArray.push((pointsArray[i]) * coefficient) 
        }
    }
    return multipliedCreditsArray;
}

/**
 * Converts Array of strings to lowercase.
 * 
 * @param {Array} inArrayOfStrings Any array of String values.
 * @returns Array of strings all in lowercase
 */
function toLowerCaseArray(inArrayOfStrings) {
    let result = []
    for (word of inArrayOfStrings) {
        let resultWord = word.toLowerCase()
        result.push(resultWord)
    }
    return result;
}

/**
 * Reads the points cells next to any given grade selector (run after they're updated by randomise buttons process),
 * translates the new points cell value into the relevant selection option,
 * sets that value as the currently displayed/selected option for the selector dropdown.
 */
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

/**
 * Takes a vaule from the points table and returns it's equivilant grade value string.
 * @param {*} gradeValue 
 * @returns strings of "Pass", "Merit","Distinction" depending on case or "Error" in event of invalid case.
 */
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

/**
 * This function creates a randomButtonInterpreter for each button, to facilitate  
 */
function initializeRandomButtons() {
    randomButtons.forEach(button => {
        new randomButtonInterpreter(button.id);
    });
}

/**
 * add missing "#" to passed buttonId value
 * add unique listener to each that runs the relevant randomiser
 * last number of id equals which function to run
 * Each listener also scrolls the relevant content into view.
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

/**
 * Runs the correct randomise algorithm depending on which button was pressed. Then runs updateSelectors() to push changes to page.
 * Reruns the bounded final pass, final merit etc cases until the desired result is generated.
 * @param {*} whichButton passes correct ID number of the the specific randomiser button (the final character of the button's ID)
 */
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

/** inserts final result word to page * */
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