import "./styles.css";

export const DefaultComponents = (props) => {
  return (
    <div className="container">
      <div className="container-login">
        <div className="login">{props.children}</div>
      </div>
    </div>
  );
};
