import config from "../../config";
import { Logo } from "../assets/Logo";
import LoginButton from "../components/LoginButton";

export const Login = () => {
  return (
    <div className="login">
      <div className="login__title">
        <Logo width={64} height={64} />
        <h1>{config.siteName}</h1>
        <p>Your personal image collection starts here.</p>
      </div>
      <LoginButton />
      <div className="login__demo">
        <h3>Login info for demo</h3>
        <p>You can use the information below to login as a test user.</p>
        <ul>
          <li>
            Username: <span>test@gmail.com</span>
          </li>
          <li>
            Password: <span>ThisIsTest!</span>
          </li>
        </ul>
      </div>
      <div className="login__warning">
        <p>
          <strong>Important:</strong> By logging in, you agree to share your
          login data with Auth0, a third-party authentication provider. Your
          data will be processed according to{" "}
          <a
            href="https://auth0.com/docs/secure/data-privacy-and-compliance"
            target="_blank"
          >
            their privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
