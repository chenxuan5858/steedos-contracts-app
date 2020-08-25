const contractManager = require('./contracts.manager');
module.exports = {

  listenTo: 'contracts',

  afterInsert: async function () {
    //await contractManager.caculateAmount(this.id);
    await contractManager.free_peroid_status_change(this.id);
  },

  afterUpdate: async function () {
    //await contractManager.caculateAmount(this.id);
    await contractManager.free_peroid_status_change(this.id);
  }
};