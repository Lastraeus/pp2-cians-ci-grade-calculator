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
        console.log("clicked")
        articleElement.innerHTML = htmlBlock;
        expanded = true;
    } else {
        console.log("defaultArticle")
        articleElement.innerHTML = defaultArticle;
        expanded = false;
    }
}

function insertHtmlToExpandedDiv() {}

// Wait for the DOM to finish loading, then run the initial system
document.addEventListener("DOMContentLoaded", startAssesmentGuideSystem());

let htmlBlock = `<p>
<strong>Final Grade Calculation</strong>
</p>
<p>
The five projects all contribute to your final grade. This is calculated
from the points awarded for a pass/merit/distinction multiplied by the
number of credit points per module. These are depicted in the table below.
The maximum number of points available are 480.
</p>
<table cellpadding="0" border="0">
<tbody>
    <tr>
        <td>
            <p>
                <strong>Module</strong>
            </p>
        </td>
        <td>
            <p>
                <strong>Credit Points</strong>
            </p>
        </td>
    </tr>
    <tr>
        <td width="50%">
            <p>
                HTML/CSS Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Javascript Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Python Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Full Stack Toolkit
            </p>
        </td>
        <td>
            <p>
                16
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Chosen Specialisation
            </p>
        </td>
        <td>
            <p>
                20
            </p>
        </td>
    </tr>
</tbody>
</table>
<table cellpadding="0" border="0">
<tbody>
    <tr>
        <td colspan="2">
            <p>
                <strong>Points Per Grade</strong>
            </p>
        </td>
    </tr>
    <tr>
        <td width="50%">
            <p>
                Pass
            </p>
        </td>
        <td>
            <p>
                4
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
                6
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
                8
            </p>
        </td>
    </tr>
</tbody>
</table>
<table cellpadding="0" border="0">
<tbody>
    <tr>
        <td colspan="2">
            <p>
                <strong>Grade Bands</strong>
            </p>
        </td>
    </tr>
    <tr>
        <td width="50%">
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
<table cellpadding="0" border="0">
<tbody>
    <tr>
        <td>
            <p>
                <strong>Sample </strong>
            </p>
        </td>
        <td>
            <p>
                <strong>Credits</strong>
            </p>
        </td>
        <td>
            <p>
                <strong>Grade</strong>
            </p>
        </td>
        <td>
            <p>
                <strong>Points </strong>
            </p>
        </td>
        <td>
            <p>
                <strong>Total</strong>
            </p>
        </td>
    </tr>
    <tr>
        <td width="50%">
            <p>
                HTML/CSS Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
        <td>
            <p>
                Pass
            </p>
        </td>
        <td>
            <p>
                4
            </p>
        </td>
        <td>
            <p>
                32
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Javascript Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
        <td>
            <p>
                Merit
            </p>
        </td>
        <td>
            <p>
                6
            </p>
        </td>
        <td>
            <p>
                48
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Python Essentials
            </p>
        </td>
        <td>
            <p>
                8
            </p>
        </td>
        <td>
            <p>
                Merit
            </p>
        </td>
        <td>
            <p>
                6
            </p>
        </td>
        <td>
            <p>
                48
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Full Stack Toolkit
            </p>
        </td>
        <td>
            <p>
                16
            </p>
        </td>
        <td>
            <p>
                Pass
            </p>
        </td>
        <td>
            <p>
                4
            </p>
        </td>
        <td>
            <p>
                64
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Chosen Specialisation
            </p>
        </td>
        <td>
            <p>
                20
            </p>
        </td>
        <td>
            <p>
                Pass
            </p>
        </td>
        <td>
            <p>
                4
            </p>
        </td>
        <td>
            <p>
                80
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Total
            </p>
        </td>
        <td>
            <p>
                60
            </p>
        </td>
        <td>
            <br/>
        </td>
        <td>
            <br/>
        </td>
        <td>
            <p>
                272
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <br/>
        </td>
        <td>
            <br/>
        </td>
        <td>
            <br/>
        </td>
        <td>
            <p>
                Final Grade
            </p>
        </td>
        <td>
            <p>
                Pass
            </p>
        </td>
    </tr>
</tbody>
</table>
`