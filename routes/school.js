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
    } = req.body;

    // Collect only provided fields
    const updateData = {};
    if (schoolName !== undefined) updateData.schoolName = schoolName;
    if (address !== undefined) updateData.address = address;
    if (sector !== undefined) updateData.sector = sector;
    if (ward !== undefined) updateData.ward = ward;
    if (board !== undefined) updateData.board = board;
    if (mediumOfInstruction !== undefined)
      updateData.mediumOfInstruction = mediumOfInstruction;
    if (grade !== undefined) updateData.grade = grade;
    if (averageFees !== undefined) updateData.averageFees = averageFees;
    if (students !== undefined) updateData.students = students;
    if (teachers !== undefined) updateData.teachers = teachers;
    if (classrooms !== undefined) updateData.classrooms = classrooms;
    if (studentClassroomRatio !== undefined)
      updateData.studentClassroomRatio = studentClassroomRatio;
    if (studentTeacherRatio !== undefined)
      updateData.studentTeacherRatio = studentTeacherRatio;
    if (principal !== undefined) updateData.principal = principal;

    const updated = await School.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update school" });
  }
});

module.exports = router;
