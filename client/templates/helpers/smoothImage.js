/*
    helper {{smoothImage src="..." id="..." class="..."}} makes a <img> tag
    with smooth loading (images.lessimport)
*/
Handlebars.registerHelper('smoothImage', function(options) {
    var aSrc = options.hash.src || '';
    var aId = options.hash.id || '';
    var aClass = options.hash.class || '';

    return new Handlebars.SafeString(
        '<img ' + 
            'src="' + aSrc + '"' +
            'id="' + aId + '"' +
            'class="load ' + aClass + '"'  + 
            'onload="this.className = this.className + \'loaded\'"'+
        '" />');
});