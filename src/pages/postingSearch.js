import React from 'react';
import { withRouter } from 'react-router-dom';
import { FcSearch, FcMoneyTransfer } from 'react-icons/fc';
import { FiAlertCircle } from 'react-icons/fi'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import PostingService from '../services/postingService';
import { AuthContext } from '../main.js/AuthProvider';

import Card from '../components/card';
import FormGroup from '../components/formGroup';
import SelectMenu from '../components/selectMenu';
import { alertError, alertSuccess, alertWarning } from '../components/toastr';
import TableSort from '../components/tableSort';

class PostingSearch extends React.Component {

  state = {
    year: '',
    month: '',
    description: '',
    type: '',
    status: '',
    postings: [],
    showDeleteDialog: false,
    postingToDelete: {}
  }

  constructor() {
    super();
    this.postingService = new PostingService();
  }

  /* Lista todos os lançamentos do usuário, dentro do mês e ano atual,
  assim que o componente é renderizado.*/
  async componentDidMount() {
    const date = new Date();
    const loggedUser = this.context.authenticatedUser;
    
    const response = await this.postingService.search({
        user: loggedUser.id,
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });
    if(response.data < 1) {
      alertWarning('Nenum registro encontrado.');
    }
    this.setState({postings: response.data});
  }

  // Busca os lançamentos do usuário, com base nos filtros informados.
  search = async() => {
    const loggedUser = this.context.authenticatedUser;

    const filter = {
      year: this.state.year,
      month: this.state.month,
      type: this.state.type,
      status: this.state.status,
      description: this.state.description,
      user: loggedUser.id,
    }

    const response = await this.postingService.search(filter);
    if(response.data < 1) {
      alertWarning('Nenum registro encontrado.');
    }
    this.setState({postings: response.data});
  }

  openDeleteDialog = (posting) => {
    this.setState({showDeleteDialog: true, postingToDelete: posting});
  }

  closeDeleteDialog = () => {
    this.setState({showDeleteDialog: false});
  }

  // Chama a api, deleta o lançamento e atualiza o estado do array de lançamentos.
  delete = () => {
    this.postingService.delete(this.state.postingToDelete.id)
      .then(response => {
        const postings = this.state.postings;
        const index = postings.indexOf(this.state.postingToDelete);
        postings.splice(index, 1);
        
        this.setState({ postings: postings, showDeleteDialog: false});
        alertSuccess('Lançamento excluído.');
      }).catch(error => {
        alertError('Erro ao tentar deletar o lançamento.');
      })
  }

  // Chama a api e altera o status do lançamento.
  updateStatus = (posting, status) => {
    this.postingService.updateStatus(posting.id, status)
      .then(response =>{
        const postingsArray = this.state.postings;
        const index = postingsArray.indexOf(posting);

        if(index !== -1) {
          posting['status'] = status;
          postingsArray[index] = posting;
          this.setState({ postings: postingsArray});
          alertSuccess('Status atualizado.');
        }
      }).catch(error =>{
        alertError('Ocorreu um erro ao tentar atualizar o status do lançamento.')
      });
  }

  // Redireciona o usuário para a página de edição do lançamento.
  edit = (postingId) => {
    this.props.history.push(`/posting/${postingId}`);
  }

  render() {
    const monthList = this.postingService.getMonthList();
    const typeList = this.postingService.getTypeList();
    const statusList = this.postingService.getStatusList();

    const deleteDialogFooter = (
      <div>
          <Button label="Sim" className="p-button-danger" onClick={this.delete} />
          <Button label="Não" className="p-button-primary" onClick={this.closeDeleteDialog} />
      </div>
    );

    return(
      <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
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
            <FormGroup htmlFor="inputStatus" label="Situação:">
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
                    className="btn btn-success"
                    style={{marginBottom: '-5px'}}>
                    <FcSearch size={22}/> Buscar
            </button>
            <button type="button"
                    className="btn btn-info"
                    onClick={e => this.props.history.push('/posting')}
                    style={{marginBottom: '-5px'}}>
                    <FcMoneyTransfer size={22}/> Novo Lançamento
            </button>
          </div>
        </div>
        <br/>

        {/* Tabela de Lançamentos */}
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableSort data={this.state.postings}
                  onClickDelete={this.openDeleteDialog} 
                  onClickEdit={this.edit} 
                  onClickUpdateStatus={this.updateStatus}/>
            </div>
          </div>
        </div>

        {/* Dialog Confirmação de Exclusão */}
        <div>
          <Dialog header={<span>
                            <FiAlertCircle size={30} color={'red'} style={{marginRight: 20}} />
                            Confirmação!
                          </span>}
                  visible={this.state.showDeleteDialog} 
                  style={{ width: '30vw' }}
                  footer={deleteDialogFooter}
                  modal={true} 
                  onHide={() => this.setState({showDeleteDialog: false})}>
                  Deseja excluir este lançamento? 
          </Dialog>
        </div>

      </Card>
      </div>
    )
  }

}
PostingSearch.contextType = AuthContext;

export default withRouter(PostingSearch);