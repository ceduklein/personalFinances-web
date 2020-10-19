import React from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import currencyFormatter from 'currency-formatter';
import { FiEdit, FiTrash2, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { AiOutlineStop } from 'react-icons/ai'
import { Button } from 'primereact/button';

function TableSort(props) {

    const data = props.data;

    const format = (rowData) => {
      return currencyFormatter.format(rowData.value, { locale: 'pt-BR' });
    }

    const actionbodyTemplate = (rowData) => {
      return(
        <React.Fragment>
          <button className="btn btn-success btn-action"
                  title="Efetivar"
                  type="button"
                  disabled={rowData.status === 'EFETIVADO'}
                  onClick={e => props.onClickUpdateStatus(rowData, "EFETIVADO")} >
                  <FiCheckSquare size={16} />
          </button>
          <button className="btn btn-warning btn-action"
                  // style={{backgroundColor: '#8F43EA'}}
                  title="Tornar pendente"
                  type="button"
                  disabled={rowData.status === 'PENDENTE'}
                  onClick={e => props.onClickUpdateStatus(rowData, "PENDENTE")} >
                  <FiXSquare size={16} />
          </button>          
          <button className="btn btn-secondary btn-action"
                  title="Cancelar"
                  type="button"
                  disabled={rowData.status === 'CANCELADO'}
                  onClick={e => props.onClickUpdateStatus(rowData, "CANCELADO")} >
                  <AiOutlineStop size={16} />
          </button>

          <button type='button'
                  title="Editar"
                  onClick={e => props.onClickEdit(rowData.id)} 
                  className="btn btn-primary btn-action">
                  <FiEdit size={16}/>
          </button>
          <button type='button'
                  title="Excluir"
                  onClick={e => props.onClickDelete(rowData)} 
                  className="btn btn-danger btn-action">
                  <FiTrash2 size={16}/>
          </button>
        </React.Fragment>
      )
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return(
      <DataTable value={data}
          removableSort
          resizableColumns
          columnResizeMode="fit"
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,30,40,50]}
          paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
          className="p-datatable-sm p-datatable-striped">
        <Column field="description" header="Descrição" style={{width: '18%'}} sortable />
        <Column field="value" header="Valor" body={format} style={{width: '13%'}} sortable />
        <Column field="type" header="Tipo" style={{width: '10%'}} sortable />
        <Column field="month" header="Mês" style={{width: '7%'}} sortable />
        <Column field="year" header="Ano" style={{width: '8%'}}sortable />
        <Column field="status" header="Situação" style={{width: '12%'}} sortable />
        <Column body={actionbodyTemplate} header="Ação" style={{width: '32%'}}>
          
        </Column>  
      </DataTable>
    )
}
export default TableSort;