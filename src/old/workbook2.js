const xmlReader = require("./xmlReader.js")
var XLSX = require("xlsx");
var filename = "../data/4-17-22 service plan.xlsx";
var workbook = XLSX.readFile(filename);
var reference = workbook.Sheets["Reference"];
var plan = workbook.Sheets["Plan"];

var uidBag = {}
var inputNumberBag = {}
var uidBagSize = 1;
var i = 2;
while (true) {
try{
   uidBag[reference["A"+i].v] = {row:i,number:reference['B'+i].v,shortTitle:reference['E'+i].v, rows:[]};
   inputNumberBag[reference["B"+i].v] = {row:i,uid:reference['A'+i].v,shortTitle:reference['E'+i].v};
   i++;
} catch(e){
	console.log(i,"entries in current reference");
	uidBagSize = i-1;
	break;
}
}

// add to the UID collection adding a collection of row numbers
var planBagSize = 1;
i = 2;
while (true) {
try{
	inputNumber = plan['B'+i].v
	if (inputNumberBag[inputNumber]){
		uidBag[inputNumberBag[inputNumber].uid].rows.push(i);
	}
	i++;
//   if ( i < 3 ) console.log(planBag)
} catch(e){
	console.log(i,"entries in current plan");
	planBagSize = i-1;
	break;
}
}

function updateRowNumbers(rows,row,refRow){
	 reference['B'+refRow].v = row.number;
	 reference['B'+refRow].w = row.number;
	console.log("update -",row.number,"/",refRow,"/",reference["B"+refRow])
// 	for (aRow in rows){
// 	 plan['B'+rows[aRow]].v = row.number;
// 	 plan['B'+rows[aRow]].w = row.number;
// //	 console.log("Updating rows",rows[aRow],"to inputNumber",row.number,"plan",plan['B'+rows[aRow]])
// 	}
}

xmlReader.getVMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
	var theSame = true;
	var vmixRows = result.vmix.inputs[0].input
    	for (var i = 0; i < vmixRows.length; i++) {
    		let vmixRow = vmixRows[i].$
    		let uidLookup = uidBag[vmixRow.key]
//    		console.log("row",vmixRow,"uidLookup = ",uidLookup)
    		if ((uidLookup)&&(!(vmixRow.number == uidLookup.number))) {
    				console.log((vmixRow.number == uidLookup.number),vmixRow.number, uidLookup.number)

		    		updateRowNumbers(uidLookup.rows, vmixRow, uidLookup.row)
		     }else {
		     	// we need to add rows, which can be dangerous?
		     	theSame = false;
		     }
        }

      // Writing to our file
//      console.log()
		XLSX.writeFile(workbook,'./test.xlsx')

    });


 
