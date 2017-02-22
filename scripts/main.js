var tick = 1000;

function slideShowStarter () {

    document.getElementById("slideShow").getElementsByTagName('img')[0].classList.add('active');

}
setInterval( function (){

   var current =  document.getElementById("slideShow").getElementsByClassName('active')[0];
   current.classList.remove('active');

   if (current.parentElement.nextElementSibling) { 

     current.parentElement.nextElementSibling.getElementsByTagName("img")[0].classList.add('active');
   
    }
    else {

       slideShowStarter(); 

    }

}, tick);

document.addEventListener("DOMContentLoaded", slideShowStarter , false);