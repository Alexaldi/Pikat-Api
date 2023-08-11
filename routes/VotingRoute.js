import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
    getVoting,
    getVotingById,
    createVoting
} from "../controllers/Voting.js";

const voting = express.Router();

voting.get('/', getVoting);
voting.get('/:kandidat_id', getVotingById);
voting.post('/', createVoting, verifyToken);


export default voting;