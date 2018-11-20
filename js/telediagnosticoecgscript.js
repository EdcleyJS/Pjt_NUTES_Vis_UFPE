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
    return d["AREA DE TELECONSULTORIA"];
  });
  groupareaTelDim= areaTelDim.group();

  vis10 = dc.barChart("#vis10").width(300)
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

  //Dimensão DESCRITORES
  var vis16,descDim,groupdescDim;
  descDim = cf.dimension(function(d) {
    return d["DESCRITORES"];
  });
  groupdescDim= descDim.group();
  vis16 = dc.barChart("#vis16").width(300)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupdescDim))
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
  vis3 = dc.barChart("#vis3").width(700)
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

  //Dimensão INSTITUICAO LAUDISTA
  var vis1,instLaudDim,groupinstLaudDim;
  instLaudDim = cf.dimension(function(d) {
    return d["INSTITUICAO LAUDISTA"];
  });
  groupinstLaudDim= instLaudDim.group();
  vis1 = dc.barChart("#vis1").width(180)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupinstLaudDim))
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
    return d["INSTITUIÇÃO DIGITADOR"];
  });
  groupinstDigDim= instDigDim.group();
  groupinstDigDim= getTops(groupinstDigDim,6);

  vis2 = dc.barChart("#vis2").width(580)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupinstDigDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .ordering(function(d) { return -d.value })
          .dimension(instDigDim)
          .group(groupinstDigDim)
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis2.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão INSTITUIÇÃO RESPONSÁVEL EXAME
  var vis4,instRespDim,groupinstRespDim;
  instRespDim = cf.dimension(function(d) {
    return d["INSTITUIÇÃO RESPONSÁVEL EXAME"];
  });
  groupinstRespDim= instRespDim.group();
  groupinstRespDim= getTops(groupinstRespDim,6);
  vis4 = dc.barChart("#vis4").width(580)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupinstRespDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .ordering(function(d) { return -d.value })
          .dimension(instRespDim)
          .group(groupinstRespDim)
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis4.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão MUNCÍPIO RESPONSÁVEL EXAME
  var vis6,munDim,groupmunDim;
  munDim = cf.dimension(function(d) {
    return d["MUNCÍPIO RESPONSÁVEL EXAME"];
  });
  groupmunDim= munDim.group();
  groupmunDim= getTops(groupmunDim,15);
  vis6 = dc.barChart("#vis6").width(1360)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupmunDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(munDim)
          .group(groupmunDim)
          .elasticY(true)
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .ordering(function(d) { return -d.value })
          ;
  vis6.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//
  
  //Dimensão MUNICÍPIO LAUDISTA
  var vis7,munTelDim,groupmunTelDim;
  munTelDim = cf.dimension(function(d) {
    //console.log(d["AREA DE TELECONSULTORIA"]);
    return d["MUNICÍPIO LAUDISTA"];
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

  //Dimensão MUNICÍPIO DIGITADOR
  var vis5,grauSDim,groupgrauSDim;
  grauSDim = cf.dimension(function(d) {
    return d["MUNICÍPIO DIGITADOR"];
  });
  groupgrauSDim= grauSDim.group();
  groupgrauSDim= getTops(groupgrauSDim,15);
  vis5 = dc.barChart("#vis5").width(900)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupgrauSDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Número de Avaliações")
          .dimension(grauSDim)
          .group(groupgrauSDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-6)");
            })
          .elasticY(true);
  vis5.yAxis().tickFormat(d3.format(".2s"));
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

  //Dimensão OCUPAÇÁO DIGITADOR
  var vis11,ocuSolDim,groupocuSolDim;
  ocuSolDim = cf.dimension(function(d) {
    return d["OCUPAÇÁO DIGITADOR"];
  });
  groupocuSolDim= ocuSolDim.group();
  groupocuSolDim= getTops(groupocuSolDim,8);
  vis11 = dc.barChart("#vis11").width(850)
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
    return d["OCUPAÇÁO LAUDISTA"];
  });
  groupocuTelDim= ocuTelDim.group();
  groupocuTelDim= getTops(groupocuTelDim,8);
  vis12 = dc.barChart("#vis12").width(350)
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

  //Dimensão OCUPAÇÃO RESPONSÁVEL EXAME
  var vis9,ocupRespExDim,groupocupRespExDim;
  ocupRespExDim = cf.dimension(function(d) {
    return d["OCUPAÇÃO RESPONSÁVEL EXAME"];
  });
  groupocupRespExDim= ocupRespExDim.group();
  groupocupRespExDim=getTops(groupocupRespExDim,8);
  vis9 = dc.barChart("#vis9").width(850)
          .height(200)
          .x(d3.scaleOrdinal().domain(groupocupRespExDim))
          .xUnits(dc.units.ordinal)
          .brushOn(true)
          .yAxisLabel("Quantidade")
          .dimension(ocupRespExDim)
          .group(groupocupRespExDim)
          .ordering(function(d) { return -d.value })
          .renderlet(function (chart) {
                chart.selectAll("g.x text")
                .attr('transform', "rotate(-5)");
            })
          .elasticY(true);
  vis9.yAxis().tickFormat(d3.format(".2s"));
  //---------------------------------------------//

  //Dimensão STATUS
  var vis15,statDim,groupstatDim;
  statDim = cf.dimension(function(d) {
    return d["STATUS"];
  });
  groupstatDim= statDim.group();
  groupstatDim= getTops(groupstatDim,8);
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

   //Dimensão TEMPO PARA RESPOSTAS EM HORAS
  var vis17,tempDim,grouptempDim;
  tempDim = cf.dimension(function(d) {
    return d["TEMPO PARA RESPOSTAS EM HORAS"];
  });
  grouptempDim= tempDim.group();
  grouptempDim= getTops(grouptempDim,8);
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

  //Dimensão UF LAUDISTA
  var vis18,ufDim,groupufDim;
  ufDim = cf.dimension(function(d) {
    return d["UF LAUDISTA"];
  });
  groupufDim= ufDim.group();
  groupufDim= getTops(groupufDim,8);
  vis18 = dc.barChart("#vis18").width(150)
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

  //Dimensão UF DIGITADOR
  var vis13,regDim,groupregDim;
  regDim = cf.dimension(function(d) {
    return d["UF DIGITADOR"];
  });
  groupregDim= regDim.group();
  groupregDim= getTops(groupregDim,8);
  vis13 = dc.barChart("#vis13").width(150)
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
  dc.renderAll();
});