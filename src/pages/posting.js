import React from 'react';
import { withRouter } from 'react-router-dom';

import PostingService from '../services/postingService';
import AuthService from '../services/authService';

import Card from '../components/card';
import FormGroup from '../components/formGroup';
import SelectMenu from '../components/selectMenu';
import { alertError, alertSuccess } from '../components/toastr';


class Posting extends React.Component {

  state = {
    id: null,
    description: '',
    status: '',
    value: '',
    type: '',
    year: '',
    month: '',
    user: null,
  }

  constructor() {
    super();
    this.postingService = new PostingService();
    this.authService = new AuthService();
  }

  save = () => {
    const loggedUser = this.authService.getUser();
    const { description, value, type, year, month } = this.state;
    const posting = { user: loggedUser.id, description, value, type, year, month };

    try {
      this.postingService.validate(posting);
    } catch (error) {
      const errors = error.msgs;

      errors.forEach(msg => alertError(msg));
      return false;
    }

    this.postingService.save(posting)
      .then(response => {
        alertSuccess('Lançamento cadastrado com sucesso.');
        this.props.history.push('/posting-list');
      }).catch(error => {
        alertError(error.response.data);
      })
  }
  
  render() {
    const typeList = this.postingService.getTypeList();
    const monthList = this.postingService.getMonthList();

    return(
      <Card title="Cadastro de Lançamentos">
        <div className="row">
          <div className="col-md-12">
            <FormGroup htmlFor="inputDesc" label="Descrição: *">
              <input type="text"
                    id="inputDesc"
                    className="form-control"
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})} />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <FormGroup htmlFor="inputValue" label="Valor: *">
              <input type="text"
                    id="inputValue"
                    className="form-control"
                    value={this.state.value}
                    onChange={e => this.setState({value: e.target.value})} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputYear" label="Ano: *">
              <input type="text"
                    id="inputYear"
                    className="form-control"
                    value={this.state.year}
                    onChange={e => this.setState({year: e.target.value})} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputMonth" label="Mês: *">
              <SelectMenu id="inputMonth"
                        className="form-control"
                        list={monthList}
                        value={this.state.month}
                        onChange={e => this.setState({month: e.target.value})} />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
          <FormGroup htmlFor="inputType" label="Tipo: *">
              <SelectMenu id="inputType"
                        className="form-control"
                        list={typeList}
                        value={this.state.type}
                        onChange={e => this.setState({type: e.target.value})} />
            </FormGroup>
          </div>

          <div className="col-md-4">
          <FormGroup htmlFor="inputStatus" label="Situação: ">
              <input type="text"
                    disabled 
                    id="inputStatus"
                    className="form-control"
                    value={this.state.status}
                    onChange={e => this.setState({status: e.target.value})} />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button type="button" onClick={this.save} className="btn btn-success">
              <i className="pi pi-save"></i> Salvar
            </button>

            <button type="button" onClick={() => {}} className="btn btn-success">
              <i className="pi pi-save"></i> Salvar Alterações
            </button>

            <button type="button" 
                    onClick={e => this.props.history.push('/home')} 
                    className="btn btn-danger">
              <i className="pi pi-times"></i> Cancelar
            </button>
          </div>
        </div>
      </Card>
    )
  }
}
export default withRouter(Posting);