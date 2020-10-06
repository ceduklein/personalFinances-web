import React from 'react';
import { withRouter } from 'react-router-dom';

import PostingService from '../services/postingService';
import AuthService from '../services/authService';

import Card from '../components/card';
import FormGroup from '../components/formGroup';
import SelectMenu from '../components/selectMenu';
import PostingList from '../components/postingList';
import { alertWarning } from '../components/toastr';


class PostingSearch extends React.Component {

  state = {
    year: '',
    month: '',
    description: '',
    type: '',
    status: '',
    postings: [],
  }

  constructor() {
    super();
    this.postingService = new PostingService();
    this.authService = new AuthService();
  }

  // Lista todos os lançamentos do usuário, assim que o componente é renderizado.
  componentDidMount() {
    const loggedUser = this.authService.getUser();
    if(!loggedUser) {
      alertWarning('Efetue seu login para acessar seus registros financeiros');
      this.props.history.push('/signin');
    }
    this.postingService.search({user: loggedUser.id})
      .then(response => {
        const postingsResponse = response.data;
        if(postingsResponse < 1) {
          alertWarning('Nenum registro encontrado.')
        }

        this.setState({postings: postingsResponse})
      })
  }

  // Busca os lançamentos do usuário, com base nos filtros informados.
  search = () => {
    const loggedUser = this.authService.getUser();
    if(!loggedUser) {
      alertWarning('Efetue seu login para acessar seus registros financeiros');
      this.props.history.push('/signin');
    }

    const filter = {
      year: this.state.year,
      month: this.state.month,
      type: this.state.type,
      status: this.state.status,
      description: this.state.description,
      user: loggedUser.id,
    }

    this.postingService.search(filter)
      .then(response => {
        const postingsResponse = response.data;
        if(postingsResponse < 1) {
          alertWarning('Nenum registro encontrado.')
        }

        this.setState({postings: postingsResponse})
      })
  }

  render() {
    const monthList = this.postingService.getMonthList();
    const typeList = this.postingService.getTypeList();
    const statusList = this.postingService.getStatusList();


    return(
      <Card title="Relatório de Lançamentos">

        {/* Formulário de Pesquisa */}
        <div className="row">
          <div className="col-md-4">
            <FormGroup htmlFor="inputYear" label="Ano:">
              <input type="text"
                    className="form-control" 
                    id="inputYear"
                    value={this.state.year}
                    onChange={e => this.setState({year: e.target.value})} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputMonth" label="Mês:">
              <SelectMenu list={monthList}
                          className="form-control"
                          id="inputMonth"
                          value={this.state.month}
                          onChange={e => this.setState({month: e.target.value})}/>
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputType" label="Tipo:">
              <SelectMenu list={typeList}
                          className="form-control"
                          id="inputType"
                          value={this.state.type}
                          onChange={e => this.setState({type: e.target.value})}/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          <FormGroup htmlFor="inputDesc" label="Descrição:">
              <input type="text"
                    className="form-control" 
                    id="inputDesc"
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})} />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup htmlFor="inputStatus" label="Tipo:">
              <SelectMenu list={statusList}
                          className="form-control"
                          id="inputStatus"
                          value={this.state.status}
                          onChange={e => this.setState({status: e.target.value})}/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button type="button"
                    onClick={this.search} 
                    className="btn btn-success">
                    <i className="pi pi-search"></i> Buscar
            </button>
            <button type="button"
                    className="btn btn-primary"
                    onClick={e => this.props.history.push('/posting')}>
                    <i className="pi pi-plus-circle"></i> Novo Lançamento
            </button>
          </div>
        </div>
        <br/>

        {/* Tabela de Lançamentos */}
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <PostingList postings={this.state.postings}/>
            </div>
          </div>
        </div>

      </Card>
    )
  }

}

export default withRouter(PostingSearch);