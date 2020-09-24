import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'

import Card from '../components/card';
import FormGroup from '../components/formGroup';

export default withRouter(class CadastroUsuario extends React.Component {

state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  register = () => {
    console.log(this.state)
  }

  backToLogin = () => {
    this.props.history.push('/signin');
  }

  render() {
    return(
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset>
                <FormGroup htmlFor="inputName" label="Nome: *">
                  <input
                    type="text"
                    id="inputName"
                    name="name"
                    onChange={e => this.setState({name : e.target.value})}
                    className="form-control"
                    placeholder="Digite o nome"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputEmail" label="Email: *">
                  <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    onChange={e => this.setState({email: e.target.value})}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Digite o email"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputPass1" label="Senha: *">
                  <input
                    type="password"
                    id="inputPass1"
                    name="password"
                    onChange={e => this.setState({password : e.target.value})}
                    className="form-control"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputPass2" label="Repita a senha: *">
                  <input
                    type="password"
                    id="inputPass2"
                    name="passwordConfirmation"
                    onChange={e => this.setState({passwordConfirmation : e.target.value})}
                    className="form-control"
                  />
                </FormGroup>

                <button 
                  onClick={this.register} 
                  type="button" 
                  className="btn btn-success">Salvar</button>
                <button
                  onClick={this.backToLogin}
                  type="button" 
                  className="btn btn-danger">Voltar</button>


              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    )
  }
})