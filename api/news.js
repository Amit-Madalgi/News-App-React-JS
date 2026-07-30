export default async function handler(request, response) {
  const { country = 'us', category = 'general', page = 1, pageSize = 8 } = request.query;
  // Use the same environment variable name you set in Vercel
  const apiKey = process.env.REACT_APP_NEWS_API; 

  if (!apiKey) {
    return response.status(500).json({ 
      status: 'error', 
      message: 'API key is missing. Please set REACT_APP_NEWS_API in Vercel Environment Variables.' 
    });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    // Vercel uses Node.js 18+ which has native fetch support
    const res = await fetch(url);
    const data = await res.json();
    
    // Set CORS headers just in case
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ 
      status: 'error', 
      message: 'Error fetching from NewsAPI', 
      error: error.message 
    });
  }
}
