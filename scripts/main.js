$(function () { //jQuery iife DOM content loaded


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

        showSlideOffsets($slide, true);
        showSlideDescriptions($slide, true);
        $slide.addClass(activeClass);
        
        

    }


    /**
     * Hides an active slide within a given set of slides.
     * @param {Object[]}  slide - jQuery object representing a slide.
     */ 
    function hide ($slide) {

        
        showSlideOffsets($slide, false);
        showSlideDescriptions($slide, false);
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
        
        return getSlides().first();
        

    }

        
    function showSlideDescriptions($slide, boolean) {

        var index = $slide.attr("data");
        var $slideDesc = $(".row[data="+ index +"]");

        //$slideDesc.slideToggle(400);

        if (boolean) {

                $slideDesc.fadeIn("300", function (){
                $slideDesc.addClass("active");

             });
        }

        else {

             $slideDesc.fadeOut("300", function (){
                $slideDesc.removeClass("active");

             });
        }

        

    }

    function showSlideOffsets($slide, boolean) {

        var index = Number($slide.attr("data"));
        var maxIndex = Number($slide.parent().children().length - 1);
        var $firstSlide = $slide.parent().children().first();
        var $lastSlide = $slide.parent().children().last();
        var $prev = $slide.prev(".slide");
        var $next = $slide.next(".slide");

        if (index === maxIndex) {
            
            $next = $firstSlide;
            
        }

        if (index === 0) {
            
            $prev = $lastSlide;

        }

        boolean ? $prev.addClass("offset-left"):
                    $prev.removeClass("offset-left");

        boolean ? $next.addClass("offset-right"):
                    $next.removeClass("offset-right");

    }

        
    /**
     * Return last slide of the given slideshow.
     * 
     * @return {HTMLElement}
     */
    function getLastSlide () {

        var $slides = getSlides();
        return $slides.last();

    }

    /**
     * Collects all slides within a given slideshow.
     * @returns{Array} slides - Collection of slides. 
     */
    function getSlides () {

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
        $(".slideshow-controls").on('click', slideControlsClickHandler);

        showFirstSlide();
        slideShowPlay();
        
    }
    /**
     * Fetches slideshow data.
     * Parsing/converting a json file into an object.
     * Calls helper functions to structure the DOM and add event listeners.
     */
    function starter () {  

        $.get("slideshow.json", function (data) {

            render(data, slideShowInit);

        })

    }

    starter();

});
