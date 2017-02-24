$(document).ready(function(){
	// Ecrivez ici tout le code qui doit s'éxecuter lorsque
	// la page est complètement chargée
	
	// $ est un raccourci pour jQuery
	// A l'aide de $, vous pouvez chercher n'importe quel
	// element de la page. Si celui-ci contient un identifiant
	// unique #identifiant vous permet de le retrouver d'un 
	// seul coup

  	// Pour l'initialisation de la map et du marker a montreal
	 var map;
	 function initMap(){
	 	var montreal = {lat: 45.508, lng: -73.554};
	      map = new google.maps.Map(document.getElementById('map'), {
	        center: montreal,
	        zoom: 10,
	      });

	      var marker = new google.maps.Marker({
	          position: montreal,
	          map: map,
	        });
  	}
  	initMap();

  	// Pour la langue
  	$("#buttonFr").click(function(){
		$(".En").hide();
		$(".Fr").show();
	});

	$("#buttonEn").click(function(){
		$(".Fr").hide();
		$(".En").show();
	});

	// Pour cacher l'anglais a l'execution
	$(".En").hide();

	// Pour prendre les donnees du fichier JSON
	var ville = []; // tableau pour stocker les informations
	var lat = [];
	var lon = [];
	
	function getVilles(){
		$.getJSON("villes.json", function(data) {
		    $.each(data, function(i, value) {
		        ville.push(i);
		        lat.push(value.lat);
		        lon.push(value.lon);
		    });
		});
	}

	// Pour avoir les donnee a l'execution
	getVilles();
	
	// Pour l'auto-completion
	$( "#tags" ).autocomplete({source: ville});

	// Pour afficher le nom de la ville choisi, deplacer la map vers la nouvelle ville et afficher le marker a la position de la ville choisi
	// http://stackoverflow.com/questions/19675069/how-to-get-value-of-selected-item-in-autocomplete

	var villeChoisi;
	var indice; //Pour avoir l'indice de la ville choisi. Avec l'indice, on trouve la lat. et la lon. de la ville choisi dans les tableaux

	$('#tags').on('change', function () {
	       $('#villeChoisi').html(this.value);
	   }).change();

	$('#tags').on('autocompleteselect', function (e, ui) {
			villeChoisi = ui.item.value;
	       	$('#villeChoisi').html(ui.item.value);

	       	indice = jQuery.inArray( villeChoisi, ville );

	       	var newPosition = {lat: lat[indice], lng: lon[indice]};
	       	map = new google.maps.Map(document.getElementById('map'), {
	       	  center: newPosition,
	       	  zoom: 12
	       	});

	       	var marker = new google.maps.Marker({
	       	    position: newPosition,
	       	    map: map,
	       	 });
	});

});