var art_url = 'https://data.nashville.gov/resource/xakp-ess3.json?$$app_token=rTyPnE0zIrcybTe9qcUwRufiQ';
var global_art_object;

$.get(art_url, function(data) {
  global_art_object = data
});
