Template['portfolio'].helpers({
    category: function() {
        return PortfolioCategory.find().fetch();
    }
});