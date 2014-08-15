var getImgSrc = function(img) {
    var parts = $(img).attr('src').split('.');
    if (parts.length > 1) {
        parts[parts.length-2] = parts[parts.length-2]; //  + 'full'
    }
    return parts.join('.');
};

Template['portfolio-entry'].events({
    'click .entry-content>img': function(ev) { 
        var $this = $(ev.target);
        var src = getImgSrc(ev.target);

        var prevs = _.map($this.prevAll('.entry-content>img'), getImgSrc);
        var nexts = _.map($this.nextAll('.entry-content>img'), getImgSrc);

        global.fs.image(src, prevs, nexts);
    }
});
