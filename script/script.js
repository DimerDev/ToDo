document.querySelector('#addNewTask').onclick = addNewTask;


function getElem(e) {

   if (e.target.classList.contains('arrow') || e.target.classList.contains('nav-link')) return changePeriod(e);
   // else return false;
   // else console.log(this);
}


function changePeriod(elem) {

   let period = document.querySelectorAll('.nav-link');
   let count = 0;
   if (elem.target.classList.contains('nav-link')) {
      for (let i = 0; i < period.length; i++) {
         if (period[i].classList.contains('active')) {
            period[i].classList.remove('active');
            elem.target.classList.add('active');
         }
      }
   }

   if (elem.target.classList.contains('fa-chevron-right')) { //move forward

      for (let i = 0; i < period.length; i++) {
         if (period[i].classList.contains('active')) {
            period[i].classList.remove('active');
            count = i;
         }
      }
      count = ++count;
      if (count == period.length) count = 0;
      period[count].classList.add('active');
   }

   if (elem.target.classList.contains('fa-chevron-left')) { //move back

      for (let i = period.length - 1; i >= 0; i--) {
         if (period[i].classList.contains('active')) {
            period[i].classList.remove('active');
            count = i;
         }
      }
      count = --count;
      if (count == -1) count = period.length - 1;
      period[count].classList.add('active');
   }
}
// set active task 
function Select(e) {
   let allTasks = document.querySelectorAll('.task');
   for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].classList.contains('select')) allTasks[i].classList.remove('select');
   }
   this.classList.add('select');
}

function addNewTask() {
   const time = document.querySelector('#time').value;
   const date = document.querySelector('#date').value;
   const textTask = document.querySelector('#textTask').value;

   const newTask = new Task(date, time, textTask);
   newTask.render();

}


document.querySelector('.bodyTask').addEventListener('click', getElem);
let allTasks = document.querySelectorAll('.task');
console.log(allTasks);
for (let i = 0; i < allTasks.length; i++) {
   allTasks[i].onclick = Select;
}