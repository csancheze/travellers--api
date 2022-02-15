const router = require('express').Router();
const { Traveller, Trips, Location } = require('../../models');

router.get('/', async (req,res) => {
    try {
        const travellerData = await Traveller.findAll();
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }    
});

router.get('/:id', async (req,res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
            include: [{model: Location, through: Trips, as: 'planned_trips'}]
        });
        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with this id!'});
            return;
        }
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/', async (req,res) => {
    try {
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const travellerData = await Traveller.destroy({
            where:{
                id: req.params.id
            }
        });

        if (!travellerData) {
            res.status(404).json({message: 'No traveller found with this id!'});
            return;
        }
        res.status(200).json(travellerData);
    }catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
