d3.json("./TeleeducacaoDB/Seminarios.json", function(error,data) {
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
	//Dimensão CANAL DE COMUNICAÇÃO
	var vis1,cnlComDim,groupcnlComDim;
	cnlComDim = cf.dimension(function(d) {
	    return d["CANAL DE COMUNICAÇÃO"];
	});
	groupcnlComDim= cnlComDim.group();
	vis1= dc.barChart("#vis1").width(180)
	        	.height(200)
	          	.x(d3.scaleOrdinal().domain(groupcnlComDim))
	          	.xUnits(dc.units.ordinal)
	         	.brushOn(true)
	        	.yAxisLabel("Quantidade")
	         	.ordering(function(d) { return -d.value })
	         	.dimension(cnlComDim)
	         	.group(groupcnlComDim)
	         	
	          	.elasticY(true);
	vis1.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//
	
  	//Dimensão CARGO FORMATADO
	var vis2,crgFmtDim,groupcrgFmtDim;
	crgFmtDim = cf.dimension(function(d) {
		return d["CARGO FORMATADO"];
	});
	groupcrgFmtDim= crgFmtDim.group();
	groupcrgFmtDim= getTops(groupcrgFmtDim,15);
	vis2 = dc.rowChart("#vis2").width(600)
	          	.height(400)
	          	.x(d3.scaleOrdinal().domain(groupcrgFmtDim))
	          	.dimension(crgFmtDim)
	          	.group(groupcrgFmtDim)
	          	.elasticX(true);
	//---------------------------------------------//
	
   	//Dimensão GERES
	var vis3,gereDim,groupgereDim;
	gereDim = cf.dimension(function(d) {
	    return d["GERES"];
	});
	groupgereDim= gereDim.group();
	vis3 = dc.barChart("#vis3").width(400)
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
	vis18 = dc.barChart("#vis18").width(240)
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
	//Dimensão MUNICÍPIO
	var vis4,munDim,groupmunDim;
	munDim = cf.dimension(function(d) {
	    return d["MUNIÍPIO FORMATADO"];
	});
	groupmunDim= munDim.group();
	vis4 = dc.barChart("#vis4").width(380)
	          	.height(200)
	          	.x(d3.scaleOrdinal().domain(groupmunDim))
	          	.xUnits(dc.units.ordinal)
	          	.brushOn(true)
	          	.yAxisLabel("Quantidade")
	          	.dimension(munDim)
	          	.group(groupmunDim)
	          	.ordering(function(d) { return -d.value })
	          	
	          .elasticY(true);
	vis4.yAxis().tickFormat(d3.format(".2s"));
	//---------------------------------------------//

	//Dimensão INSTITUIÇÃO FORMATADO
	var vis5,instFmtDim,groupinstFmtDim;
	instFmtDim = cf.dimension(function(d) {
	    return d["INSTITUIÇÃO FORMATADO"];
	});
	groupinstFmtDim= instFmtDim.group();
	groupinstFmtDim= getTops(groupinstFmtDim,8);  
	vis5 = dc.rowChart("#vis5").width(600)
	          	.height(400)
	          	.x(d3.scaleOrdinal().domain(groupinstFmtDim))
	          	.dimension(instFmtDim)
	          	.group(groupinstFmtDim)
	          .elasticX(true);
	//---------------------------------------------//
  	dc.renderAll();
});