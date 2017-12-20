/**
 * Created by Михаил on 16.12.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class Paginate extends Component
{
    constructor(props)  {
        super(props);
        this.state={chosenElem:0};
        this.paginate=this.paginate.bind(this);
                        }
    static propTypes =  {
        length: PropTypes.number.isRequired,
        countPage:PropTypes.number.isRequired
                        };
    paginate(elem) {
    this.setState({chosenElem:elem});
    //let c = elem ===1?0:elem;
    this.props.paginationContext(elem,this.props.countPage);
    }
    render()    {
        if (this.props.length>this.props.countPage)
                {
        var pageHolder=[];
        for (var i=0;i<=Math.round(this.props.length/3);i++)
        pageHolder.push(i);
        return (
        <ul class="pagination">
            <li class="page-item"><a className="page-link">Previous</a></li>
            {pageHolder.map((item,i)=><li className={i===this.state.chosenElem?"page-item active":"page-item"}>
                <a className="page-link" onClick={(e)=>this.paginate(i)}>{i+1}</a></li>)}
            <li class="page-item"><a class="page-link">Next</a></li>
        </ul>);}
        else return null


    }
}