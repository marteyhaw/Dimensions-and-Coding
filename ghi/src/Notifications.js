function Notification(props) {
  const type = `alert alert-${props.type || "danger"}`;
  return <div className={type}>{props.children}</div>;
}

export default Notification;
