import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} ServiceBook. All rights reserved.
        </p>
        <p className="mt-2">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="hover:underline ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;
