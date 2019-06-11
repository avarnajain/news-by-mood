"use-strict";
import Bubble from './bubblechart';
import Pagination from './pagination.jsx';
import '../css/news.css';
import LoadingSpinner from './spinner.jsx';

class News extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentNews:[],
            currentPage: null,
            totalPages: null
        };
    }

    onPageChanged = pageData => {
        const { data } = this.state;
        const { currentPage, totalPages, pageLimit } = pageData;

        const offset = (currentPage - 1) * pageLimit;
        const currentNews = data.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentNews, totalPages });
    }


    //this executes when the page is loaded
    componentDidMount() {
        this.getNews();
    }
    
    getNews() {
        // console.log('getNews()')
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_url)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(data => {
            //console.log(data);
            this.setState({
                data: data,
                currentNews: data.slice(0, 10)
            })
        });
    }

    render() {
        const news = this.state.currentNews;
        // console.log('currentNews', currentNews);
        const { currentNews, currentPage, totalPages } = this.state;
        const totalNews = this.state.data.length;
        // console.log('totalNews', totalNews);
        if (totalNews) {
            if (totalNews === 0) {
                return (
                    <div className="container-fluid" id="no-articles-found-div">
                        <div className="row">
                            <div className="col">
                             <h1> No Articles Found </h1>
                            </div>
                        </div>
                    </div>
                );
            }
            const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
            const newsList = news.map((article) => 
                <div key={article.article_id.toString()+'news'} className='row' id="news-article">
                    <div className="container-fluid">
                        <div className="row" id='news-title-row'>
                            <div className="col" id="article-title">
                                <h5>
                                    <a href={article.url} target="_blank">{article.title}</a>
                                </h5>
                            </div>
                        </div>
                        <div className="row" id="news-info-row">
                            <div className="col">
                                <h6>
                                    <a href={`/get-chosen-source/${article.source}`}>{article.source}</a> 
                                    <b> • </b> 
                                    <a href={`/get-chosen-category/${article.category[0]}`}>{article.category[0].charAt(0).toUpperCase() + article.category[0].slice(1)}</a>
                                    <b> • </b> 
                                    {article.published}
                                    <b> • </b>
                                    <a href={`/article/${article.article_id}`} target="_blank">Share</a>
                                </h6>
                            </div>
                        </div>
                        <div className="row" id="news-img-bubble-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 order-lg-2 order-md-2 order-sm-2 order-xs-1" id="news-bubble-col">
                                <div className="row" id='news-bubble-row'>
                                    <div className="col">
                                        <Bubble tone_data={article.scores}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 order-lg-1 order-md-1 order-sm-1 order-xs-2" id="news-img-col">
                                <img src={article.image_url} alt="img" className="img-thumbnail"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col align-self-end">
                            <div className="page-bar">
                                <Pagination totalRecords={totalNews} pageLimit={10} pageNeighbours={0} onPageChanged={this.onPageChanged} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {newsList}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id='spinner'>
                    <LoadingSpinner/>
                    <h4> Loading Articles... </h4>
                </div>
            )
        }
    };
}

export default News;
