import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    type="text"
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field 
                    name="title"
                    component={this.renderField}
                    label="Title"
                />
                <Field 
                    name="categories"
                    component={this.renderField}
                    label="Categories"
                />
                <Field 
                    name="content"
                    component={this.renderField}
                    label="Post Content"
                />
                <button className="btn btn-primary" type="submit">Submit</button>
                <Link className="btn btn-danger" to="/">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // Valide the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content!";
    }

    // If errors is empty, the form is fine to submit
    // If errors has any properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
   connect(null, { createPost }) (PostsNew)
);