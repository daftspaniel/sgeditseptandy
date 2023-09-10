import '../Dialog.css'

const ActionButtons = (props) => {
  return (
    <div>
      <button className="actionButton" onClick={props.close}>
        Cancel
      </button>
      <button className="actionButton" onClick={props.action}>
        OK
      </button>
    </div>
  )
}

export default ActionButtons
