/**
 * Renders slides and optional slideshow controls
 * using renderSlides and renderControls helper functions.
 * @param {object} data 
 */
function render (data) {

    renderSlides(data);
    
    if (data.parameters.displayControls) {

        renderControls(data);

    }

}

/**
 * Using HTML to render a slideshow served from a json file.
 * @param {HTMLElement} data 
 */
function renderSlides (data) {

    $.get('templates/slideshow.html', function(template) {
        
       var slideshow = Handlebars.compile(template);
       console.log(template);
        $("body").append(slideshow(data));

    });

}

/**
 * Using HTML to render slideshow controls served from a json file.
 * @param {object} data 
 */
function renderControls (data) {

    var controls    = document.createElement("div"),
        btnData,
        btnEl,
        txtNd,
        i;

    controls.setAttribute("class", "slideshow-controls");

    for (i = 0; i < data.buttons.length; i++ ) {

        btnData   = data.buttons[i];

        btnEl   = document.createElement("button");
        txtNd   = document.createTextNode(btnData.text);
        
        btnEl.setAttribute("class", data.parameters.btnClass);
        btnEl.setAttribute("type", data.parameters.btnType);
        btnEl.setAttribute("id", btnData.id);

        btnEl.appendChild(txtNd);        
        
        controls.appendChild(btnEl);

    }

    document.body.appendChild(controls);
}

/**
 * Instanciates an XMLHttpRequest, opens and sends ajax request and adds an XMLHttpRequest load event handler.
 * @param {string} url 
 * @param {function} callback 
 */
function request (url, callback) {

    var xhr = new XMLHttpRequest ();
    xhr.addEventListener("load", callback, /*useCapture*/ false);
    xhr.open("GET", url, /*async*/ true);
    xhr.send();

}

