function load_content( template_path, data_path ){
 let tmpl = '' // Main template HTML
 let tdata = {}; // JSON data object that feeds the template


 // Load the HTML template
 $.get(`templates/${template_path}`, function(d){ 
 tmpl = d
 });

  
 // Retrieve the server data and then initialize the page
 $.getJSON(data_path, function (d) { 
 tdata = d 
 });

  
 // When AJAX calls are complete parse the template
 // replacing mustache tags with vars
 $(document).ajaxStop(function () {
   console.log( tdata  )
 var renderedPage = Mustache.to_html(tmpl, tdata); // 3
 $("#content").html(renderedPage);
 })

  
}


$( function (){
  $("a").click(function(){
    alert(0)
    let director = $(this).attr('director');
     console.log( 'director click ' + director )
  });
  
  load_content(
    'director_list.html', 
    "/directors"
    )
}); 
