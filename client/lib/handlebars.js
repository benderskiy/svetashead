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