const mongoose = require("mongoose");
const { Schema } = mongoose;

const StructureSchema = new Schema(
  {
    primaryKey: { type: String, required: true, unique: true, trim: true },
    sector: { type: String, trim: true },
    hutmentId: { type: String, trim: true },
    ward: { type: String, trim: true },
    structureName: { type: String, trim: true },
    deity: { type: String, trim: true },
    areaSqFt: { type: String, trim: true }, // kept as String
    footfall: { type: String, trim: true },
    dateOfEstablishment: { type: String, trim: true },
    obstructingTrafficOrViolating: { type: String, trim: true }, // Yes/No as String
    registration: { type: String, trim: true },
    relevance: { type: String, trim: true },
    remarks: { type: String, trim: true },
    latitude: { type: String, trim: true },
    longitude: { type: String, trim: true },
    image: [{ type: String, trim: true }],
    status: { type: String, trim: true },
  },
  { timestamps: true }
);

const Structure = mongoose.model("Structure", StructureSchema);

module.exports = Structure;
