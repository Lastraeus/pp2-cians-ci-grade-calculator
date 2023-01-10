let gradeTableData = []
const tableBody = document.getElementById('grade-table-body');
const gradeSelectors = document.querySelectorAll(".grade-select")

function tableRead() {

    gradeSelectors.forEach(grade => {
        gradeTableData.push(grade.value);
    })
    console.log(gradeTableData)
}

/** starts the table reading and update systems */
function startTableGradeSystem() {
    function tableRead() {

        gradeSelectors.forEach(grade => {
            gradeTableData.push(grade.value);
        })
        console.log(gradeTableData)
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
                gradeTableData = []
                tableRead()
            });
        }
    }
    tableRead()
    readTableGradeAfterChange()
}




// Wait for the DOM to finish loading before running
document.addEventListener("DOMContentLoaded", startTableGradeSystem());



function calculateResults() {

}

function insertResults() {

}

function expandOrContractDiv() {

}

function insertHtmlToExpandedDiv() {

}