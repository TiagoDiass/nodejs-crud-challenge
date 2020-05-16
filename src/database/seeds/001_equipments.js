
exports.seed = function(knex) {
  // Deletes ALL existing entries and then inserts seed entries
  return knex('equipments').del()
    .then(function () {
      return knex('equipments').insert([
        {
          model: 'HP DeskJet Advantage 2676',
          category: 'cartucho',
          ppm: 20,
          wifi: true,
          consumption: 10
        },
        {
          model: 'HP LaserJet P1006',
          category: 'cartucho',
          ppm: 16,
          wifi: false,
          consumption: 6
        },
        {
          model: 'Epson EcoTank L3150',
          category: 'toner',
          ppm: 30,
          wifi: true,
          consumption: 14
        }
      ]);
    });
};
