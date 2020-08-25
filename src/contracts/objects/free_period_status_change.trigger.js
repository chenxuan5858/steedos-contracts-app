const objectql = require('@steedos/objectql');
/**
 * 
 * @param {string} contractId 
 */
async function free_peroid_status_change(contractId) {
  let contractObj = steedosSchema.getObject('contracts');
  let contract = await contractObj.findOne(contractId);
  let bop4 = contract.bop4
  let freeperiodstart = contract.free_period_start;
  let freeperiodend = contract.free_period_end;
  if (bop4 == false) {
    let freeperiodstart = false;
    let freeperiodend = false;
    await contractObj.directUpdate(contractId, { free_period_start: freeperiodstart, free_period_end: freeperiodend });
  } else if (bop4 == true) {
    let freeperiodstart = true;
    let freeperiodend = true;
    await contractObj.directUpdate(contractId, { free_period_start: freeperiodstart, free_period_end: freeperiodend });
  }
}

module.exports = {
  free_peroid_status_change
};