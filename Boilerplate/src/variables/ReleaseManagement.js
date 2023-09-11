const StudyForReleaseCols = [
  {
    dataField: 'study_id',
    text: 'STUDY ID',
    sort: true,
  },
  {
    dataField: 'rule_count',
    text: 'NUMBER OF DQs',
    sort: false,
    headerClasses: 'custom-description',
    headerStyle: {
      minWidth: '200px',
      width: '300px',
      maxWidth: '400px',
    },
  },
  {
    dataField: 'action',
    text: 'ACTION',
    sort: false,
  },
]

const ReleaseHistoryCols = [
  {
    dataField: 'study_id',
    text: 'STUDY ID',
    sort: true,
  },
  {
    dataField: 'version',
    text: 'RELEASE VERSION',
    sort: true,
  },

  {
    dataField: 'rule_count',
    text: 'NUMBER OF DQs',
    sort: true,
    headerClasses: 'custom-description',
  },
  {
    dataField: 'released_at',
    text: 'Updated at',
    sort: true,
  },
  {
    dataField: 'description',
    text: 'COMMENT',
    sort: true,
  },

  {
    dataField: 'action',
    text: 'ACTION',
    sort: false,
  },
]

const ReleaseHistoryReviewCols = [
  {
    dataField: 'ec_name',
    text: 'DQ Name',
    sort: true,
  },
  {
    dataField: 'ec_description',
    text: 'DESCRIPTION',
    sort: true,
  },

  {
    dataField: 'creator_name',
    text: 'LAST UPDATED BY',
    sort: true,
  },
  {
    dataField: 'last_modified_at',
    text: 'UPDATED AT',
    sort: true,
  },
]

export { StudyForReleaseCols, ReleaseHistoryCols, ReleaseHistoryReviewCols }
