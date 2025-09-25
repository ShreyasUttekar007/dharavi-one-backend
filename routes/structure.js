const express = require("express");
const router = express.Router();
const Structure = require("../models/Structure");

// ✅ Get all structures
router.get("/get-structure", async (req, res) => {
  try {
    const structures = await Structure.find();
    res.json(structures);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch structures" });
  }
});

// ✅ Add a new structure
router.post("/", async (req, res) => {
  try {
    const newStructure = new Structure(req.body);
    await newStructure.save();
    res.status(201).json(newStructure);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add structure", details: error.message });
  }
});

router.put("/update-structure/:id", async (req, res) => {
  try {
    const {
      primaryKey,
      sector,
      structureName,
      ward,
      deity,
      areaSqFt,
      footfall,
      dateOfEstablishment,
      status,
      relevance,
      image, // array of image URLs
      longitude,
      latitude,
      remarks,
      obstructingTrafficOrViolating,
      registration,
    } = req.body;

    // Collect only provided fields
    const updateData = {};
    if (primaryKey !== undefined) updateData.primaryKey = primaryKey;
    if (sector !== undefined) updateData.sector = sector;
    if (structureName !== undefined) updateData.structureName = structureName;
    if (ward !== undefined) updateData.ward = ward;
    if (deity !== undefined) updateData.deity = deity;
    if (areaSqFt !== undefined) updateData.areaSqFt = areaSqFt;
    if (footfall !== undefined) updateData.footfall = footfall;
    if (dateOfEstablishment !== undefined)
      updateData.dateOfEstablishment = dateOfEstablishment;
    if (status !== undefined) updateData.status = status;
    if (relevance !== undefined) updateData.relevance = relevance;
    if (image !== undefined) updateData.image = image; // overwrite array
    if (longitude !== undefined) updateData.longitude = longitude;
    if (latitude !== undefined) updateData.latitude = latitude;
    if (remarks !== undefined) updateData.remarks = remarks;
    if (obstructingTrafficOrViolating !== undefined)
      updateData.obstructingTrafficOrViolating = obstructingTrafficOrViolating;
    if (registration !== undefined) updateData.registration = registration;

    const updated = await Structure.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update structure" });
  }
});

module.exports = router;
