import { useState } from 'react'
import { useGlobalState } from '../State/Store'
import ActionButtons from './Common/ActionButtons'

import './Dialog.css'
import './ExportDialog.css'

const ExportDialog = () => {
  const state = useGlobalState()
  const isDialogVisible = state.getShowExportDialog()

  const closeDialog = () => state.setShowExportDialog(false)

  const actionDialog = () => {
    closeDialog()
  }

  if (!isDialogVisible) {
    return null
  }

  return (
    <div className="exportDialog">
      <div>
        <textarea
          cols="150"
          rows="40"
          style={{ fontSize: 11, marginTop: 8 }}
          // value={getExportCode()}
          // onChange={(e) => setCsvData(e.target.value)}
        ></textarea>
      </div>
      <ActionButtons close={closeDialog} action={actionDialog} />
    </div>
  )
}

export default ExportDialog
