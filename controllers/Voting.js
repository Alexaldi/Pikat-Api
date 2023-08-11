import Voting from "../models/VotingModel.js";
import jwt_decode from "jwt-decode"
export const getVoting = async (req, res) => {
    try {
        const voting = await Voting.findAll();
        res.json(voting);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getVotingById = async (req, res) => {
    try {
        const voting = await Voting.findAll({
            where: {
                votingid: req.params.votingid
            }
        });
        res.json(voting[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createVoting = async (req, res) => {
    const token = req.cookies.refreshToken;
    const decode = jwt_decode(token);
    console.log(decode);
    const userId = decode.id;
    const kandidatId = req.body.kandidatId

    try {
        await Voting.create(userId, kandidatId);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
