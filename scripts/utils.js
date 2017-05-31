/**
 * Renders slides and optional slideshow controls
 * using renderSlides and renderControls helper functions.
 * @param {object} data 
 */
function render (data, callback) {

    renderSlides(data, function () {

        if (data.parameters.displayControls) {

            renderControls(data, callback);

        }
        else {

            callback();

        }

    });

    
}

/**
 * Using HTML to render a slideshow served from a json file.
 * @param {HTMLElement} data 
 */
function renderSlides (data, callback) {

    $.get('templates/slideshow.html', function(slideshow) {
        
       var slideshow = Handlebars.compile(slideshow);
      
       $("body").append(slideshow(data));

       callback();

    });

}

/**
 * Using HTML to render slideshow controls served from a json file.
 * @param {object} data 
 */
function renderControls (data, callback) {
              
    $.get('templates/controls.html', function (buttons) {
        var buttons = Handlebars.compile(buttons);
        console.log(buttons(data));
        
        $("body").append(buttons(data));
        callback();
    });    

}
