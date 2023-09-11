import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import './table.scss'

function RemoteAll(props) {
  const {
    columns,
    data,
    keyField,
    remotePagination = false,
    remoteSorting = false,
    current_page,
    pages,
    records_per_page,
    total_records,
    onTableChange,
    defaultSorted = [],
    options = null,
    error_message = null,
  } = props

  const pagination = paginationFactory({
    page: current_page,
    sizePerPage: records_per_page,
    totalSize: total_records,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({
      options,
      currSizePerPage,
      onSizePerPageChange,
    }) => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{' '}
          {
            <select
              data-test-id="select-pagination-size-per-page"
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm page-select"
              onChange={(e) => onSizePerPageChange(e.target.value)}
              value={records_per_page}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{' '}
          entries.
        </label>
      </div>
    ),
  })

  const emptyDataMessage = () => {
    return error_message !== null ? error_message : 'No Records to Display.'
  }

  return (
    <>
      <ToolkitProvider columns={columns} data={data} keyField={keyField} search>
        {(toolKitProps) => (
          <div>
            <BootstrapTable
              id="table-component"
              {...toolKitProps.baseProps}
              bootstrap4={true}
              bordered={false}
              pagination={total_records > 10 ? pagination : null}
              hover={true}
              defaultSorted={defaultSorted}
              noDataIndication={emptyDataMessage}
              remote={{ pagination: remotePagination, sort: remoteSorting }}
              onTableChange={onTableChange}
              wrapperClasses="table-responsive"
              rowEvents={options}
              classes={`custom-table ${props.classes}`}
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  )
}

export default RemoteAll
