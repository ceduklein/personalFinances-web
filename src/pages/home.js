import React from 'react';
import { FcSearch, FcMoneyTransfer } from 'react-icons/fc';

import { AuthContext } from '../main.js/AuthProvider';
import PostingService from '../services/postingService';

import Card from '../components/card';
import { alertWarning } from '../components/toastr';


class Home extends React.Component {

  state = {
    saldo: 0,
    userName: '',
    totalConfirmedIncomes: 0,
    totalPendingIncomes: 0,
    totalConfirmedOutcomes: 0,
    totalPendingOutcomes: 0
  }

  constructor() {
    super();
    this.postingService = new PostingService();
  }

  async componentDidMount() {
    const loggedUser = this.context.authenticatedUser;
    this.setState({userName: loggedUser.name});
    const date = new Date();
    
    // Busca, na api, todas os lançamentos do usuário dentro do mês e ano atual.
    const response = await this.postingService.search({
      user: loggedUser.id,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    if(response.data < 1) {
      alertWarning('Nenhuma receita registrada este mês.');
    }

    // Monta os Arrays com as respectivas condições.
    const confirmedIncomes = [];
    const pendingIncomes = [];
    const confirmedOutcomes = [];
    const pendingOutcomes = [];

    response.data.forEach(posting => {
      if(posting.status === 'EFETIVADO' && posting.type === 'RECEITA') {
        return confirmedIncomes.push(posting);
      }
      
      if(posting.status === 'PENDENTE' && posting.type === 'RECEITA') {
        return pendingIncomes.push(posting);
      }

      if(posting.status === 'EFETIVADO' && posting.type === 'DESPESA') {
        return confirmedOutcomes.push(posting);
      }

      if(posting.status === 'PENDENTE' && posting.type === 'DESPESA') {
        return pendingOutcomes.push(posting);
      }
    });
    
    // Soma os valores de todas as receitas e todas as despesas dos Arrays montados.
    const accIncomesEfetivados = confirmedIncomes.reduce((acc, income) => acc + income.value, 0);
    const accIncomesPendentes = pendingIncomes.reduce((acc, income) => acc + income.value, 0);
    
    const accOutcomesEfetivados = confirmedOutcomes.reduce((acc, outcome) => acc + outcome.value, 0);
    const accOutcomesPendentes = pendingOutcomes.reduce((acc, outcome) => acc + outcome.value, 0);

    console.log(confirmedIncomes);
    console.log(pendingIncomes);
    console.log(confirmedOutcomes);
    console.log(pendingOutcomes);

    console.log(accIncomesEfetivados);
    console.log(accIncomesPendentes);
    console.log(accOutcomesEfetivados);
    console.log(accOutcomesPendentes);
  }

  render() {
    return(
      <>    
        <div className="jumbotron">
          <h1 className="display-5">Olá, {this.state.userName}!</h1>
          <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
          <hr className="my-4" />

          <div className="row">
            <div className="col-md-6">
              <Card title={`Receitas`}>
                
              </Card>
            </div>

            <div className="col-md-6">
              <Card title={`Depesas`}>
                
              </Card>
            </div>
          </div>

          <p className="lead">
            <a className="btn btn-success btn-lg" 
              href="#/posting-list" 
              role="button"> 
              <FcSearch size={25} /> Consultar Lançamentos
            </a>
            <a className="btn btn-primary btn-lg" 
              href="#/posting" 
              role="button">
                <FcMoneyTransfer size={25} /> Cadastrar Lançamentos
            </a>
          </p>
        </div>
      </>
    )
  }
}
Home.contextType = AuthContext;

export default Home;