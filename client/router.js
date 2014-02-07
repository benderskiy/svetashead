Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    before: function() {
        var menuLink = this.options.path.split('/')[1];
        Session.set('activeLink', menuLink);
    }
});

Router.map(function() {
    var self = this;

    this.route('mainPage', {
        path: '/'
    });
    
    /* PAGES */
    var pages = ['about', 'portfolio', 'blog', 'contacts'];
    _.map(pages, function(page) {
        self.route(page + 'Page', {
            path: '/'+page
        });
    });

    /* PORTFOLIO/SUBPAGES */
    var portfolioSubpages = ['graphic-design', 'handmade', 'package', 'all'];
    _.map(portfolioSubpages, function(portfolioSubpage) {
        self.route(
            portfolioSubpage.replace(/-/g, '_') + 'Page', {
            path: '/portfolio/'+portfolioSubpage
        });
    });

    /* TODO: temp */
    this.route('invitationLucy', {
        path: '/portfolio/handmade/invitation-luci'
    });
});