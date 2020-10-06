import React from 'react';
import {format} from 'currency-formatter';

export default function PostingList(props) {
  
  const rows = props.postings.map(posting => {
    return(
      <tr key={posting.id}>
        <td>{posting.description}</td>
        <td>{format(posting.value, {locale: 'pt-BR'})}</td>
        <td>{posting.type}</td>
        <td>{posting.month}</td>
        <td>{posting.year}</td>
        <td>{posting.status}</td>
        <td>
          <button className="btn btn-success"
                  title="Efetivar"
                  type="button"
                  onClick={() => {}} >
                  <i className="pi pi-check"></i>
          </button>
          <button className="btn btn-warning"
                  title="Tornar pendente"
                  type="button"
                  onClick={() => {}} >
                  <i className="pi pi-times"></i>
          </button>          
          <button className="btn btn-secondary"
                  title="Cancelar"
                  type="button"
                  onClick={() => {}} >
                  <i className="pi pi-tag"></i>
          </button>

          <button type='button'
                  title="Editar"
                  onClick={() => {}} 
                  className="btn btn-primary">
                  <i className="pi pi-pencil"></i>
          </button>
          <button type='button'
                  title="Excluir"
                  onClick={() => {}} 
                  className="btn btn-danger">
                  <i className="pi pi-trash"></i>
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