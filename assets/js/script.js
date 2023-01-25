const resultStrings = ["Pass", "Merit", "Distinction"];
let selectedResults = [];
let lowerCaseResults = [];
let gradeSelectors = document.querySelectorAll(".grade-select");
let sumSpan = document.querySelector("#total-result-points"); // Span where Summed Points Are displayed
let resultSpan = document.querySelector("#displayed-result"); // Span where Final Grade Word is displayed
let randomButtons = document.querySelectorAll(".random-input-buttons");
let tablePointsNodes = document.querySelectorAll("tr:nth-child(n+1):nth-child(-n+5) td:nth-of-type(4)");
let tableTotalsNodes = document.querySelectorAll("tr:nth-child(n+1):nth-child(-n+5) td:nth-of-type(5)");
let scrollTarget = document.querySelector("#scroll-to-me");

// START UP FUNCTIONS SECTION

/** 
 * Wait for the DOM to finish loading, then run the initial system.
 * */
document.addEventListener("DOMContentLoaded", startTableGradeSystem);

/** starts the table reading and update systems */
function startTableGradeSystem() {
    tableGradeRead();
    readTableGradeAfterChange();
    lowerCaseResults = toLowerCaseArray(resultStrings);
    initializeRandomButtons();
}

// TABLE READ AND CALCULATION SECTION

/**
 * Creates an array of the currently selected calculator options then passes them to calculateResults().
 */
function tableGradeRead() {
    gradeSelectors.forEach(grade => {
        selectedResults.push(grade.value); // 
    });
    calculateResults(selectedResults);
}

/**
 * Make a unique GradeChangeInterpreter object from a passed element's ID attribute.
 * @param {Element} grade selector node
 */
function makeUniqueGradeChangeInterpreter(grade) {
    new GradeChangeInterpreter(grade.id);
}

/**
 * This function cycles through each node in the nodelist of "grade" selector elements
 * and makes passes it to makeUniqueGradeChangeInterpreter to make a unique GradeChangeInterpreter object from it's id attribute.
 */
function readTableGradeAfterChange() {
    gradeSelectors.forEach(makeUniqueGradeChangeInterpreter);
}

/**
 * This class creates individualised grade ID selectors (including the missing '#'), 
 * assigns unique change listeners to them which is
 * necessary so each has a unique output upon change
 * */
class GradeChangeInterpreter {
    constructor(gradeId) {

        let specificGradeId = document.querySelector(`#${gradeId}`);

        specificGradeId.addEventListener("change", e => {
            selectedResults = [];
            tableGradeRead();
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

/** change "pass" in an array from tableRead() to int 4, etc */
function translateResultArray(wordResults) {
    let translatedResults = [];
    for (let result of wordResults) {
        switch (result) {
            case "pass":
                translatedResults.push(4); //Pass is worth 4 Points
                break;
            case "merit":
                translatedResults.push(6); //Merit is worth 6 Points
                break;
            case "distinction":
                translatedResults.push(8); //Distinction is worth 8 Points
                break;
            default:
                translatedResults.push("Error"); // Unexpected/Error case
                break;
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
    let multipliedCreditsArray = [];
    for (let i = 0; i <= pointsArray.length; i++) {
        let coefficient = null;
        if (i <= 2) {
            coefficient = 8; // First 3 Projects are 8 credits
        } else if (i === 3) {
            coefficient = 16; // 3rd project is 16 credits 
        } else if (i === 4) {
            coefficient = 20; // 4th project is 20 credits 
        }

        if (coefficient) {
            multipliedCreditsArray.push((pointsArray[i]) * coefficient);
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
    let result = [];
    for (let word of inArrayOfStrings) {
        let resultWord = word.toLowerCase();
        result.push(resultWord);
    }
    return result;
}

/**
 * Reads the points cells next to any given grade selector (run after updated by randomise buttons process),
 * translates the new points cell value into the relevant selection option,
 * sets that value as the currently displayed/selected option for the selector dropdown.
 */
function updateSelectors() {
    gradeSelectors.forEach(grade => {
        let gradeCell = grade.parentElement;
        let newPointsCell = gradeCell.nextElementSibling;
        let newSelection = reverseTranslateResult(newPointsCell.innerText);
        for (let i = 0; i < grade.options.length; ++i) {
            if (grade.options[i].text === newSelection)
                grade.options[i].selected = true;
        }
    });
}

/**
 * Takes a value from the points table and returns its equivilant grade value string.
 * @param {number} gradeValue 
 * @returns strings of "Pass", "Merit","Distinction" depending on case or "Error" in event of invalid case.
 */
function reverseTranslateResult(gradeValue) {
    switch (gradeValue) {
        case "4":
            return "Pass"; //Pass is worth 4 Points
        case "6":
            return "Merit"; //Merit is worth 6 Points
        case "8":
            return "Distinction"; //Distinction is worth 8 Points
        default:
            return "Error"; // Unexpected/Error case
    }
}

// RANDOM BUTTON SECTION

/**
 * Make a unique RandomButtonInterpreter object from a passed element's ID attribute.
 * @param {Element} randomiser button node
 */
function makeUniqueRandomButtonInterpreter(button) {
    new RandomButtonInterpreter(button.id);
}

/**
 * This function creates a RandomButtonInterpreter() class object for each button, to facilitate unique button specfic listeners.
 */
function initializeRandomButtons() {
    randomButtons.forEach(makeUniqueRandomButtonInterpreter);
}

/**
 * This Class creates button objects with unique listeners that run the correct randomiser algorithm,
 * while scrolling the table/results/buttons into view.
 * 
 * add missing "#" to passed buttonId value
 * add unique listener to each that runs the relevant randomiser
 * last number of id equals which randomiseResults() case to run
 * Each listener also scrolls the relevant content into view.
 */
class RandomButtonInterpreter {
    constructor(button) {
        let specificButtonNode = document.querySelector(`#${button}`);

        specificButtonNode.addEventListener("click", e => {
            let selectedButtonNumber = button.charAt(button.length - 1);
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
 * 
 * @param {number} whichButton passes correct ID number of the the specific randomiser button (the final character of the button's ID)
 */
function randomiseResults(whichButton) {
    let newLowerCaseResults = [];
    for (let i = 0; i < selectedResults.length; i++) {
        let random = (Math.floor(Math.random() * lowerCaseResults.length));
        newLowerCaseResults.push(lowerCaseResults[random]);
    }
    calculateResults(newLowerCaseResults);

    switch (whichButton) {
        case "0":
            break;
        case "1":
            if (resultSpan.innerText !== "Pass") {
                randomiseResults("1");
            }
            break;
        case "2":
            if (resultSpan.innerText !== "Merit") {
                randomiseResults("2");
            }
            break;
        case "3":
            if (resultSpan.innerText !== "Distinction") {
                randomiseResults("3");
            }
            break;
    }

    updateSelectors();
}

// INSERT DATA TO TABLE / UPDATE TABLE SECTION

/**
 * Sets each td text in points column to equivlent int from pointsArray
 * @param {Array} pointsArray Contains an array of each points value awarded by each grade, in project order.
 */
function insertPointsToTable(pointsArray) {
    let i = 0;
    tablePointsNodes.forEach(pointsCell => {
        pointsCell.innerText = pointsArray[i];
        i++;
    });
}

/**
 * Sets each td text in totals column to equivlent int from multipliedTotalsArray.
 * 
 * @param {Array} multipliedTotalsArray Contains an array of total value of (points per grade * credits per project), in project order.
 */
function insertTotalsToTable(multipliedTotalsArray) {
    let i = 0;
    tableTotalsNodes.forEach(totalsCell => {
        totalsCell.innerText = multipliedTotalsArray[i];
        i++;
    });
}

/** 
 * Inserts final sum to page as innerText of the correct Span.
 * 
 * @param {Number} inSum Sum of each project total scored points(after credits * grade value calculation has been done).
 */
function insertSumToPage(inSum) {
    sumSpan.innerText = inSum;
}

/**
 * Takes the inSum Number variable and evaluates it to the correct Grade word in String form.
 * 
 * @param {Number} inSum Sum of each project total scored points(after credits * grade value calculation has been done).
 */
function insertResultToPage(inSum) {
    if (inSum <= 311) {
        resultSpan.innerText = resultStrings[0];
    } else if (inSum <= 383) {
        resultSpan.innerText = resultStrings[1];
    } else {
        resultSpan.innerText = resultStrings[2];
    }
}

/** Insert all the arrays and figures back into the html table*/
function insertDataToTable(selectedResultPointsIntArray, multipliedResultsArray, sumTotalPoints) {
    insertPointsToTable(selectedResultPointsIntArray);
    insertTotalsToTable(multipliedResultsArray);
    insertSumToPage(sumTotalPoints);
    insertResultToPage(sumTotalPoints);
}