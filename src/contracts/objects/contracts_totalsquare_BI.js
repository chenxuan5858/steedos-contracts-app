const objectql = require('@steedos/objectql');

async function contracts_totalsquare_BI(contract) 
{
  let contractObj = objectql.getObject('contracts');
  let roomObj = objectql.getObject('room');


 let room_selected = await roomObj.find({filters:[["_id", "in" , contract.room_number]]});
 let totalsquare = 0;
 room_selected.forEach(function(sq){
 totalsquare = totalsquare + sq.area;
 });


await contractObj.directUpdate(contract, { rentalsquare: totalsquare});

}

module.exports = {
  contracts_totalsquare_BI
};
