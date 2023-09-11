function reactSwitch(props) {
  return (
    <>
      <label className="custom-toggle custom-toggle-primary">
        <input type="checkbox" onChange={props.toggleEnableDQ} />
        <span
          className="custom-toggle-slider rounded-circle"
          data-label-off="OFF"
          data-label-on="ON"
        ></span>
      </label>
    </>
  )
}

export default reactSwitch
