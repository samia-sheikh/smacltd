import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { CiEdit } from "react-icons/ci";
import { Box, Tooltip, Typography } from "@mui/material";
import TextInput from "../../../globalComponents/global_inputs/TextInput";
// import useFetch from "../../../../features/hooks/useFetch";
import ButtonComp from "../../../globalComponents/ButtonComp";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { FaCheckCircle } from "react-icons/fa";
import ImageComp from "../../../globalComponents/ImageComp";
import { useImagePreview } from "../../../../features/hooks/useImagePreview";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EditSubscriptionPlan from "../Models/EditSubscriprionPlan";
import { useDispatch } from "react-redux";
import { setSubscritptionToEdit } from "../../../../features/slice/Payment/subscriptionPriceSlice";
const initialValues = {
  // Define your form initial values here
  name: "",
  monthlyPrice: "",
};
const SubscriptionCard = ({ plan }) => {
  const dispatch = useDispatch();
  // const { loading, postData } = useFetch();
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [imageError, setImageError] = useState("");
  const [additionalBenefits, setAdditionalBenefits] = useState([]);
  const iconRef = React.useRef(null);
  const categoryIconPreview = useImagePreview(categoryIcon);

  const itemBoxStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
    price: Yup.string().required("Category price is required"),
    description: Yup.string()
      .min(8, "Description must be at least 8 characters")
      .max(65, "Description can not be of more than 65 characters"),
    // plan_icon: Yup.mixed().test(
    //   "fileFormat",
    //   "Only WEBP and SVG files are allowed",
    //   (value) => {
    //     if (categoryPicPreview === null) {
    //       //console.log(value, "from upload post file valuve");
    //       !value || ["image/webp", "image/svg"].includes(value.type);
    //     } else {
    //       return true;
    //     }
    //   }
    // ),
  });
  function extractBenefits(obj) {
    const benefitsArray = [];

    for (const key in obj) {
      if (key.startsWith("benefit") || key.startsWith("benefits")) {
        benefitsArray.push(obj[key]);
      }
    }

    return benefitsArray;
  }
  const onSubmit = (values, { resetForm }) => {
    if (categoryIconPreview) {
      const benefits = extractBenefits(values);
      let payload = {
        name: values.name,
        price: values.price,
        icon: categoryIcon,
        benefits,
      };
      console.log(payload);
      setIsEditing(!isEditing);
    } else {
      setImageError("Pricing plan icon is required");
    }
    // Reset the form if needed
  };
  const addingBenefit = () => {
    setAdditionalBenefits([...additionalBenefits, ""]); // Add a new empty input field
  };
  const handleBenefitChange = (value, index) => {
    const updatedBenefits = [...additionalBenefits];
    updatedBenefits[index] = value;
    setAdditionalBenefits(updatedBenefits); // Update the specific benefit
  };
  const handleCategoryIconChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      // //console.log("post pic is selected");
      setCategoryIcon(selectedImage);
      setImageError("");
    }
  };
  const handleCategoryIconDelete = (e) => {
    if (categoryIconPreview) {
      // let newFilteredArray = [];
      // newFilteredArray = categoryIcon.filter((item) => item.name !== e.name);
      // setCategoryIcon(newFilteredArray);
      setCategoryIcon(null);
    }
  };
  const fieldBoxStyle = {
    width: "100%",
    background: "#F5F5F5",
    padding: "8px",
    border: "0.66px solid #BABABA",
    borderRadius: "8px",
    margin: "8px 0",
  };
  return (
    <Box
      sx={{
        border: " 0.66px solid #A9A9A9",
        background: " #FAF7F7",
        padding:
          "clamp(1.25rem, 0.435vw + 0.978rem, 1.5rem) clamp(1.25rem, 0.435vw + 0.978rem, 1.5rem) ",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "381px",
        position: "relative",
      }}
    >
      <EditSubscriptionPlan
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
      />
      <Tooltip title={"Edit"} arrow>
        <Box
          sx={{
            position: "absolute",
            top: -17.5,
            right: "20px",
            background: "white",
            width: "35px",
            height: "35px",
            border: "1px solid #D3D3D3",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setEditOpen(true);
            dispatch(setSubscritptionToEdit({ data: plan }));
          }}
        >
          <CiEdit />
        </Box>
      </Tooltip>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ImageComp
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "15px",
              objectFit: "contain",
            }}
            src={plan.icon}
          />
        </Box>
        <Box>
          <Typography variant="h5">Plan Name</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              {plan.name}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Plan Duration</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              {plan.plans[toggle].title}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Plan Price</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              PKR {plan.plans[toggle].price}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Product Limit</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              {plan.plans[toggle].productsLimit}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Courses Limit</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              {plan.plans[toggle].coursesLimit}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h5">Services Limit</Typography>
          <Box sx={fieldBoxStyle}>
            <Typography
              variant="paragraph"
              sx={{ textTransform: "capitalize" }}
            >
              {plan.plans[toggle].servicesLimit}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Plan Benefits</Typography>
          {plan.benefits?.map((b) => {
            return (
              <Box sx={fieldBoxStyle}>
                <Typography
                  variant="paragraph"
                  sx={{ textTransform: "capitalize" }}
                >
                  {b.title}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <ButtonComp
          label={toggle === 0 ? "Yearly" : "Monthly"}
          click={(prev) => {
            // console.log("clicked toggle");
            if (toggle === 0) {
              console.log("clicked toggle if");

              setToggle(1);
            } else {
              console.log("clicked toggle else");
              setToggle(0);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default SubscriptionCard;

{
  /* <Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={onSubmit}
// style={{ height: "100%" }}
>
{({ setFieldValue }) => (
  <Form
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    }}
  >
    <Box>
      <Typography variant="bold20">Upload Plan Icon</Typography>

      <Box
        sx={{
          mt: "12px",
          border: "1px dashed  #BABABA",
          borderRadius: "0.75rem",
          width: "161px",
          height: "72px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F5F5F5",
        }}
      >
        {categoryIconPreview && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ImageComp
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "15px",
                objectFit: "contain",
              }}
              src={categoryIconPreview}
            />

            <Box
              onClick={(e) => handleCategoryIconDelete(e)}
              sx={{
                background: "#EDEDED",
                color: "#FF5050",
                width: "92px",
                height: "28px",
                padding: "2px",

                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Remove
            </Box>
          </Box>
        )}
        {!categoryIconPreview && (
          <label
            htmlFor="postImg-upload"
            style={{
              width: "100%",
            }}
          >
            <input
              ref={iconRef}
              type="file"
              name="icon"
              accept="image/*"
              style={{ display: "none" }}
              id="postImg-upload"
              disabled={!isEditing}
              onChange={(e) => {
                handleCategoryIconChange(e);
                setFieldValue("categoryIcon", e.target.files[0]);
              }}
            />{" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CloudUploadOutlinedIcon
                sx={{
                  color: "#868686",
                  width: "18px",
                  height: "18px",
                }}
              />
              <Typography
                variant="uploadForm"
                component={"div"}
                sx={{ textAlign: "center", fontSize: "9px" }}
              >
                Add Your Image
              </Typography>
            </Box>
          </label>
        )}
      </Box>
      {imageError && (
        <Box
          sx={{
            mt: "12px",
            background: "#D94A4430",
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmberIcon
            sx={{
              color: "red",
              fontSize: "22px",
              padding: "0px 8px 0px 0px",
            }}
          />
          <Typography
            sx={{ color: "red", fontSize: "12px", padding: "0px" }}
          >
            {imageError}
          </Typography>
        </Box>
      )}
    </Box>
    <Box sx={itemBoxStyles}>
      <Typography variant="bold20">Plan Name</Typography>
      <Field
        component={TextInput}
        placeholder={plan.name}
        type="text"
        name="name"
        label="name"
        disabled={isEditing ? false : true}
      />
    </Box>
    <Box sx={itemBoxStyles}>
      <Typography variant="bold20">Plan Price</Typography>
      <Field
        component={TextInput}
        placeholder={plan.plans[0].price}
        type="number"
        name="price"
        label="price"
        disabled={isEditing ? false : true}
      />
    </Box>
    <Box sx={itemBoxStyles}>
      <Typography variant="bold20">Plan Benefits</Typography>
      <Box sx={{ ...itemBoxStyles, gap: "6px" }}>
        {plan.benefits.map((benefit, index) => {
          return (
            <Field
              component={TextInput}
              placeholder={benefit.title}
              type="text"
              name={`benefit_${index}`}
              label="name"
              disabled={isEditing ? false : true}
              key={index}
            />
          );
        })}{" "}
        {additionalBenefits.map((benefit, index) => (
          <Field
            component={TextInput}
            placeholder="Enter additional benefit"
            type="text"
            name={`benefits_${index}`}
            key={`additional_${index}`}
            value={benefit}
            onChange={(e) => handleBenefitChange(e.target.value, index)}
            disabled={!isEditing}
          />
        ))}
        {isEditing ? (
          <>
            <ButtonComp
              label={"Add Additional Benefit"}
              click={addingBenefit}
              customStyles={{
                background: "#F5F5F5",
                color: "#000",
                border: "0.66px solid #BABABA",
              }}
            />
            <ButtonComp label={"save"} type={"submit"} />
          </>
        ) : null}
      </Box>
    </Box>
  </Form>
)}
</Formik> */
}
