var tick = 5000,
    activeClass = 'active',
    intervalId;

/**
 * Stops the iteration of a given setInterval interval id.
 */    
function slideShowStop () {

    clearInterval(intervalId);
  
}


/**
 * Resets the iteration of a new setInterval function and sets a new interval id.
 */
function slideShowPlay () {

    slideShowStop();

    intervalId = setInterval(slideShowNext, tick);

}

/**
 * Displays the slide within a given set of (hidden) slides.
 * @param {string}  slide - HTMLElement representing a slide.
 */ 
function show (slide) {

    slide.classList.add(activeClass);

}


/**
 * Hides an active slide within a given set of slides.
 * @param {string}  slide - HTMLElement representing a slide.
 */ 
function hide (slide) {

    slide.classList.remove(activeClass);

}

/**
 * Displays the first slide within a given set of slides.
 */ 
function showFirstSlide () {

    show(getFirstSlide());

}


/**
 * Displays the last slide within a given set of slides.
 */ 
function showLastSlide () {

    show(getLastSlide());

}

/**
 * Displays the previous slide within a given set of slides.
 * Uses helper function, slideShowMove
 */ 
function slideShowPrev () {

    var current = getActiveSlide();

    slideShowMove(current, current.previousElementSibling, showLastSlide);

}

/**
 * Displays the previous slide within a given set of slides.
 * Uses helper function, slideShowMove.
 */ 
function slideShowNext () {

   var current = getActiveSlide();

   slideShowMove(current, current.nextElementSibling, showFirstSlide);

}

/**
 * Displays the next desired slide within a given set of slides.
 * @param {string} fromSlide  - The slide that you want to hide and move away from.
 * @param {string} toSlide - The slide that you want to display and shift towards.
 * @param {function} fallbackFunction - A slideshow handler that will be called if fromSlide or toSlide are falsy. 
 */ 
function slideShowMove (fromSlide, toSlide, fallbackFunction) {

    if (fromSlide) {

        hide(fromSlide);

    }

    if (toSlide) {

        show(toSlide);

    }
    else {

        fallbackFunction(); 

    }

    slideShowPlay();

}

/**
 * Returns the active slide a given set of slides.
 * @returns {HTMLElement}
 */
function getActiveSlide () {

    return document.getElementById("slideShow").getElementsByClassName(activeClass)[0];

}

/**
 * Return first slide of the given slideshow.
 * 
 * @return {HTMLElement}
 */
function getFirstSlide () {

    return getAllSlides()[0];

}

/**
 * Return last slide of the given slideshow.
 * 
 * @return {HTMLElement}
 */
function getLastSlide () {

    var slides      = getAllSlides();

    return slides[slides.length - 1];

}

/**
 * Collects all slides within a given slideshow.
 * @returns{Array} slides - Collection of slides. 
 */
function getAllSlides () {

    return document.getElementById("slideShow").getElementsByClassName('slide');

}

/**
 * Event handler that listens for clicks and decern click targets amoung the slideshow button controls.
 * @param {Event} event 
 */
function slideControlsClickHandler (event) {

    switch (event.target.id) {

        case "play":

            slideShowPlay();

            break;

        case "stop":
        
            slideShowStop();

            break;
        
        case "prev":

            slideShowPrev();
        
            break;
        
        case "next":
            
            slideShowNext();
        
            break;
    }
}

/**
 * SlideShow initializer
 * Uses helper function showFirstSlide, slideShowPlay.
 * Adds an an event listener to slideshow controls buttons.
 */
function slideShowInit () {

    var controls = document.getElementsByClassName("slideshow-controls")[0];

    showFirstSlide();
    slideShowPlay();

    if (controls) {

        controls.addEventListener("click", slideControlsClickHandler , false);

    }
    
}
/**
 * Sets the event DOM content loaded event listener.
 */
function starter () {  

    document.addEventListener("DOMContentLoaded", initialize, false);

 }

 starter();