import path from "path";
import fs from "fs";
import Kandidat from "../models/KandidatModel.js";

//! USER
export const getKandidat = async (req, res) => {
    try {
        const response = await kandidat.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKandidatById = async (req, res) => {
    try {
        const response = await Kandidat.findOne({
            where: {
                kandidatid: req.params.kandidatid
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//!ADMMIN
export const saveKandidat = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No Image Uploaded" });
    const kandidat_name = req.body.kandidat_name;
    const image = req.files.image;
    const kelas = req.body.kelas
    const visi = req.body.visi
    const misi = req.body.misi
    const fileSize = image.data.length;
    const ext = path.extname(image.name);
    const fileName = image.md5 + ext;
    const image_url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({ kandidat_name, image: fileName, image_url, kelas, visi, misi });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateKandidat = async (req, res) => {
    const kandidat = await Kandidat.findOne({
        where: {
            kandidatid: req.params.kandidatid
        }
    });
    if (!kandidat) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = kandidat.image;
    } else {
        const image = req.files.image;
        const fileSize = image.data.length;
        const ext = path.extname(image.name);
        fileName = image.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${kandidat.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const kandidat_name = req.body.kandidat_name;
    const kelas = req.body.kelas
    const visi = req.body.visi
    const misi = req.body.misi
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Kandidat.update({ kandidat_name, image: fileName, image_url, kelas, visi, misi }, {
            where: {
                kandidatid: req.params.kandidatid
            }
        });
        res.status(200).json({ msg: "Product Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteKandidat = async (req, res) => {
    const kandidat = await Kandidat.findOne({
        where: {
            kandidatid: req.params.kandidatid
        }
    });
    if (!kandidat) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Kandidat.destroy({
            where: {
                kandidatid: req.params.kandidatid
            }
        });
        res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}