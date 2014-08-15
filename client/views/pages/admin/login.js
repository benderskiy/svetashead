Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
        Meteor.loginWithPassword(
            "admin", 
            $(e.target).find('#input-pass').val(), 
            function(err) {
                if (!err) {
                    Router.go('/');
                } else {
                    $(e.target).find('.hidden').removeClass('hidden');
                }
            }
        );
    }
});