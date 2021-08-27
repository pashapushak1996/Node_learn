const Car = require('../dataBase/Car');

const carService = {
    deleteCar: (carId) => Car.deleteOne({ _id: carId }),

    createCar: (body) => Car.create({ ...body }),

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

    getAllCar: () => Car.find()
};

module.exports = carService;
