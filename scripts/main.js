var tick = 1000;

function slideShowStarter () {

    document.getElementById("slideShow").getElementsByClassName('img-wrapper')[0].classList.add('active');

}
setInterval( function (){

   var current = document.getElementById("slideShow").getElementsByClassName('active')[0];
   current.classList.remove('active');

   if (current.nextElementSibling) { 

     current.nextElementSibling.classList.add('active');
   
   }
   else {

       slideShowStarter(); 

   }

}, tick);

document.addEventListener("DOMContentLoaded", slideShowStarter , false);