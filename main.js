console.log("suppppp");
var url = "https://itunes.apple.com/lookup?id=909253&callback=?";
var jackUrl = "https://itunes.apple.com/search?term=jack+johnson";
var cb = "&callback=?";
var originalUrl = "http://itunes.apple.com/search?media=music&term=2&country=it&limit=1&attribute=genreIndex&entity=song&callback=?";
var albums = [];
var albumCollection = {};
function createAlbums(){
    albums.forEach(album =>
    {
      var button = `<div><button class='album'>${album}</button></div>`
      var div = "<div id='subContainer'></div>";
      $("#container").append(div);
      $("#subContainer").append(button);
    });
  $(".album").click(function() {
  var albumName = $(this).text();
  console.log(`the name of this album is ${albumName}`);
  var songs = albumCollection[albumName];
  songs.forEach(song =>
    {
      console.log(song);
    });

});
  }
function foo(){ return $.getJSON(jackUrl + cb, function(data) {
                        //stub
  }
)};


foo().done(function(result){
  // console.log(result.results);
  var name = result.results[0].artistName;
  var results = result.results;

  results.forEach(info => {
    var song = info.trackName;
    var album = info.collectionName;
    if (album in albumCollection)
    {
      var currentAlbum = albumCollection[album];
      if (song in currentAlbum === false)
      {
        currentAlbum.push(song);
      }
    }
    else
    {
      albumCollection[album] = [];
      albumCollection[album].push(song);
    }
    if (albums.indexOf(album) === -1 && album)
    {
      albums.push(album);
    }
    // console.log(`song: ${song}, album: ${album}`);
  });

  $("#container").append(`<button id="getInfo" onclick="createAlbums()">Get info on ${name}</button>`)
  $("#getInfo").css("margin","0 0 15px 0");
});
