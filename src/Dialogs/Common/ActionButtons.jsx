import '../Dialog.css'

const ActionButtons = (props) => {
  return (
    <div>
      <button className="actionButton" onClick={props.close}>
        Cancel
      </button>
      <button className="actionButton" onClick={props.action}>
        {props.actionText ? props.actionText : 'OK'}
      </button>
    </div>
  )
}

export default ActionButtons
