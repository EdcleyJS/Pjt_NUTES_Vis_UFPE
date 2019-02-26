var cidades= ["ABARE","ABREU E LIMA","ACOPIARA","AFOGADOS DA INGAZEIRA","AFRANIO","AGUA DOCE","AGUAS BELAS","ALCANTIL","ALTINHO","ALTO BOA VISTA","ALTO RIO NOVO","AMARGOSA","ANGICAL","APUIARES","ARACAJU","ARACOIABA","ARACRUZ","ARAGUAINA","ARAL MOREIRA","ARAPIRACA","ARARIPE","ARARIPINA","ARCOVERDE","ARMACAO DOS BUZIOS","BARAUNA","BARRA BONITA","BARRA DO GARCAS","BARREIROS","BEBEDOURO","BELEM","BELMONTE","BEZERROS","BOA VISTA","BOM JARDIM","BONITO","BREJINHO","CABEDELO","CABO DE SANTO AGOSTINHO","CABO FRIO","CABROBO","CACERES","CAMARAGIBE","CAMPINA GRANDE","CAMPINORTE","CAMPOS DOS GOYTACAZES","CAMUTANGA","CANAA DOS CARAJAS","CARPINA","CARUARU","CASCAVEL","CASINHAS","CATENDE","CAUCAIA","CAXIAS DO SUL","CEDRO","CHA DE ALEGRIA","CHAPADA DO NORTE","CHAPECO","CONDADO","CONSELHEIRO LAFAIETE","CORINTO","CORTES","CORURIPE","COXIXOLA","CRICIUMA","CURRAIS NOVOS","CUSTODIA","DELMIRO GOUVEIA","DORMENTES","ENGENHEIRO NAVARRO","ESCADA","FEIRA NOVA","FERREIROS","FLORESTA","FLORIANO","FLORIANOPOLIS","FORTALEZA","GAMA","GAMELEIRA","GARANHUNS","GLORIA DO GOITA","GOIANA","GOIANIA","GRAVATA","GUARABIRA","IACU","IBIMIRIM","ICAPUI","ICO","IGARASSU","IGUATU","ILHA DE ITAMARACA","INAJA","INGAZEIRA","IPOJUCA","IPUBI","IRAUCUBA","ITAIBA","ITAJAI","ITAMBE","ITAPAGE","ITAPETIM","ITAPEVA","ITAPIPOCA","ITAPISSUMA","JABOATAO DOS GUARARAPES","JAGUARETAMA","JARDIM","JOAO PESSOA","JUAZEIRO","JUIZ DE FORA","JUREMA","LAGOA DO CARRO","LAGOA DO ITAENGA","LAGOA GRANDE","LAGOA SANTA","LAJEDO","LIMOEIRO","LIVRAMENTO DE NOSSA SENHORA","MACAPA","MACAU","MACEIO","MACHADOS","MADRE DE DEUS","MANAUS","MARABA","MARACANAU","MARICA","MORENO","MORRO AGUDO","MOSSORO","NATAL","NAZARE DA MATA","NOVA AMERICA","NOVA SERRANA","OIAPOQUE","OLINDA","OURICURI","OURO BRANCO","PALHANO","PALMARES","PARNAIBA","PASSIRA","PATOS","PAU DOS FERROS","PAUDALHO","PAULISTA","PEDRA LAVRADA","PESQUEIRA","PETROLANDIA","PETROLINA","POMBOS","PORTO ALEGRE","PORTO VELHO","PRESIDENTE MEDICI","PRESIDENTE PRUDENTE","PRIMAVERA","QUIXERE","RECIFE","RIBEIRAO","RIBEIRAO DAS NEVES","RIO DE JANEIRO","SALGUEIRO","SALOA","SALVADOR","SANHARO","SANTA BARBARA","SANTA CRUZ DA BAIXA VERDE","SANTA FILOMENA","SANTA MARIA DA BOA VISTA","SANTO ANTONIO DO ARACANGUA","SAO BENEDITO DO SUL","SAO BENTO","SAO GONCALO DO AMARANTE","SAO JOAO DO JAGUARIBE","SAO JOSE DA COROA GRANDE","SAO JOSE DO BELMONTE","SAO JOSE DO EGITO","SAO LOURENCO DA MATA","SAO LUIS","SAO PAULO","SAO VICENTE FERRER","SERRA TALHADA","SIMOES FILHO","SOBRAL","SOSSEGO","SURUBIM","TABIRA","TAGUATINGA","TAMANDARE","TAQUARA","TAQUARITINGA DO NORTE","TEOTONIO VILELA","TIMBAUBA","TRAMANDAI","TRINDADE","TRIUNFO","TUPARETAMA","VASSOURAS","VERA CRUZ","VICENCIA","VITORIA DE SANTO ANTAO"];
select = document.getElementById('opcoes');
var opt = document.createElement('option');
	opt.value = "";
    opt.innerHTML = "SELECIONE";
   	select.appendChild(opt);
for (var i =0; i <cidades.length; i++) {
	var opt = document.createElement('option');
	opt.value = cidades[i];
    opt.innerHTML = cidades[i];
   	select.appendChild(opt);
}  
var mymap = L.map('vis4').setView([-8.462965,-37.7451021], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mymap);

function color(d) {
    return d > 5000 ? '#034e7b' :
           d > 900  ? '#0570b0' :
           d > 500  ? '#3690c0' :
           d > 100  ? '#74a9cf' :
           d > 50   ? '#a6bddb' :
           d > 5   ? '#d0d1e6' :
           d > 0  ? '#f1eef6':
                      '#f1eef6';
}

var dados,geoLayer;

d3.json("./geojson/pe3.json",function(error,dadoss){
  dados=dadoss;
}); 

var vis4,munDim,groupmunDim;

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
      	var aux= foldToASCII(feature.properties.name).toUpperCase();
      	for (i = 0; i < data.length; i++) {
      		if(data[i].MUNICÍPIO!=null && aux == foldToASCII(data[i].MUNICÍPIO).toUpperCase()){
	          	return true;
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
}

d3.json("./TeleeducacaoDB/Objetos.json", function(error,data) {
 	cf = crossfilter(data);
  	var origemDim,canalDim,groupcanalDim,grouporigemDim;
	function getTops(source_group,option) {
	  	switch(option){
	  		case 15:
	  			return {
				    all: function () {
				        return source_group.top(15);
				    }
				};
	  		break;
	  		case 12:
	  			return {
				    all: function () {
				        return source_group.top(12);
				    }
				};
	  		break;
	  		case 10:
	  			return {
				    all: function () {
				        return source_group.top(10);
				    }
				};
	  		break;
	  		case 8:
	  			return {
				    all: function () {
				        return source_group.top(8);
				    }
				};
	  		break;
	  		case 7:
	  			return {
				    all: function () {
				        return source_group.top(7);
				    }
				};
	  		break;
	  		case 6:
	  			return {
				    all: function () {
				        return source_group.top(6);
				    }
				};
	  		break;
	  		case 5:
	  			return {
				    all: function () {
				        return source_group.top(5);
				    }
				};
	  		break;
	  		case 2:
	  			return {
				    all: function () {
				        return source_group.top(2);
				    }
				};
	  		break;
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
  	updateMap(data);
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