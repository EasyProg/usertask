/**
 * Created by Михаил on 17.12.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/listview.css';
import Modal from 'react-modal';
import * as $ from 'jquery';
export default class AddView extends Component {
constructor(props)  {
            super(props);
            this.saveData = this.saveData.bind(this);
            this.readURL = this.readURL.bind(this);
            this.checkData = this.checkData.bind(this);
            this.state={img:'',error:false,errorMsg:''};
                            }
checkData() {
  let message = '';
  if (!this.name.value||
      !this.email.value||
      !this.text.value||
      !this.image.value
     )     {
      message = 'Не заполнены все необходимые поля';
      this.setState({error:true,errorMsg:message});
      return false
           }
  else if (!validateEmail(this.email.value))
  {
      message = 'Неверно заполнен email';
      this.setState({error:true,errorMsg:message});
      return false

  }
  else if ( this.image.value.indexOf('.jpg')===-1&&
            this.image.value.indexOf('.gif')===-1&&
            this.image.value.indexOf('.png')===-1)
  {
      message = 'Неверный формат картинки';
      this.setState({error:true,errorMsg:message});
      return false
  }
  return true
}
saveData() {
            var form = new FormData();
            form.append("username", this.name.value);
            form.append("email", this.email.value);
            form.append("text",  this.text.value);
            form.append("image", this.image.files[0]);
            console.log(form);
            fetch('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Misha',{
            method: 'POST',
            body: form

            }).then(this.props.modalVisibleContext())
              .then(this.props.getTasks())
              .catch((err)=>console.log(err));

            }
readURL(input)
            {
            var c = this;
            //this.setState({img:src});
            var reader = new FileReader();
            reader.onload = function(e) {
            c.setState({img:e.target.result});
            };
            reader.readAsDataURL(this.image.files[0]);
            }

render()    {
            return  (
            <Modal
            isOpen={this.props.modalVisible}
            style={customStyles}
            >
            <div>
            {this.state.error?<label>{this.state.errorMsg}</label>:null}
            </div>
            <div className="form-group">
                <label for="usr">Name:</label>
                <input type="text" className="form-control" id="usr" ref={input=>this.name=input}/>
            </div>
            <div className="form-group">
                <label for="pwd">E-mail:</label>
                <input type="text" className="form-control" id="pwd" ref={input=>this.email=input}/>
            </div>
            <div className="form-group">
                <label for="text">Task text:</label>
                <textarea  type="text" className="form-control" id="comment" rows={5} ref={input=>this.text=input}/>
            </div>
            <input id="input-b1" name="input-b1" type="file"
                   onChange={(e)=>this.readURL(e)}
                   ref={input=>this.image=input}
            />
            {this.state.img?<img id="blah" src={this.state.img} width={320} height={240}/>:null}
            {/*</div>*/}
            {/*<label for="file-upload" className="custom-file-upload">*/}
                {/*Custom Upload*/}
            {/*</label>*/}
                {/*<input id="file-upload" type="file" placeholder="Image" ref={input=>this.image=input}/>*/}
                <div className="modalButtons">
            <button type="button" className="btn btn-success" onClick={(e)=>this.checkData()?this.saveData():false}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={(e)=>this.props.modalVisibleContext()}>Close</button>
            </div>
            </Modal>
            )
            }
            }


const customStyles = {
            content : {
            width                 : '30%',
            height                : '50%',
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
    }
};
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}