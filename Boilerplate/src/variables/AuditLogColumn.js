const columns = [
    {
      dataField: 'event_time',
      text: 'Time',
      sort: true,
    },
    {
      dataField: 'entity_changed',
      text: 'What changed',
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Action',
      sort: true,
    },
    {
      dataField: 'performed_by',
      text: 'Performed by',
      sort: true,
    },
    {
      dataField: 'current_value',
      text: 'Current value',
      sort: false,
      formatter: (col, row) => {
        return (
          <span
            style={{
              display: 'block',
              width: 200,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {col}
          </span>
        )
      },
    },
    {
      dataField: 'previous_value',
      text: 'Previous value',
      sort: false,
      formatter: (col, row) => {
        return (
          <span
            style={{
              display: 'block',
              width: 200,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {col}
          </span>
        )
      },
    },
]

export { columns }