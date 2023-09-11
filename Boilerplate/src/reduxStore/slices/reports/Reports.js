import Papa from 'papaparse'
import moment from 'moment'
import { DataService } from 'config.axios'
import exportFromJSON from 'export-from-json'


export const reportsFile = (params) => async (dispatch) => {
    
    await DataService.get(
      `/report/${params.report_name}?study_id=${params.study_id}`,{ Accept: 'text/csv' }
    )
      .then((response) => {
        const parse_data = Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
        })
        const data =
          parse_data['data'].length > 0
            ? parse_data['data']
            : [
                Object.assign(
                  {},
                  ...parse_data['meta']['fields'].map((key) => ({ [key]: '' }))
                ),
              ]
        const fileName = `${params.file_name}_${moment().format(
          'DD_MMM_YYYY_HH_mm_ss'
        )}`
        exportFromJSON({ data, fileName, exportType: exportFromJSON.types.csv })
      })
      .catch((error) => {
        console.error('Error', error)
      })
  }