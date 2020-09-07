const objectql = require('@steedos/objectql');
const moment = require('moment');

async function contracts_payment_calculate(contractId) 
{
  //console.log('contracts_payment_calculate contract', contract
  let contractObj = objectql.getObject('contracts');
  let receiptsObj = objectql.getObject('contract_receipts');
  let contract = await contractObj.findOne(contractId);
  //let is_ft = contract.bop4;
  let rs = contract.rentalsquare;
  let srp = contract.rentalamount;
  let ssp = contract.serviceamount;
  let dc = contract.depositcycle;
  let pc = contract.paymentcycle;
  let cst = contract.start_date;
  let ced = contract.end_date;
  let fps = contract.free_period_start;
  let fpe = contract.free_period_end;
  
  let rentaltemp = 0;
  rentaltemp = rs*srp*365;
  let standard_monthly_rental = 0;
  standard_monthly_rental = trunc(rentaltemp/12);

  let servicetemp = 0;
  servicetemp = rs*ssp*365;
  let standard_monthly_service = 0;
  standard_monthly_service = trunc(servicetemp/12);

  let cycle_rental = 0;
  cycle_rental = standard_monthly_rental*pc;

  let cycle_service = 0;
  cycle_service = standard_monthly_service*pc;

  let rental_deposit = 0;
  rental_deposit = standard_monthly_rental*dc;

  let service_deposit = 0;
  service_deposit = standard_monthly_service*dc;

  let cstmoment = moment(cst);
  let cedmoment = moment(ced);
  let fpsmoment = moment(fps);
  let fpemoment = moment(fpe);

  await receiptsObj.insert({
    name:'autonumber',
    fees_type: 'rentaldeposit',
    contract: 'contractId',
    fee_period_start: 'cst',
    fee_period_end: 'ced',
    });
  //await receiptsObj.insert(contract_receipts_id, {fees_type = 'servicedeposit', contract: contractId, fee_period_start: cst, fee_period_end: ced, amount: service_deposit});




  

  





  

  













  let room_selected = await roomObj.find({filters:[["_id", "in" , contract.room_number]]});
  let totalsquare = 0;
 room_selected.forEach(function(item){
 totalsquare = totalsquare + item.area;
 });

for(let room of room_selected)
{
await roomObj.update(room._id, {rentalstatus: 'no'});
}

await contractObj.directUpdate(contractId, { rentalsquare: totalsquare});

}

module.exports = {
  contracts_payment_calculate
};
