function fixer(){ 
vMixConfig.getvMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
	var theSame = true;
    	for (var i = 0; i < result.vMix.inputs[0].input.length; i++) {
    		let vMixRow = result.vMix.inputs[0].input[i].$
    		let uidLookup = uidBag[result.vMix.inputs[0].input[i].$.key]
    		if (uidLookup) {
    			if (uidLookup.number != vMixRow.number){console.log("number updated for key",reference["A"+i].v)
    				reference["B"+i].v = vMixRow.number;
    				theSame = false;
    			}//numbers match
    			if (uidLookup.shortTitle !== vMixRow.shortTitle){console.log("shortTitle updated for key",reference["A"+i].v)
					reference["E"+i].v = vMixRow.shortTitle;
					theSame = false;
    			}//numbers match
		     }else {
		     	reference["A"+uidBagSize] = vMixRow.key;
		     	reference["B"+uidBagSize] = vMixRow.number;
		     	reference["C"+uidBagSize] = vMixRow.type;
		     	reference["D"+uidBagSize] = vMixRow.title;
		     	reference["E"+uidBagSize] = vMixRow.shortTitle;
		     	console.log("New Properties Added",vMixRow.key,vMixRow.number,vMixRow.shortTitle,"uidBagSize =",uidBagSize,"key is",reference["A"+uidBagSize]);
		     	uidBagSize++;
		     	theSame = false;
		     }
        }

        //
        // duplicate tester
        //
		var indexBag = {}
		var shortTitleBag = {}
		for (var i = 1 ; i < uidBagSize ; i++){
		try{
//			console.log("key ---",reference["A"+i].v,reference["B"+i].v,reference["E"+i].v,i,"bag is",indexBag[reference["B"+i].v])
		   if (indexBag[reference["B"+i].v]){
		   		console.log("Duplicate input number",reference["B"+i].v+", key is",reference["A"+i].v)
		   } else {indexBag[reference["B"+i].v] = reference["B"+i].v}
		   if (shortTitleBag[reference["E"+i].v]){
		   		console.log("Duplicate short title",reference["E"+i].v+", key is",reference["A"+i].v)
		   } else {shortTitleBag[reference["E"+i].v] = reference["B"+i].v}
		} catch(e){
			console.log("Error in dup tester",e)
			break;
		}
		}

		console.log("Spreadsheet "+(theSame?"matches":"does not match")+" the vMix configuration");

    });


}