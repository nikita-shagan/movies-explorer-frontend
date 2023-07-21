import "./Input.css";

function Input({ label, type, name, error, value, onChange }) {
  return (
    <label className='input'>
      {label}
      <input
        type={type}
        name={name}
        className={`input__input ${error && 'input__input_state_error'}`}
        value={value}
        onChange={onChange}
      />
      <span className='input__error'>
        {error}
      </span>
    </label>
  )
}

export default Input;
