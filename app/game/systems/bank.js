const _ = require('lodash');
const ECS = require('../../core/ecs');

const transactionsManager = {
  pending: [],
  addTransaction: function (transaction) {
    let valid = this.isValid(transaction) && this.isLegal(transaction);
    if (valid) this.pending.push(transaction);
    return valid;
  },
  isValid: function (transaction) {
    return transaction.emitter && transaction.recipient && (transaction.value || transaction.items);
  },
  isLegal: function (transaction) {
    return true;
  },
  process: function (entities) {
    const pending = this.pending;
    this.pending = [];
    _.reverse(pending)
      .forEach(t => {
        let emitter = _.find(entities, { id: t.emitter });
        let recipient = _.find(entities, { id: t.recipient });
        if (t.value) {
          emitter.components.bankaccount.value -= t.value;
          recipient.components.bankaccount.value += t.value;
        }
        if (t.items) {

        }
      });
  }
};

ECS.systems.define('bank', ECS.systems.type.UPDATE, ['cargohold', 'bankaccount'], function (entities, delta) {
  entities.forEach(e => {
    e.components.bankaccount.transactions.forEach(transaction => {
      transactionsManager.addTransaction(transaction);
    });
  });
  transactionsManager.process(entities);
}, 2);