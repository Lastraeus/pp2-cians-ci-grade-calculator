let expanded = false;
let rulesDiv = document.querySelector("#expand-calc-rules")
let articleElement = document.querySelector("#assesment-quote")
let defaultArticle = articleElement.innerHTML;

function startAssesmentGuideSystem() {
    rulesDiv.addEventListener("click", e =>
        expandOrContractDiv())
}

function expandOrContractDiv() {
    if (!(expanded)) { // if div is not expanded (default)
        articleElement.innerHTML = expandedHtmlBlock;
        expanded = true;
    } else {
        articleElement.innerHTML = defaultArticle;
        expanded = false;
    }
}

function insertHtmlToExpandedDiv() {}

// Wait for the DOM to finish loading, then run the initial system
document.addEventListener("DOMContentLoaded", startAssesmentGuideSystem());

let expandedHtmlBlock = `
<h2>
    Final Grade Calculation As Per Official Assessment Guide
</h2>
<br>
<h3 id="click-instruction">
    Click anywhere in this box to shrink this again.
</h3>
<br>
<p>
    The five projects all contribute to your final grade.
    <br>
    This is calculated from the points awarded for a pass/merit/distinction multiplied by the
    number of credit points per module.
    <br>
    These are depicted in the table below.
    The maximum number of points available are 480.
</p>
<br>
<table id="credit-explanation-table " class="center">
    <thead>
        <th>Module</th>
        <th>Credit Points</th>
    </thead>
    <tbody>
        <tr>
            <td>
                PP1 - HTML/CSS Essentials
            </td>
            <td>
                8
            </td>
        </tr>
        <tr>
            <td>
                PP2 - Javascript Essentials
            </td>
            <td>
                8
            </td>
        </tr>
        <tr>
            <td>
                PP3 - Python Essentials
            </td>
            <td>
                8
            </td>
        </tr>
        <tr>
            <td>
                PP4 - Full Stack Toolkit
            </td>
            <td>
                16
            </td>
        </tr>
        <tr>
            <td>
                PP5 - Chosen Specialisation
            </td>
            <td>
                20
            </td>
        </tr>
    </tbody>
</table>
<br>
<table id="points-per-grade-table" class="center">
    <thead>
        <th>Points Per Grade</th>
    </thead>
    <tbody>
        <tr>
            <td>
                Pass
            </td>
            <td>
                4
            </td>
        </tr>
        <tr>
            <td>
                Merit
            </td>
            <td>
                6
            </td>
        </tr>
        <tr>
            <td>
                Distinction
            </td>
            <td>
                8
            </td>
        </tr>
    </tbody>
</table>
<br>
<table id="grade-bands-table" class="center">
    <thead>
    <th>Grade Bands</th>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>
                    Pass
                </p>
            </td>
            <td>
                <p>
                    240 - 311
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>
                    Merit
                </p>
            </td>
            <td>
                <p>
                    312 - 383
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>
                    Distinction
                </p>
            </td>
            <td>
                <p>
                    384 - 480
                </p>
            </td>
        </tr>
    </tbody>
</table>
<br>
`