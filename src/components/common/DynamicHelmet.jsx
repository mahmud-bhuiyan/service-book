import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const DynamicHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};

DynamicHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default DynamicHelmet;
