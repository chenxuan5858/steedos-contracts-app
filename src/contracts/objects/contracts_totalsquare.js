console.log('contracts', contract); 
const objectql = require('@steedos/objectql');

async function contracts_totalsquare(contract) 
{

  let contractObj = objectql.getObject('contracts');
  let contract = await contractObj.findOne(contract);
  let square = contract.rentalsquare;

 let room_selected = await objectql.getObject('room').find({filters:[["_id", "in" ,"contractDoc.room_number"]]});
 let totalsquare= 0;
 room_selected.forEach(function(item){
 totalsquare = totalsquare + item.area;
 });
 let square = totalsquare;

await contractObj.directUpdate(contract, { rentalsquare: square});
console.log('contracts', contract); 
}

module.exports = {
  contracts_totalsquare
};

