import React, { Component } from 'react';
import ListView from './components/ListView';
import Paginate from './components/Paginate';
import logo from './logo.svg';
import './App.css';

class App extends Component {
constructor(props) {
super(props);
this.state=({tasks:[
    // {
    // "id": 1,
    // "username": "Test User",
    // "email": "test_user_1@example.com",
    // "text": "Hello, world!",
    // "status": 10,
    // "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836540_1.jpg"
    // },
    // {
    //     "id": 3,
    //     "username": "Test User 2",
    //     "email": "test_user_2@example.com",
    //     "text": "Hello from user 2!",
    //     "status": 0,
    //     "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836666_3.jpg"
    // },
    // {
    //     "id": 4,
    //     "username": "Test User 3",
    //     "email": "test_user_3@example.com",
    //     "text": "Hello from user 3!",
    //     "status": 0,
    //     "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836803_4.jpg"
    // },
    // {
    //     "id": 5,
    //     "username": "Test User 4",
    //     "email": "test_user_4@example.com",
    //     "text": "Hello from user 4!",
    //     "status": 10,
    //     "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836803_4.jpg"
    // }


    ],
    filterTasks:[]
});
this.makePagination= this.makePagination.bind(this);
this.getTaskData= this.getTaskData.bind(this);
}
makePagination(pageNum,countPage)   {
var filterTasks = [];
console.log(pageNum);
let g = pageNum === 0?pageNum:pageNum-1;
 this.state.tasks.forEach (
     function (item,i)    {
         if (i>=pageNum*countPage-g&&filterTasks.length<countPage)
             filterTasks.push(item);
                          });
this.setState({filterTasks:filterTasks});
                                    }
getTaskData() {
    var context = this;
    fetch('https://uxcandy.com/~shapoval/test-task-backend/?developer=Misha').
    then(function(response)
        {
            if (response.status!==200) {
                return;
            }
            response.json().then(function(data)
                {
                    context.setState({tasks:data.message.tasks});
                    context.makePagination(0,3);
                }
            );
        }
    )
        .catch(function(err){console.log(err)});
}
componentDidMount() {
this.getTaskData();
}
  render() {
    return (
      <div className="App">
        <ListView tasks= {this.state.filterTasks} getTasks={this.getTaskData}/>
        <Paginate length={this.state.tasks.length} countPage={3} paginationContext={this.makePagination}/>

      </div>
            );
            }
}

export default App;
