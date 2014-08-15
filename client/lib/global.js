// global object
global = {
    loadingImg: "/images/loading.gif",

    header: {
        $: undefined,

        activeLink: undefined,

        update: function(opt) {
            if (opt.$) {this.$ = opt.$;}
            if (opt.activeLink !== undefined) {this.activeLink = opt.activeLink;}
            if (!this.$) { return; }

            this.$.removeClass('active')
                .find('a[href="/' + this.activeLink + '"]')
                .parent()
                .addClass('active');
        },
    },


    fs: {
        $: undefined,
        $content: undefined,
        opened: false,
        callback: false,

        init: function($el) {
            this.$ = $('#fullscreen-frame');
            this.$content = this.$.find('#fs-content');
        },

        close: function() {
            $('body').removeClass('no-scroll');
            this.$.removeClass('active');
            this.callback = null;
            this.opened = false;
        },

        open: function() {
            var self = this;
            $('body').addClass('no-scroll');
            this.opened = true;
            this.$.addClass('active').on('click', function() {
                self.close();
            });
        },

        image: function(src, prevs, nexts) {
            this.$content.html('<span></span><img src="'+src+'" />');
            this.open();
        },

        loadFromGallery: function(callback) {
            this.$content.html('');
            this.open();
            this.callback = callback;
            UI.insert(
                UI.render(Template['gallery']),
                this.$content[0]
            );
        }
    },

    modal: {
        opened: false,

        $: undefined,
        $footer: undefined,
        $header: undefined,
        $content: undefined,
        callback : undefined,

        init: function($el) {
            this.$ = $el;
            this.$footer = this.$.find('.footer');
            this.$header = this.$.find('.header-text');
            this.$content = this.$.find('.modal-content');
        },

        close: function() {
            this.$.removeClass('opened');
            this.opened = false;
            this.$.css({
                'top': '',
                'left': '',
                'right': '',
                'bottom': ''
            });
        },

        open: function(opts) {
            if (this.opened) {
                return;
            }

            if (opts && opts.dialog) {
                this.$footer.addClass('visible');
            } else {
                this.$footer.removeClass('visible');
            }

            if (opts && opts.header) {
                this.$header.html(opts.header);
            }

            if (opts && opts.content) {
                this.$content.html(opts.content);
            }

            this.callback = opts.callback;

            this.$.addClass('opened');
            this.opened = true;
        }
    },

    replaceBR: function(str) {
        var t = str;
        t = t.split('</br>').join('\n');
        t = t.split('<br>').join('\n');
        t = t.split('<br/>').join('\n');
        t = t.split('<br />').join('\n');
        return t;
    },

    getCaretPosition: function (elem) { 
        if (elem.selectionStart) { 
            return elem.selectionStart; 
        } else {
            if (document.selection) { 
                elem.focus(); 

                var r = document.selection.createRange(); 
                if (r == null) { 
                    return 0; 
                } 

                var re = elem.createTextRange(), 
                rc = re.duplicate(); 
                re.moveToBookmark(r.getBookmark()); 
                rc.setEndPoint('EndToStart', re); 

                return rc.text.length; 
            }  
            return 0;
        }
    },

    setCaretPosition: function (elem, caretPos) {
        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else {
                    elem.focus();
                }
            }
        }
    }
};

