import React from 'react';

export default class Card extends React.Component {
  
  render() {
    return (
      <div className="card border-secondary mb-3">

        <h3 className="card-header">{this.props.title}</h3>

        <div className="card-body">
          {this.props.children}
        </div>

      </div>
    )
  }
}