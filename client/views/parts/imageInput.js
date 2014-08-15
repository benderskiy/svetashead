Template['imageInput'].events({
    'click .upload-image': function(e) {
        $(e.target).closest('.image-input').find('.input-file').click();
    },
    'change .input-file' : function (  e) {   
        var $img = $(e.target).closest('.image-input').find('.image-preview');
        _.each(e.target.files, function(file) {
            $img.attr('src', global.loadingImg);
            sendFiles(file, file.name, 'images/', function(url) {
                $img.attr('src', url).click();
            });
        });
    },

    'click .select-image': function(e) {
        global.fs.loadFromGallery(function(src) {
            $(e.target).closest('.image-input').find('.image-preview')
                .attr('src', src).click();

        });
    }
});