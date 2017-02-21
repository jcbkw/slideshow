var tick = 1000,
    i = 0,
    slideShowIndex = 0;

function slideShowStarter () {

    document.getElementById("slideShow").getElementsByTagName('img')[0].classList.add('active');

}
setInterval( function (){

   var current =  document.getElementById("slideShow").getElementsByClassName('active')[0];
   current.classList.remove('active');

   if (current.nextElementSibling) { 

     current.nextElementSibling.classList.add('active');
   
    }
    else {

       slideShowStarter(); 

    }

}, tick);

document.addEventListener("DOMContentLoaded", slideShowStarter , false);