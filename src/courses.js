window.onload = init;
var inputCodeEl = document.getElementById("courseCode");
var inputNameEl = document.getElementById("courseName");
var inputProgEl = document.getElementById("courseProg");
var inputSyllEl = document.getElementById("syllabus");
var courseListEl = document.getElementById("courseList");
var errorSpace1El = document.getElementById("errorSpace1");
var addBtnEl = document.getElementById("addBtn");
addBtnEl.addEventListener("click", addCourses);
inputProgEl.addEventListener("keyup", checkInput);
function addCourses() {
    var course = {
        code: inputCodeEl.value,
        name: inputNameEl.value,
        progression: inputProgEl.value,
        syllabus: inputSyllEl.value
    };
    if (courseListEl) {
        courseListEl.textContent = "Kurskod: ".concat(course.code, ". Kursnamn: ").concat(course.name, ". \n  Progression: ").concat(course.progression, ". Kursplan: ").concat(course.syllabus, ".");
        inputCodeEl.value = "";
        inputNameEl.value = "";
        inputProgEl.value = "";
        inputSyllEl.value = "";
    }
    saveCourses(course);
}
function checkInput() {
    var input = inputProgEl.value;
    if (input === "A" || input === "B" || input === "C") {
        addBtnEl.disabled = false;
        errorSpace1El.innerHTML = "";
    }
    else {
        addBtnEl.disabled = true;
        errorSpace1El.innerHTML = "Välj A, B eller C!";
    }
}
function saveCourses(course) {
    var jsonStr = JSON.stringify(course);
    localStorage.setItem("course", jsonStr);
}
function init() {
    loadCourses();
}
function loadCourses() {
    if (localStorage != null) {
        var savedCourse = JSON.parse(localStorage.getItem("course"));
        if (courseListEl) {
            courseListEl.textContent = "Kurskod: ".concat(savedCourse.code, ". Kursnamn: ").concat(savedCourse.name, ". \n      Progression: ").concat(savedCourse.progression, ". Kursplan: ").concat(savedCourse.syllabus, ".");
        }
    }
    ;
}
