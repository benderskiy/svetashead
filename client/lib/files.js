sendFiles = function(blob, name, path, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary';
    type = blob.type || 'binary';
    switch (type) {
        case 'text':
            method = 'readAsText';
            encoding = 'utf8';
            break;
        case 'binary': 
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
        default:
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
    }
    fileReader.onload = function(file) {
        Meteor.call('saveFile', file.srcElement.result, name, path, encoding, type,
            function(err, res) {
                if (err) {
                    console.error(err);
                } else {
                    callback(res);
                }
            }
        );
    };
    fileReader[method](blob);
}