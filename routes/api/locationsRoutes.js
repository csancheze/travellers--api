const router = require('express').Router();
const { Location, Trips, Traveller } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const locationsData = await Location.findAll({
      });
      res.status(200).json(locationsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req,res) =>{
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{model: Traveller, through: Trips, as: 'location_travellers'}]
    });
    if (!locationData) {
      res.status(404).json({message: 'No location found for this id!'});
      return;
    }
    
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err)

  } 
});

router.post ('/', async (req,res) =>{
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete ('/:id',async (req,res) => {
  try {
    const locationData = await  Location.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!locationData) {
      res.status(404).json({message: 'No location found with this id'});
      return;
    }

    res.status(200).json(locationData)
  } catch (err) {
    res.status(500).json(err)
;  }
});

module.exports = router;
