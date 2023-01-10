let gradeTableData = []
const tableBody = document.getElementById('grade-table-body');
const gradeSelectors = document.querySelectorAll(".grade-select")

function firstTableRead() {
    if (gradeTableData.length === 0) {
        gradeSelectors.forEach(grade => {
            gradeTableData.push(grade.value);
        })
        console.log(gradeTableData)
    }
}

//Store table values in gradeTableData object
function readTableGrade() {

    function updateDataArray(selectedString) {
        console.log(selectedString);
    }

    /**
     * This function cycles through each node in the nodelist of grade selectors
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
            let specificGradeId = document.querySelector(`#${gradeId}`)

            specificGradeId.addEventListener("change", e => {
                updateDataArray(specificGradeId.value);
            });
        }
    }
    firstTableRead()
    readTableGradeAfterChange()
}




// Wait for the DOM to finish loading before running
document.addEventListener("DOMContentLoaded", readTableGrade());



function calculateResults() {

}

function insertResults() {

}

function expandOrContractDiv() {

}

function insertHtmlToExpandedDiv() {

}