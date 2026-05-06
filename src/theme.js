import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1000,
      lg: 1366,
      xl: 1920,
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          gap: "16px",
          fontSize: "16px",
          transition: "background-color 0.3s ease, transform 0.3s ease", // Add transition here
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // Add your global styles for InputBase components here
          backgroundColor: "#FFFF", // Set background color
          borderRadius: "22px", // Set border radius
          // padding: "6px 12px", // Set padding updated
          padding: "10px 15px", // Set padding

          border: "1px solid #F1F1F1",
          fontFamily: "Open Sans",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          "&.Mui-focused": {
            // borderColor: "blue", // Set the border color when focused
            borderColor: "#14A898", // Set the border color when focused
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          // Add your global styles for InputBase components here
          height: "51px",
          backgroundColor: "#FFFF", // Set background color
          padding: "14px 20px", // Set padding
          // border: "1px solid #F1F1F1",
          fontFamily: "Open Sans",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          "&.Mui-focused": {
            // borderColor: "blue", // Set the border color when focused
            borderColor: "#14A898", // Set the border color when focused
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 600,
          lineHeight: "1.25rem",
          textAlign: "left",
          textDecoration: "none", // Remove underline
          cursor: "pointer",
          color: "#6F6F6F",
          padding: "0px 0px",
          borderRadius: "0.5rem",
          height: "100%",
          flex: "1",
          "&.Mui-selected": {
            padding: "0px 10px",
            // borderColor: "blue", // Set the border color when focused
            fontWeight: 700,
            background: "#14A898",
            color: "#FFFFFF",
            borderRadius: "0.5rem",
            border: "none",
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none", // Remove underline
          color: "#14A898", // Set link color
          position: "relative", // Required for absolute positioning of the underline
          cursor: "pointer",
          "&:before": {
            content: "''",
            position: "absolute",
            width: "100%", // Extend the underline across the link width
            borderBottom: "1.5px solid #14A898", // Customize the underline style
            bottom: -1, // Adjust the distance between text and underline
          },
        },
      },
    },
    // masonary style
    MuiMasonry: {
      root: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)", // Set the initial number of columns
        gap: "16px", // Adjust the gap as needed
        padding: "16px", // Add padding as needed

        "@media (min-width: 600px)": {
          gridTemplateColumns: "repeat(5, 1fr)", // Adjust for screens wider than 600px
        },

        "@media (min-width: 960px)": {
          gridTemplateColumns: "repeat(4, 1fr)", // Adjust for screens wider than 960px
        },
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#F9F9F9",
      hover: "#E9E9E9",
      // Set the background color for the body
    },
    primary: {
      main: "#14A898",
    },
    secondary: {
      main: "#FFFF",
    },
    blackColor: {
      main: "#333333",
    },
    hearts: {
      blue: "#0EA6E9",
      pink: "#FF53BA",
      red: "#FF0000",
      yellow: "#FFCA41",
      black: "#000000",
    },
    grey: {
      main: "#868686",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#FF335C",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",

    h1: {
      // fontSize: "clamp(1.75rem, 1.709vw + 0.949rem, 3rem)",
      fontSize: "clamp(3rem, 5.217vw - 0.261rem, 6rem)",
      fontWeight: 500,
      fontStyle: "normal",
      fontFamily: "Bebas Neue",
      "@media(max-width:750px)": {
        // fontWeight: 800,
      },
    },
    h2: {
      fontSize: "clamp(1.5rem, 1.026vw + 1.019rem, 2.25rem)",
      fontWeight: 700,
      fontStyle: "normal",
      lineHeight: "normal",
    },
    h3: {
      textTransform: "none",
      fontSize: "clamp(1.375rem, 0.855vw + 0.974rem, 2rem)",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "normal",
    },
    h4: {
      fontSize: "clamp(1.25rem, 0.684vw + 0.929rem, 1.75rem)",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
    },
    h5: {
      fontSize: "clamp(1.125rem, 0.171vw + 1.045rem, 1.25rem)",
      fontStyle: "normal",
      fontWeight: 600,
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
      color: "black",
    },
    priceTypo: {
      fontSize: "64px",
      fontWeight: 700,
      fontStyle: "normal",
      color: "#303030",
      "@media (max-width:600px)": {
        fontSize: "40px",
      },
    },
    quranBanner: {
      fontSize: "48px",
      fontStyle: "italic",
      textTransform: "capitalize",
      // textAlign: "center",
      color: "white",
      fontWeight: "700",
      "@media(max-width:589px)": {
        fontSize: "24px",
        // height:"fit-content"
      },
    },

    productTitle: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "43px",
      color: "#000000",
      "@media (max-width:600px)": {
        fontSize: "24px",
        lineHeight: "32px",
      },
    },
    userDashboardHeading: {
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "43px",
      color: "#000000",
      "@media (max-width:600px)": {
        fontSize: "24px",
        lineHeight: "32px",
      },
    },
    topCategoriesHeading: {
      textAlign: "center",
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "43px",
      color: "#333333",

      "@media (max-width:600px)": {
        fontSize: "24px",
        lineHeight: "32px",
      },
    },
    topCategoriesContent: {
      textAlign: "center",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "21px",
      color: "#868686",
    },
    footerTitle: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: "2rem",
      color: "#ffffff",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
        lineHeight: "1.5rempx",
      },
    },

    paragraph: {
      fontSize: "clamp(1rem, 0.171vw + 0.92rem, 1.125rem)",
      fontWeight: 400,
      fontStyle: "normal",
      color: "#4e4d4d",
      lineHeight: "normal",
    },
    blogparagraph:{
      fontSize: "clamp(1rem, 0.171vw + 0.92rem, 1.125rem)",
      fontWeight: 400,
      fontStyle: "normal",
      color: "#9B9B9B",
      lineHeight: "normal",
    },
    subparagraph:{
      fontSize: "clamp(0.875rem, 0.171vw + 0.795rem, 1rem)",
      fontWeight: 400,
      color: "#4e4d4d",
      fontStyle: "normal",
      lineHeight: "normal",
    },
    postCardTypo: {
      fontSize: "24px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "normal",
      color: "#FFFFFF",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    black24: {
      fontSize: "24px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "normal",
      color: "#333",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    sub24: {
      fontSize: "24px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    bannerTitle: {
      fontSize: "clamp(2rem, 1.067vw + 1.72rem, 3rem)",
      fontWeight: 700,

      textTransform: "capitalize",
      // textAlign: "center",
      color: "#14B8A6",
    },
    bold24Black: {
      color: "#333",
      fontSize: "24px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "43.2px",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    footerLinkTitle: {
      color: "white",
      fontSize: "24px",
      fontWeight: 700,
      fontStyle: "normal",
      // lineHeight: "43.2px",
      letterSpacing: "2px",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },

    button20: {
      textTransform: "none",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "36px",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    uploadForm: {
      color: "#868686",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "180%",
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    },
    footerText: {
      color: "#FFFFFF",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,

      // lineHeight: "180%",
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    },
    uploadFormDark: {
      color: "#333333",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "180%",
    },
    bold20: {
      color: "#333333",
      fontSize: "clamp(1rem, 0.447vw + 0.713rem, 1.25rem)", //font 20px
      fontStyle: "normal",
      fontWeight: 600,
    },
    footerLinks: {
      color: "white",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      // fontFamily: "roboto",
      letterSpacing: "2px",
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
      "&:hover": { cursor: "pointer" },
    },

    black18: {
      color: "#333",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      "@media (max-width:600px)": {
        fontSize: ".25rem",
      },
    },
    postUserTypo: {
      color: "#333333",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
        // lineHeight: "1px",
      },
    },
    h4Black: {
      color: "#868686",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      "@media (max-width:600px)": {
        fontSize: "16px",
      },
    },

    uploadPictureBold: {
      color: "#14A898",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "25.8px",
      "@media (max-width:600px)": {
        lineHeight: "15.8px",
        fontSize: "14px",
      },
    },
    storiesTitle: {
      color: " #868686",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: " normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    editPicButton: {
      color: " #fff",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: " normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    postSubHeader: {
      color: "#CACACA",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: " normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },

    subHeaderBlack: {
      color: "#313131",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: " normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    subHeader: {
      color: "#868686",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: " normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },

    h5ButtonTypo: {
      color: "#4B4B4B",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    h5BlackBold: {
      fontSize: "16px",
      color: "#333",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "36px",
      "@media (max-width:600px)": {
        fontSize: "14px",
        lineHeight: "24px",
      },
    },
    h5Black: {
      fontSize: "16px",
      color: "#333",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "36px",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    h6Grey: {
      color: "#868686",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
    addStoryTypo: {
      color: "#868686",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",

      "@media (max-width:600px)": {
        fontSize: ".85rem",
      },
    },
    links: {
      color: "#14A898",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      "@media (max-width:600px)": {
        fontSize: ".45rem",
      },
    },
    aboutTerms: {
      color: "#868686",
      // fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "36px",
      "@media (max-width:600px)": {
        fontSize: ".45rem",
      },
    },
    aboutTermsHeading: {
      color: "#333333",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "36px",
      "@media (max-width:600px)": {
        fontSize: ".45rem",
      },
    },
    cardDates: {
      color: "#868686",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      "@media (max-width:600px)": {
        fontSize: ".70rem",
      },
    },
    tabs: {
      color: "#868686",
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",

      "&:focus": {
        background: "#14A898",
        display: "flex",
        padding: "10px 12px",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        borderRadius: "30px",
        fontSize: "16px",
      },
    },
  },
  spacing: [0, 2, 5, 6.38, 8, 10, 12, 14, 15, 16, 18, 20, 24, 40, 100],
  borders: {
    primaryBorder: "1px solid #14A898",
    secondaryBorder: "1px solid #F1F1F1",
  },
});

export default theme;
