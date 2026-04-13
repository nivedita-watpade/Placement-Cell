function Login() {
  return (
    <div>
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <label for="login-toggle" class="login-close">
          Close
        </label>
      </div>
    </div>
  );
}

export default Login;
