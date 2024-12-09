// const { default: mongoose, model } = require("mongoose");
const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        require: true
    },
    countryName: {
      type: String,
      require: true,
    },
    visaType: {
      type: String,
      require: true,
      enum: ["tourist", "student", "official", "work"],
    },
    processingTime: {
      type: String,
      require: true,
    },
    requiredDocuments: {
      validPassport: {
        type: Boolean,
        default: false,
      },
      visaApplicationForm: {
        type: Boolean,
        default: false,
      },
      passportSizePhoto: {
        type: Boolean,
        default: false,
      },
    },
    description: {
      type: String,
      default: "",
    },
    ageRestriction: {
      type: Number,
      min: 18,
      require: true,
    },
    fee: {
      type: Number,
      min: 0,
      require: true,
    },
    validity: {
      type: String,
      require: true,
    },
    applicationMethod: {
      type: String,
      require: true,
    },
    countryImage: {
      type: String,
      require: false,
    },
    visaStatus: {
        type: String,
        require: false,
        enum: [
            "pending", "accepted"
        ],
        default: "pending"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Visa = mongoose.model("Visa", visaSchema);
module.exports = Visa;
