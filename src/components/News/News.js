import React, { useState, useEffect } from "react"; // for live uncomment this line and remove fetch news button
//import React, { useState } from "react"; // for dev comment this line and add button
import axios from "axios";
import moment from "moment";
import "./style.css";

const News = ({ query = "" }) => {
  const [news, setNews] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY_PERIGON;
  const url = `https://api.goperigon.com/v1/all?apiKey=${apiKey}&q=${query}&size=9&from=&country=&sourceGroup=top100&showNumResults=true&showReprints=false&paywall=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=date`;
  

  //comment out below block for live
  /*
  const fetchNews = async () => {
    const response = await axios.get(url);
    setNews(response.data.articles);
    setShowResults(true);
  };*/

  //uncomment the following for live and remove fetch news button
  
  useEffect(() => {
  const fetchNews = async () => {
    const response = await axios.get(url);
    setNews(response.data.articles);
    setShowResults(true);
  };
    fetchNews();
  },[]);
  

  return (
    <section id="section__news">
      <div className="container">
      
        <div className="row hidden-md-up">
          {showResults && (
            <div className="row hidden-md-up">
              <h4>Top News Articles</h4>
              {news.map((article, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-self-stretch"key={index}>
                  <div key={article.id} className="card">
                    <img className="card-img-top overlay" src={article.imageUrl} alt={article.title}/>
                    <div className="card-body">
                    {moment(article.pubDate).format("MMM DD, YYYY ∙ h:mma")}
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">{article.description}</p>
                    </div>
                    <div className="text-centre card-buttons">
    <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-dark card-margin-right">View article on {article.source.domain}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
