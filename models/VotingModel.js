import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Voting = db.define('voting', {
    votingid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id: {
        type: DataTypes.INTEGER
    },
    kandidatid: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});


export default Voting;

(async () => {
    await Voting.sync();
})();