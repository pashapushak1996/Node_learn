const Car = require('../dataBase/Car');

const carService = {
    deleteCar: async (id) => {
        await Car.deleteOne({ _id: id });
    },

    createCar: async (body) => {
        const createdCar = await Car.create({ ...body });

        return createdCar;
    },

    updateCar: async (carId, req) => {
        const updatedCar = await Car.findOneAndUpdate(
            { _id: carId },
            { $set: { ...req.body } },
            {
                new: true
            }
        );

        return updatedCar;
    },

    getAllCar: async () => {
        const cars = await Car.find();

        return cars;
    }
};

module.exports = carService;
