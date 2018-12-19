var mymap = L.map('vis6').setView([-8.462965,-37.7451021], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mymap);

function color(d) {
    return d > 600 ? '#034e7b' :
           d > 300  ? '#0570b0' :
           d > 150  ? '#3690c0' :
           d > 50  ? '#74a9cf' :
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
        if(aux == data[i]["MUNCÍPIO RESPONSÁVEL EXAME"]){
          //console.log(data[i]["MUNCÍPIO RESPONSÁVEL EXAME"]);
          return true;
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
          layer.bindPopup(feature.properties.name+": "+groupmunDim.all()[i].value+" Exames");
        }
      }
    }
  }).addTo(mymap);
}

d3.json("./TeleassistenciaDB/Telediagn%F3stico%20do%20ECG.json", function(error,data) {
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

  vis10 = dc.barChart("#vis10").width(300)
          .height(200)
          .x(d3.scaleBand().domain(groupareaTelDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(areaTelDim)
          .group(groupareaTelDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis10.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão DESCRITORES
  var vis16,descDim,groupdescDim;
  descDim = cf.dimension(function(d) {
    return d["DESCRITORES"].toUpperCase();
  });
  groupdescDim= descDim.group();
  vis16 = dc.barChart("#vis16").width(300)
          .height(200)
          .x(d3.scaleBand().domain(groupdescDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(descDim)
          .group(groupdescDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis16.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão GERES DIGITADOR
  var vis3,gereDim,groupgereDim;
  gereDim = cf.dimension(function(d) {
    return d["GERES DIGITADOR"];
  });
  groupgereDim= gereDim.group();
  vis3 = dc.barChart("#vis3").width(600)
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

  //Dimensão INSTITUICAO LAUDISTA
  var vis1,instLaudDim,groupinstLaudDim;
  instLaudDim = cf.dimension(function(d) {
    return d["INSTITUICAO LAUDISTA"];
  });
  groupinstLaudDim= instLaudDim.group();
  vis1 = dc.barChart("#vis1").width(180)
          .height(200)
          .x(d3.scaleBand().domain(groupinstLaudDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .ordering(function(d) { return -d.value })
          .dimension(instLaudDim)
          .group(groupinstLaudDim)
          .elasticY(true);
  vis1.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão INSTITUIÇÃO DIGITADOR
  var vis2,instDigDim,groupinstDigDim;
  instDigDim = cf.dimension(function(d) {
    if(d["INSTITUIÇÃO DIGITADOR"]!=null){
      return foldToASCII(d["INSTITUIÇÃO DIGITADOR"]).toUpperCase();
    }else{
      return d["INSTITUIÇÃO DIGITADOR"];
    }
    
  });
  groupinstDigDim= instDigDim.group();
  groupinstDigDim= getTops(groupinstDigDim,12);

  vis2 = dc.rowChart("#vis2").width(600)
          .height(300)
          .x(d3.scaleBand().domain(groupinstDigDim))
          .dimension(instDigDim)
          .group(groupinstDigDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão INSTITUIÇÃO RESPONSÁVEL EXAME
  var vis4,instRespDim,groupinstRespDim;
  instRespDim = cf.dimension(function(d) {
    return d["INSTITUIÇÃO RESPONSÁVEL EXAME"];
  });
  groupinstRespDim= instRespDim.group();
  groupinstRespDim= getTops(groupinstRespDim,12);
  vis4 = dc.rowChart("#vis4").width(580)
          .height(300)
          .x(d3.scaleBand().domain(groupinstRespDim))
          .dimension(instRespDim)
          .group(groupinstRespDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão MUNCÍPIO RESPONSÁVEL EXAME
  munDim = cf.dimension(function(d) {
    return d["MUNCÍPIO RESPONSÁVEL EXAME"];
  });
  groupmunDim= munDim.group();
  //---------------------------------------------//
  
  //Dimensão MUNICÍPIO LAUDISTA
  var vis7,munTelDim,groupmunTelDim;
  munTelDim = cf.dimension(function(d) {
    return d["MUNICÍPIO LAUDISTA"];
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

  //Dimensão OCUPAÇÁO DIGITADOR
  var vis11,ocuSolDim,groupocuSolDim;
  ocuSolDim = cf.dimension(function(d) {
    return d["OCUPAÇÁO DIGITADOR"];
  });
  groupocuSolDim= ocuSolDim.group();
  groupocuSolDim= getTops(groupocuSolDim,8);
  vis11 = dc.rowChart("#vis11").width(550)
          .height(250)
          .x(d3.scaleBand().domain(groupocuSolDim))
          .dimension(ocuSolDim)
          .group(groupocuSolDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão OCUPAÇãO DO TELECONSULTOR
  var vis12,ocuTelDim,groupocuTelDim;
  ocuTelDim = cf.dimension(function(d) {
    return d["OCUPAÇÁO LAUDISTA"];
  });
  groupocuTelDim= ocuTelDim.group();
  groupocuTelDim= getTops(groupocuTelDim,8);
  vis12 = dc.rowChart("#vis12").width(450)
          .height(200)
          .x(d3.scaleBand().domain(groupocuTelDim))
          .dimension(ocuTelDim)
          .group(groupocuTelDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão OCUPAÇÃO RESPONSÁVEL EXAME
  var vis9,ocupRespExDim,groupocupRespExDim;
  ocupRespExDim = cf.dimension(function(d) {
    return d["OCUPAÇÃO RESPONSÁVEL EXAME"];
  });
  groupocupRespExDim= ocupRespExDim.group();
  groupocupRespExDim=getTops(groupocupRespExDim,8);
  vis9 = dc.rowChart("#vis9").width(600)
          .height(250)
          .x(d3.scaleBand().domain(groupocupRespExDim))
          .dimension(ocupRespExDim)
          .group(groupocupRespExDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão STATUS
  var vis15,statDim,groupstatDim;
  statDim = cf.dimension(function(d) {
    return d["STATUS"];
  });
  groupstatDim= statDim.group();
  groupstatDim= getTops(groupstatDim,8);
  vis15 = dc.rowChart("#vis15").width(350)
          .height(200)
          .x(d3.scaleBand().domain(groupstatDim))
          .dimension(statDim)
          .group(groupstatDim)
          .elasticX(true);
  //---------------------------------------------//

   //Dimensão TEMPO PARA RESPOSTAS EM HORAS
  var vis17,tempDim,grouptempDim;
  tempDim = cf.dimension(function(d) {
    return d["TEMPO PARA RESPOSTAS EM HORAS"];
  });
  grouptempDim= tempDim.group();
  grouptempDim= getTops(grouptempDim,8);
  vis17 = dc.rowChart("#vis17").width(350)
          .height(200)
          .x(d3.scaleBand().domain(grouptempDim))
          .dimension(tempDim)
          .group(grouptempDim)
          .elasticX(true);
  //---------------------------------------------//

  //Dimensão UF LAUDISTA
  var vis18,ufDim,groupufDim;
  ufDim = cf.dimension(function(d) {
    return d["UF LAUDISTA"];
  });
  groupufDim= ufDim.group();
  groupufDim= getTops(groupufDim,8);
  vis18 = dc.barChart("#vis18").width(150)
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

  //Dimensão UF DIGITADOR
  var vis13,regDim,groupregDim;
  regDim = cf.dimension(function(d) {
    return d["UF DIGITADOR"];
  });
  groupregDim= regDim.group();
  groupregDim= getTops(groupregDim,8);
  vis13 = dc.barChart("#vis13").width(150)
          .height(200)
          .x(d3.scaleBand().domain(groupregDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(regDim)
          .group(groupregDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
           })
          .elasticY(true);
  vis13.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//
   var info = L.control();
  info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };
  info.update = function (props) {
    this._div.innerHTML = '<h4>Nº de Exames</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Por Município');
  };
  info.addTo(mymap);
  // Fim da criação da div que contém o Título e Subtítulo do Mapa.

  // criação da div que contém a legenda do Mapa.
  var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (mymap) {
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 3, 15, 50, 150, 300, 600],
        labels = [];
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+">"+grades[i] +'</br>';
        }
      return div;
    };
    legend.addTo(mymap);
  updateMap(data);
  vis3.on('filtered', function(chart, filter) {
    updateMap(gereDim.top(Infinity));
  });
  vis1.on('filtered', function(chart, filter) {
    updateMap(instLaudDim.top(Infinity));
  });
  vis2.on('filtered', function(chart, filter) {
    updateMap(instDigDim.top(Infinity));
  });
  vis4.on('filtered', function(chart, filter) {
    updateMap(instRespDim.top(Infinity));
  });
  vis7.on('filtered', function(chart, filter) {
    updateMap(munTelDim.top(Infinity));
  });
  vis8.on('filtered', function(chart, filter) {
    updateMap(mesDim.top(Infinity));
  });
  vis11.on('filtered', function(chart, filter) {
    updateMap(ocuSolDim.top(Infinity));
  });
  vis12.on('filtered', function(chart, filter) {
    updateMap(ocuTelDim.top(Infinity));
  });
  vis9.on('filtered', function(chart, filter) {
    updateMap(ocupRespExDim.top(Infinity));
  });
  vis15.on('filtered', function(chart, filter) {
    updateMap(statDim.top(Infinity));
  });
  vis17.on('filtered', function(chart, filter) {
    updateMap(tempDim.top(Infinity));
  });
  vis18.on('filtered', function(chart, filter) {
    updateMap(ufDim.top(Infinity));
  });
  vis13.on('filtered', function(chart, filter) {
    updateMap(regDim.top(Infinity));
  });
  dc.renderAll();
});