import "./NotificationComponent.css";

export function NotificationItem({
  title,
  detail,
  readed,
  onClick = () => {},
}) {
  return (
    <span className="noti-item" onClick={onClick}>
      {!readed && <div className="marker" />}
      <p>
        <b>{title}: </b>
        {detail}
      </p>
    </span>
  );
}

export default function NotificationComponent({ isShow, children }) {
  return (
    <div
      className="dropdown-content"
      style={isShow ? { display: "block" } : null}
    >
      <div id="triangle-up" />
      <div className="dropdown-inside-content">{children}</div>
    </div>
  );
}
