import React, { useState } from "react";

function RegistrationView() {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(regUsername, regPassword);
    onLoggedIn(regUsername);
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default RegistrationView;
