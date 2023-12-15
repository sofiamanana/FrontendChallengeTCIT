import React, { Component } from 'react';
import Axios from 'axios';

const api = Axios.create({
    baseURL:"http://localhost:3001/api/posts",
})

class Post extends Component{ 
    state = {
        posts: [],
        inputName: '',
        inputDescription: '',
    };

    constructor() {
        super();
        this.getPost();
    }

    handleNameChange = async (e) => {
        this.setState({ inputName: e.target.value });
    };

    handleDescriptionChange = async (e) => {
        this.setState({ inputDescription: e.target.value });
    };

    createPost = async () => {
        let res = await api.post('/', {name: this.state.inputName, description: this.state.inputDescription});
        this.getPost();

    }
    
    getPost = async () => {
        let data = await api.get('/').then(({data}) => data);
        this.setState({ posts: data }); 
    }

    deletePost = async (id) => {
        let data = await api.delete(`/${id}`);
        this.getPost();
    }
    
    render() {
        return (
            <div>
                <div>
                    <table style={
                        {
                            border: '1px solid black',
                            width: '80%',
                            textAlign: 'center',
                        }
                    }>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.name}</td>
                                    <td>{post.description}</td>
                                    <td><button onClick={()=>this.deletePost(post.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td><textarea type='text' placeholder='Name' key='new_name' value={this.state.inputName} onChange={this.handleNameChange}/></td>
                                <td><textarea placeholder='Description' key='new_description' value={this.state.inputDescription} onChange={this.handleDescriptionChange}/></td>
                                <td><button onClick={this.createPost}> Add Post </button></td>
                            </tr>
                        </tbody>
                    </table>
                
                    
                </div>
            </div>
        );
    }
}

export default Post;