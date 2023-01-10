

let gradeTableData = []
const tableBody = document.getElementById('grade-table-body');
const lineOneGrade = document.getElementById('grade1');
const gradeSelectors = document.querySelectorAll(".grade-select")

function defaultTable() {

}
//Store table values in gradeTableData object
function readTableGrade() {

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
document.addEventListener("DOMContentLoaded", readTableGrade());

class GradeInterpreter  {
    constructor(gradeId){
        let specificGrade = document.querySelector(`#${gradeId}`)
        console.log(specificGrade)
        specificGrade.addEventListener( "change", e => {
        console.log(specificGrade.value);
    } );
   }

 }

 gradeSelectors.forEach(grade => {
    new GradeInterpreter(grade.id);
 })
//https://www.fwait.com/how-to-trigger-select-change-event-in-javascript/
