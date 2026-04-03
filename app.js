const express =require("express");
const app =express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res) =>{
    res.send("hi,I am root");
});

// index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    
    console.log(allListings); 
    
    res.render("listings/index", { allListings });
});
//new Route 
app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res) =>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
}) 
//Create Route 
app.post("/listings", async (req, res) => {
    const newListing= new Listing( req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
// app.get("/testListing",async (req,res) => {
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description: "By the beach",
//         price: 1200 ,
//         location: "calangute,Goa",
//         country: " India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });

app.listen(8080,() => {
    console.log("server is lsiting to port 8080")
});
