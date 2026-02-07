const mongoose = require("mongoose");
const { Schema } = mongoose;


const ChecklistSchema = new Schema(
  {
    emergencyServiceAvailability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    accidentServiceAvailability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    ambulanceAvailability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    availabilityOfWaitingRoom: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    availabilityOfWheelchairsPWDStructuresNursingAssistance: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    cleanliness: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    xrayECGSonographyMachine: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    availabilityOfDrinkingWater: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    availabilityOfToilets: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    availabilityOfEssentialMedicines: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { _id: false } // prevents separate ObjectId for checklist
);

const ClinicSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    ward: { type: String, trim: true },
    sector: { type: String, trim: true },
    description: { type: String, trim: true },
    location: { type: String, trim: true },

    dailyFootfall: { type: String, trim: true },
    numberOfDoctorsAvailable: { type: String, trim: true },
    numberOfTrainedMedicalPersonnelAvailable: { type: String, trim: true },
    clinicTimings: { type: String, trim: true },
    infrastructureType: { type: String, trim: true },
    contactNoOfDispensary: { type: String, trim: true },
    bedsIfAny: { type: String, trim: true },
    attachedToWhichMajorHospital: { type: String, trim: true },

    publicPerception: { type: String, trim: true },
    keyIssueIdentified: { type: String, trim: true },

    checklist: {
      type: ChecklistSchema,
      default: () => ({}),
    },
    image: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Clinic = mongoose.model("Clinic", ClinicSchema);

module.exports = Clinic;