import express from "express";
import {
    getKandidat,
    getKandidatById,
    saveKandidat,
    updateKandidat,
    deleteKandidat
} from "../controllers/KandidatController.js";

const router = express.Router();

router.get('/kandidat', getKandidat);
router.get('/kandidat/:kandidat_id', getKandidatById);
router.post('/kandidat', saveKandidat);
router.patch('/kandidat/:kandidat_id', updateKandidat);
router.delete('/kandidat/:kandidat_id', deleteKandidat);

export default router;