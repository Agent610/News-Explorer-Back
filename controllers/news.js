const getNews = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || !keyword.trim()) {
      return res.status(400).json({
        message: "Please enter a keyword.",
      });
    }

    const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");

    url.searchParams.set("query", keyword.trim());
    url.searchParams.set("mode", "ArtList");
    url.searchParams.set("format", "json");
    url.searchParams.set("maxrecords", "100");
    url.searchParams.set("sort", "DateDesc");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GDELT request failed: ${response.status}`);
    }

    const data = await response.json();

    const articles = (data.articles || []).map((article) => ({
      title: article.title || "Untitled",
      description: article.title || "",
      url: article.url,
      urlToImage: article.socialimage || "",
      publishedAt: article.seendate || "",
      source: {
        name: article.domain || "Unknown source",
      },
    }));

    res.status(200).json({ articles });
  } catch (error) {
    console.error("GDELT News Search Error:", error);
    next(error);
  }
};

module.exports = { getNews };
