/**
 * Renders slides and optional slideshow controls
 * using renderSlides and renderControls helper functions.
 * @param {object} data
 * @param {function} callback
 */
function render (data, callback) {

    renderSlides(data, function () {

        renderDescription(data, function () {

            if (data.parameters.displayControls) {

                renderControls(data, callback);

            }
            else {

                callback();

            }

        });

    });

}

/**
 * Using HTML to render a slideshow served from a json file.
 * @param {object} data
 * @param {function} callback
 */
function renderSlides (data, callback) {

    $.get('templates/slideshow.html', function(slideshow) {
        
       var slideshow = Handlebars.compile(slideshow);
      
       $("body").append(slideshow(data));

       callback();

    });

}

/**
 * Using HTML to render slideshow controls contained in an HTML template.
 * @param {object} data 
 * @param {function} callback
 */
function renderControls (data, callback) {
              
    $.get('templates/controls.html', function (buttons) {
        var controls = Handlebars.compile(buttons);
        
        $("body").append(controls(data));
        callback();
    });    

}

/**  Using HTML to render slideshow descriptions an HTML template.
 * 
 * @param {object} data 
 * @param {function} callback 
 */

function renderDescription (data, callback) {

    $.get('templates/description.html', function (description) {
      var content = Handlebars.compile(description);
      $("body").append(content(data));

      callback();

    });

}