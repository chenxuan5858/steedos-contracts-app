const objectql = require('@steedos/objectql');

async function free_period_status_change(contractId) 
{
  
  let contractObj = objectql.getObject('contracts');
  let contract = await contractObj.findOne(contractId);
  let bop4 = contract.bop4;
  let freeperiodstart = contract.free_period_start;
  let freeperiodend = contract.free_period_end;
  
  if (bop4 == 'no') 
  {
    let freeperiodstart = null;
    let freeperiodend = null;
    await contractObj.directUpdate(contractId, { free_period_start: freeperiodstart, free_period_end: freeperiodend });
  } 
  
  else if (bop4 == 'yes') 
  {
    if(!freeperiodstart)
    {
      throw new Error('请填写免租期起始日期');
    }
    if(!freeperiodend)
    {
      throw new Error('请填写免租期结束日期');
    }
  }
}

module.exports = 
{
  free_period_status_change
};