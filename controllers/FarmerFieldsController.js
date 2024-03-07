import FarmerFields from "../models/FarmerFields.js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { Chart } from "chart.js";
import dotenv from "dotenv";
dotenv.config();

// Define the Devnet cluster endpoint
const DEVNET_ENDPOINT = clusterApiUrl("devnet");
const api_key = process.env.API_KEY;
const url = `https://devnet.helius-rpc.com/?api-key=${api_key}`;

const getAsset = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAsset",
      params: {
        id: "82Y9o9dotEFZ3VE7ZdRFZj6m8SuJdkGhh1Myquq1UPbe",
      },
    }),
  });
  const { result } = await response.json();
  console.log("Asset: ", result);
};

const mintCompressedNft = async () => {
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
        imageUrl:
          "https://cdna.artstation.com/p/assets/images/images/052/118/830/large/julie-almoneda-03.jpg?1658992401",
        externalUrl: "https://www.yugioh-card.com/en/",
        sellerFeeBasisPoints: 6900,
      },
    }),
  });
  const { result } = await response.json();
  console.log("Minted asset: ", result);
};

const getAssetsByGroup = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByGroup",
      params: {
        groupKey: "collection",
        groupValue: "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
        page: 1, // Starts at 1
        limit: 1000,
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets by Group: ", result.items);
};

const nft = async (req, res) => {
  try {
    // Send response
    // mintCompressedNft();
    getAsset();
    // getAssetsByGroup();
    res
      .status(200)
      .json({ message: "Successfully executed controller method" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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

// Controller method to get all farmerFields
const getAllFarmerFields = async (req, res) => {
  try {
    console.log("running ...");
    // const farmerFields = await FarmerFields.find();
    const farmerFields = await FarmerFields.find().lean(); // Use lean() for better performance
    res.json(farmerFields);
  } catch (error) {
    console.error("Error getting farmerFields:", error);
    res.status(500).json({ error: error });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const existingfarmerFields = await FarmerFields.findOne({ name });

    //  if (existingfarmerFields) {
    //    return res.status(400).json({ error: 'FarmerFields name must be unique' });
    //  }

    // Create a new farmerFields if the name is unique
    const newFarmerFields = await FarmerFields.create(req.body);
    res.status(201).json(newFarmerFields);
  } catch (error) {
    console.error("Error creating farmerFields:", error);
    res.status(500).json({ error: error });
  }
};

// Controller method to get a specific crop by ID
const getFarmerFieldsById = async (req, res) => {
  const { id } = req.params;
  try {
    const farmerFields = await FarmerFields.findById(id);
    if (!farmerFields) {
      return res.status(404).json({ error: "FarmerFields not found" });
    }
    res.json(farmerFields);
  } catch (error) {
    console.error("Error getting farmerFields by ID:", error);
    res.status(500).json({ error: "Failed to get farmerFields" });
  }
};

// Controller method to update a farmerFields by ID
const updateFarmerFieldsById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedFarmerFields = await FarmerFields.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedFarmerFields) {
      return res.status(404).json({ error: "FarmerFields not found" });
    }
    res.json(updatedFarmerFields);
  } catch (error) {
    console.error("Error updating farmerFields by ID:", error);
    res.status(500).json({ error: "Failed to update farmerFields" });
  }
};

// Controller method to delete a farmerFields by ID
const deleteFarmerFieldsById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFarmerFields = await FarmerFields.findByIdAndDelete(id);
    if (!deletedFarmerFields) {
      return res.status(404).json({ error: "farmerFields not found" });
    }
    res.json({ message: "farmerFields deleted successfully" });
  } catch (error) {
    console.error("Error deleting farmerFields by ID:", error);
    res.status(500).json({ error: "Failed to delete farmerFields" });
  }
};

export default {
  getAllFarmerFields,
  create,
  getFarmerFieldsById,
  updateFarmerFieldsById,
  deleteFarmerFieldsById,
  nft,
};
