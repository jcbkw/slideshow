$(function () { //jQuery iife


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
     * @param {Object[]}  slide - A jQuery object representing a slide.
     */ 
    function show ($slide) {

        $slide.addClass(activeClass);

    }


    /**
     * Hides an active slide within a given set of slides.
     * @param {Object[]}  slide - jQuery object representing a slide.
     */ 
    function hide ($slide) {

        $slide.removeClass(activeClass);

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

        var $current = getActiveSlide();
       
        slideShowMove($current, $current.prev(), showLastSlide);

    }

    /**
     * Displays the previous slide within a given set of slides.
     * Uses helper function, slideShowMove.
     */ 
    function slideShowNext () {

    var $current = getActiveSlide();
    
    slideShowMove($current, $current.next(), showFirstSlide);

    }

    /**
     * Displays the next desired slide within a given set of slides.
     * @param {Object[]} fromSlide - The slide that you want to hide and move away from.
     * @param {Object[]} toSlide - The slide that you want to display and shift towards.
     * @param {function} fallbackFunction - A slideshow handler that will be called if fromSlide or toSlide length values are falsy. 
     */ 
    function slideShowMove ($fromSlide, $toSlide, fallbackFunction) {
        
        if ($fromSlide.length){
            
            hide($fromSlide);

        }
        
        if ($toSlide.length) {


            show($toSlide);

        }


        else {
            //console.log(fromSlide.next());
            fallbackFunction(); 

        }

        slideShowPlay();

    }

    /**
     * Returns the active slide a given set of slides.
     * @returns {HTMLElement}
     */
    function getActiveSlide () {

        return $("#slideShow .active");

    }

    /**
     * Return first slide of the given slideshow.
     * 
     * @return {HTMLElement}
     */
    function getFirstSlide () {
        //console.log(getAllSlides().get(0));
        return getAllSlides().first();

    }

    /**
     * Return last slide of the given slideshow.
     * 
     * @return {HTMLElement}
     */
    function getLastSlide () {

        var $slides      = getAllSlides();

        return $slides[$slides.length - 1];

    }

    /**
     * Collects all slides within a given slideshow.
     * @returns{Array} slides - Collection of slides. 
     */
    function getAllSlides () {

        return $("#slideShow .slide");

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

        $("slideshow-controls").on("click", slideControlsClickHandler);

        showFirstSlide();
        slideShowPlay();
        
    }
    /**
     * Sets the event DOM content loaded event listener.
     */
    function starter () {  

        $.get("slideshow.json", function (data) {

            render(data);

            slideShowInit();

        })

    }

    starter();

}());
