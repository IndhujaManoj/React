import { appVariables } from 'variables/constants'
const helpIcon = appVariables.TodoList.PredictionHistory
const predictionHistoryListTableColumns = [
  {
    dataField: 'uniqueId',
    hidden: true,
  },
  {
    dataField: 'id',
    text: <div>Prediction ID {helpIcon.PredictionID}</div>,
    sort: true,
    headerStyle: {
      minWidth: '100px',
    },
  },
  {
    dataField: 'analysis',
    text: 'Prediction Analysis',
    headerStyle: {
      minWidth: '100px',
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
    dataField: 'visitnam',
    text: 'Visit',
    sort: true,
    headerStyle: {
      minWidth: '100px',
    },
  },
  {
    dataField: 'formname',
    text: 'Form',
    sort: true,
    headerStyle: {
      minWidth: '180px',
    },
  },
  {
    dataField: 'form_ix',
    text: <div>Sequence# {helpIcon.Sequence}</div>,
    sort: true,
    headerStyle: {
      minWidth: '140px',
    },
  },

  {
    dataField: 'itemset_ix',
    text: 'Itemset index',
    sort: true,
    headerStyle: {
      minWidth: '140px',
    },
  },
  {
    dataField: 'discrepancy_presence',
    text: <div>Discrepancy {helpIcon.Discrepancy}</div>,
    headerStyle: {
      minWidth: '90px',
    },
  },
  {
    dataField: 'sub_category',
    text: <div>Subcategory/DQ Name {helpIcon.Subcategory}</div>,
    sort: true,
    headerStyle: {
      minWidth: '170px',
    },
  },
  {
    dataField: 'query_text',
    text: <div>Query Text {helpIcon.QueryText}</div>,
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
      minWidth: '220px',
    },
  },
  {
    dataField: 'review_status',
    text: 'Review Status',
    sort: true,
    headerStyle: {
      minWidth: '150px',
    },
  },
  {
    dataField: 'review_date',
    text: 'Review Date',
    sort: true,
    headerStyle: {
      minWidth: '200px',
    },
  },
  {
    dataField: 'review_user',
    text: 'Reviewer',
    sort: true,
    headerStyle: {
      minWidth: '120px',
    },
  },
  {
    dataField: 'confidence_score',
    text: <div>Confidence Score {helpIcon.ConfidenceScore}</div>,
    sort: true,
    headerStyle: {
      minWidth: '200px',
    },
  },
  {
    dataField: 'prediction_date',
    text: 'Prediction Date',
    sort: true,
    headerStyle: {
      minWidth: '200px',
    },
  },
  {
    dataField: 'aging',
    text: 'Aging',
    sort: true,
    headerStyle: {
      minWidth: '100px',
    },
  },
  {
    dataField: 'question_text',
    text: 'Item Label',
    sort: true,
    headerStyle: {
      minWidth: '200px',
    },
  },
]

export { predictionHistoryListTableColumns }
