import React from 'react';
import { withRouter } from 'react-router-dom';

import PostingService from '../services/postingService';
import { AuthContext } from '../main.js/AuthProvider';

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
    updating: false,
  }

  constructor() {
    super();
    this.postingService = new PostingService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if(params.id) {
      this.postingService.getPostingById(params.id)
        .then(response => {
          this.setState({...response.data, updating: true});
        }).catch(error => {
          alertError(error.response.data);
        })
    }
  }

  save = () => {
    const loggedUser = this.context.authenticatedUser;
    const { description, value, type, year, month } = this.state;
    const posting = { user: loggedUser.id, description, value, type, year, month };
    posting.value = posting.value.replace(',', '.');

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

  update = () => {
    const { description, year, month, type, value, id, user, status } = this.state;
    const posting = { description, year, month, type, value, id, user, status };
    posting.value = posting.value.replace(',', '.');

    try {
      this.postingService.validate(posting);
    } catch (error) {
      const errors = error.msgs;

      errors.forEach(msg => alertError(msg));
      return false;
    }

    this.postingService.update(posting)
      .then(response => {
        this.props.history.push('/posting-list');
        alertSuccess('Lançamento atualizado com sucesso.')
      }).catch(error => {
        alertError(error.response.data);
      })
  }
  
  render() {
    const typeList = this.postingService.getTypeList();
    const monthList = this.postingService.getMonthList();

    return(
      <Card title={this.state.updating ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
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
            { this.state.updating ? ( 
                <button type="button" onClick={this.update} className="btn btn-success">
                  Salvar Alterações
                </button>
              ) : (
                <button type="button" onClick={this.save} className="btn btn-success">
                  Salvar
                </button>              
              )
            }

            <button type="button" 
                    onClick={e => this.props.history.push('/posting-list')} 
                    className="btn btn-danger">
                      Cancelar
            </button>
          </div>
        </div>
      </Card>
    )
  }
}
Posting.contextType = AuthContext;

export default withRouter(Posting);