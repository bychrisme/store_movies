import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col, Card, CardTitle, CardText} from 'reactstrap';
import { Progress, Switch, Tooltip, Checkbox, Pagination, Select, Input } from 'antd';

// import of CSS
import './index.css';
import * as mainActions from '../../ducks/actions/mainActions';
import {LikeOutlined, DislikeOutlined, DeleteOutlined} from '@ant-design/icons'

const { Option } = Select;

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            tableCheck : [],
            page: 1, 
            nombre: 4

        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    componentDidMount = async () => {
        await this.props.getMovies();
    }

    updateLocalMovies = () => {
        this.setState({movies : this.props.movies})
    }

    onChange(checked, index) {
        if(checked)
            this.props.addLikeMovies(index);
        else
            this.props.moveLikeMovies(index);
    }

    onCheckboxChange(e, category) {
        const isChecked = e.target.checked;
        const { tableCheck } = this.state;
        if(isChecked){
            tableCheck.push(category);
        }else{
            const getIndex = tableCheck.findIndex(elt => {
                return elt === category
            })
            if(getIndex >= 0)
                tableCheck.splice(getIndex, 1)
        }
        this.setState({tableCheck, page: 1})
        this.props.getMoviesByCategories(tableCheck);

    }

    onPageChange = (page) => {
        this.setState({page: page})
    }

    onNombreChange = (value) => {
        this.setState({nombre: value})
    }

    paginate = (data, page, nbr) => {
        const max = (page * nbr) > data.length ? data.length : (page * nbr);
        const initial = (page * nbr) - nbr;
        const sorted = [];
        for(let i = initial; i<max; i++){
            const elt = data[i];
            sorted.push(elt);
        }
        return sorted;
    }

    render(){
        const {movies, categories, countMovies} = this.props;
        const {page, nombre} = this.state;
        return (
            <Container className="main">
                <Row>
                    <Col><h1>Liste des films</h1></Col>
                </Row>
                <Aside onCheckboxChange={this.onCheckboxChange} categories={categories} />
                <Row>
                    {
                        this.paginate(movies, page, nombre).map((movie, index) =>{
                            const percent = movie.likes * 100 / (movie.likes + movie.dislikes);
                            const like = movie.likes < 1000 ? movie.likes : (movie.likes / 1000).toFixed(1) + "k"
                            const dislike = movie.dislikes < 1000 ? movie.dislikes : (movie.dislikes / 1000).toFixed(1) + "k"
                            return (
                                <Col lg="3" md="4" sm="6" xs="6" key={index}>
                                    <Card body className="card">
                                        <CardTitle className="title">{ movie.title}</CardTitle>
                                        <CardText>{ movie.category}</CardText>
                                        <div>
                                            <div className="jauge">
                                                <div className="left"><LikeOutlined style={{fontSize: "16px", margin: "5px"}} />{like}</div>
                                                <div className="rigth"><DislikeOutlined style={{fontSize: "16px", margin: "5px"}} />{dislike}</div>
                                                <Progress strokeColor={"grey"} percent={percent} showInfo={false} />
                                            </div>
                                            <div className="action">
                                                <Switch onChange={(checked) => this.onChange(checked, index)} size="small" style={{marginLeft: "10px"}} />
                                                <Tooltip placement="top" title={"Supprimer le film"}>
                                                    <DeleteOutlined style={{color: "red", marginLeft: "10px", fontSize: "20px"}} onClick={() => this.props.deleteMovies(index)} />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
                <Row>
                    <Col lg={{size: 6}}>
                        <Pagination
                            total={countMovies}
                            pageSize={nombre}
                            defaultCurrent={1}
                            onChange={this.onPageChange}
                            className="pagination"
                            style={{float: "right"}}
                        />
                    </Col>
                    <Col lg={{size: 2}}>
                        <Input.Group compact className="pagination" style={{float: "left"}}>
                            <Select defaultValue="4" onChange={this.onNombreChange}>
                                <Option value="4">4 / page</Option>
                                <Option value="8">8 / page</Option>
                                <Option value="12">12 / page</Option>
                            </Select>
                        </Input.Group>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const Aside = (props) => {
    return (
        <Col lg="2" className="aside">
            <h2>Catégories</h2>
            {
                props.categories.map((category, index) => {
                return <Checkbox className="checkbox" key={index} onChange={(e) => props.onCheckboxChange(e, category)}> {category} </Checkbox>
                })
            }
        </Col>
    )
}

const mapStateToProps = state => {
    return {
        movies: state.main.movies,
        countMovies: state.main.countMovies,
        categories: state.main.categories
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getMovies: () => dispatch(mainActions.getMovies()),
        getCategories: () => dispatch(mainActions.getCategories()),
        getMoviesByCategories: (table) => dispatch(mainActions.getMoviesByCategories(table)),
        deleteMovies: (id) => dispatch(mainActions.deleteMovies(id)),
        addLikeMovies: (id) => dispatch(mainActions.addLikeMovies(id)),
        moveLikeMovies: (id) => dispatch(mainActions.moveLikeMovies(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);