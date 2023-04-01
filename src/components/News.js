import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }

    document.title = `${this.capitaliseFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {

    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=************************************&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100)

  }


  async componentDidMount() {
    this.updateNews()
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=************************************&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
          <h2 className='text-center' style={{ marginTop: '80px' }}>Newsmonkey - Top {this.capitaliseFirstLetter(this.props.category)} headlines</h2>
          {this.state.loading && <Spinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}>

            <div className='container'>
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage ? "https://imgs.search.brave.com/uePd789kZ53Y4tEBYrOEeEWiUivXYfu18hJ6RZUenSg/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5a/a2ZUMl9LaDlXWEtP/N0s3RXVUcTNnSGFF/OCZwaWQ9QXBp" : element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} date={!element.publishedAt ? "Unknown" : element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
      </>

    )
  }
}
