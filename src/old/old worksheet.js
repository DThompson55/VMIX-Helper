function fixer(){ 
xmlReader.getVMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
	var theSame = true;
    	for (var i = 0; i < result.vmix.inputs[0].input.length; i++) {
    		let vmixRow = result.vmix.inputs[0].input[i].$
    		let uidLookup = uidBag[result.vmix.inputs[0].input[i].$.key]
    		if (uidLookup) {
    			if (uidLookup.number != vmixRow.number){console.log("number updated for key",reference["A"+i].v)
    				reference["B"+i].v = vmixRow.number;
    				theSame = false;
    			}//numbers match
    			if (uidLookup.shortTitle !== vmixRow.shortTitle){console.log("shortTitle updated for key",reference["A"+i].v)
					reference["E"+i].v = vmixRow.shortTitle;
					theSame = false;
    			}//numbers match
		     }else {
		     	reference["A"+uidBagSize] = vmixRow.key;
		     	reference["B"+uidBagSize] = vmixRow.number;
		     	reference["C"+uidBagSize] = vmixRow.type;
		     	reference["D"+uidBagSize] = vmixRow.title;
		     	reference["E"+uidBagSize] = vmixRow.shortTitle;
		     	console.log("New Properties Added",vmixRow.key,vmixRow.number,vmixRow.shortTitle,"uidBagSize =",uidBagSize,"key is",reference["A"+uidBagSize]);
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

		console.log("Spreadsheet "+(theSame?"matches":"does not match")+" the VMix configuration");

    });


}