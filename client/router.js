Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    onBeforeAction: function() {
        if (this.options.path) {
            global.header.update({
                activeLink: this.options.path.split('/')[1]
            });
        }
    }
});

Router.map(function() {
    var self = this;

    this.route('root', {
        path: '/'
    });
    
    /* PAGES */
    var pages = ['about', 'portfolio', 'blog', 'contacts'];
    _.map(pages, function(page) {
        self.route(page, {
            path: '/'+page
        });
    });

    /* PORTFOLIO CATEGORIES */
    this.route(
        'portfolio-category', {
        path: '/portfolio/:category',
        data: function() {
            var entries;

            if (this.params.category === 'all') {
                entries = PortfolioEntry.find({});
            } else {
                entries = PortfolioEntry.find({
                    category: this.params.category.split('-').join(' ')
                });
            }

            if (entries.count()) {
                return {
                    category: this.params.category,
                    entries: _.map(entries.fetch(), function(el) {
                        el.categoryURL = el.category.split(' ').join('-');
                        return el;
                    })
                };
            } else {
                return { 
                    category: this.params.category .split('-').join(' ')
                };
            }

        }  
    });

    /* PORTFOLIO ENTRIES */

    this.route('portfolio-entry', {
        path: '/portfolio/:category/:name',
        data: function() {
            var entry = PortfolioEntry.findOne({
                category: this.params.category.split('-').join(' '),
                url: this.params.name
            });
            
            if (entry) {
                entry.categoryURL = this.params.category;
                return entry;
            } else {
                return false;
            }

        }
    });

    this.route('login', {
        path: '/login'
    });

    var requireLogin = function(pause) {
        if (!Meteor.userId()) {
            this.render('notFound');
            pause();
        }
    };

    var forLoginOnly = ['post-entry', 'gallery', 'edit-entry', 'portfolio-edit'];
    Router.onBeforeAction(requireLogin, {only: forLoginOnly});

    this.route('post-entry', {
        path: '/post-entry'
    });

    this.route('gallery', {
        path: '/gallery'
    });

    this.route('edit-entry', {
        path: '/portfolio/:category/:name/edit',
        data: function() {
            var entry = PortfolioEntry.findOne({
                category: this.params.category.split('-').join(' '),
                url: this.params.name
            });
            
            if (entry) {
                entry.category = entry.category;
                entry.headerText = global.replaceBR(entry.headerText);
                entry.description = global.replaceBR(entry.description);
                entry.content = _.map(entry.content, function(el) {
                    if (el.type === 'image') {
                        return '>' + el.src + '<';
                    } else { 
                        return el.text; 
                    }
                }).join('\n');

                return entry;
            } else {
                return false;
            }

        }
    });

    this.route('category-edit', {
        path: '/category/edit/:category',
        data: function() {
            return PortfolioCategory.findOne({url: this.params.category});
        }
    });
});