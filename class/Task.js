let taskBorder = document.querySelector('.taskBorder');


function clone() {
   let task = document.querySelector('.task');
   let elem = task.cloneNode(true);
   taskBorder.append(elem);
}

clone();
clone();
clone();
clone();

class Task {
   constructor(date, time, taskText) {
      this._date = date;
      this._time = time;
      this._taskText = taskText;
   }
}