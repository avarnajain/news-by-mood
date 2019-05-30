"use-strict";
import Bubble from './bubblechart';

class News extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getNews();
    }
    
    getNews() {
        console.log('getNews()')
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_url)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(data => {
            //console.log(data);
            this.setState({
                data: data
            })
        });
    }

    render() {

        const news = this.state.data;
        // const tone = this.state.tone;
        // console.log(tone);
        const newsList = news.map((article) => 
            <div key={article.article_id.toString()}>
                <div className="row">
                    <div className="col">
                        <h5>
                            <a href={article.url}>{article.title}</a>
                        </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6>
                            <a href={`/get-chosen-source/${article.source}`}>{article.source}</a>
                            {' • '+article.category[0].charAt(0).toUpperCase() + article.category[0].slice(1)}
                            {' • '+article.published}
                        </h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <img src={article.image_url} alt="img" className="img-thumbnail"/>
                    </div>
                    <div className="col-8">
                        <div className="row" id='D3'>
                            <div className="col">
                                <Bubble tone_data={article.scores}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {newsList}
                    </div>
                </div>
            </div>
        )
    };
}


// const deleted = (
//     <div className="col-6">
//         <Bubble tone_data={article.scores}
//             filter_type='emotional'/>
//     </div>
//     <div className="col-6">
//         <Bubble tone_data={article.scores}
//             filter_type='language'/>
//     </div>
// )

// const deleted = (
//     <div className="col">
//         <Bubble tone_data={article.scores}/>
//     </div>
// )

export default News;
