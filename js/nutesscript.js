var dadosE;
var mymap = L.map('vis6').setView([-8.462965,-37.7451021], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mymap);

//Escala de cores para o mapa
function color(d) {
    return d > 400 ? '#034e7b' :
           d > 200  ? '#0570b0' :
           d > 100  ? '#3690c0' :
           d > 40  ? '#74a9cf' :
           d > 15   ? '#a6bddb' :
           d > 3   ? '#d0d1e6' :
           d > 0  ? '#f1eef6':
                      '#f1eef6';
}
var dados,geoLayer;

d3.json("./geojson/pe.json",function(error,dadoss){
  dados=dadoss;
}); 
var vis6,munDim,groupmunDim;

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
        if(aux == data[i].MUNICÍPIO){
          return true;
        }
      }
    },style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      for (i = 0; i < groupmunDim.all().length; i++) {
        if(groupmunDim.all()[i].key == foldToASCII(feature.properties.name).toUpperCase()){
          //console.log(groupmunDim.all()[i].key);
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

var nova =d3.json("./TeleassistenciaDB/Teleconsultorias.json", function(error,data) {
  
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
        case 9:
          return {
            all: function () {
                return source_group.top(9);
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
  //Dimensão ORIGEM
  origemDim = cf.dimension(function(d) {
    return d["ORIGEM"];
  });
  grouporigemDim= origemDim.group();
  vis1 = dc.barChart("#vis1").width(180)
          .height(200)
          .x(d3.scaleBand().domain(grouporigemDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .ordering(function(d) { return -d.value })
          .dimension(origemDim)
          .group(grouporigemDim)

          .elasticY(true);
  vis1.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão CANAL DE COMUNICAÇãO
  canalDim = cf.dimension(function(d) {
    return d["CANAL DE COMUNICAÇãO"].toUpperCase();
  });
  groupcanalDim= canalDim.group();

  vis2 = dc.barChart("#vis2").width(250)
          .height(200)
          .x(d3.scaleBand().domain(groupcanalDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(canalDim)
          .group(groupcanalDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis2.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão GERES
  var vis3,gereDim,groupgereDim;
  
  gereDim = cf.dimension(function(d) {
    return d["GERES"];
  });
  groupgereDim= gereDim.group();
  vis3 = dc.barChart("#vis3").width(750)
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

  //Dimensão GRAU DE SATISFAÇãO DO SOLICITANTE COM O SERVIÇO
  var vis5,grauSDim,groupgrauSDim;
  grauSDim = cf.dimension(function(d) {
    return d["GRAU DE SATISFAÇãO DO SOLICITANTE COM O SERVIÇO"];
  });
  groupgrauSDim= grauSDim.group();
  
  vis5 = dc.barChart("#vis5").width(300)
          .height(200)
          .x(d3.scaleBand().domain(groupgrauSDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Número de Avaliações")
          .dimension(grauSDim)
          .group(groupgrauSDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis5.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão MUNICIPIO
  
  munDim = cf.dimension(function(d) {
    return foldToASCII(d["MUNICÍPIO"]).toUpperCase();

  });
  groupmunDim= munDim.group();
  //---------------------------------------------//

  //Dimensão MUNICIPIO TELECONSULTOR
  var vis7,munTelDim,groupmunTelDim;
  munTelDim = cf.dimension(function(d) {
    return d["MUNICÍPIO TELECONSULTOR"];
  });
  groupmunTelDim= munTelDim.group();
  groupmunTelDim= getTops(groupmunTelDim,2);
  vis7 = dc.barChart("#vis7").width(180)
          .height(200)
          .x(d3.scaleBand().domain(groupmunTelDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(munTelDim)
          .group(groupmunTelDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis7.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão MES
  var vis8,mesDim,groupmesDim;
  mesDim = cf.dimension(function(d) {
    return d["MÊS"];
  });
  groupmesDim= mesDim.group();
  
  vis8 = dc.barChart("#vis8").width(600)
          .height(300)
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

  //Dimensão NATUREZA 
  var vis9,naturezaDim,groupnaturezaDim;
  naturezaDim = cf.dimension(function(d) {
    return d["NATUREZA"].toUpperCase();
  });
  groupnaturezaDim= naturezaDim.group();
  
  vis9 = dc.rowChart("#vis9").width(450)
          .height(200)
          .x(d3.scaleBand().domain(groupnaturezaDim))
          //.xUnits(dc.units.ordinal)
          //.brushOn(true)
          //.yAxisLabel("Quantidade")
          .dimension(naturezaDim)
          .group(groupnaturezaDim)
          //.ordering(function(d) { return -d.value })
          .elasticX(true);
  //vis9.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão OCUPAÇãO DO SOLICITANTE
  var vis11,ocuSolDim,groupocuSolDim;
  ocuSolDim = cf.dimension(function(d) {
    return d["OCUPAÇãO DO SOLICITANTE"];
  });
  groupocuSolDim= ocuSolDim.group();
  groupocuSolDim= getTops(groupocuSolDim,7);
  vis11 = dc.rowChart("#vis11").width(550)
          .height(200)
          .x(d3.scaleBand().domain(groupocuSolDim))
          .dimension(ocuSolDim)
          .group(groupocuSolDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão OCUPAÇãO DO TELECONSULTOR
  var vis12,ocuTelDim,groupocuTelDim;
  ocuTelDim = cf.dimension(function(d) {
    return d["OCUPAÇãO DO TELECONSULTOR"];
  });
  groupocuTelDim= ocuTelDim.group();
  groupocuTelDim= getTops(groupocuTelDim,10);
  vis12 = dc.rowChart("#vis12").width(550)
          .height(300)
          .x(d3.scaleBand().domain(groupocuTelDim))
          .elasticX(true)
          .dimension(ocuTelDim)
          .group(groupocuTelDim)
          .render();
  //---------------------------------------------//

  //Dimensão REGISTRADOR
  var vis13,regDim,groupregDim;
  regDim = cf.dimension(function(d){
    return d["REGISTRADOR"];
  });
  groupregDim= regDim.group();
  groupregDim= getTops(groupregDim,8);
  vis13 = dc.rowChart("#vis13").width(550)
          .height(300)
          .x(d3.scaleBand().domain(groupregDim))
          .dimension(regDim)
          .group(groupregDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão REGULADOR
  var vis14,regUDim,groupregUDim;
  regUDim = cf.dimension(function(d) {
    return d["REGULADOR"];
  });
  groupregUDim= regUDim.group();
  groupregUDim= getTops(groupregUDim,5);
  vis14 = dc.rowChart("#vis14").width(550)
          .height(200)
          .x(d3.scaleBand().domain(groupregUDim))
          .dimension(regUDim)
          .group(groupregUDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão STATUS
  var vis15,statDim,groupstatDim;
  statDim = cf.dimension(function(d) {
    return d["STATUS"];
  });
  groupstatDim= statDim.group();
  groupstatDim= getTops(groupstatDim,7);
  vis15 = dc.barChart("#vis15").width(280)
          .height(200)
          .x(d3.scaleBand().domain(groupstatDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(statDim)
          .group(groupstatDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis15.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão TELECONSULTORIA RESOLVEU DÚVIDA
  var vis16,duvdDim,groupduvdDim;
  duvdDim = cf.dimension(function(d) {
    return d["TELECONSULTORIA RESOLVEU DÚVIDA"];
  });
  groupduvdDim= duvdDim.group();
  groupduvdDim= getTops(groupduvdDim,7);
  vis16 = dc.barChart("#vis16").width(200)
          .height(200)
          .x(d3.scaleBand().domain(groupduvdDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(duvdDim)
          .group(groupduvdDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis16.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão TEMPO PARA RESPOSTAS EM HORAS
  var vis17,tempDim,grouptempDim;
  tempDim = cf.dimension(function(d) {
    return d["TEMPO PARA RESPOSTAS EM HORAS"];
  });
  grouptempDim= tempDim.group();
  grouptempDim= getTops(grouptempDim,7);
  vis17 = dc.barChart("#vis17").width(350)
          .height(200)
          .x(d3.scaleBand().domain(grouptempDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(tempDim)
          .group(grouptempDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis17.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão TEMPO PARA RESPOSTAS EM HORAS
  var vis18,ufDim,groupufDim;
  ufDim = cf.dimension(function(d) {
    return d["UF"];
  });
  groupufDim= ufDim.group();
  groupufDim= getTops(groupufDim,7);
  vis18 = dc.barChart("#vis18").width(280)
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

  //Dimensão AREA DE TELECONSULTORIA
  var vis10,areaTelDim,groupareaTelDim;
  areaTelDim = cf.dimension(function(d) {
    if(d["AREA DE TELECONSULTORIA"]!=null){
      return foldToASCII(d["AREA DE TELECONSULTORIA"]).toUpperCase();
    }else{
      return d["AREA DE TELECONSULTORIA"];
    }
    
  });
  groupareaTelDim= areaTelDim.group();
  groupareaTelDim= getTops(groupareaTelDim,12);
  vis10 = dc.rowChart("#vis10").width(550)
          .height(300)
          .x(d3.scaleBand().domain(groupareaTelDim))
          .dimension(areaTelDim)
          .group(groupareaTelDim)
          .elasticX(true);
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
        grades = [0, 3, 15, 40, 100, 200, 400],
        labels = [];

      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+">"+grades[i] +'</br>';
        }
      return div;
    };
    legend.addTo(mymap);
  updateMap(data);

  vis1.on('filtered', function(chart, filter) {
    updateMap(origemDim.top(Infinity));
  });
  vis2.on('filtered', function(chart, filter) {
    updateMap(canalDim.top(Infinity));
  });
  vis3.on('filtered', function(chart, filter) {
    updateMap(gereDim.top(Infinity));
  });
  vis5.on('filtered', function(chart, filter) {
    updateMap(grauSDim.top(Infinity));
  });
  vis7.on('filtered', function(chart, filter) {
    updateMap(munTelDim.top(Infinity));
  });
  vis8.on('filtered', function(chart, filter) {
    updateMap(mesDim.top(Infinity));
  });
  vis9.on('filtered', function(chart, filter) {
    updateMap(naturezaDim.top(Infinity));
  });
  vis10.on('filtered', function(chart, filter) {
    updateMap(areaTelDim.top(Infinity));
  });
  vis11.on('filtered', function(chart, filter) {
    updateMap(ocuSolDim.top(Infinity));
  });
  vis12.on('filtered', function(chart, filter) {
    updateMap(ocuTelDim.top(Infinity));
  });
  vis13.on('filtered', function(chart, filter) {
    updateMap(regDim.top(Infinity));
  });
  vis14.on('filtered', function(chart, filter) {
    updateMap(regUDim.top(Infinity));
  });
  vis15.on('filtered', function(chart, filter) {
    updateMap(statDim.top(Infinity));
  });
  vis15.on('filtered', function(chart, filter) {
    updateMap(statDim.top(Infinity));
  });
  vis16.on('filtered', function(chart, filter) {
    updateMap(duvdDim.top(Infinity));
  });
  vis17.on('filtered', function(chart, filter) {
    updateMap(tempDim.top(Infinity));
  });
  vis18.on('filtered', function(chart, filter) {
    updateMap(ufDim.top(Infinity));
  });
  dc.renderAll();
});