import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos Online');
    } catch (error) {
        console.error(error);
        throw new Error('Error en la base de datos');
    }
};
