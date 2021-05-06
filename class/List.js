class List {
   constructor(items = {}) {

      this.count = 0;
      this.list = items;

   }
   render() {
      for (let key in this.list) {
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
         when.append(date);
         when.append(time);
         task.append(when);
         task.append(taskText);
         task.setAttribute('data', this.list[key].timeStamp);
         date.textContent = this.list[key].date;
         time.textContent = this.list[key].time;
         taskText.textContent = this.list[key].taskText;
         document.querySelector('.taskBorder').append(task);
      }
   }

   accept(items) {
      console.log(items);
      localStorage.setItem('list', JSON.stringify(this.list))
   }

   today() {}
   week() {}
   month() {}


}