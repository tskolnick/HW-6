


$( function (){


function load_content( template_path, data_path ){

  
}  
 let tmpl = '' // Main template HTML
 let tdata = {}; // JSON data object that feeds the template


 // Load the HTML template
 $.get("/templates/film_list.html", function(d){ // 1
 tmpl = d
 });

  
 // Retrieve the server data and then initialize the page
 $.getJSON("/directors", function (d) { 
 tdata = d 
 });

  
 // When AJAX calls are complete parse the template
 // replacing mustache tags with vars
 $(document).ajaxStop(function () {
   console.log( tdata  )
 var renderedPage = Mustache.to_html(tmpl, tdata); // 3
 $("body").html(renderedPage);
 })

}); 
