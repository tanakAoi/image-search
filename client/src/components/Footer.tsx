import config from "../../config";

export const Footer = () => {
  return (
    <footer className="footer">
        <p>© {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
    </footer>
  );
};
