import express from "express";
import FarmFieldsController from "../controllers/FarmFieldsController.js";

const router = express.Router();

// Create a new farm field
router.post("/farm-fields", FarmFieldsController.create);

router.get("/farm-fields", FarmFieldsController.getAllFarmFields);

router.get(
  "/farmfields/:farmerFields",
  FarmFieldsController.getFarmFieldsByFarmerFields
);

// Get a single farm field by ID
router.get("/farm-fields/:id", FarmFieldsController.getFarmFieldsById);

// Update a farm field by ID
router.put("/farm-fields/:id", FarmFieldsController.updateFarmFieldsById);

// Delete a farm field by ID
router.delete("/farm-fields/:id", FarmFieldsController.deleteFarmFieldsById);

export default router;
