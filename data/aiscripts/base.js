function update(me, context, api, delta) {

    api.moveTo(100, 100);
    api.dockAt(context.stations[0]);
    api.buy(context.stations.sellItems[0], 2);
    api.sell(me.cargo[0], context.stations[0], 5);

}

module.exports = update;