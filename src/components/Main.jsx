import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestOpportunities from "./components/LatestOpportunities";
import Login from "./pages/Login";
function Main() {
  return (
    <div>
      <Navbar />
      <Login />
      <Hero />
      <LatestOpportunities />

      {/* <section class="hero">
        <h1>Get Your Dream Job</h1>
        <p>Apply to top companies directly from your college portal</p>
        <button>Explore Jobs</button>
      </section> */}

      {/* <section class="jobs">
        <h2>Latest Opportunities</h2>
        <div class="job-container">
          <div class="job-card">
            <h3>Frontend Developer</h3>
            <p>Company: Google</p>
            <p>Package: ₹12 LPA</p>
            <label for="apply-toggle" class="apply-btn">
              Apply
            </label>
          </div>

          <div class="job-card">
            <h3>Backend Developer</h3>
            <p>Company: Amazon</p>
            <p>Package: ₹15 LPA</p>
            <label for="apply-toggle" class="apply-btn">
              Apply
            </label>
          </div>
        </div>
      </section> */}

      <input type="checkbox" id="apply-toggle" />
      <div class="modal">
        <div class="modal-content">
          <h3>Apply for Job</h3>

          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
            <input type="file" />

            <button type="submit">Submit Application</button>
          </form>

          <label for="apply-toggle" class="close">
            Cancel
          </label>
        </div>
      </div>

      {/* <input type="checkbox" id="login-toggle"></input>
      <div class="login-modal">
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
      </div> */}

      <section class="dashboard">
        <h2>Your Dashboard</h2>
        <div class="stats">
          <div class="card">
            <h3>5</h3>
            <p>Applied Jobs</p>
          </div>
          <div class="card">
            <h3>2</h3>
            <p>Shortlisted</p>
          </div>
          <div class="card">
            <h3>1</h3>
            <p>Selected</p>
          </div>
        </div>
      </section>

      <div class="footer">
        <p>© 2026 Placement Portal | Built by You 🚀</p>
      </div>
    </div>
  );
}

export default Main;
