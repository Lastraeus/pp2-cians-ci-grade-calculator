let gradeTableData = []
let selectedResults = []
const tableBody = document.getElementById('grade-table-body');
const gradeSelectors = document.querySelectorAll(".grade-select")

/** starts the table reading and update systems */
function startTableGradeSystem() {

    function tableGradeRead() {

        gradeSelectors.forEach(grade => {
            selectedResults.push(grade.value);
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
    tableGradeRead()
    // initialises updating system (adds listeners etc)
    readTableGradeAfterChange()
}

/** inputs array of strings to arrive at array of total points for each project */
function calculateResults(rawResults) {
    let selectedResultPointsIntArray = translateResultArray(rawResults); // Array after turning "pass" to int 4 (for points per grade)
    let multipliedResultsArray = multiplyCreditsByCases(selectedResultPointsIntArray) // Array after multiplying creds per project by points Eg = [ 48, 32, 64, 128, 120 ]
    let sumTotalPoints = multipliedResultsArray.reduce((a, b) => {
        return a + b; 
    });

    insertPointsToTable(selectedResultPointsIntArray);
    return;


}

/** change "pass" in selectedResults array from tableRead() to int 4 etc */
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

        console.log(multipliedCreditsArray) //test
        return multipliedCreditsArray;
    }
}

// Wait for the DOM to finish loading the run the initial system
document.addEventListener("DOMContentLoaded", startTableGradeSystem());

function insertPointsToTable(pointsArray) {
    pointsArrayToInsert = []
    tablePointsNodes = document.querySelectorAll("tr td:nth-of-type(4)")// Points Column
    let i = 0;
    tablePointsNodes.forEach(pointsCell => {
        pointsCell.innerText = pointsArray[i]; // sets each td text in column to equivlent int from pointsArray
        i++;
    })
}

function insertResults() {


}

function expandOrContractDiv() {

}

function insertHtmlToExpandedDiv() {

}