const editCheckColumns = [
  {
    dataField: 'name',
    text: 'DQ NAME',
    sort: true,
  },
  {
    dataField: 'description',
    text: 'DESCRIPTION',
    sort: true,
    headerClasses: 'custom-description',
    // headerStyle: {
    //   minWidth: '200px',
    //   width: '250px',
    //   maxWidth: '300px',
    // },
  },
  {
    dataField: 'primary_dataset',
    text: 'PRIMARY DATASET',
    sort: true,
  },
  {
    dataField: 'query_target',
    text: 'QUERY TARGET',
    sort: true,
  },
  {
    dataField: 'origin',
    text: 'ORIGIN',
    sort: true,
  },
  {
    dataField: 'version',
    text: 'VERSION',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'updated_at',
    text: 'ACTION DATE',
    sort: true,
    headerStyle: {
      minWidth: '200px',
      width: '200px',
      maxWidth: '250px',
    },
  },
]

const NewDraftRuleCols = [
  ...editCheckColumns,
  {
    dataField: 'action',
    text: '',
  },
]

const NewRuleCols = [...editCheckColumns]

const ForApprovalCols = [
  ...editCheckColumns,
  {
    dataField: 'test',
    text: '',
  },
  {
    dataField: 'action',
    text: '',
  },
]

const Active_Inactive_Cols = [
  ...editCheckColumns,
  {
    dataField: 'action',
    text: '',
  },
]

const AssignedInassignedCols = [
  ...editCheckColumns,
  {
    dataField: 'action',
    text: '',
  },
]

export {
  NewRuleCols,
  ForApprovalCols,
  Active_Inactive_Cols,
  AssignedInassignedCols,
  NewDraftRuleCols,
}
