/*   //console.log(data);
   //dataset = data.map(function(d) { return d});
   //console.log(dataset)
   console.log(data);
});*/
d3.json("./TeleassistenciaDB/Teleconsultorias.json", function(error,data) {
  
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
          .x(d3.scaleOrdinal().domain(grouporigemDim))
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
    //console.log(d["AREA DE TELECONSULTORIA"]);
    return d["CANAL DE COMUNICAÇãO"];
  });
  groupcanalDim= canalDim.group();
  
  vis2 = dc.barChart("#vis2").width(200)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupcanalDim))
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
    //console.log(d["AREA DE TELECONSULTORIA"]);
    return d["GERES"];
  });
  groupgereDim= gereDim.group();
  
  vis3 = dc.barChart("#vis3").width(750)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupgereDim))
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
    //console.log(d["AREA DE TELECONSULTORIA"]);
    return d["GRAU DE SATISFAÇãO DO SOLICITANTE COM O SERVIÇO"];
  });
  groupgrauSDim= grauSDim.group();
  
  vis5 = dc.barChart("#vis5").width(300)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupgrauSDim))
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
  var vis6,munDim,groupmunDim;
  munDim = cf.dimension(function(d) {
    return d["MUNICÍPIO"];
  });
  groupmunDim= munDim.group();
  groupmunDim = getTops(groupmunDim,12);

  vis6 = dc.barChart("#vis6").width(1360)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupmunDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(munDim)
          .group(groupmunDim)
          .elasticY(true)
          .ordering(function(d) { return -d.value })
          ;
  vis6.yAxis().tickFormat(d3.format(".2s"));
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
          .x(d3.scaleOrdinal().domain(groupmunTelDim))
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
          .x(d3.scaleOrdinal().domain(groupmesDim))
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
    return d["NATUREZA"];
  });
  groupnaturezaDim= naturezaDim.group();
  
  vis9 = dc.barChart("#vis9").width(350)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupnaturezaDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(naturezaDim)
          .group(groupnaturezaDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis9.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão OCUPAÇãO DO SOLICITANTE
  var vis11,ocuSolDim,groupocuSolDim;
  ocuSolDim = cf.dimension(function(d) {
    return d["OCUPAÇãO DO SOLICITANTE"];
  });
  groupocuSolDim= ocuSolDim.group();
  groupocuSolDim= getTops(groupocuSolDim,7);
  vis11 = dc.barChart("#vis11").width(950)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupocuSolDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(ocuSolDim)
          .group(groupocuSolDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis11.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão OCUPAÇãO DO TELECONSULTOR
  var vis12,ocuTelDim,groupocuTelDim;
  ocuTelDim = cf.dimension(function(d) {
    return d["OCUPAÇãO DO TELECONSULTOR"];
  });
  groupocuTelDim= ocuTelDim.group();
  groupocuTelDim= getTops(groupocuTelDim,7);
  vis12 = dc.barChart("#vis12").width(950)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupocuTelDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(ocuTelDim)
          .group(groupocuTelDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis12.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão REGISTRADOR
  var vis13,regDim,groupregDim;
  regDim = cf.dimension(function(d){
    return d["REGISTRADOR"];
  });
  groupregDim= regDim.group();
  groupregDim= getTops(groupregDim,7);
  vis13 = dc.barChart("#vis13").width(950)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupregDim))
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

  //Dimensão REGULADOR
  var vis14,regUDim,groupregUDim;
  regUDim = cf.dimension(function(d) {
    return d["REGULADOR"];
  });
  groupregUDim= regUDim.group();
  groupregUDim= getTops(groupregUDim,5);
  vis14 = dc.barChart("#vis14").width(900)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupregUDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(regUDim)
          .group(groupregUDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis14.yAxis().tickFormat(d3.format(".2s"));
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
          .x(d3.scaleOrdinal().domain(groupstatDim))
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
          .x(d3.scaleOrdinal().domain(groupduvdDim))
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
  vis17 = dc.barChart("#vis17").width(280)
          .height(200)
          .x(d3.scaleOrdinal().domain(grouptempDim))
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
          .x(d3.scaleOrdinal().domain(groupufDim))
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
    return d["AREA DE TELECONSULTORIA"];
  });
  groupareaTelDim= areaTelDim.group();
  groupareaTelDim= getTops(groupareaTelDim,9);
  vis10 = dc.barChart("#vis10").width(950)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupareaTelDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(areaTelDim)
          .group(groupareaTelDim)
          .ordering(function(d) { return -d.value })
          .elasticY(true);
  vis10.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//
	
  /*
  //Dimensão gere IMPORTADO
  var vis4,ciapDim,groupciapDim;
  ciapDim = cf.dimension(function(d) {
    //console.log(d["AREA DE TELECONSULTORIA"]);
    return d["CIAP IMPORTADO"];
  });
  groupciapDim= ciapDim.group();
  groupciapDim= getTops(groupciapDim);
  console.log(groupciapDim);
  vis4 = dc.barChart("#vis4").width(950)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupciapDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(ciapDim)
          .group(groupciapDim)
          .elasticX(true)
          .elasticY(true)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('dx', '50')
                .attr('transform', "rotate(-80)");
            })
          ;
  vis4.yAxis().tickFormat(d3.format(".2s"));
  vis4.rescale();
  //---------------------------------------------//
	*/
  dc.renderAll();
});