import { useState } from 'react'
import { useGlobalState } from '../State/Store'
import ActionButtons from './Common/ActionButtons'

import './Dialog.css'
import './ExportDialog.css'

import { generateASM } from '../Lib/GenerateASM'
import { generateBASIC } from '../Lib/GenerateBasic'
import { generateCSV } from '../Lib/GenerateCSV'

const ExportDialog = () => {
  const state = useGlobalState()
  const isDialogVisible = state.getShowExportDialog()
  const screenMode = state.getActiveMode()
  const screenData = state.getScreenData()

  let [exportType, setExportType] = useState(1)

  const closeDialog = () => state.setShowExportDialog(false)

  const actionDialog = () => {
    closeDialog()
  }

  let [csvData, setCsvData] = useState(
    generateCSV(screenData, screenMode.columns, screenMode.rows)
  )

  const sourceCSV = csvData
  const sourceBASIC = generateBASIC(
    screenData,
    screenMode.columns,
    screenMode.rows
  )
  const sourceASM = generateASM(screenData, screenMode.columns, screenMode.rows)

  const getExportCode = () => {
    if (exportType == 0) return sourceASM
    if (exportType == 1) return sourceBASIC
    if (exportType == 2) return sourceCSV
  }

  const handleExportTypeChange = (e) => setExportType(e.target.value)

  const downloadHandler = (options) => {
    const downloader = document.createElement('a')
    downloader.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(options.content)
    )
    downloader.setAttribute('download', options.filename)
    downloader.click()
    closeDialog()
  }

  const importHandler = (csvData) => state.importCSVData(csvData)

  if (!isDialogVisible) {
    return null
  }

  return (
    <div className="exportDialog">
      <div>
        <div>
          <select
            value={exportType}
            className="exportTypeSelect"
            onChange={handleExportTypeChange}
          >
            <option key={0} value={0}>
              Asm
            </option>
            <option key={1} value={1}>
              Basic
            </option>
            <option key={2} value={2}>
              CSV
            </option>
          </select>
          <button
            onClick={() => importHandler(csvData)}
            disabled={exportType != 2}
          >
            Import
          </button>
        </div>
        <textarea
          cols="150"
          rows="30"
          style={{ fontSize: 11, marginTop: 8 }}
          value={getExportCode()}
          onChange={(e) => setCsvData(e.target.value)}
        ></textarea>
      </div>
      <ActionButtons
        close={closeDialog}
        action={actionDialog}
        actionText={'Export'}
      />
    </div>
  )
}

export default ExportDialog
