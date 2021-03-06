var mymap = L.map('vis4').setView([-8.462965,-37.7451021], 7);
var zoom,a,Leste,Oeste,Norte,Sul;var opt=[];
var vis4,munDim,groupmunDim;
var dados,geoLayer;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mymap);

//Escala de cores para o mapa
function color(d) {
  return d > 600 ? '#034e7b' : d > 300  ? '#0570b0' : d > 150  ? '#3690c0' : d > 50  ? '#74a9cf' : d > 15   ? '#a6bddb' : d > 3   ? '#d0d1e6' : d > 0  ? '#f1eef6': '#f1eef6';
}

d3.json("./geojson/pe3.json",function(error,dadoss){
  dados=dadoss;
}); 

function updateMap(data){
    if(geoLayer!= null){
      geoLayer.clearLayers();
    }
	cfg = crossfilter(dados.features);
	//Criação das Dimensões e Grupos com base no crossfilter.
	geomDimension = cfg.dimension(function(d) {
	    return d.geometry;
	});
	geoLayer= L.geoJson({
	    type: 'FeatureCollection',
	    features: geomDimension.top(Infinity),
	},{
    filter: function(feature) {
	    var bbox=[];
	    bbox=turf.bbox(feature);
	    a= mymap.getBounds();
	    Leste= a.getEast();Oeste= a.getWest();Norte= a.getNorth();Sul=a.getSouth();
	    var aux= foldToASCII(feature.properties.name).toUpperCase();
		if(bbox[0]>Oeste && bbox[2]<Leste && bbox[1]>Sul && bbox[3]<Norte){
      		for (i = 0; i < data.length; i++) {
      			if(data[i].MUNICÍPIO!=null && aux == foldToASCII(data[i].MUNICÍPIO).toUpperCase()){
      				opt.push(data[i].MUNICÍPIO.toUpperCase());
			        return true;
		      	}
	      	}
  		}
    },style: function(feature){
    //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
	    var aux3=foldToASCII(feature.properties.name).toUpperCase();
	    for (i = 0; i < groupmunDim.all().length; i++) {
	        if(groupmunDim.all()[i].key == aux3){
		        return {
		            weight: 0.5,
		            opacity: 1,
		            fillColor: color(groupmunDim.all()[i].value),
		            color: 'black',
		            fillOpacity: 0.9
		        };
	        }
	    } 
  	},
  	onEachFeature: function (feature, layer) {
    //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var aux4= foldToASCII(feature.properties.name).toUpperCase();
        for (i = 0; i < groupmunDim.all().length; i++) {
	        if(groupmunDim.all()[i].key == aux4){
	          layer.bindPopup(feature.properties.name+": "+groupmunDim.all()[i].value+" Solicitações");
	        }
      	}
    }
  	}).addTo(mymap);

	var select = document.getElementById('opcoes');
	select.options.length = 0;
	opt.sort();
	var opthtml = document.createElement('option');
	opthtml.value = "";
	opthtml.innerHTML = "NENHUMA";
	select.appendChild(opthtml);
	for (var i = 0; i < opt.length; i++) {
	    opthtml = document.createElement('option');
	    opthtml.value = opt[i];
	    opthtml.innerHTML = opt[i];
	    select.appendChild(opthtml);
	}
	opt=[];
}

function updateOnlyMap(data){
    if(geoLayer!= null){
      geoLayer.clearLayers();
    }
	cfg = crossfilter(dados.features);
	//Criação das Dimensões e Grupos com base no crossfilter.
	geomDimension = cfg.dimension(function(d) {
	    return d.geometry;
	});
	geoLayer= L.geoJson({
	    type: 'FeatureCollection',
	    features: geomDimension.top(Infinity),
	},{
    filter: function(feature) {
	    var bbox=[];
	    bbox=turf.bbox(feature);
	    a= mymap.getBounds();
	    Leste= a.getEast();Oeste= a.getWest();Norte= a.getNorth();Sul=a.getSouth();
	    var aux= foldToASCII(feature.properties.name).toUpperCase();
	    if(bbox[0]>Oeste && bbox[2]<Leste && bbox[1]>Sul && bbox[3]<Norte){
		    for (i = 0; i < data.length; i++) {
		        if(data[i].MUNICÍPIO!=null){
		            if(aux == data[i].MUNICÍPIO.toUpperCase()){
		                return true;
		            }
		        }   
		    }
	    }
    },style: function(feature){
    //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      	for (i = 0; i < groupmunDim.all().length; i++) {
	        if(groupmunDim.all()[i].key == foldToASCII(feature.properties.name).toUpperCase()){
		        return {
		            weight: 0.5,
		            opacity: 1,
		            fillColor: color(groupmunDim.all()[i].value),
		            color: 'black',
		            fillOpacity: 0.9
		        };
	        }
      	} 
  	},
  	onEachFeature: function (feature, layer) {
    //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        for (i = 0; i < groupmunDim.all().length; i++) {
	        if(groupmunDim.all()[i].key == foldToASCII(feature.properties.name).toUpperCase()){
	          layer.bindPopup(feature.properties.name+": "+groupmunDim.all()[i].value+" Solicitações");
	        }
      	}
    }
  	}).addTo(mymap);
}

d3.json("./TeleeducacaoDB/Objetos.json", function(error,data) {
 	cf = crossfilter(data);
  	var origemDim,canalDim,groupcanalDim,grouporigemDim;
	function getTops(source_group,option) {
	  	switch(option){
	  		case 15: return { all: function () { return source_group.top(15);}};break;
	  		case 12:return {all: function () {return source_group.top(12);}};break;
	  		case 10:return {all: function () {return source_group.top(10);}};break;
	  		case 8:return {all: function () {return source_group.top(8);}};break;
	  		case 7:return {all: function () {return source_group.top(7);}};break;
	  		case 6:return {all: function () {return source_group.top(6);}};break;
	  		case 5:return {all: function () {return source_group.top(5);}};break;
	  		case 2:return {all: function () {return source_group.top(2);}};break;
	  	}
	}
	//Dimensão CARGO
	var vis1,cargDim,groupcargDim;
	cargDim = cf.dimension(function(d) {
		if(d["CARGO"]!=null){
			return foldToASCII(d["CARGO"]).toUpperCase();
		}else{
			return d["CARGO"];
		}
	});
	groupcargDim= cargDim.group();
	groupcargDim= getTops(groupcargDim,15);
	vis1= dc.rowChart("#vis1").width(600)
	        	.height(400)
	          	.x(d3.scaleBand().domain(groupcargDim))
	         	.dimension(cargDim)
	         	.group(groupcargDim)
	          	.elasticX(true);
	//---------------------------------------------//

  	//Dimensão DESCRIÇÃO
	var vis2,decsDim,groupdecsDim;
	decsDim = cf.dimension(function(d) {
		if(d["DECS"]!=null){
			return foldToASCII(d["DECS"]).toUpperCase();
		}else{
			return d["DECS"];
		}
	});
	groupdecsDim= decsDim.group();
	groupdecsDim= getTops(groupdecsDim,15);
	vis2 = dc.rowChart("#vis2").width(600)
	          	.height(400)
	          	.x(d3.scaleBand().domain(groupdecsDim))
	          	.dimension(decsDim)
	          	.group(groupdecsDim)
	          	.elasticX(true);
	//---------------------------------------------//

   	//Dimensão GERES DIGITADOR
	var vis3,gereDim,groupgereDim;
	gereDim = cf.dimension(function(d) {
	    return d["GERES"];
	});
	groupgereDim= gereDim.group();
	vis3 = dc.barChart("#vis3").width(700)
	          	.height(200)
	          	.x(d3.scaleBand().domain(groupgereDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Quantidade")
	          	.dimension(gereDim)
	          	.group(groupgereDim)
	          	.ordering(function(d) { return -d.value })
	          	.elasticY(true);
	vis3.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

	//Dimensão MUNICÍPIO LAUDISTA
	munDim = cf.dimension(function(d) {
		if(d["MUNICÍPIO"]!=null){
			return foldToASCII(d["MUNICÍPIO"].toUpperCase());
		}
	});
	groupmunDim= munDim.group();
	//---------------------------------------------//

	//Dimensão MES
	var vis8,mesDim,groupmesDim;
	mesDim = cf.dimension(function(d) {
	    return d["MÊS"];
	});
	groupmesDim= mesDim.group();
	vis8 = dc.barChart("#vis8").width(600)
	          	.height(200)
	          	.x(d3.scaleBand().domain(groupmesDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	         	.yAxisLabel("Quantidade")
	          	.dimension(mesDim)
	          	.group(groupmesDim)
	          	.ordering(function(d) { return -d.value })
	          	.elasticY(true);
	vis8.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

	//Dimensão UF
	var vis18,ufDim,groupufDim;
	ufDim = cf.dimension(function(d) {
	   	return d["UF"];
	});
	groupufDim= ufDim.group();
	vis18 = dc.barChart("#vis18").width(540)
	          	.height(200)
	          	.x(d3.scaleBand().domain(groupufDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Quantidade")
	          	.dimension(ufDim)
	          	.group(groupufDim)
	          	.ordering(function(d) { return -d.value })
	          	.elasticY(true);
	vis18.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

	//Dimensão TIPO OBJETO
	var vis5,tipObjtDim,grouptipObjtDim;
	tipObjtDim = cf.dimension(function(d) {
	    return d["TIPO OBJETO"];
	});
	grouptipObjtDim= tipObjtDim.group();
	vis5 = dc.barChart("#vis5").width(750)
	          	.height(200)
	          	.x(d3.scaleBand().domain(grouptipObjtDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Número de Avaliações")
	          	.dimension(tipObjtDim)
	          	.group(grouptipObjtDim)
	          	.ordering(function(d) { return -d.value })
	          .elasticY(true);
	vis5.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//
	// criação da div que contém o Título e Subtítulo do Mapa. 
 	var info = L.control();
  	info.onAdd = function (mymap) {
	    this._div = L.DomUtil.create('div', 'info');
	    this.update();
	    return this._div;
  	};
  	info.update = function (props) {
    	this._div.innerHTML = '<h4>Nº de Solicitações</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Por Município');
  	};
  	info.addTo(mymap);
  	// Fim da criação da div que contém o Título e Subtítulo do Mapa.

  	// criação da div que contém a legenda do Mapa.
  	var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (mymap) {
      	var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 50, 100, 500, 900, 5000],
        labels = [];
      	for (var i = 0; i < grades.length; i++) {
        	div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+">"+grades[i] +'</br>';
        }
      	return div;
    };
    legend.addTo(mymap);

	updateMap(munDim.top(Infinity));
	mymap.on('moveend', function() {
	    updateOnlyMap(munDim.top(Infinity));
	});
	vis1.on('filtered', function(chart, filter) {
	    updateMap(cargDim.top(Infinity));
	});
	vis2.on('filtered', function(chart, filter) {
	    updateMap(decsDim.top(Infinity));
	});
	vis3.on('filtered', function(chart, filter) {
	    updateMap(gereDim.top(Infinity));
	});
	vis5.on('filtered', function(chart, filter) {
	    updateMap(tipObjtDim.top(Infinity));
	});
	vis8.on('filtered', function(chart, filter) {
	    updateMap(mesDim.top(Infinity));
	});
	vis18.on('filtered', function(chart, filter) {
	    updateMap(ufDim.top(Infinity));
	});
	dc.renderAll();
});