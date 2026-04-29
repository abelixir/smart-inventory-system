const Button = ({ children, onClick, variant = "primary", type = "button", disabled = false }) => (
  <button 
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant}`}
  >
    {children}
  </button>
);

export default Button;