const getSearchResults = async (req, res) => {
  try {
    const { query, start } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${query}&num=10&searchType=image&start=${start}`;
    console.log("API URL:", apiUrl);
    
    const response = await fetch(apiUrl);
    console.log("Response status:", response.status);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching data" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting favorite images:", error);
    res.status(500).json({ error: "Error getting favorite images" });
  }
};

module.exports = { getSearchResults };
