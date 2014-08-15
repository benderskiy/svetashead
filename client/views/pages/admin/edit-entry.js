Template['edit-entry'].helpers({
    categorys: function() {
        var self = this;
        return _.compact(
            _.map(PortfolioCategory.find().fetch(), function(el) {
                if (!self.category || el.title !== self.category) {
                    return el;
                }
            })
        );
    }
});

var caret;

Template['edit-entry'].events({
    'input #input-post-url, change #select-category': function(e) {
        var $form = $(e.target).closest('form'),
            cat = $form.find('#select-category option:selected').text(),
            link = $form.find('#input-post-url').val();
        $form.find('#span-link').text(Meteor.absoluteUrl() + cat + '/' + link);
    },

    'blur #input-post-content': function(e) {
        caret = global.getCaretPosition( $(e.target)[0] );
    },

    'change .content-image .input-file': function(e) {
        $(e.target).closest('.control').addClass('loading');
    },

    'click .content-image .image-preview': function(e) {
        var $form = $(e.target).closest('form');
        var $content =  $form.find('#input-post-content');
        var src = $form.find('.content-image .image-preview').attr('src');
        var text = $content.val();

        if (caret) {
            $content.val( 
                text.substring(0, caret) + '>' + src + '<' +  
                text.substring(caret)
            );
        } else {
            $content.val('>' + src + '<' + text);
        }
        $(e.target).closest('.control').removeClass('loading');
    },    

    'submit form': function(e) {
        var self = this,
            $form = $(e.target).closest('form'),
            url = $form.find('#input-post-url').val(),
            image = $form.find('.entry-image .image-preview').attr('src'),
            category = $form.find('#select-category option:selected').text(),
            headerText = $form.find('#input-post-header').val().replace(/\n/g, '<br />'),
            description = $form.find('#input-post-descr').val().replace(/\n/g, '<br />'),
            content = _.map( 
                $form.find('#input-post-content').val().split(/\n/g),
                
                function(el) {
                    if (el && el[0] === '>') {
                        return { type:'image', src: el.slice(1, el.length-1) };
                    } else { 
                        return { type:'text', text: el };  
                }
            });

        Meteor.call('editPortfolioEntry', self._id, url, image, category, headerText, description, content,
            function(err, res) {
                if (err) {
                    console.error(err);
                } else {
                    Router.go('/portfolio/' + category.split(' ').join('-') + '/' + url);
                }
            }
        );

        return false;
    },

    'click .delete-post': function(e) {
        var self = this;

        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
            Meteor.call('deletePortfolioEntry', self._id,
                function(err, res) {
                    if (err) {
                        console.error(err);
                    } else {
                        Router.go('/portfolio/' + self.category.split(' ').join('-'));
                    }
                }
            );
        }
    }
});