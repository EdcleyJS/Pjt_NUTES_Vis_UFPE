function onChange(selc){
    //console.log(selc);
    //chart.filter([["apple","lemon","orange"]]);
    if(selc == ""){
    	munDim.filter(null);
    }else{
    	munDim.filter(selc);
    }
    updateMap(munDim.top(Infinity));
    dc.renderAll();
 }
 