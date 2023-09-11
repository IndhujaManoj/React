const ScheduledJobsHistoryTableColumns = [
  {
    dataField: 'date_time',
    text: 'DATE & TIME',
    sort: false,
  },
  {
    dataField: 'ml_count',
    text: 'TOTAL ML',
    sort: false,
  },
  {
    dataField: 'rules_count',
    text: 'TOTAL DQ',
    sort: false,
  },
  {
    dataField: 'status',
    text: 'STATUS',
    sort: false,
  },
  {
    dataField: 'action',
    text: 'ACTION',
    sort: false,
  },
]

const ReviewRuleJobsTableColumns = [
  {
    dataField: 'name',
    text: 'DQ NAME',
    sort: true,
  },
  {
    dataField: 'status',
    text: 'STATUS',
    sort: true,
  },
  {
    dataField: 'started_at',
    text: 'STARTED AT',
    sort: true,
  },
  {
    dataField: 'ended_at',
    text: 'COMPLETED AT',
    sort: true,
  },
  {
    dataField: 'run_info',
    text: 'RUN INFO',
    sort: false,
  },
  {
    dataField: 'exception',
    text: 'EXCEPTION',
    sort: false,
  },
]

const ReviewMLJobsTableColumns = [
  {
    dataField: 'name',
    text: 'ML MODEL NAME',
    sort: true,
  },
  {
    dataField: 'status',
    text: 'STATUS',
    sort: true,
  },
  {
    dataField: 'started_at',
    text: 'STARTED AT',
    sort: true,
  },
  {
    dataField: 'ended_at',
    text: 'COMPLETED AT',
    sort: true,
  },
  {
    dataField: 'run_info',
    text: 'RUN INFO',
    sort: false,
  },
  {
    dataField: 'exception',
    text: 'EXCEPTION',
    sort: false,
  },
]

export { ScheduledJobsHistoryTableColumns, ReviewRuleJobsTableColumns, ReviewMLJobsTableColumns }
