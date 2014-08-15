var $modal;

Template['modalWindow'].rendered = function() {
    $modal = $(this.firstNode).draggable();
    global.modal.init($modal);
};

Template['modalWindow'].events({
    'click .cross': function(ev) {
        global.modal.close();
    },

    'keyup .modal-window': function() {
        global.modal.close();
    },

    'click .button-yes': function(ev) {
        global.modal.close();
        if (global.modal.callback) {
            global.modal.callback(true);
        }
    },

    'click .button-no': function(ev) {
        global.modal.close();
    }
});