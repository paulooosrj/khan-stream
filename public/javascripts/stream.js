const Stream = (url, call = function(){}) => {

    var client = new WebTorrent();

    client.on('error', function (err) {
      console.error('ERROR: ' + err.message)
    });

    client.add(decodeURIComponent(url), function (torrent) {

      console.log(torrent);

      /* var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      });

      console.log(torrent);

      file.appendTo('body', function(err, elem){
        if(err) throw err;
        if(elem.readyState === 4){
          call(elem);
        }
      }); */

    });

};