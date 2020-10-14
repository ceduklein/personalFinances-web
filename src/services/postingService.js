import api from '../api/api';
import ValidationError from '../exception/validationError';

const apiUrl = '/api/postings';

export default class PostingService {

  save(posting) {
    return api.post(`${apiUrl}`, posting);
  }

  delete(postingId) {
    return api.delete(`${apiUrl}/${postingId}`);
  }

  update(posting) {
    return api.put(`${apiUrl}/${posting.id}`, posting);
  }

  updateStatus(postingId, status) {
    return api.put(`${apiUrl}/${postingId}/status`, {status});
  }

  getPostingById(postingId) {
    return api.get(`${apiUrl}/${postingId}`);
  }

  search(filter) {
    let params = `?user=${filter.user}`;

    if(filter.year) {
      params = `${params}&year=${filter.year}`
    }

    if(filter.month) {
      params = `${params}&month=${filter.month}`
    }

    if(filter.type) {
      params = `${params}&type=${filter.type}`
    }

    if(filter.status) {
      params = `${params}&status=${filter.status}`
    }

    if(filter.description) {
      params = `${params}&description=${filter.description}`
    }
    
    return api.get(`${apiUrl}${params}`);
  }

  getMonthList() {
    return [
      {label: 'Selecione...', value: ''},
      {label: 'Janeiro', value: 1},
      {label: 'Fevereiro', value: 2},
      {label: 'Março', value: 3},
      {label: 'Abril', value: 4},
      {label: 'Maio', value: 5},
      {label: 'Junho', value: 6},
      {label: 'Julho', value: 7},
      {label: 'Agosto', value: 8},
      {label: 'Setembro', value: 9},
      {label: 'Outubro', value: 10},
      {label: 'Novembro', value: 11},
      {label: 'Dezembro', value: 12}
    ]
  }

  getTypeList() {
    return [
      {label: 'Selecione', value: ''},
      {label: 'Receita', value: 'RECEITA'},
      {label: 'Despesa', value: 'DESPESA'}      
    ]
  }

  getStatusList() {
    return [
      {label: 'Selecione', value: ''},
      {label: 'Pendente', value: 'PENDENTE'},
      {label: 'Efetivado', value: 'EFETIVADO'},
      {label: 'Cancelado', value: 'CANCELADO'}      
    ]
  }

  validate(posting) {
    const errors = [];

    if(!posting.description) {
      errors.push('Informe uma descrição.');
    }

    if(!posting.value) {
      errors.push('Informe o valor.');
    }

    if(!posting.year) {
      errors.push('Informe o ano.');
    }

    if(!posting.month) {
      errors.push('Informe o mês.');
    }

    if(!posting.type) {
      errors.push('Informe o tipo.')
    }

    if(errors && errors.length > 0) {
      throw new ValidationError(errors);
    }
  }
}