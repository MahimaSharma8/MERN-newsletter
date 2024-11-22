import express from "express";
import Article1 from "../models/article1.js"; // Adjust the path as necessary

const searchRouter = express.Router();

// Search route
searchRouter.get("/", async (req, res) => {
  const query = req.query.q; //q is a variable that stores query's value inside request. 

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const results = await Article1.aggregate([
      {
        $search: {
          index: "default",  
          text: {
            query: query,
            path: ["Author", "headline", "Textcontent.text"], 
          },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

export default searchRouter;
