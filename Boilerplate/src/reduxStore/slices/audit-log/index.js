import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import exportFromJSON from 'export-from-json'
import Papa from 'papaparse'
import moment from 'moment'

const initialState = {
  list: [],
}

const AuditLogSliceNew = createSlice({
  name: 'auditLogNew',
  initialState,
  reducers: {
    setList: (state, action) => {
      const { data } = action.payload
      state.list = data
    },
    clearList: (state) => {
      state.list = []
    }
  },
})

export const { setList, clearList } = AuditLogSliceNew.actions

export const getAuditLogList =
  ({ entity, entity_id, exportLog }) =>
  async (dispatch) => {
    try {
      let resCSV = exportLog ? { Accept: 'text/csv' } : {}
      const { data } = await DataService.get(
        `/audit-logs/?entity_changed=${entity}&entity_id=${entity_id}&page=1&per_page=100`,
        resCSV
      )
      if (exportLog) {
        const parse_data = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        })

        const logData =
          parse_data['data'].length > 0
            ? parse_data['data']
            : [
                Object.assign(
                  {},
                  ...parse_data['meta']['fields'].map((key) => ({ [key]: '' }))
                ),
              ]
        const fileName = `sdq_audit_log_${entity}_entity_id_${entity_id}_${moment().format(
          'DD-MM-YYYY-HH-mm-ss'
        )}`
        exportFromJSON({
          data: logData,
          fileName,
          exportType: exportFromJSON.types.csv,
        })
      } else {
        dispatch(setList(data))
      }
    } catch (error) {
      console.error('getAllAuditLog error', error)
    }
  }



export default AuditLogSliceNew.reducer
