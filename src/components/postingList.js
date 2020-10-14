import React from 'react';
import {format} from 'currency-formatter';
import { FiEdit, FiTrash2, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { AiOutlineStop } from 'react-icons/ai'

export default function PostingList(props) {

  const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
  ];

  const rows = props.postings.map(posting => {
    return(
      <tr key={posting.id}>
        <td>{posting.description}</td>
        <td>{format(posting.value, {locale: 'pt-BR'})}</td>
        <td>{posting.type}</td>
        <td>{monthNames[posting.month - 1]}</td>
        <td>{posting.year}</td>
        <td>{posting.status}</td>
        <td>
          <button className="btn btn-success"
                  title="Efetivar"
                  type="button"
                  disabled={posting.status === 'EFETIVADO'}
                  onClick={e => props.onClickUpdateStatus(posting, "EFETIVADO")} >
                  <FiCheckSquare size={17} />
          </button>
          <button className="btn btn-warning"
                  // style={{backgroundColor: '#8F43EA'}}
                  title="Tornar pendente"
                  type="button"
                  disabled={posting.status === 'PENDENTE'}
                  onClick={e => props.onClickUpdateStatus(posting, "PENDENTE")} >
                  <FiXSquare size={18} />
          </button>          
          <button className="btn btn-secondary"
                  title="Cancelar"
                  type="button"
                  disabled={posting.status === 'CANCELADO'}
                  onClick={e => props.onClickUpdateStatus(posting, "CANCELADO")} >
                  <AiOutlineStop size={18} />
          </button>

          <button type='button'
                  title="Editar"
                  onClick={e => props.onClickEdit(posting.id)} 
                  className="btn btn-primary">
                  <FiEdit size={17}/>
          </button>
          <button type='button'
                  title="Excluir"
                  onClick={e => props.onClickDelete(posting)} 
                  className="btn btn-danger">
                  <FiTrash2 size={17}/>
          </button>
        </td>
      </tr>
    )
  })

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Mês</th>
          <th>Ano</th>
          <th>Situação</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
  )
}