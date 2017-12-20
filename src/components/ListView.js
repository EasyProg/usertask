/**
 * Created by Михаил on 16.12.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddView from '../components/AddView';
import LoginPage from '../components/LoginPage';
import View from '../components/View';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/listview.css';
export default class ListView extends Component {
constructor(props) {
super(props);
this.sortTable = this.sortTable.bind(this);
this.setModalVisible=this.setModalVisible.bind(this);
this.setLoginVisible=this.setLoginVisible.bind(this);
this.setAuth=this.setAuth.bind(this);


this.state=        {
    tasks:this.props.tasks,
    key:'',
    order:true,
    page:1,
    modalVisible:false,
    loginVisible:false,
    auth:false
}
}
static propTypes = {
 tasks: PropTypes.array.isRequired
};
componentDidUpdate(prevProps) {
if (prevProps.tasks!==this.state.tasks)
this.setState({tasks:this.props.tasks});
}
setModalVisible() {
this.setState({modalVisible:false});
}
setLoginVisible() {
this.setState({loginVisible:false});
}
setAuth(login,pass) {
if (login==='admin'&&pass==='123')
this.setState({auth:true});
else alert('Wrong password or username');
this.setState({loginVisible:false});
}
// function for dynamic sorting
compareValues(key,order='asc')
{
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
            {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB)
            {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
}
sortTable(key) {
var order = !this.state.order;
var sort = order === true?'asc':'desc';
this.setState({tasks:this.state.tasks.sort(this.compareValues(key,sort)),key:key,order:order});
}
render() {
   return (
       <div className="containerDiv">
        <table className="table">
            <thead>
            <tr className="headerView">
                <th className="text-center" onClick={(e)=>this.sortTable('username')}>User Name</th>
                <th className="text-center" onClick={(e)=>this.sortTable('email')}>E-mail</th>
                <th className="text-center">Task text</th>
                <th className="text-center">Image</th>
                <th className="text-center" onClick={(e)=>this.sortTable('status')}>Status</th>
                {this.state.auth?<th className="text-center"/>:null}
            </tr>
            </thead>
            <tbody>
            {this.props.tasks.map(
                (item,index)=>
                        <View index={index} item={item} auth={this.state.auth}/>
            )
            }
            </tbody>
            </table>
           <div className="buttonsContainer">
            <button type="button"
                       className="btn btn-primary"
                       onClick={(e)=>this.setState({loginVisible:true})}>Adm_login
                    </button>
           <button type="button"
                   className="btn btn-success"
                   onClick={(e)=>this.setState({modalVisible:true})}
           >Add task</button>
           </div>
           <AddView     modalVisible={this.state.modalVisible}
                        modalVisibleContext={this.setModalVisible}
                        getTasks={this.props.getTasks}
           />
           <LoginPage   modalVisible={this.state.loginVisible}
                        modalVisibleContext={this.setLoginVisible}
                        setAuthContext={this.setAuth}
            />

       </div>
   )
}
}