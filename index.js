require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

// middleware
app.use(cors());
app.use(express());
app.use(bodyParser.json());
const router = express.Router();

// --------------------

// Models
const Visa = require("./models/visa.js");

// --------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gf77n.mongodb.net/yourVisaNavigator`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const connectDB = async () => {
  try {
    mongoose.connect(uri);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error", error);
  }
};
connectDB();
// ---------------------

app.get("/visas", async (req, res) => {
  try {
    const visas = await mongoose.connection.db
      .collection("visas")
      .find()
      .limit(25)
      .toArray();
    // console.log(embedded_movies)
    res.status(200).json({ visas });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/", async (req, res) => {
  console.log(req);
  try {
    const {
      userId,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
      countryImage,
    } = req.body;

    const newVisa = new Visa({
      userId,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
      countryImage,
    });

    await newVisa.save();
    res.status(200).json({
      success: true,
      data: newVisa,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/users/:userId", async (req,res) => {
    const {userId} = req.params
    try{
        const visas = await Visa.find({userId, visaStatus:"pending"})
        console.log(visas)
        if(visas.length<1){
            return res.status(404).json({
                message: "No Pending Application Found For This User"
            })
        }
        res.status(200).json(visas)
    }
    catch(error){
        console.log("Error", error)
        res.status(500).json({
            success: false,
            message: error.message,
          });}
})

app.get("/accepted/:userId", async (req,res) => {
    const {userId} = req.params
    try{
        const visas = await Visa.find({userId, visaStatus:"accepted"})
        console.log(visas)
        if(visas.length<1){
            return res.status(404).json({
                message: "No Pending Application Found For This User"
            })
        }
        res.status(200).json(visas)
    }
    catch(error){
        console.log("Error", error)
        res.status(500).json({
            success: false,
            message: error.message,
          });}
})

app.get("/country/:countryName", async (req,res) => {
    const {countryName} = req.params

    try{
        const visas = await Visa.find({countryName:countryName})
        // console.log(visas)
        if(visas.length<1){
            return res.status(404).json({
                message: "No Pending Application Found For This User"
            })
        }
        res.status(200).json(visas)
    }
    catch(error){
        console.log("Error", error)
        res.status(500).json({
            success: false,
            message: error.message,
          });}
})

app.listen(port, () => {
  console.log(` Server is running port: ${port} `);
});
