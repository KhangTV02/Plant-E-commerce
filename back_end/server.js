// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.get("/resnet101", async (req, res) => {
//   try {
//     const modelUrl =
//       "https://storage.googleapis.com/tfhub-tfjs-modules/tensorflow/resnet_101/feature_vector/5/model.json";
//     const response = await fetch(modelUrl);
//     if (!response.ok) throw new Error("Failed to fetch model");
//     const modelData = await response.json();
//     res.json(modelData);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching ResNet101 model" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

