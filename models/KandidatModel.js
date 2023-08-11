import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kandidat = db.define('kandidat', {
    kandidatid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    kandidat_name: DataTypes.STRING,
    image: DataTypes.STRING,
    image_url: DataTypes.STRING,
    kelas: DataTypes.STRING,
    visi: DataTypes.STRING,
    misi: DataTypes.STRING,
}, {
    freezeTableName: true
});



export default Kandidat;

(async () => {
    await Kandidat.sync();
})();