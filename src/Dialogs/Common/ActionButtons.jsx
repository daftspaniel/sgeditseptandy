import '../Dialog.css'

const ActionButtons = (props) => {
  return (
    <div className="actionButtons">
      <button className="actionButton" onClick={props.close}>
        Cancel
      </button>
      <button
        className="actionButton"
        onClick={props.action}
        style={{ backgroundColor: 'green' }}
      >
        {props.actionText ? props.actionText : 'OK'}
      </button>
    </div>
  )
}

export default ActionButtons
