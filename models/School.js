const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchoolSchema = new Schema(
  {
    schoolName: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    sector: { type: String, trim: true },
    ward: { type: String, trim: true },
    board: { type: String, trim: true }, // e.g., CBSE, ICSE, State
    mediumOfInstruction: { type: String, trim: true }, // e.g., English, Hindi
    grade: { type: String, trim: true }, // e.g., Nursery–10, 1–12
    averageFees: { type: String, trim: true }, // kept as String for flexibility
    students: { type: String, trim: true },
    teachers: { type: String, trim: true },
    classrooms: { type: String, trim: true },
    studentClassroomRatio: { type: String, trim: true }, // e.g., "40:1"
    studentTeacherRatio: { type: String, trim: true }, // e.g., "25:1"
    principal: { type: String, trim: true },
    image: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);

module.exports = School;
