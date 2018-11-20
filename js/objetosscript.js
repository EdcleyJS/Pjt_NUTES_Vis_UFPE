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
	    return d["CARGO"];
	});
	groupcargDim= cargDim.group();
	groupcargDim= getTops(groupcargDim,10);
	vis1= dc.barChart("#vis1").width(980)
	        	.height(200)
	          	.x(d3.scaleOrdinal().domain(groupcargDim))
	          	.xUnits(dc.units.ordinal)
	         	.brushOn(true)
	        	.yAxisLabel("Quantidade")
	         	.ordering(function(d) { return -d.value })
	         	.dimension(cargDim)
	         	.group(groupcargDim)
	         	.renderlet(function (chart) {
	                chart.selectAll("g.x text")
	                .attr('transform', "rotate(-5)");
	            })
	          	.elasticY(true);
	vis1.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

  	//Dimensão DESCRIÇÃO

	var vis2,decsDim,groupdecsDim;
	decsDim = cf.dimension(function(d) {
		return d["DECS"];
	});
	groupdecsDim= decsDim.group();
	groupdecsDim= getTops(groupdecsDim,10);
	vis2 = dc.barChart("#vis2").width(780)
	          	.height(200)
	          	.x(d3.scaleOrdinal().domain(groupdecsDim))
	      	   	.xUnits(dc.units.ordinal)
	         	.brushOn(true)
	     	    .yAxisLabel("Quantidade")
	          	.ordering(function(d) { return -d.value })
	          	.dimension(decsDim)
	          	.group(groupdecsDim)
	          	.renderlet(function (chart) {
	                chart.selectAll("g.x text")
	                .attr('transform', "rotate(-5)");
	            })
	          	.elasticY(true);
	vis2.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

   	//Dimensão GERES DIGITADOR
	var vis3,gereDim,groupgereDim;
	gereDim = cf.dimension(function(d) {
	    return d["GERES"];
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

	//Dimensão MUNICÍPIO LAUDISTA
	var vis4,munDim,groupmunDim;
	munDim = cf.dimension(function(d) {
	    return d["MUNICÍPIO"];
	});
	groupmunDim= munDim.group();
	groupmunDim= getTops(groupmunDim,10);
	vis4 = dc.barChart("#vis4").width(880)
	          	.height(200)
	          	.x(d3.scaleOrdinal().domain(groupmunDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Quantidade")
	          	.dimension(munDim)
	          	.group(groupmunDim)
	          	.ordering(function(d) { return -d.value })
	          	.renderlet(function (chart) {
	                chart.selectAll("g.x text")
	                .attr('transform', "rotate(-5)");
	            })
	          .elasticY(true);
	vis4.yAxis().tickFormat(d3.format(".2s"));
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

	//Dimensão UF
	var vis18,ufDim,groupufDim;
	ufDim = cf.dimension(function(d) {
	   	return d["UF"];
	});
	groupufDim= ufDim.group();
	vis18 = dc.barChart("#vis18").width(540)
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

	//Dimensão TIPO OBJETO
	var vis5,tipObjtDim,grouptipObjtDim;
	tipObjtDim = cf.dimension(function(d) {
	    return d["TIPO OBJETO"];
	});
	grouptipObjtDim= tipObjtDim.group();
	vis5 = dc.barChart("#vis5").width(700)
	          	.height(200)
	          	.x(d3.scaleOrdinal().domain(grouptipObjtDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Número de Avaliações")
	          	.dimension(tipObjtDim)
	          	.group(grouptipObjtDim)
	          	.ordering(function(d) { return -d.value })
	          	.renderlet(function (chart) {
	                chart.selectAll("g.x text")
	                .attr('transform', "rotate(-6)");
	            })
	          .elasticY(true);
	vis5.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//
  dc.renderAll();
});