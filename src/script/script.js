import {
   List
} from './models/List.js';
import {
   Task
} from './models/Task.js';

const toDoList = new List();

if (localStorage.getItem('list')) {
   const items = JSON.parse(localStorage.getItem('list'));
   toDoList.saveList(items);
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render(toDoList.list);
}


function getElem(e) {
   if (e.target.classList.contains('arrow') || e.target.classList.contains('nav-link')) return changePeriod(e);
}

function changePeriod(elem) {
   elem.preventDefault();
   let activeInterval = {};
   let period = document.querySelectorAll('.nav-link');
   let count = 0;
   if (elem.target.classList.contains('nav-link')) {
      for (let i = 0; i < period.length; i++) {
         if (period[i].classList.contains('active')) {
            period[i].classList.remove('active');
            elem.target.classList.add('active');
            activeInterval = elem.target;
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
      activeInterval = period[count];
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
      activeInterval = period[count];
   }
   if (activeInterval.classList.contains('today')) {
      filter('today');
   }
   if (activeInterval.classList.contains('week')) {
      filter('week');
   }
   if (activeInterval.classList.contains('month')) {
      filter('month');
   }
   if (activeInterval.classList.contains('all')) {
      document.querySelector('.taskBorder').innerHTML = '';
      toDoList.render(toDoList.list);
   }
}

function filterList(start, end) {
   let elems = {};
   let list = JSON.parse(localStorage.getItem('list'));

   for (let key in list) {
      let itemTime = new Date(list[key].date);
      if (+itemTime >= start && +itemTime < end) {
         elems[list[key].timeStamp] = list[key];
      }
   }
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render(elems);
}

function filter(sort) {

   if (sort == 'today') {
      let date = new Date();
      let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      let end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, start.getHours(), start.getMinutes(), start.getSeconds() - 1);
      filterList(start, end);
   }

   if (sort == 'week') {
      let date = new Date();
      let diff = date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1); ///
      let weekStart = new Date(date.setDate(diff)); ///
      let start = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate()); /// get every monday
      let end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7, start.getHours(), start.getMinutes(), start.getSeconds() - 1);
      filterList(start, end);
   }

   if (sort == 'month') {
      let date = new Date();
      let start = new Date(date.getFullYear(), date.getMonth());
      let end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
      filterList(start, end);
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

function addTask(event) { //add new task
   event.preventDefault();
   const time = document.querySelector('#time').value;
   const date = document.querySelector('#date').value;
   const textTask = document.querySelector('#textTask').value;
   const nTask = new Task(date, time, textTask);
   toDoList.accept(nTask);
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render(toDoList.list);
}

function edit() { //edit task
   let list = JSON.parse(localStorage.getItem('list'));
   let items = document.querySelector('.taskBorder').children;
   for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains('select')) {
         let task = items[i].getAttribute('data');
         for (let key in list) {
            if (list[key].timeStamp == +task) {

               document.querySelector('#etime').value = list[key].time;
               document.querySelector('#edate').value = list[key].date.split('.').reverse().join('-');
               document.querySelector('#etextTask').textContent = list[key].taskText;
               document.querySelector('#editTask').onclick = (e) => {
                  list[key].time = document.querySelector('#etime').value;
                  list[key].date = document.querySelector('#edate').value;
                  list[key].taskText = document.querySelector('#etextTask').value;
                  toDoList.saveList(list);
                  document.querySelector('.taskBorder').innerHTML = '';
                  toDoList.render(toDoList.list);
               }
            }
         }
      }
   }
}

function done() {
   let task;
   let list = JSON.parse(localStorage.getItem('list'));
   let items = document.querySelector('.taskBorder').children;
   for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains('select')) task = items[i].getAttribute('data');
   }

   for (let key in list) {
      if (list[key].timeStamp == +task) {
         list[key].done = true;
      }
      toDoList.accept(list[key]);
   }
   document.querySelector('.taskBorder').innerHTML = '';
   toDoList.render(toDoList.list);
}

document.querySelector('#addTask').onclick = addTask;
document.querySelector('#edit').onclick = edit;
document.querySelector('#done').onclick = done;
document.querySelector('.bodyTask').addEventListener('click', getElem);
document.querySelector('.taskBorder').addEventListener('click', () => {
   let allTasks = document.querySelectorAll('.task');
   for (let i = 0; i < allTasks.length; i++) {
      allTasks[i].onclick = Select;
   }
});