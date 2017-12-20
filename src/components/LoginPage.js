/**
 * Created by Михаил on 18.12.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/listview.css';
import Modal from 'react-modal';
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
autentificate () {
this.props.setAuthContext(this.login.value,this.password.value);
}

  render() {
      return(
         <Modal
             style={customStyles}
             isOpen={this.props.modalVisible}
         >
             <div className="form-group">
                 <label for="usr">Name:</label>
                 <input type="text" className="form-control" id="usr" ref={input=>this.login=input}/>
             </div>
             <div className="form-group">
                 <label for="pwd">Login:</label>
                 <input type="text" className="form-control" id="pwd" ref={input=>this.password=input}/>
             </div>
             <div className="modalButtons">
             <button type="button" className="btn btn-success" onClick={(e)=>this.autentificate()}>Login</button>
             <button type="button" className="btn btn-secondary" onClick={(e)=>this.props.modalVisibleContext()}>Close</button>
             </div>
         </Modal>
      )
  }
}


const customStyles = {
    content : {
        width                 : '30%',
        height                : '25%',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};