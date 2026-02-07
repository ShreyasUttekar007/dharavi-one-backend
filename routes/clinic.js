const express = require("express");
const router = express.Router();
const Clinic = require("../models/Clinic");
const authenticateUser = require("../middleware/authenticateUser"); // use your current one

// GET only the clinics the user is allowed to see
// GET /api/clinics/get-clinic
router.get("/get-clinic", authenticateUser, async (req, res) => {
  try {
    const roles = Array.isArray(req.user?.roles) ? req.user.roles : [];
    const isModOrAdmin = roles.includes("mod") || roles.includes("admin");

    const userWards = Array.isArray(req.user?.wards)
      ? req.user.wards.map((w) => String(w || "").trim()).filter(Boolean)
      : [];

    // Build filter:
    // - mods/admins see all
    // - others see only their assigned wards (or nothing if none assigned)
    let filter = {};
    if (!isModOrAdmin) {
      if (userWards.length === 0) {
        return res.json([]); // no wards assigned → no data
      }
      filter.ward = { $in: userWards };
    }

    // (Optional) allow ward filtering via ?ward=...
    if (req.query.ward && String(req.query.ward).trim()) {
      filter.ward = String(req.query.ward).trim();
    }

    // (Optional) allow sector filtering via ?sector=...
    if (req.query.sector && String(req.query.sector).trim()) {
      filter.sector = String(req.query.sector).trim();
    }

    const clinics = await Clinic.find(filter);
    res.json(clinics);
  } catch (error) {
    console.error("get-clinic error:", error);
    res.status(500).json({ error: "Failed to fetch clinics" });
  }
});

// ✅ Add a new clinic
// POST /api/clinics
router.post("/", async (req, res) => {
  try {
    const newClinic = new Clinic(req.body);
    await newClinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add clinic", details: error.message });
  }
});

// ✅ Update clinic
// PUT /api/clinics/update-clinic/:id
router.put("/update-clinic/:id", async (req, res) => {
  try {
    const {
      name,
      ward,
      sector,
      description,
      location,
      dailyFootfall,
      numberOfDoctorsAvailable,
      numberOfTrainedMedicalPersonnelAvailable,
      clinicTimings,
      infrastructureType,
      contactNoOfDispensary,
      bedsIfAny,
      attachedToWhichMajorHospital,
      publicPerception,
      keyIssueIdentified,
      checklist, // object (if you later add it in schema)
      image, // if you have images later
    } = req.body;

    // Collect only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (ward !== undefined) updateData.ward = ward;
    if (sector !== undefined) updateData.sector = sector;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;

    if (dailyFootfall !== undefined) updateData.dailyFootfall = dailyFootfall;
    if (numberOfDoctorsAvailable !== undefined)
      updateData.numberOfDoctorsAvailable = numberOfDoctorsAvailable;
    if (numberOfTrainedMedicalPersonnelAvailable !== undefined)
      updateData.numberOfTrainedMedicalPersonnelAvailable =
        numberOfTrainedMedicalPersonnelAvailable;

    if (clinicTimings !== undefined) updateData.clinicTimings = clinicTimings;
    if (infrastructureType !== undefined)
      updateData.infrastructureType = infrastructureType;
    if (contactNoOfDispensary !== undefined)
      updateData.contactNoOfDispensary = contactNoOfDispensary;
    if (bedsIfAny !== undefined) updateData.bedsIfAny = bedsIfAny;
    if (attachedToWhichMajorHospital !== undefined)
      updateData.attachedToWhichMajorHospital = attachedToWhichMajorHospital;

    if (publicPerception !== undefined)
      updateData.publicPerception = publicPerception;
    if (keyIssueIdentified !== undefined)
      updateData.keyIssueIdentified = keyIssueIdentified;

    if (checklist !== undefined) updateData.checklist = checklist;
    if (image !== undefined) updateData.image = image;

    const updated = await Clinic.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("update-clinic error:", err);
    res.status(500).json({ error: "Failed to update clinic" });
  }
});

// GET /api/clinics/basic-public -> returns ALL fields for each Clinic
router.get("/basic-public", async (req, res) => {
  try {
    const docs = await Clinic.find({}).select("-__v").lean(); // drop __v (optional)
    res.json(docs);
  } catch (err) {
    console.error("Failed to fetch clinics:", err);
    res.status(500).json({ error: "Failed to fetch clinics" });
  }
});

module.exports = router;