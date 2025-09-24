import React from 'react'

const NewsItem = (props) => {
    
    let {title, description, imageUrl, newsUrl, author, date, source} = props;

    return (
      <div className='container my-3'>
        <div className="card">
          <div style={{display:'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
            <img src={imageUrl ? imageUrl : "https://blog.tipranks.com/wp-content/uploads/2024/09/PLTR-Bear-750x406.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                {/* target='_blank' is used to open link in new tab */}
                <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
    </div>
    )
}

export default NewsItem;
