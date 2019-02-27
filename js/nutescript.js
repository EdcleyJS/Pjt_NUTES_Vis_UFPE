function onChange(selc){
    if(selc == ""){
    	munDim.filter(null);
    }else{
    	munDim.filter(selc);
    }
    updateMap(munDim.top(Infinity));
    dc.renderAll();
}