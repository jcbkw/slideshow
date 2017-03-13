/**
 * Parsing/converting a json file into an object. 
 * TODO rename.
 */
function parseData () {

    render(JSON.parse(this.responseText));
    slideShowInit();
    
}

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

    var slideshow = document.createElement("div"),
        slide,
        divEl,
        imgEl,
        txtNd,  
        aEl,
        pEl,
        i;

    slideshow.setAttribute("id", "slideShow");    
    slideshow.setAttribute("class", "slideshow");

    for (i = 0; i < data.slides.length; i++ ) {

        slide   = data.slides[i];

        divEl   = document.createElement("div");
        imgEl   = document.createElement("img");
        aEl     = document.createElement("a");
        pEl     = document.createElement("p");
                
        txtNd   = document.createTextNode(slide.text);
        
        divEl.setAttribute("class", data.parameters.cssClass);
        aEl.setAttribute("href", slide.link);
        aEl.setAttribute("target", slide.target || data.parameters.defaultTarget);
        imgEl.setAttribute("src", slide.url);
        imgEl.setAttribute("alt", data.parameters.baseName + (i+1));

        pEl.appendChild(txtNd);        
        aEl.appendChild(imgEl);
        aEl.appendChild(pEl);
        divEl.appendChild(aEl);
        
        slideshow.appendChild(divEl);

    }


    document.body.appendChild(slideshow);
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

/**
 * Fetches slideshow data. 
 * Uses request helper function.
 */
function initialize () {

    request("slideshow.json", parseData);

}








