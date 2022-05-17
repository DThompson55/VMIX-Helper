const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const vMixConfig = require("./vMixConfig.js")



//tester();

async function validate(workbookPath, callback){
await workbook.xlsx.readFile(workbookPath);
let scenesSheet = workbook.getWorksheet('Plan'); //Scenes
let vmixcfgSheet = workbook.getWorksheet('vMixConfig'); //Scenes

var keyBag = []
var numberBag = []
var shortTitleBag = []

vMixConfig.getvMixConfig((vMixData)=>{
var mismatch = false;

for (var i = 0; i < vMixData.vmix.inputs[0].input.length; i++) {
	let row = vMixData.vmix.inputs[0].input[i].$;
	if (keyBag[row.key]){console.log("Duplcate key from vMix at row:",i,"key:",row.key);mismatch=true;}
	if (numberBag[row.number]){console.log("Duplcate number from vMix at row:",i,"key:",row.key);mismatch=true;}
	if (shortTitleBag[row.shortTitle]){console.log("Duplcate shortTitle from vMix at row:",i,"key:",row.key);mismatch=true;}
	keyBag[vMixData.vmix.inputs[0].input[i].$.key] = row;
	numberBag[vMixData.vmix.inputs[0].input[i].$.number] = "OK";
	shortTitleBag[vMixData.vmix.inputs[0].input[i].$.shortTitle] = "OK";
}

var excelKeyBag = []
numberBag = []
shortTitleBag = []

for (var i = 2; i < 999; i++) {
	let failMsg = "";
	let key =vmixcfgSheet.getRow(i).getCell("A").value
	if (!key) break;
	var shortTitle = vmixcfgSheet.getRow(i).getCell("E").value
	var number = vmixcfgSheet.getRow(i).getCell("B").value

	if (excelKeyBag[key]){console.log("Duplcate key in spreadsheet at row:",i,"key:",key);mismatch=true;}
	if (numberBag[number]){console.log("Duplcate number in spreadsheet at row:",i,"key:",key);mismatch=true;}
	if (shortTitleBag[shortTitle]){console.log("Duplcate shortTitle in spreadsheet at row:",i,"key:",key);mismatch=true;}

	excelKeyBag[key] = "OK";
	numberBag[number] = "OK";
	shortTitleBag[shortTitle] = "OK";

	let failed = true;
	if ( keyBag[key] ){
		if (keyBag[key].shortTitle == shortTitle) {
			if (keyBag[key].number == number) {
				failed = false;
			} else { console.log("Number Mismatch, Plan Row",i,"numbers:",
				"plan:",keyBag[key].number,
				"vMix:",number,
				"key:",key);
				mismatch = true; }
		} else { console.log("Title  Mismatch, Plan Row",i,"numbers:",
				"plan:",keyBag[key].shortTitle,
				"vMix:",shortTitle,
				"key:",key);
				mismatch = true; }
		delete keyBag[key]
	} else { console.log("Key Mismatch,    Plan Row",i,
				"key:",key);
				mismatch = true; }
	}
console.log("Extra Keys from vMix", Object.keys(keyBag).length )
if ( Object.keys(keyBag).length >0 ) mismatch = true;
for (keys in keyBag){
	console.log(keyBag[keys].key)
	}
	callback((mismatch)?"vMix Doesn't Match Spreadsheet":"vMix Matches Spreadsheet")
})
}

//--------------------------------------------------
async function loadWorkbook(workbookPath, callback){
await workbook.xlsx.readFile(workbookPath);
let scenesSheet = workbook.getWorksheet('Plan'); //Scenes
let vmixcfgSheet = workbook.getWorksheet('vMixConfig'); //Scenes
var rows = []
var columnNames = []

const row1 = scenesSheet.getRow(1)
var beforeType = true
var j = 1;
for (i = 1; i < 12; i++ ){
	if (beforeType) {
		columnNames[row1.getCell(i).value] = (i + 9).toString(36).toUpperCase();
		if ( row1.getCell(i).value === "Type" ) beforeType = false;
	} else {
		columnNames["Comment"+j] = (i + 9).toString(36).toUpperCase();
		j++;
	}
}

scenesSheet.dataValidations.add(columnNames["Short Name"]+'2:'+columnNames["Short Name"]+'9999', {
  type: 'list',
  allowBlank: false,
  formulae: ['=vMixConfig!$T:$T'],
  showErrorMessage: true,
  errorStyle: 'error',
  error: 'Does not match vMix Configuration',
});

scenesSheet.dataValidations.add(columnNames["Start"]+'2:'+columnNames["Start"]+'9999', {
  type: 'list',
  allowBlank: false,
  formulae: ['=Reference!$A:$A'],
  showErrorMessage: true,
  errorStyle: 'error',
  error: 'Not a supported vMix Command',
});

scenesSheet.dataValidations.add(columnNames["Then"]+'2:'+columnNames["Then"]+'9999', {
  type: 'list',
  allowBlank: true,
  formulae: ['=Reference!$B:$B'],
  showErrorMessage: true,
  errorStyle: 'error',
  error: 'Not a supported vMix Command',
});

var j = 1;
for (var i = 2; i < 999; i++){
try {
 if (!( vmixcfgSheet.getCell("C"+i).value == "Audio" )){
	vmixcfgSheet.getCell("T"+j).value = vmixcfgSheet.getCell("E"+i).value
//	vmixcfgSheet.getCell("T"+j).value = vmixcfgSheet.getCell("E"+j).value
	j++
 }} catch (e){}
}
//console.log("Column Names:",columnNames)
// console.log(columnNames["Start"])
var rows=[]
for (var i = 0; i < 999; i++){
try {
	var row = {}
	var r = scenesSheet.getRow(i+2)
//console.log(columnNames["Comment1"],r.getCell("G").value)
	row.inputNumber =r.getCell(columnNames["Input #"]).value;
	if ( row.inputNumber == null ) break;
	row.inputNumber =r.getCell(columnNames["Input #"]).value.result;
	row.preAction =r.getCell(columnNames["Start"]).value;
	row.action =r.getCell(columnNames["Then"]).value;
	row.shortTitle =r.getCell(columnNames["Short Name"]).value;
	row.orderOfService =r.getCell(columnNames["Comment1"]).value;
	row.title = r.getCell(columnNames["Comment2"]).value;
	row.person = r.getCell(columnNames["Comment3"]).value;
	rows[i] = row;
// console.log(row)
// break;
 } catch (e){console.log(e);break}
}
await workbook.xlsx.writeFile("./test.xlsx");
callback(rows);

}

function tester(){
var workbookPath = "./data/Plan.xlsx";
validate(workbookPath,console.log)
}

module.exports = {load:loadWorkbook, validate: validate}