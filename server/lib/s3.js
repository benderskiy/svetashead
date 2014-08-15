var s3 = {
    key: 'kez goes here',
    secret: 'secret goes here'
};

function getS3Bucket() {
    // if (Meteor.absoluteUrl() === 'http://localhost:3000/') {
         return 'svetashead-dev';
    // } else {
    //     return 'svetashead-production';
    // }
}
 
function makeS3Link(name, path) {
    return 'https://' + getS3Bucket() + '.s3.amazonaws.com/' + path + name;
}

Meteor.methods({
    saveFile: function(blob, name, path, encoding, type) {
        if (!Meteor.userId()) {
            return;
        }

        var knox = Meteor.require('knox');
        var client = knox.createClient({
            key: s3.key,
            secret: s3.secret,
            bucket: getS3Bucket()
        });
        
        var buffer = new Buffer(blob, 'binary');

        var uploadedLink = Async.wrap(function(done) {
            client.putBuffer(buffer, path + name, {
                'Content-Length': blob.length,
                'Content-Type': type,
                'x-amz-acl': 'public-read'
            }, function(err, res) {
                if (!err) {
                    done(null, makeS3Link(name, path));
                } else {
                    done(err, null);
                }
            });
        })();

        if (uploadedLink) {
            console.log('Upload done', uploadedLink);

            if (!Images.findOne({title: name})) {
                Async.wrap(function(done) {
                    Images.insert({
                        url: uploadedLink,
                        title: name
                    }, done);
                })();
            }

            return uploadedLink;
        } else {
            return;
        }
    },

    deleteFile: function (name, path) {
        if (!Meteor.userId()) {
            return;
        }

        var knox = Meteor.require('knox');
        var client = knox.createClient({
            key: s3.key,
            secret: s3.secret,
            bucket: getS3Bucket()
        });
        client.deleteFile(path + name, function(err, res) {
        });
    }
});