function getElem(e) {

   if (e.target.classList.contains('arrow') || e.target.classList.contains('nav-link')) return changePeriod(e);
   else return false;

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



document.querySelector('.bodyTask').addEventListener('click', getElem);