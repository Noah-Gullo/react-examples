import { Component } from 'react';
import Count from "./Count.jsx";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: '1', text: 'Just some demo tasks', isEditing: false },
        { id: '2', text: 'As an example', isEditing: false }
      ],
      inputVal: '',
      editingVal: '', 
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.inputVal.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: this.state.inputVal,
      isEditing: false
    };

    this.setState((state) => ({
      todos: state.todos.concat(newTodo),
      inputVal: '',
    }));
  }

  handleDelete(idToDelete) {
    this.setState((state) => ({
      todos: state.todos.filter(todo => todo.id !== idToDelete),
    }));
  }

  toggleEdit(id) {
    this.setState((state) => ({
      todos: state.todos.map(todo => 
        todo.id === id ? { ...todo, isEditing: true } : { ...todo, isEditing: false }
      ),
      editingVal: state.todos.find(todo => todo.id === id).text
    }));
  }

  handleEditChange(e) {
    this.setState({ editingVal: e.target.value });
  }

  handleResubmit(id) {
    if (!this.state.editingVal.trim()) return;

    this.setState((state) => ({
      todos: state.todos.map(todo => 
        todo.id === id ? { ...todo, text: state.editingVal, isEditing: false } : todo
      ),
      editingVal: ''
    }));
  }

  render() {
    return (
      <section style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif' }}>
        <h3>{this.props.name}</h3>
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            id="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>

        <h4>All the tasks!</h4>
        
        <ul style={{ paddingLeft: '20px' }}>
          {this.state.todos.map((todo) => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              
              {todo.isEditing ? (
                <input 
                  type="text" 
                  value={this.state.editingVal} 
                  onChange={this.handleEditChange} 
                />
              ) : (
                <span style={{ minWidth: '150px' }}>{todo.text}</span>
              )}

              {todo.isEditing ? (
                <button onClick={() => this.handleResubmit(todo.id)}>Resubmit</button>
              ) : (
                <button onClick={() => this.toggleEdit(todo.id)}>Edit</button>
              )}

              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        <Count totalTodos={this.state.todos.length} />
      </section>
    );
  }
} 

export default ClassInput;