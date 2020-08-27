const FPSC = require('./free_period_status_change');
const FPSCB = require('./free_period_status_change_before');
const PI = require('./price_increase');
const PIB = require('./price_increase_before');
//const TTS = require('./contract_totalsquare');
module.exports = {

  listenTo: 'contracts',

  beforeInsert: async function () {
    //await contractManager.caculateAmount(this.id);
    await FPSCB.free_period_status_change_before(this.doc);
    await PIB.price_increase_before(this.doc);
    //await TTS.contract_totalsquare(this.doc);
  },

  afterInsert: async function () {
    //await contractManager.caculateAmount(this.id);
    //await FPSC.free_period_status_change(this.doc);
    //await TTS.contract_totalsquare(this.doc);
  },

  afterUpdate: async function () {
    //await contractManager.caculateAmount(this.id);
    await FPSC.free_period_status_change(this.id);
    await PI.price_increase(this.id);
  },

};