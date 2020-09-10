const objectql = require('@steedos/objectql');
const moment = require('moment');

async function contracts_payment_calculate(contractId) 
{
 
  let contractObj = objectql.getObject('contracts');
  let receiptsObj = objectql.getObject('contract_receipts');
  let contract = await contractObj.findOne(contractId);
  let is_ft = contract.bop4;
  let rs = contract.rentalsquare;
  let srp = contract.rentalamount;
  let ssp = contract.serviceamount;
  let dc = contract.depositcycle;
  let pc = contract.paymentcycle;
  let cst = contract.start_date;
  let ced = contract.end_date;
  let fps = contract.free_period_start;
  let fpe = contract.free_period_end;
  let ct2 = contract.contract_type2;
  

  let rentaltemp = 0;
  rentaltemp = rs*srp*365;
  let standard_monthly_rental = 0;
  standard_monthly_rental = parseInt(rentaltemp/12);

  let servicetemp = 0;
  servicetemp = rs*ssp*365;
  let standard_monthly_service = 0;
  standard_monthly_service = parseInt(servicetemp/12);

  let cycle_rental = 0;
  cycle_rental = standard_monthly_rental*pc;

  let cycle_service = 0;
  cycle_service = standard_monthly_service*pc;

  let rental_deposit = 0;
  rental_deposit = standard_monthly_rental*dc;

  let service_deposit = 0;
  service_deposit = standard_monthly_service*dc;

  let servicefeestype = '';
  {
  if (ct2 == 'servicecontract1')
  {servicefeestype = 'servicefee1'}
  else if (ct2 == 'servicecontract2')
  {servicefeestype = 'servicefee2'}
  else if (ct2 == 'servicecontract3')
  {servicefeestype = 'servicefee3'}
  else if (ct2 == 'servicecontract4')
  {servicefeestype = 'servicefee4'}
  };

  await receiptsObj.insert({
    fees_type: 'rentaldeposit',
    contract: contractId,
    fee_period_start: cst,
    fee_period_end: ced,
    amount: rental_deposit,
    space: contract.space,
    });
  
  await receiptsObj.insert({
    fees_type: 'servicedeposit',
    contract: contractId,
    fee_period_start: cst,
    fee_period_end: ced,
    amount: service_deposit,
    space: contract.space,
    });
  
  /*let i=0;
  let contractMonth1 = moment(ced).add(1, 'd').diff(moment(cst), 'months', false); 
  let circletimes1 = Math.ceil(contractMonth1/pc);
  let initialst = i*pc;
  let initialet = (i-1)*pc;
  let ccstmoment = moment(ced).subtract(initialst, 'M').add(1, 'd').toDate();
  let ccedmoment = moment(ced).subtract(initialet, 'M').toDate();
  let judgementbefore = moment(ccstmoment).isBefore(cst);
  let daysdifferent = moment(ccedmoment).add(1, 'd').diff(moment(cst), 'days');
  let differentrantal = parseInt(daysdifferent*rs*srp);
  let differentservice = parseInt(daysdifferent*rs*ssp);
  */
  
  if (is_ft == 'no')
  { 
    
    let contractMonth1 = moment(ced).add(1, 'd').diff(moment(cst), 'months', false); 
    let circletimes1 = Math.ceil(contractMonth1/pc);

    for (let i=circletimes1;i>=1;i--)
    {

      let initialst = i*pc;
      let initialet = (i-1)*pc;
      let ccstmoment = moment(ced).subtract(initialst, 'M').add(1, 'd').toDate();
      let ccedmoment = moment(ced).subtract(initialet, 'M').toDate();
      let judgementbefore = moment(ccstmoment).isBefore(cst);
      //let daysdifferent = moment(ccedmoment).add(1, 'd').diff(moment(cst), 'days');
      //let differentrantal = parseInt(daysdifferent*rs*srp);
      //let differentservice = parseInt(daysdifferent*rs*ssp);
    if (judgementbefore = true)
      { 
        let daysdifferent = moment(ccedmoment).add(1, 'd').diff(moment(cst), 'days');
        let differentrantal = parseInt(daysdifferent*rs*srp);
        let differentservice = parseInt(daysdifferent*rs*ssp);
        await receiptsObj.insert({
          fees_type: 'rentalfee',
          contract: contractId,
          fee_period_start: cst,
          fee_period_end: ccedmoment,
          amount: differentrantal,
          space: contract.space,
          }); 
        
        await receiptsObj.insert({
          fees_type: servicefeestype,
          contract: contractId,
          fee_period_start: cst,
          fee_period_end: ccedmoment,
          amount: differentservice,
          space: contract.space,
          }); 
      }  
      else if (judgementbefore = false)
      {
        await receiptsObj.insert({
          fees_type: 'rentalfee',
          contract: contractId,
          fee_period_start: ccstmoment,
          fee_period_end: ccedmoment,
          amount: cycle_rental,
          space: contract.space,
          }); 
    
        await receiptsObj.insert({
          fees_type: servicefeestype,
          contract: contractId,
          fee_period_start: ccstmoment,
          fee_period_end: ccedmoment,
          amount: cycle_service,
          space: contract.space,
          }); 
      }
    
    }
    //}
  

  }

  
 
  

  

  




  

  





  

  










}

module.exports = {
  contracts_payment_calculate
};
