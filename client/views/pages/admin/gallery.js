Template['gallery'].helpers({
    images: function() {
        return Images.find();
    }
});

var getImgSrc = function(img) {
    var parts = $(img).attr('src').split('.');
    if (parts.length > 1) {
        parts[parts.length-2] = parts[parts.length-2]; //  + 'full'
    }
    return parts.join('.');
};

var inFullscreen = function($el) {
    return $el.closest('.gallery').parent().hasClass('fs-content');
};

Template['gallery'].events({
    'click .block>img': function(ev) { 
        var $this = $(ev.target);
        var src = getImgSrc(ev.target);
        if ( inFullscreen($this) ) {
            global.fs.callback(src);
        } else {

            prevs = _.map($this.prevAll('.block>img'), getImgSrc);
            nexts = _.map($this.nextAll('.block>img'), getImgSrc);

            global.fs.image(src, prevs, nexts);
        }

    },

    'click .delete-button': function(ev) { 
        var img = $(ev.target).prev('img');
        global.modal.open({
            dialog: true,
            header: 'Удаление картинки',
            content: 'Вы уверены, что хотите удалить эту картинку?' + 
                '<div class="image-wrap">' + img.prop('outerHTML') + '</div>',
            callback: function (res) {
                if (res) {
                    alert('yes!');
                    //deleteFile(file, file.name, 'images/');
                }
            }
        });
    }
});
