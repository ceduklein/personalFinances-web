import React from 'react';

export default class Home extends React.Component {

  state = {
    saldo: 0,
    userName: ''
  }

  componentDidMount() {
    const loggedUser = JSON.parse(localStorage.getItem('@MyFinances:user'));
    this.setState({userName: loggedUser.name});
  }

  render() {
    return(
      <div className="jumbotron">
        <h1 className="display-4">Olá, {this.state.userName}!</h1>
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
        <hr className="my-4" />
        <p className="lead">
          <a className="btn btn-success btn-lg" 
            href="#/posting-list" 
            role="button"><i className="fa fa-users"></i>  
            Consultar Lançamentos
          </a>
          <a className="btn btn-primary btn-lg" 
            href="#/posting" 
            role="button"><i className="fa fa-users"></i>  
            Cadastrar Lançamentos
          </a>
        </p>
      </div>
    )
  }
}