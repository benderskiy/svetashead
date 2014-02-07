/*
    helper {{smoothBg src="..." id="..." class="..."}} makes a <img> tag 
    when img.onload occurs, makes a parent div background = img.src
*/
Handlebars.registerHelper('smoothBg', function(options) {
    var aSrc = options.hash.src || '';
    var aId = options.hash.id || '';
    var aClass = options.hash.class || '';

    return new Handlebars.SafeString(
        '<img ' + 
            'src="' + aSrc + '"' +
            'id="' + aId + '"' +
            'class="no-display load ' + aClass + '"' +
            'onload="' + "this.parentNode.style.backgroundImage = 'url(" + aSrc + ")'" + 
        '" />');
});