const xmlReader = require("./xmlReader.js")
var XLSX = require("xlsx");
var filename = "../data/4-17-22 service plan.xlsx";
var workbook = XLSX.readFile(filename);
var ws = workbook.Sheets["Reference"];


var referenceBag = {}
var bagSize = 1;
var i;
for (i = 2 ; i < 1000 ; i++){ // skipping the column headers
try{
   referenceBag[ws["A"+i].v] = {number:ws['B'+i].v,shortTitle:ws['E'+i].v};
} catch(e){
	console.log(i,"entries in current spreadsheet");
	bagSize = i-1;
	break;
}
}
 
xmlReader.getVMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
    	for (var i = 0; i < result.vmix.inputs[0].input.length; i++) {
    		let newValue = result.vmix.inputs[0].input[i].$
    		let value = referenceBag[result.vmix.inputs[0].input[i].$.key]
    		if (value) {
    			if (value.number != newValue.number){console.log("number updated for key",ws["A"+i].v)
    				ws["B"+i].v = newValue.number;
    			}//numbers match
    			if (value.shortTitle !== newValue.shortTitle){console.log("shortTitle updated for key",ws["A"+i].v)
					ws["E"+i].v = newValue.shortTitle;
    			}//numbers match
		     }else {
		     	ws["A"+bagSize] = newValue.key;
		     	ws["B"+bagSize] = newValue.number;
		     	ws["C"+bagSize] = newValue.type;
		     	ws["D"+bagSize] = newValue.title;
		     	ws["E"+bagSize] = newValue.shortTitle;
		     	console.log("New Properties Added",newValue.key,newValue.number,newValue.shortTitle,"bagSize =",bagSize,"key is",ws["A"+bagSize]);
		     	bagSize++;
		     }
        }

        //
        // duplicate tester
        //
		var indexBag = {}
		var shortTitleBag = {}
		for (var i = 1 ; i < bagSize ; i++){
		try{
//			console.log("key ---",ws["A"+i].v,ws["B"+i].v,ws["E"+i].v,i,"bag is",indexBag[ws["B"+i].v])
		   if (indexBag[ws["B"+i].v]){
		   		console.log("Duplicate input number",ws["B"+i].v+", key is",ws["A"+i].v)
		   } else {indexBag[ws["B"+i].v] = ws["B"+i].v}
		   if (shortTitleBag[ws["E"+i].v]){
		   		console.log("Duplicate short title",ws["E"+i].v+", key is",ws["A"+i].v)
		   } else {shortTitleBag[ws["E"+i].v] = ws["B"+i].v}
		} catch(e){
			console.log("Error in dup tester",e)
			break;
		}
		}
    });


