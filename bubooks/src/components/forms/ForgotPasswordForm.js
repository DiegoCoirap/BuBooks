import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    } else if (newPassword === '' || confirmPassword === '') {
      setError('The password cannot be empty.');
      return;
    }

    // Aquí puedes implementar la lógica para cambiar la contraseña,
    // como llamar a la API o realizar las actualizaciones necesarias en la base de datos.

    // Limpia los campos del formulario
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleFormSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
        />

        <label>Confirm New Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit">Change Password</button>
      {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
