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
      <div></div>
      <ActionButtons close={closeDialog} action={actionDialog} />
    </div>
  )
}

export default ExportDialog
