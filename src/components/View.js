/**
 * Created by Михаил on 19.12.2017.
 */
import React, {Component} from 'react';
var md5 = require('md5');
export default class View extends Component
{
    constructor(props)
                {
    super(props);

    this.state =
                {
                writable: false,
                status:this.props.item.status===10
                };
    this.changeStatus=this.changeStatus.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
                }
    changeStatus()
                {
    if (this.props.auth&&this.state.status)
    this.setState({status:false});
    else if (this.props.auth&&!this.state.status)
    this.setState({status:true});
                }
    saveRecord() {
        var form = new FormData();
        //form.append("username", this.props.item.username);
        //form.append("email",    this.props.item.email);
        form.append("text",     this.textarea.value);
        //form.append("image",    this.props.item.image_path);
        form.append("status",   this.state.status?10:0);
        var parameters = [];
        var paramsStr = '';
        for (var pair of form.entries()) {
        parameters.push(pair[0]+'='+pair[1]);
        };
        parameters.sort();
        parameters.push('token=beejee');
        for (var i=0;i<parameters.length;i++) {
        paramsStr=paramsStr.concat(parameters[i]+'&');
        }
        form.append("token",   'beejee');
        console.log(paramsStr.slice(0,-1));
        form.append("signature", md5(paramsStr.slice(0,-1)));
        fetch(`https://uxcandy.com/~shapoval/test-task-backend/edit/:${this.props.item.id}?developer=Misha`,{
            method: 'POST',
            body: form

        })  .then(this.setState({writable:true}))
            .catch((err)=>console.log(err));

        }


    render ()   {
        return  (
                <tr key={this.props.index}>
                <td className="user"> {this.props.item.username}</td>
                <td className="email">{this.props.item.email}</td>
                <td><textarea rows="3" ref={(textarea)=>this.textarea=textarea} readOnly={!this.state.writable}>{this.props.item.text}</textarea></td>
                <td><img ref={(image)=>this.image=image} src={this.props.item.image_path} width={320} height={240}/></td>
                <td>{this.state.status?
                <button type="button" onClick={(e)=>this.state.writable?this.changeStatus():false} className="btn btn-success">Done</button> :
                <button type="button" onClick={(e)=>this.state.writable?this.changeStatus():false} className="btn btn-warning">To be done...</button>
                }</td>
                {this.props.auth?<td>
                        {!this.state.writable?<button type="button" className="btn btn-primary" onClick={(e)=>this.setState({writable:true})}>Modify</button>:
                                              <button type="button" className="btn btn-primary" onClick={(e)=>this.saveRecord(this.props.item)}>Save</button>
                        }
                    </td>:null}
                </tr>
                )
                }

}