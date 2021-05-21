export class Task {
   constructor(date, time, taskText) {

      let timeStamp = new Date();
      timeStamp = Date.parse(timeStamp);

      this.date = date;
      this.time = time;
      this.taskText = taskText;
      this.timeStamp = timeStamp;
      this.done = 'false'; // if true - add class="bg-success"

   }

   /*away() {
       let timeStamp = new Date();
       timeStamp = Date.parse(timeStamp);
       this._timeStamp = timeStamp;

      const task = document.createElement('div');
      const when = document.createElement('div');
      const date = document.createElement('div');
      const time = document.createElement('div');
      const taskText = document.createElement('div');
      task.classList.add('task', 'container', 'my-2', 'mx-0', 'px-0', 'py-2', 'row');
      when.classList.add('when', 'container', 'col-sm-3', 'm-0', 'px-0');
      date.classList.add('date', 'text-center');
      time.classList.add('time', 'text-center');
      taskText.classList.add('taskText', 'col-sm-9');
      date.textContent = this._date;
      time.textContent = this._time;
      taskText.textContent = this._taskText;
      when.append(date);
      when.append(time);
      task.append(when);
      task.append(taskText);
       task.setAttribute('data', this._timeStamp);
   return this;
   // console.log(task);
} */
}