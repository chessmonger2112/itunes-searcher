console.log("suppppp");
var personUrl = "https://itunes.apple.com/search?term=";
var person = "jack+johnson";
var cb = "&callback=?";
var albums = [];
var albumCollection = {};
function createAlbums(){
  albums.forEach((album, index) =>
  {
    var button = `<button class='album'>${album}</button>`
    var subContainer = `<div id='subContainer${index}'></div>`;
    $("#container").append(subContainer);
    $(`#subContainer${index}`).append(button);
  });
  $(".album").click(function() {
    var albumName = $(this).text();
    var songs = albumCollection[albumName];
    var indexNumber = albums.indexOf(albumName);
    songs.forEach(song => $(`#subContainer${indexNumber}`).append(song + " "));
  });
}
function foo(){ return $.getJSON(personUrl + person + cb, function(data) {}
)};

$("#search").click(function() {
  console.log("supp");
  $("#container").empty();
  albums = [];
  // person = "jack johnson";
  person = $("#nameInput").val().toLowerCase();

  foo().done(function(result){
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
    });

    $("#container").append(`<button id="getInfo" onclick="createAlbums()">Get info on ${name}</button>`)
    $("#getInfo").css("margin","15px 0 15px 0")
  });
});
