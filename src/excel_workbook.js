const Excel = require('exceljs');
var filename = "../data/Plan.xlsx";
const workbook = new Excel.Workbook();
async function bookProcess(){
await workbook.xlsx.readFile(filename);
let scenes = workbook.getWorksheet('Plan'); //Scenes
let vmixcfg = workbook.getWorksheet('vMixConfig'); //Scenes

var colNames = []

const row1 = scenes.getRow(1)
for (i = 1; i < 20; i++ ){
	colNames[row1.getCell(i).value] = (i + 9).toString(36).toUpperCase();
}

console.log(colNames);

scenes.dataValidations.add(colNames["Short Name"]+'2:'+colNames["Short Name"]+'9999', {
  type: 'list',
  allowBlank: false,
  formulae: ['=vMixConfig!$T:$T'],
  showErrorMessage: true,
  errorStyle: 'error',
  error: 'Does not match vMix Configuration',
});

scenes.dataValidations.add(colNames["Start"]+'2:'+colNames["Start"]+'9999', {
  type: 'list',
  allowBlank: false,
  formulae: ['=Reference!$A:$A'],
  showErrorMessage: true,
  errorStyle: 'error',
  error: 'Not a supported vMix Command',
});

scenes.dataValidations.add(colNames["Then"]+'2:'+colNames["Then"]+'9999', {
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
 if (!( vmixcfg.getCell("C"+i).value == "Audio" )){
	vmixcfg.getCell("T"+j).value = vmixcfg.getCell("E"+i).value
//	vmixcfg.getCell("T"+j).value = vmixcfg.getCell("E"+j).value
	j++
 }} catch (e){}
}

//scenes.getColumn('E').font = {color: {argb: "FFFF0000"}}

await workbook.xlsx.writeFile("./test.xlsx");
}

bookProcess()


