const Location = require('./Location');
const Traveller = require('./Traveller');
const Trips = require('./Trips');

Traveller.belongsToMany(Location, {
  through: {
    model:Trips,
    unique: false
  },
  as: "planned_trips"
});

Location.belongsToMany(Traveller, {
  through: {
    model:Trips,
    unique: false
  },
  as: 'location_travellers'
});

module.exports = { Traveller, Location, Trips };