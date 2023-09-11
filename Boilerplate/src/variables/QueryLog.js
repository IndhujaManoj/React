const query_log_table_columns = [
  {
    dataField: 'visit_ix',
    text: 'Log',
    sort: false,
    headerStyle: {
      minWidth: '150px',
    },
  },
  {
    dataField: 'id',
    text: 'Prediction ID#',
    sort: true,
    headerStyle: {
      minWidth: '150px',
    },
  },
  {
    dataField: 'country',
    text: 'Country',
    sort: true,
    headerStyle: {
      minWidth: '180px',
    },
  },
  {
    dataField: 'siteid',
    text: 'Site',
    sort: true,
    headerStyle: {
      minWidth: '100px',
    },
  },
  {
    dataField: 'subjectid',
    text: 'Subject ID',
    sort: true,
    headerStyle: {
      minWidth: '120px',
    },
  },
  {
    dataField: 'visit_nm',
    text: 'Visit',
    sort: true,
    headerStyle: {
      minWidth: '100px',
    },
  },
  {
    dataField: 'form_nm',
    text: 'Form',
    sort: true,
    headerStyle: {
      minWidth: '180px',
    },
  },
  {
    dataField: 'form_ix',
    text: 'Sequence#',
    sort: true,
    headerStyle: {
      minWidth: '140px',
    },
  },
  {
    dataField: 'discrepancy_presence',
    text: 'Discrepancy',
    sort: true,
    headerStyle: {
      minWidth: '160px',
    },
  },
  {
    dataField: 'sub_category',
    text: 'Subcategory',
    sort: true,
    headerStyle: {
      minWidth: '170px',
    },
  },
  {
    dataField: 'query_text',
    text: 'Query Text',
    sort: true,
    headerStyle: {
      minWidth: '220px',
    },
  },
  {
    dataField: 'question',
    text: 'Query Target Field',
    sort: true,
    headerStyle: {
      minWidth: '170px',
    },
  },
  {
    dataField: 'prediction_date',
    text: 'Prediction Date',
    sort: true,
    headerStyle: {
      minWidth: '160px',
    },
  },
  {
    dataField: 'fb_rev_uid',
    text: 'Reviewer',
    sort: true,
    headerStyle: {
      minWidth: '120px',
    },
  },
  {
    dataField: 'act_review_dts',
    text: 'Review Date',
    sort: true,
    headerStyle: {
      minWidth: '160px',
    },
  },
  {
    dataField: 'status',
    text: 'Write to EDC',
    sort: true,
    headerStyle: {
      minWidth: '160px',
    },
  },
]

export { query_log_table_columns }
