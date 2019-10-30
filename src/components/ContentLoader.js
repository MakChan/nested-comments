import React from "react";
import ContentLoader from "react-content-loader";

export default ({ style, width }) => (
  <ContentLoader
    height={30}
    width={160}
    speed={2}
    style={{ display: "block", height: "60px", marginTop: "16px", ...style }}
    primaryColor="#f3f3f3"
    secondaryColor="#e3e1e1"
  >
    <rect x="0" y="0" rx="3" ry="3" width={width || 150} height="5" />
    <rect x="0" y="10" rx="3" ry="3" width={width || 150} height="5" />
    <rect x="0" y="20" rx="3" ry="3" width={width || 150} height="5" />
  </ContentLoader>
);
