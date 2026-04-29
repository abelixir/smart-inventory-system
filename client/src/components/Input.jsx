const Input = ({ label, type = "text", value, onChange, placeholder, required }) => (
  <div className="form-group">
    {label && <label>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default Input;