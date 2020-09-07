const FPSC = require('./free_period_status_change');
const FPSCB = require('./free_period_status_change_before');
const PI = require('./price_increase');
const PIB = require('./price_increase_before');
const TTS = require('./contracts_totalsquare');
const TTSBI = require('./contracts_totalsquare_BI');
//const RSC = require('./room_status_change');
const CSC = require('./contract_status_change');
const CPC = require('./contracts_payment_calculate');
module.exports = {

  listenTo: 'contracts',

  beforeInsert: async function () {
    //await contractManager.caculateAmount(this.id);
    await FPSCB.free_period_status_change_before(this.doc);
    await PIB.price_increase_before(this.doc);
    await TTSBI.contracts_totalsquare_BI(this.doc);
  },

  afterInsert: async function () {
    //await contractManager.caculateAmount(this.id);
    //await FPSC.free_period_status_change(this.doc);
    await TTS.contracts_totalsquare(this.doc._id);
    await CPC.contracts_payment_calculate(this.doc_id);
  },

  afterUpdate: async function () {
    //await contractManager.caculateAmount(this.id);
    await FPSC.free_period_status_change(this.id);
    await PI.price_increase(this.id);
    await TTS.contracts_totalsquare(this.id);
    //await RSC.room_status_change(this.id);
    await CSC.contract_status_change(this.id);
  },

};