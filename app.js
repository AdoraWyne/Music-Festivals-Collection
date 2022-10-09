// -----------------------------------------------------------
// Require stuff 
const express = require("express")
const mongoose = require("mongoose")

const Event = require("./models/events")


// -----------------------------------------------------------
// Declare or execute stuff
const app = express()
const PORT = 3000
const dbURL = 'mongodb://localhost:27017/events'


// -----------------------------------------------------------
// Middlewares
// static assets
app.use(express.static('public'))
// body parser
app.use(express.urlencoded({ extended: true }))

// -----------------------------------------------------------
// Routes

// INDEX
app.get("/events", (req,res) => {
    res.send("Connected")
})

// -----------------------------------------------------------
// Setup / Admin Route
// This route: to show all data on browser in JSON, easy to get _id
// app.get("/json", async (req, res)=>{
//     const products = await Product.find()
//     res.send(products)
// })

// // Seed Route - Created seed database (3 docs/objs)
// app.get('/seed', async (req, res) => {
//     const newEvents = [
//         {
//             title: "Tomorrowland",
//             location: "Belgium",
//             website: "https://www.tomorrowland.com/home/",
//             date: "July",
//             description: "Tomorrowland is a Belgian electronic dance music festival held in Boom, Flanders, since 2005.",
//             imageURL: "https://media.resources.festicket.com/www/admin/uploads/images/Tomorrowland2022-1.jpg",
//             category: "Mixed Genres",
//             rating: "4 of 5",
//             attended: true,
//             price: 400,
//             comment: "I met my best friend here!"
//         },
//         {
//             title: "Electric Daisy Carnival (EDC)",
//             location: "United States",
//             website: "https://lasvegas.electricdaisycarnival.com/",
//             date: "May",
//             description: "Electric Daisy Carnival, commonly known as EDC, is an electronic dance music festival organized by promoter and distributor Insomniac. The annual flagship event, EDC Las Vegas, is held in May at the Las Vegas Motor Speedway, and is currently the largest electronic dance music festival in North America.",
//             imageURL: "https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/21/2022/08/16123639/EDCLV2022_0520_222745-2307_ADI_720h.jpg",
//             category: "Mixed Genres",
//             rating: "4 of 5",
//             attended: true,
//             price: 400,
//             comment: "Best memory made here!"
//         },
//         {
//             title: "Djakarta Warehouse Project (DWP)",
//             location: "Indonesia",
//             website: "https://www.djakartawarehouse.com/",
//             date: "December",
//             description: "Djakarta Warehouse Project is a dance music festival held in Jakarta, Indonesia. It is one of the largest annual dance music festivals in Asia, featuring dance music artists from around the world.",
//             imageURL: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
//             category: "Mixed Genres",
//             rating: "4 of 5",
//             attended: false,
//             price: 100,
//             comment: "Wish I can go one day!"
//         }
//     ]
//     const events = await Event.create(newEvents)
//     res.send(events)
//   })

// -----------------------------------------------------------
// Listening or Connecting
mongoose.connect(dbURL, () => {
    console.log("Connecting to products db");
})

app.listen(3000, () => {
    console.log("Listening to port", PORT)
})
