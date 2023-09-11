const columns = [
    {
      dataField: 'id',
      hidden: true,
    },
    {
      dataField: 'fav_study',
      text: '',
      headerStyle: {
        minWidth: '70px',
      },
    },
    {
      dataField: 'study_id',
      text: 'Study ID',
      sort: true,
      headerStyle: {
        minWidth: '170px',
      },
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
      minWidth: '400px',
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      minWidth: '400px',
    },
]
export { columns }
