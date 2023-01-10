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
     * assigns unique change listeners to them which
     * currently logs updated values to console
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




// Wait for the DOM to finish loading the run the initial system
document.addEventListener("DOMContentLoaded", startTableGradeSystem());

/** change "pass" in selectedResults array to int 4 etc */
function translateResultArray (wordResults) {
    let translatedResults = []
    for (let result of wordResults) {
        switch (result) {
            case "pass":
                translatedResults.push(4) //Pass is worth 4 Points
                break
            case "merit":
                translatedResults.push(6) //Pass is worth 6 Points
                break
            case "distinction":
                translatedResults.push(8) //Pass is worth 8 Points
                break
            default:
                translatedResults.push("Error") // Unexpected/Error case
                break

        }
    }
    return translatedResults;
}

function calculateResults(rawResults) {


    let selectedResultsIntFormatArray = translateResultArray(rawResults)

    console.log(selectedResultsIntFormatArray) // test

    function multiplyCreditsByCases() {

    }



}

function insertResults() {

}

function expandOrContractDiv() {

}

function insertHtmlToExpandedDiv() {

}