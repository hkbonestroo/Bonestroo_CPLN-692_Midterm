/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
    center: [40.000, -75.1090],
    zoom: 11
  });
  var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);
  
  $.ajax('https://opendata.arcgis.com/datasets/3803641418e847a0bf7e28cd124f768e_0.geojson').done(function(json){
  // Step 1, group feature values by property.
    var parsed= JSON.parse(JSON.stringify(json))
    console.log(parsed)
    const transition = Object.values(parsed);
    var data = transition[3];
    console.log(data)
    var GSI= JSON.parse(JSON.stringify(data))
    console.log(GSI)
    data= GSI.map(function(datum){
      datum.Lat=Number(datum.geometry.coordinates[0])
      datum.Long=Number(datum.geometry.coordinates[1])
      return datum
    })
    console.log(data)  

var markers;
  
var page1={
    title: "page1",
    content: "blah blah blah 1",
  }

var page2={
    title: "page2",
    content: "blah blah blah 2", 
  }

var page3={
    title: "page3",
    content: "blah blah blah 3", 
  }

var page4={
    title: "page4",
    content: "blah blah blah 4", 
  }

var page5={
    title: "page5",
    content: "blah blah blah 5", 
  }

var slides = [
    page1,
    page2,
    page3,
    page4,
    page5
  ]

 var currentPage=0;
  
  var tearDown= function(){
    markers.forEach(function(marker){map.removeLayer(marker)})
  }
  

  var nextPage = function() {
    tearDown()
    var nextPage =currentPage +1
    currentPage = nextPage
    buildPage(slides[nextPage])
  }

  var prevPage = function(){
    tearDown()
    var prevPage =currentPage -1
    currentPage = prevPage
    buildPage(slides[prevPage])
  }

  var buildPage= function(slide){
    markers=data.map(function(gsi){
      return L.marker([gsi.Long,gsi.Lat])
    })
    // if(pageDefinition.filter===undefined){
    //   theFilter = function() {return true}
    // } else {
    //   theFilter =pageDefinition.filter
    // }
    // featureGroup=L.geoJSON(mygeojsondata,{
    //   style: pageDefinition.style,
    //   filter:theFilter
    // })
    markers.forEach(function(marker){marker.addTo(map)})
    $("#title").text(slide.title)
    $("#content").text(slide.content)
    // if (currentPage === 0){
    //   $('prev').prop("disabled",true)
    // } else {
    //   $("#prev").prop("disabled",false)
    // }
    // console.log(currentPage, slides.length -1)
    // if (currentPage === slides.length-1){
    //   $("next").prop("disabled",true)
    // } else{
    //   $("#next").prop("disabled",false)
    // }
  }

  

  // $.ajax('https://opendata.arcgis.com/datasets/3803641418e847a0bf7e28cd124f768e_0.geojson').done(function(json){
  // // Step 1, group feature values by property.
  //   var parsed= JSON.parse(JSON.stringify(json))
  //   console.log(parsed)
  //   const transition = Object.values(parsed);
  //   var data = transition[3];
  //   console.log(data)
  //   var GSI= JSON.parse(JSON.stringify(data))
  //   console.log(GSI)
  //   data= GSI.map(function(datum){
  //     datum.Lat=Number(datum.geometry.coordinates[0])
  //     datum.Long=Number(datum.geometry.coordinates[1])
  //     return datum
  //   })
  //   console.log(data)
    // markers=data.map(function(gsi){
    //   return L.marker([gsi.Long,gsi.Lat])
    // })
    // markers.forEach(function(marker){marker.addTo(map)})
    buildPage(slides[currentPage])
    $("#next").click(nextPage)
    $("#prev").click(prevPage)

  })

