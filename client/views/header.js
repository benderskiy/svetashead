Template.header.helpers({
    category: function() {
        return PortfolioCategory.find().fetch();
    }
});

Template.header.rendered = function() {
    global.header.update({
        $: $('header .header-link')
    });
};

Template.header.events({
    'click #a-logout': function(e) {
        e.preventDefault();
        Meteor.logout(function() {
            
        });
    }
});