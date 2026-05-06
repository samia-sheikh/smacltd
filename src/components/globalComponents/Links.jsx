import { Link, Typography } from "@mui/material";
import React from "react";
const Links = ({ outer, href, label, children, style }) => {
  // const routerLinkStyles = {};
  return (
    <React.Fragment>
      {outer ? (
        <a href={href} style={{ color: "black" }}>
          {label}
        </a>
      ) : (
        <Link href={href}>
          <Typography
            variant="links"
            sx={{
              display: "flex",
              "@media(max-width:768px)": {
                fontSize: "12px",
              },
            }}
          >
            {label}
          </Typography>
          {children}
        </Link>
      )}
    </React.Fragment>
  );
};

export default Links;
