const toDoList = new List();
if (localStorage.getItem('list')) {
   const items = JSON.parse(localStorage.getItem('list'));
   toDoList.getList(items);
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render();
}
console.log(toDoList.list);





function getElem(e) {

   if (e.target.classList.contains('arrow') || e.target.classList.contains('nav-link')) return changePeriod(e);
   // else return false;
   // else console.log(this);
}


function changePeriod(elem) {
   elem.preventDefault();
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

function addTask(event) {
   event.preventDefault();
   const time = document.querySelector('#time').value;
   const date = document.querySelector('#date').value.split('-').reverse().join('.');
   const textTask = document.querySelector('#textTask').value;

   const nTask = new Task(date, time, textTask);
   toDoList.accept(nTask);
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render();
}

document.querySelector('#addTask').onclick = addTask;
document.querySelector('.bodyTask').addEventListener('click', getElem);
document.querySelector('.taskBorder').addEventListener('click', () => {
   let allTasks = document.querySelectorAll('.task');
   for (let i = 0; i < allTasks.length; i++) {
      allTasks[i].onclick = Select;
   }
});


let b1 = new Task('05.06.2021', '10:00', 'Test b1');

let b2 = new Task('06.05.2021', '12:00', 'Test b2');


// list.accept(b1);
// list.accept(b2);