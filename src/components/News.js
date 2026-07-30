import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    const updateNews = async () => {
      props.setProgress(10);
      const isDev = process.env.NODE_ENV === 'development';
      const url = isDev 
        ? `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        : `/api/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
      console.log("Fetching from URL:", url);
      setLoading(true);
      try {
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        if (parsedData.status === 'ok') {
          setArticles(parsedData.articles || []);
          setTotalResults(parsedData.totalResults || 0);
        } else {
          console.error("NewsAPI Error:", parsedData.message);
          setArticles([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
        setTotalResults(0);
      }
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() =>{
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();
      // eslint-disable-next-line
    },[])

    // const handlePrevClick = async () =>{
    //   setPage(page - 1);
    //   updateNews();
    // }

    // const handleNextClick = async () =>{
    //   setPage(page + 1);
    //   updateNews();
    // }

    const fetchMoreData = async () => {
      const isDev = process.env.NODE_ENV === 'development';
      const url = isDev
        ? `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        : `/api/news?country=${props.country}&category=${props.category}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        if (parsedData.status === 'ok') {
          setArticles(articles.concat(parsedData.articles || []));
          setTotalResults(parsedData.totalResults || 0);
        } else {
          console.error("NewsAPI Error:", parsedData.message);
        }
      } catch (error) {
        console.error("Error fetching more news:", error);
      }
    };

    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '80px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
            <NewsItem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} 
            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
          </div>
        </div>
          </InfiniteScroll>

      </>
    );
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
