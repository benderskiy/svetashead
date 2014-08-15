Meteor.methods({
    addPortfolioEntry: function(url, image, category, headerText, description, content) {
        if (!Meteor.userId()) {
            return;
        }

        Async.wrap(function(done) {
            PortfolioEntry.insert({
                url: url,
                image: image,
                category: category, 
                headerText: headerText, 
                description: description, 
                content: content
            }, done);
        })();
    },

    editPortfolioEntry: function(id, url, image, category, headerText, description, content) {
        if (!Meteor.userId()) {
            return;
        }

        Async.wrap(function(done) {
            PortfolioEntry.update(
                {_id: id},
                {
                    url: url,
                    image: image,
                    category: category, 
                    headerText: headerText, 
                    description: description, 
                    content: content
                }, done);
        })();
    },

    deletePortfolioEntry: function(id) {
        if (!Meteor.userId()) {
            return;
        }

        Async.wrap(function(done) {
            PortfolioEntry.remove(
                {_id: id},
                done);
        })();
    },

    editCategory: function(id, src) {
        if (!Meteor.userId()) {
            return;
        }

        Async.wrap(function(done) {
            PortfolioCategory.update(
                {_id: id},
                {$set: {image: src}},
                done);
        })();
    }
});