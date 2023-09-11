const editCheckfunctionColumns = [
  {
    dataField: 'id',
    text: 'id',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'FUNCTION NAME',
    sort: true,
  },
  {
    dataField: 'description',
    text: 'DESCRIPTION',
    sort: true,
    headerStyle: {
      width: '40%',
    }
  },
  {
    dataField: 'origin',
    text: 'ORIGIN',
    sort: true,
  },
  {
    dataField: 'updated_at',
    text: 'ACTION DATE',
    sort: true,
  },
]

const NewFunctionCols = [
  ...editCheckfunctionColumns,
  {
    dataField: 'action',
    text: '',
  },
]

const ForApprovalfuncCols = [
  ...editCheckfunctionColumns,
  {
    dataField: 'test',
    text: '',
  },
  {
    dataField: 'action',
    text: '',
  },
]

export { NewFunctionCols, ForApprovalfuncCols }
