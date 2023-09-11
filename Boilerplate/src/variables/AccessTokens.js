const AccessTokensTableColumns = [
  {
    dataField: 'name',
    text: 'NAME',
    sort: true,
    headerStyle: {
      width: '20%',
    },
  },
  {
    dataField: 'description',
    text: 'DESCRIPTION',
    sort: true,
  },
  {
    dataField: 'modules',
    text: 'MODULES',
    sort: true,
    headerStyle: {
      width: '30%',
    },
  },
  {
    dataField: 'expire_at',
    text: 'EXPIRE AT',
    sort: true,
    headerStyle: {
      width: '20%',
    },
  },
  {
    dataField: 'created_at',
    text: 'CREATED AT',
    sort: true,
    headerStyle: {
      width: '20%',
    },
  },
  {
    dataField: 'action',
    text: 'ACTION',
  },
]

export { AccessTokensTableColumns }
