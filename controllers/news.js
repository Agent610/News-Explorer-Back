const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000;

const getNews = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || !keyword.trim()) {
      return res.status(400).json({
        message: "Please enter a keyword.",
      });
    }

    if (!process.env.CURRENTS_API_KEY) {
      throw new Error("Currents API is not configured.");
    }

    const searchTerm = keyword.trim();
    const cacheKey = searchTerm.toLowerCase();

    const cachedResult = cache.get(cacheKey);

    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
      return res.status(200).json({
        articles: cachedResult.articles,
      });
    }

    const url = new URL("https://api.currentsapi.services/v1/search");

    url.searchParams.set("keywords", searchTerm);
    url.searchParams.set("language", "en");
    url.searchParams.set("page_number", "1");
    url.searchParams.set("page_size", "20");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CURRENTS_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message ||
          errorData.msg ||
          `Currents API request failed: ${response.status}`,
      );
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Currents API resulted in an error response");
    }

    const articles = (data.news || []).map((article) => ({
      title: article.title || "Untitled",
      description: article.description || "",
      url: article.url,
      urlToImage: article.image || "",
      publishedAt: article.published || "",
      source: {
        name: article.author || "News Source",
      },
    }));

    cache.set(cacheKey, {
      articles,
      timestamp: Date.now(),
    });

    return res.status(200).json({ articles });
  } catch (error) {
    console.error("Currents News Search Error:", error);
    next(error);
  }
};

module.exports = { getNews };
