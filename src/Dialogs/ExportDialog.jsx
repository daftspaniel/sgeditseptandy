import { useState } from 'react'
import { useGlobalState } from '../State/StateStore'
import ActionButtons from './Common/ActionButtons'

import './Dialog.css'
import './ExportDialog.css'

import { generateASM } from '../Lib/GenerateASM'
import { generateBASIC } from '../Lib/GenerateBasic'
import { generateCSV } from '../Lib/GenerateCSV'

import { downloadTextFile } from './Helpers/ExportHelper'

const ExportDialog = () => {
  const state = useGlobalState()
  const isDialogVisible = state.getShowExportDialog()
  const screenMode = state.getActiveMode()
  const screenData = state.getScreenData()
  let [exportType, setExportType] = useState(1)
  const [filename, setFilename] = useState('myscreen.bas')

  const isCSVExportType = exportType == 2
  const closeDialog = () => state.setShowExportDialog(false)

  const actionDialog = () => {
    downloadTextFile({ filename: filename + '.bas', content: getExportCode() })
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

  const handleExportTypeChange = (e) => {
    let type = e.target.value
    let newFilename = filename
    setExportType(type)
    if (newFilename.indexOf('.') > -1) {
      newFilename = filename.substring(0, filename.indexOf('.'))
    }

    if (type == 0) setFilename(newFilename + '.asm')
    if (type == 1) setFilename(newFilename + '.bas')
    if (type == 2) setFilename(newFilename + '.csv')
  }

  const importHandler = (csvData) => state.importCSVData(csvData)

  if (!isDialogVisible) {
    return null
  }

  return (
    <div className="exportDialog">
      <div>
        <div className="exportTopBar">
          Export Type:{'  '}
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
          {isCSVExportType && (
            <button onClick={() => importHandler(csvData)}>Import</button>
          )}
          <div className="exportFilenameField">
            Export Filename:{' '}
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
        </div>
        <textarea
          className="editor"
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
