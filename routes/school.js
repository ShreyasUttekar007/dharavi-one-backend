const express = require("express");
const router = express.Router();
const School = require("../models/School");

// ✅ Get all schools
router.get("/get-school", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});

// ✅ Add a new school
router.post("/", async (req, res) => {
  try {
    const newSchool = new School(req.body);
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add school", details: error.message });
  }
});

// ✅ Update school by ID
// routes/schools.js (or wherever your school router is)
router.put("/update-school/:id", async (req, res) => {
  try {
    const {
      schoolName,
      address,
      sector,
      ward,
      board,
      mediumOfInstruction,
      grade,
      averageFees,
      students,
      teachers,
      classrooms,
      studentClassroomRatio,
      studentTeacherRatio,
      principal,
      image, // <-- ADD THIS
    } = req.body;

    const setData = {};
    if (schoolName !== undefined) setData.schoolName = schoolName;
    if (address !== undefined) setData.address = address;
    if (sector !== undefined) setData.sector = sector;
    if (ward !== undefined) setData.ward = ward;
    if (board !== undefined) setData.board = board;
    if (mediumOfInstruction !== undefined)
      setData.mediumOfInstruction = mediumOfInstruction;
    if (grade !== undefined) setData.grade = grade;
    if (averageFees !== undefined) setData.averageFees = averageFees;
    if (students !== undefined) setData.students = students;
    if (teachers !== undefined) setData.teachers = teachers;
    if (classrooms !== undefined) setData.classrooms = classrooms;
    if (studentClassroomRatio !== undefined)
      setData.studentClassroomRatio = studentClassroomRatio;
    if (studentTeacherRatio !== undefined)
      setData.studentTeacherRatio = studentTeacherRatio;
    if (principal !== undefined) setData.principal = principal;

    // OVERWRITE images with the array coming from client
    if (Array.isArray(image)) setData.image = image;

    const updated = await School.findByIdAndUpdate(
      req.params.id,
      { $set: setData },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update school" });
  }
});

module.exports = router;
