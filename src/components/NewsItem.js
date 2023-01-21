import React from 'react'

const NewsItem = (props) =>{

        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="card my-3">
                <div className='card'>
                    <div style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                        }
                    }>
                        <span className='badge rounded-pill bg-success'>{source}</span>
                    </div>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="-blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem