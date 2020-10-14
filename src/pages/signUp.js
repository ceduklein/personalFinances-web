import React from 'react';
import { withRouter } from 'react-router-dom'

import UsuarioService from '../services/userService';

import Card from '../components/card';
import FormGroup from '../components/formGroup';
import { alertError, alertSuccess } from '../components/toastr';


export default withRouter(class CadastroUsuario extends React.Component {

  state = {
      name: "",
      email: "",
      pass: "",
      passConfirmation: "",
  }

  constructor() {
    super();
    this.userService = new UsuarioService();
  }

  register = () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      pass: this.state.pass,
      passConfirmation: this.state.passConfirmation,
    }

    try {
      this.userService.validate(user);
    }catch(error) {
      const errors = error.msgs;
      errors.forEach( msg => { alertError(msg) } );
      return false;
    }

    this.userService.save(user)
      .then(response => {
        alertSuccess('Usuário cadastrado com sucesso. Efetue o login para acessar a aplicação.')
        this.props.history.push('/signin');
      }).catch(error => {
        alertError(error.response.data);
      });
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
                <FormGroup htmlFor="inputName" label="Nome:">
                  <input
                    type="text"
                    id="inputName"
                    name="name"
                    onChange={e => this.setState({name : e.target.value})}
                    className="form-control"
                    placeholder="Digite o nome"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputEmail" label="Email:">
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

                <FormGroup htmlFor="inputPass1" label="Senha:">
                  <input
                    type="password"
                    id="inputPass1"
                    name="pass"
                    onChange={e => this.setState({pass : e.target.value})}
                    className="form-control"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputPass2" label="Confirme a senha:">
                  <input
                    type="password"
                    id="inputPass2"
                    name="passConfirmation"
                    onChange={e => this.setState({passConfirmation : e.target.value})}
                    className="form-control"
                  />
                </FormGroup>

                <button 
                  onClick={this.register} 
                  type="button" 
                  className="btn btn-success">
                    Salvar
                </button>

                <button
                  onClick={this.backToLogin}
                  type="button" 
                  className="btn btn-danger">
                    Cancelar
                </button>


              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    )
  }
})