

let gradeTableData = []


function defaultTable() {

}
//Store table values in gradeTableData object
function readTableValues() {
    let table = document.getElementById('grade-table-body');
    let rows = table.children;
    for (let row of rows) {
        let projectLine = {}

        let cells = row.children;
        projectLine.project = cells[0].textContent;
        projectLine.credits = cells[1].textContent;
        projectLine.grade = cells[2].textContent;
        projectLine.points = cells[3].textContent;
        projectLine.total = cells[4].textContent;
        gradeTableData.push(projectLine);

        console.log(gradeTableData)
    }
}

function calculateResults() {

}

function insertResults() {

}

function expandOrContractDiv() {

}

function insertHtmlToExpandedDiv() {

}

// Wait for the DOM to finish loading before running
document.addEventListener("DOMContentLoaded", readTableValues())

readTableValues()
