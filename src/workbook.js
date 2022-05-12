const xmlReader = require("./xmlReader.js")
var XLSX = require("xlsx");
var filename = "../data/Plan.xlsx";
var workbook = XLSX.readFile(filename);
var reference = workbook.Sheets["Reference"];
var scenes    = workbook.Sheets["Scenes"];

for (var i = 0; i < 1000; i++) {
    try {
    shortTitle = scenes["F"+(i+2)].v
    for (var j = 0; j < 1000; j++) {
        try {
        if (reference["E"+(j+2)].v == shortTitle) {
            scenes["A"+(i+2)] = {};
            scenes["A"+(i+2)].v = reference["A"+(j+2)].v;
        }
        } catch(e) {
//            console.log("max j",j);
            break}
    } 
} catch(e) {            
 //   console.log("max i",i);
    break}
}

xmlReader.getvMixConfig('../data/4-17-2022-amps fixed.xml', function (err, vmixSchema) {

if (err) throw new Exception(err);
	var vMixRows = vmixSchema.vmix.inputs[0].input
    	for (var i = 0; i < vMixRows.length; i++) {
    		let vMixRow = vMixRows[i].$
    		//console.log(vMixRow);
    		reference["A"+(i+2)].v = vMixRow.key;
    		reference["B"+(i+2)].v = vMixRow.number;
    		reference["C"+(i+2)].v = vMixRow.type;
    		reference["D"+(i+2)].v = vMixRow.title;
    		reference["E"+(i+2)].v = vMixRow.shortTitle;
    		reference["F"+(i+2)].v = vMixRow.state;
    		reference["G"+(i+2)].v = vMixRow.position;
    		reference["H"+(i+2)].v = vMixRow.duration;
    		reference["I"+(i+2)].v = vMixRow.loop;
//    		break;
        }

      // Writing to our file
//      console.log()
		XLSX.writeFile(workbook,'./test.xlsx')

    });


 
