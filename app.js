import "dotenv/config";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { Chart } from "chart.js";
// import passport from 'passport';
// import bodyParser from 'body-parser';
// import { Strategy as BearerStrategy } from 'passport-http-bearer'; // Add this line
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import userRouter from "./routes/user.js";
import ordersRouter from "./routes/orders.js";
import authRouter from "./routes/auth.js";
import dbConnect from "./config/dbConnection.js";
import escrowRoutes from "./routes/escrow.js";
import ignitiaRoutes from "./routes/ignitia.js";
import bidRouter from "./routes/bid.js";
import cropRouter from "./routes/crop.js";
import insuranceRouter from "./routes/insurance.js";
import farmRouter from "./routes/farmer.js";
import farmerFieldsRouter from "./routes/FarmerFieldsRoutes.js";
import farmFieldsRouter from "./routes/FarmFieldsController.js";
import FarmFields from "./models/FarmFields.js";

// import collectiveRoutes from './routes/collective.js';
// import CollectiveModel from './models/Collective.js';

const app = express();
// Enable CORS for all routes
app.use(cors());
await dbConnect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(
//   "../../public/images",
//   express.static(__dirname + "../../public/images")
// );

console.log("__dirname :", __dirname);
app.use(express.static(path.resolve(__dirname, "../")));

const api_key = process.env.API_KEY;
const url = `https://devnet.helius-rpc.com/?api-key=${api_key}`;
app.put("*", async (req, res, next) => {
  // Get the item ID from the URL parameters
  const itemId = req.params;

  // const itemId = req.params.itemId.split("/").pop(); // Extract the last part of the URL

  // Do something with the item ID
  console.log("Item ID:", itemId);
  const itemIdObject = req.params;
  const itemI = itemIdObject["0"].split("/").pop(); // Extract the last part of the URL

  // Do something with the item ID
  console.log("Item ID:", itemI);

  // Access the updated field value
  const updatedFieldValue = req.body.ndvi_chart;
  console.log("updatedFieldValue ", updatedFieldValue);

  // Call the nft function with the updated field value
  const result = await nft(updatedFieldValue, itemI);
  next();
});

const nft = async (updatedFieldValue, itemI) => {
  // Perform some action with the updated field value
  console.log("Updated field value:", itemI);

  // Split the data into lines and parse each line
  const chartData = updatedFieldValue
    .split("\n")
    .slice(1)
    .map((line) => {
      const [date, ndvi] = line.split(",");
      return { date, ndvi: parseFloat(ndvi) };
    });

  // Create a canvas
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext("2d");

  // Draw chart axes
  ctx.lineWidth = 2; // Set line width to 2 pixels
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, 350);
  ctx.lineTo(750, 350);
  // Set the background color
  // Generate random background color
  const backgroundColor = getRandomColor();

  // Set the background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text color based on background color
  const textColor = getTextColor(backgroundColor);
  ctx.fillStyle = textColor;
  ctx.stroke();

  // Add labels for x and y axes
  ctx.font = "12px Arial"; // Set a font for axis labels

  // X-axis labels
  for (let i = 0; i < chartData.length; i += 4) {
    const x = 50 + i * (700 / chartData.length);
    ctx.fillText(chartData[i].date.substring(5), x, 370); // Shorten dates for readability
  }

  // Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const y = 350 - i * 60;
    ctx.fillText(i * 0.2, 20, y); // Adjust for NDVI scaling
  }

  // Draw chart title for x-axis
  ctx.textAlign = "center";
  ctx.fillText("Date", canvas.width / 2, 390); // Center the title

  // Draw chart title for y-axis (optional, adjust position as needed)
  ctx.rotate(-Math.PI / 2); // Rotate text for y-axis title
  ctx.fillText("NDVI", -150, 20); // Adjust position based on chart and font size
  ctx.rotate(Math.PI / 2); // Restore rotation

  // Draw chart data
  ctx.beginPath();
  chartData.forEach((data, index) => {
    const x = 50 + index * (700 / chartData.length);
    const y = 350 - data.ndvi * 300; // Scale NDVI value to fit on canvas
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "blue";
  ctx.stroke();

  // Convert canvas to base64 image
  const imageDataURL = canvas.toDataURL();

  // Convert base64 image to buffer
  const data = imageDataURL.split(",")[1];
  const buffer = Buffer.from(data, "base64");

  // Write buffer to a file
  // fs.writeFileSync("image.png", buffer);

  // Generate a unique filename (for example, using a timestamp)
  const filename = `image_${Date.now()}.png`;

  // Define the directory path relative to the current script's directory
  // const imageDirectory = path.join(__dirname, "images");
  const imageDirectory = path.resolve(__dirname, "../public");
  console.log("imagePath ", imageDirectory);

  // Ensure the directory exists, create it if it doesn't
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory);
  }

  // Write buffer to a file with the generated filename
  const imagePath = path.join(imageDirectory, filename);
  fs.writeFileSync(imagePath, buffer);

  // Write the buffer data to a PNG file
  fs.writeFile(imagePath, buffer, "binary", async (err) => {
    if (err) {
      console.error("Error writing PNG file:", err);
      return;
    }
    console.log("PNG file saved successfully:", imagePath);
    // save file to server
    // pass to mint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "helius-test",
        method: "mintCompressedNft",
        params: {
          name: "Exodia the Forbidden One",
          symbol: "ETFO",
          owner: "DCQnfUH6mHA333mzkU22b4hMvyqcejUBociodq8bB5HF",
          description:
            "Exodia the Forbidden One is a powerful, legendary creature composed of five parts: " +
            "the Right Leg, Left Leg, Right Arm, Left Arm, and the Head. When all five parts are assembled, Exodia becomes an unstoppable force.",
          attributes: [
            {
              trait_type: "Type",
              value: "Legendary",
            },
            {
              trait_type: "Power",
              value: "Infinite",
            },
            { trait_type: "Element", value: "Dark" },
            {
              trait_type: "Rarity",
              value: "Mythical",
            },
          ],
          imageUrl: imagePath,
          externalUrl: `https://ecedilink.onrender.com/farm-fields/${itemI}`,
          sellerFeeBasisPoints: 6900,
        },
      }),
    });
    const { result } = await response.json();
    console.log("Minted asset: ", result);
    // update farmer with nft asset id
    // Perform the update operation (e.g., update the field in the database)
    // Replace this with your actual update logic
    // Example: Update the field in a hypothetical database
    FarmFields.findByIdAndUpdate(
      itemI,
      { $set: { assetId: result.assetId } },
      { new: true }
    )
      .then((updatedDocument) => {
        console.error("Error updating field:", updatedDocument);
        // If the update was successful, return the updated document
        //res.status(200).json({ success: true, data: updatedDocument });
      })
      .catch((error) => {
        // If an error occurred during the update operation, return an error response
        console.error("Error updating field:", error);
      });
  });

  // const imageURL = `http://localhost:3000/images/${imagePath}`; // Adjust the domain and path as needed
  // console.log("imagePath ", imageURL);

  // Return a result if needed
  return {
    success: true,
    message: "Updated field value processed successfully",
  };
};

function getRandomColor() {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Return the color in RGB format
  return `rgb(${r}, ${g}, ${b})`;
}

function getTextColor(backgroundColor) {
  // Calculate the average brightness of the background color using the provided string
  const rgbValues = backgroundColor.match(/\d+/g).map(Number); // Extract numbers from string
  const [r, g, b] = rgbValues; // Destructure extracted values
  const brightness = (r + g + b) / (3 * 255);

  // Use white text for dark backgrounds and black text for light backgrounds
  return brightness > 0.5 ? "black" : "white";
}

// app.use(bodyParser.json());
// app.use(passport.initialize());

// Passport.js configuration for API Key/Token strategy
// passport.use(new BearerStrategy(
//   (token, done) => {
//     // Add your logic to validate and find the collective by token
//     // This is a basic example, replace it with your logic

//     // Check if the token is valid and not expired
//     if (!isValidToken(token)) {
//       return done(null, false);
//     }

//     // Find the collective by the token
//     CollectiveModel.findOne({ apiToken: token }, (err, collective) => {
//       if (err) { return done(err); }
//       if (!collective) { return done(null, false); }

//       // Optionally, you can check additional conditions here
//       // For example, you might want to check if the collective is active

//       return done(null, collective);
//     });
//   }
// ));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);
app.use("/escrow", escrowRoutes);
app.use("/user", userRouter);
app.use("/ignitia", ignitiaRoutes);
app.use("/bid", bidRouter);
app.use("/", cropRouter);
app.use("/insurance", insuranceRouter);
app.use("/", farmRouter);
app.use("/", farmerFieldsRouter);
app.use("/", farmFieldsRouter);

// Set timeout to 10 minutes (adjust as needed)
app.timeout = 600000; // 10 minutes in milliseconds

// app.use('/collectives', collectiveRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

export default app;
