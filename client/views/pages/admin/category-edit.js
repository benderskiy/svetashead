Template['category-edit'].events({
    'submit form': function(e) {
        image = $(e.target).closest('form').find('.image-input .image-preview').attr('src');

        Meteor.call('editCategory', this._id, image,
            function(err, res) {
                if (err) {
                    console.error(err);
                } else {
                    Router.go('/portfolio');
                }
            }
        );

        return false;
    }
});