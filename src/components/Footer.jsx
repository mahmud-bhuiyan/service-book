import { Link } from "react-router-dom";
import { Layout } from "antd";
import { APP_NAME, FOOTER_LINKS } from "../constants/appConstants";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p className="mt-2">
          {FOOTER_LINKS?.map((link, index) => (
            <span key={link.path}>
              {index > 0 && " | "}
              <Link to={link.path} className="hover:underline">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;
