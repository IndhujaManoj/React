const AuditLogTableColumns = [
  {
    dataField: 'event_time',
    text: 'Date and Time',
    sort: true,
  },
  {
    dataField: 'user_name',
    text: 'Performed By',
    sort: false,
  },
  {
    dataField: 'previous_values',
    text: 'Previous Value',
    sort: false,
  },
  {
    dataField: 'current_values',
    text: 'Current Value',
    sort: false,
  },
  {
    dataField: 'action',
    text: 'Action',
    sort: false,
  },
]

export { AuditLogTableColumns }
