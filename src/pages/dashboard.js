import React from 'react';
import { FcSearch, FcMoneyTransfer } from 'react-icons/fc';
import { RiFileList3Line } from 'react-icons/ri';
import { TabView,TabPanel } from 'primereact/tabview';
import currencyFormatter from 'currency-formatter';

import { AuthContext } from '../main.js/AuthProvider';
import PostingService from '../services/postingService';

import Card from '../components/card';
import SelectMenu from '../components/selectMenu';
import PieChart from '../components/pieChart';
import ComboChart from '../components/comboChart';
import BarChart from '../components/barChart';
import FormGroup from '../components/formGroup';

const date = new Date();

class Dashboard extends React.Component {

  state = {
    data: null,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    monthRender: date.getMonth() + 1,
    yearRender: date.getFullYear(),
    currentConfirmedInc: 0,
    currentPendingInc: 0,
    currentCanceledInc: 0,
    currentConfirmedOut: 0,
    currentPendingOut: 0,
    currentCanceledOut: 0,
    accConfirmedIncomes: 0,
    accConfirmedOutcomes: 0,
    sumIncomes: 0, // Soma das receitas pendentes e efetivadas
    sumOutcomes: 0, // Soma das despesas pendentes e efetivadas
    userName: '',
    activeIndex: 0,
    sumConfirmedIncomes: 0,
    sumConfirmedOucomes: 0,
    currentBalance: 0,
  }

  constructor() {
    super();
    this.postingService = new PostingService();
  }

  handleStateChange = (data, user) => {
    const incomes = [], outcomes = [];
    data.forEach(posting => {
      if(posting.type === 'RECEITA') {
        return incomes.push(posting);
      } 
      else {
        return outcomes.push(posting);
      }     
    });

    const accConfirmedIncomes = [], accPendingIncomes = [], accCanceledIncomes = [];
    const accConfirmedOutcomes = [], accPendingOutcomes = [], accCanceledOutcomes = [];
    for (var i=1; i<=12; i++) {
      const sumConfirmedInc = incomes // eslint-disable-next-line
        .filter(income => income.month === i && income.status === 'EFETIVADO')
        .reduce((acc, income) => acc + income.value, 0);
        accConfirmedIncomes.push(sumConfirmedInc);
      
      const sumPendingInc = incomes // eslint-disable-next-line
        .filter(income => income.month === i && income.status === 'PENDENTE')
        .reduce((acc, income) => acc + income.value, 0);
      accPendingIncomes.push(sumPendingInc);

      const sumCanceledInc = incomes // eslint-disable-next-line
        .filter(income => income.month === i && income.status === 'CANCELADO')
        .reduce((acc, income) => acc + income.value, 0);
      accCanceledIncomes.push(sumCanceledInc);
      
      const sumConfirmedOut = outcomes // eslint-disable-next-line
        .filter(outcome => outcome.month === i && outcome.status === 'EFETIVADO')
        .reduce((acc, outcome) => acc +outcome.value, 0);
        accConfirmedOutcomes.push(sumConfirmedOut);
      
      const sumPendingOut = outcomes // eslint-disable-next-line
        .filter(outcome => outcome.month === i && outcome.status === 'PENDENTE')
        .reduce((acc, outcome) => acc +outcome.value, 0);
        accPendingOutcomes.push(sumPendingOut);
      
      const sumCanceledOut = outcomes // eslint-disable-next-line
        .filter(outcome => outcome.month === i && outcome.status === 'CANCELADO')
        .reduce((acc, outcome) => acc +outcome.value, 0);
        accCanceledOutcomes.push(sumCanceledOut);
    }
    this.setState({data, accConfirmedIncomes, accConfirmedOutcomes, userName: user.name});
    
    if(this.state.month !== '') {
      const month = this.state.month - 1;
      this.setState({
        currentConfirmedInc: accConfirmedIncomes[month],
        currentPendingInc: accPendingIncomes[month],
        currentCanceledInc: accCanceledIncomes[month],
        currentConfirmedOut: accConfirmedOutcomes[month],
        currentPendingOut: accPendingOutcomes[month],
        currentCanceledOut: accCanceledOutcomes[month],
        sumIncomes: accConfirmedIncomes[month] + accPendingIncomes[month],
        sumOutcomes: accConfirmedOutcomes[month] + accPendingOutcomes[month],
        currentBalance: accConfirmedIncomes[month] - accConfirmedOutcomes[month]
      })
    } 
    else {
      const confirmedInc = accConfirmedIncomes.reduce((acc, inc) => acc + inc, 0);
      const pendingInc = accPendingIncomes.reduce((acc, inc) => acc + inc, 0);
      const canceledInc = accCanceledIncomes.reduce((acc, inc) => acc + inc, 0);
      const confirmedOut = accConfirmedOutcomes.reduce((acc, out) => acc + out, 0);
      const pendingOut = accPendingOutcomes.reduce((acc, out) => acc + out, 0);
      const canceledOut = accCanceledOutcomes.reduce((acc, out) => acc + out, 0);

      this.setState({
        currentConfirmedInc: confirmedInc,
        currentPendingInc: pendingInc,
        currentCanceledInc: canceledInc,
        currentConfirmedOut: confirmedOut,
        currentPendingOut: pendingOut,
        currentCanceledOut: canceledOut,
        sumIncomes: confirmedInc + pendingInc,
        sumOutcomes: confirmedOut + pendingOut,
        currentBalance: confirmedInc - confirmedOut,
      })    
    }
  }

  async componentDidMount() {
    const loggedUser = this.context.authenticatedUser;
    // Busca, na api, todos os lançamentos do usuário dentro do mês e ano atual.
    const response = await this.postingService.search({
      user: loggedUser.id,
      year: date.getFullYear(),
    });
    this.handleStateChange(response.data, loggedUser);
  }


  search = async() => {
    const loggedUser = this.context.authenticatedUser;
    
    this.handleStateChange(this.state.data, loggedUser);
    this.setState({monthRender: this.state.month, yearRender: this.state.year});
  }

  render() {
    const monthList = this.postingService.getMonthList();
    monthList[0].label = 'Todos...';

    function format (value) {
      return currencyFormatter.format(value, {locale: 'pt-BR'});
    }
    
    const incomesData = [['Período', 'Valor'],
      [`Efetivadas: ${format(this.state.currentConfirmedInc)}`, this.state.currentConfirmedInc],
      [`Pendentes: ${format(this.state.currentPendingInc)}`, this.state.currentPendingInc],
      [`Canceladas: ${format(this.state.currentCanceledInc)}`, this.state.currentCanceledInc]
    ];

    const outcomesData = [['Situação', 'Valor'],
      [`Efetivadas: ${format(this.state.currentConfirmedOut)}`, this.state.currentConfirmedOut],
      [`Pendentes: ${format(this.state.currentPendingOut)}`, this.state.currentPendingOut],
      [`Canceladas: ${format(this.state.currentCanceledOut)}`, this.state.currentCanceledOut]
    ];

    const confirmedBalanceData = [
      ['',
       `Receitas: ${format(this.state.currentConfirmedInc)}`,
       `Despesas: ${format(this.state.currentConfirmedOut)}`,
       `Saldo: ${format(this.state.currentBalance)}`
      ],
      ['', this.state.currentConfirmedInc, this.state.currentConfirmedOut, this.state.currentBalance]
    ]

    const predictedBalanceData = [
      ['',
       `Receitas: ${format(this.state.sumIncomes)}`,
       `Despesas: ${format(this.state.sumOutcomes)}`,
       `Saldo: ${format(this.state.sumIncomes - this.state.sumOutcomes)}`
      ],
      ['', this.state.sumIncomes, this.state.sumOutcomes, this.state.sumIncomes - this.state.sumOutcomes]
    ]

    const balance = [];
    for(var i =0; i<12; i++) {
      balance.push(this.state.accConfirmedIncomes[i] - this.state.accConfirmedOutcomes[i]);
    }

    const fullYearBalanceData = [['Mês', 'Receitas', 'Despesas', 'Saldo'],
      ['Jan', this.state.accConfirmedIncomes[0], this.state.accConfirmedOutcomes[0], balance[0]],
      ['Fev', this.state.accConfirmedIncomes[1], this.state.accConfirmedOutcomes[1], balance[1]],
      ['Mar', this.state.accConfirmedIncomes[2], this.state.accConfirmedOutcomes[2], balance[2]],
      ['Abr', this.state.accConfirmedIncomes[3], this.state.accConfirmedOutcomes[3], balance[3]],
      ['Mai', this.state.accConfirmedIncomes[4], this.state.accConfirmedOutcomes[4], balance[4]],
      ['Jun', this.state.accConfirmedIncomes[5], this.state.accConfirmedOutcomes[5], balance[5]],
      ['Jul', this.state.accConfirmedIncomes[6], this.state.accConfirmedOutcomes[6], balance[6]],
      ['Ago', this.state.accConfirmedIncomes[7], this.state.accConfirmedOutcomes[7], balance[7]],
      ['Set', this.state.accConfirmedIncomes[8], this.state.accConfirmedOutcomes[8], balance[8]],
      ['Out', this.state.accConfirmedIncomes[9], this.state.accConfirmedOutcomes[9], balance[9]],
      ['Nov', this.state.accConfirmedIncomes[10], this.state.accConfirmedOutcomes[10], balance[10]],
      ['Dez', this.state.accConfirmedIncomes[11], this.state.accConfirmedOutcomes[11], balance[11]],
    ]

    return(    
      <div className="jumbotron" style={{marginTop: '-30px'}}>
          <div className="row" style={{marginTop: -10}}>
            <div className="col-md-8">
              <h1 className="display-5">Olá, {this.state.userName}!</h1>
              <h4 className="text-muted">
                {this.state.monthRender !== '' ?
                  `Seu saldo em ${monthList[this.state.monthRender].label} 
                  de ${this.state.yearRender} é ${format(this.state.currentBalance)}`
                : 
                  `Seu saldo em ${this.state.yearRender} 
                  é ${format(this.state.currentBalance)}`
                }    
              </h4>
              <br />
              <a className="btn btn-danger btn-lg btn-home" 
                  href="#/posting-list" 
                  role="button"> 
                  <RiFileList3Line size={17} /> Listar Lançamentos
                </a>
                <a className="btn btn-info btn-lg btn-home" 
                  href="#/posting" 
                  role="button">
                  <FcMoneyTransfer size={17} /> Cadastrar Lançamentos
                </a>
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col-md-11">
                  <FormGroup htmlFor="inputMonth" label="Mês: ">
                    <SelectMenu list={monthList}
                            className="form-control"
                            id="inputMonth"
                            value={this.state.month}
                            onChange={e => this.setState({month: e.target.value})}/>
                  </FormGroup>
                </div> 
              </div>

              <div className="row">
                <div className="col-md-12" style={{marginBottom: '-15px'}}>
                  <FormGroup htmlFor="inputYear" label="Ano: " />
                </div>
              </div>

              <div className="row">
                <div className="col-md-7">
                  <input type="text"
                          className="form-control"
                          id="inputYear"
                          value={this.state.year}
                          onChange={e => this.setState({year: e.target.value})} />
                </div>

                <div className="col-md-5">
                  <button className="btn btn-success"
                      title="Buscar"
                      type="button"
                      onClick={this.search}
                      style={{fontSize: 17, padding: '5px 10px'}} >
                      <FcSearch size={15} /> Buscar
                  </button>
                </div>
              </div>
            </div>

          </div>
          <hr className="my-4" />

          <div className="row">
            <div className="col-md-12" >
              <Card title={this.state.monthRender !== '' ?
                  `Relatórios de ${monthList[this.state.monthRender].label} 
                  de ${this.state.yearRender}`
                :
                  `Relatórios de ${this.state.yearRender}`
              }>
                <TabView 
                  activeIndex={this.state.activeIndex} 
                  onTabChange={(e) => this.setState({activeIndex: e.index})}
                >
                  <TabPanel header={this.state.monthRender !== '' ? `Efetivo mensal` : `Efetivo anual`}>
                    <BarChart data={confirmedBalanceData}/>
                    <hr className="my-4" />
                    <p className="lead">
                      Este gráfico considera apenas as receitas e despesas efetivadas.
                    </p>
                  </TabPanel>
                  <TabPanel header={this.state.monthRender !== '' ? `Previsão mensal` : `Previsão anual`}>
                    <BarChart data={predictedBalanceData}/>
                    <hr className="my-4" />
                    <p className="lead">
                      Este gráfico considera as receitas e despesas efetivadas e pendentes.
                    </p>
                  </TabPanel>
                  <TabPanel header="Receitas">
                    <PieChart data={incomesData} />
                    <hr className="my-4" />
                    <p className="lead">
                      Este gráfico apresenta todas as receitas do período buscado.
                    </p>
                  </TabPanel>
                  <TabPanel header="Despesas">
                    <PieChart data={outcomesData} />
                    <hr className="my-4" />
                    <p className="lead">
                      Este gráfico apresenta todas as despesas do período buscado.
                    </p>
                  </TabPanel>
                  <TabPanel header="Balanço Anual">
                    <ComboChart data={fullYearBalanceData} />
                    <hr className="my-4" />
                  </TabPanel>
                </TabView>
              </Card>
            </div>
          </div>
        </div>
    )
  }
}
Dashboard.contextType = AuthContext;

export default Dashboard;