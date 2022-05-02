const ExcelJS = require('exceljs');
// read from a file
var filename = "../data/4-17-22 service plan.xlsx";
const workbook = new Excel.Workbook();
await workbook.xlsx.readFile(filename);
// ... use workbook


const xmlReader = require("./xmlReader.js")
var XLSX = require("xlsx");
var workbook = XLSX.readFile(filename);
var reference = workbook.Sheets["Reference"];

xmlReader.getVMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
	var vmixRows = result.vmix.inputs[0].input
    	for (var i = 0; i < vmixRows.length; i++) {
    		let vmixRow = vmixRows[i].$
    		console.log(vmixRow);
    		reference["A"+(i+2)].v = vmixRow.key;
    		reference["B"+(i+2)].v = vmixRow.number;
    		reference["C"+(i+2)].v = vmixRow.type;
    		reference["D"+(i+2)].v = vmixRow.title;
    		reference["E"+(i+2)].v = vmixRow.shortTitle;
    		reference["F"+(i+2)].v = vmixRow.state;
    		reference["G"+(i+2)].v = vmixRow.position;
    		reference["H"+(i+2)].v = vmixRow.duration;
    		reference["I"+(i+2)].v = vmixRow.loop;
    		break;
        }

      // Writing to our file
//      console.log()
		XLSX.writeFile(workbook,'./test.xlsx')

    });


 
