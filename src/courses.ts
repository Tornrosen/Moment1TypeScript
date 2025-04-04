window.onload = init;

let inputCodeEl = document.getElementById("courseCode") as HTMLInputElement;
let inputNameEl = document.getElementById("courseName") as HTMLInputElement;
let inputProgEl = document.getElementById("courseProg") as HTMLInputElement;
let inputSyllEl = document.getElementById("syllabus") as HTMLInputElement;
let courseListEl = document.getElementById("courseList") as HTMLUListElement;
let errorSpace1El = document.getElementById("errorSpace1") as HTMLDivElement;
let errorSpace2El = document.getElementById ("errorSpace2") as HTMLDivElement;
let addBtnEl = document.getElementById("addBtn") as HTMLButtonElement;
let i;

interface Course {
  code: string,
  name: string,
  progression: string,
  syllabus: string
}[]

addBtnEl.addEventListener("click", addCourses);
inputProgEl.addEventListener("keyup", checkInput);
inputCodeEl.addEventListener("keyup", checkUniqueness);

function addCourses(): void {

  let course: Course = {
    code: inputCodeEl.value,
    name: inputNameEl.value,
    progression: inputProgEl.value,
    syllabus: inputSyllEl.value
  }

  if (courseListEl) {

    let newEl = document.createElement("article");
    let newTextNode = document.createTextNode(`Kurskod: ${course.code}. Kursnamn: ${course.name}. 
  Progression: ${course.progression}. Kursplan: ${course.syllabus}.`);
    newEl.appendChild(newTextNode);
    courseListEl.appendChild(newEl);
    newEl.className = "course";
    inputCodeEl.value = "";
    inputNameEl.value = "";
    inputProgEl.value = "";
    inputSyllEl.value = "";
  }
  saveCourses();
}

function checkInput(): void {
  let input = inputProgEl.value
  if (input === "A" || input === "B" || input === "C") {
    addBtnEl.disabled = false;
    if (errorSpace1El) errorSpace1El.innerHTML = "";

  }
  else {
    addBtnEl.disabled = true;
    if (errorSpace1El) errorSpace1El.innerHTML = "Välj A, B eller C!"
  }
}

function saveCourses(): void {
  let courses = document.getElementsByClassName("course");
  let tempArr = [];

  for (i = 0; i < courses.length; i++) {
    tempArr.push(courses[i].innerHTML);
  }

  let jsonStr = JSON.stringify(tempArr); //konverterar till json-sträng  

  localStorage.setItem("courses", jsonStr);
  console.log(courses);
}
function init() : void {
  loadCourses();
}

function checkUniqueness() : void {
  let input = inputCodeEl.value
  if (localStorage) {
    let savedCourses = localStorage.getItem("courses");

    if (savedCourses) {
      let objCourses = JSON.parse(savedCourses); 
      const filteredCourses = objCourses.filter((course:Course) =>
        course.code.toLowerCase().includes(input.toLowerCase()) 
    )
    if(filteredCourses.length>0){
      addBtnEl.disabled = true;
      if (errorSpace2El) errorSpace2El.innerHTML = "Skriv en unik kurskod!";}
      else {errorSpace2El.innerHTML = "";
        addBtnEl.disabled = false;
      }
  
    }}}


function loadCourses() : void {
  if (localStorage) {
    let savedCourses = localStorage.getItem("courses");

    if (savedCourses) {
      let objCourses = JSON.parse(savedCourses);

      if (courseListEl) {
        for (i = 0; i < objCourses.length; i++) {
          let newEl = document.createElement("article");
          let newTextNode = document.createTextNode(objCourses[i]);
          newEl.appendChild(newTextNode);
          newEl.className = "course";
          courseListEl.appendChild(newEl);
        }
      }
    };
  }
}


