import img1 from "../assets/cardImage.png";
import { MessagingIcon } from "./globalComponents/constants";
import { FaUserGraduate, FaWrench } from "react-icons/fa6";
import { HiBuildingStorefront } from "react-icons/hi2";
// import { FaUsers } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";

export const navlinks = [
  {
    id: "1",
    linkName: "Feed",
    linkIcon: <TbHomeFilled size={"1.5em"} />,
    url: "/feed",
  },
  // {
  //   id: "2",
  //   linkName: "Market",

  //   linkIcon: <HiBuildingStorefront size={"1.25em"} />,
  //   url: "/market",
  // },
  // {
  //   id: "3",
  //   linkName: "Courses",
  //   linkIcon: <FaUserGraduate size={"1.25em"} />,
  //   url: "/courses",
  // },
  // {
  //   id: "4",
  //   linkName: "Services",
  //   linkIcon: <FaUserGraduate size={"1.25em"} />,
  //   url: "/services",
  // },

  // temporary page for chat coming soon

  {
    id: "5",
    linkName: "Chat",
    linkIcon: <MessagingIcon size={"1.25em"} />,
    url: "/messaging",
  },
];
export const megaMenus = [
  {
    id: "1",
    linkName: "Market",

    linkIcon: <HiBuildingStorefront size={"1.25em"} />,
    url: "/market",
  },
  {
    id: "2",
    linkName: "Courses",
    linkIcon: <FaUserGraduate size={"1.25em"} />,
    url: "/courses",
  },
  {
    id: "2",
    linkName: "Services",
    linkIcon: <FaWrench  size={"1.25em"} />,
    url: "/services",
  },
  {
    id: "3",
    linkName: "Chat",
    linkIcon: <MessagingIcon size={"1.25em"} />,
    url: "/messaging",
  },
  // {
  //   id: "3",
  //   linkName: "Services",
  //   linkIcon: <FaUserGraduate size={"1.25em"} />,
  //   url: "/services",
  // },
];

export const discover = [
  {
    id: "1",
    cardImage: "assets/photos/onlineLearningLady.png",
    cardTitle: "Learning",
    cardDescription: `Welcome to the varied course offerings of our school, where each subject is intended to empower and inspire. Our extensive curriculum of courses offers students with the knowledge and abilities necessary to succeed and innovate, whether they are pursuing new interests or enhancing prior passions. Join us in a journey of discovery and growth, and unlock your full potential with us.`,
  },
  {
    id: "2",
    cardImage: "assets/photos/marketMan.png",
    cardTitle: "Market",
    cardDescription: `Our marketplace is a digital hub offering a wide range of online courses, from Quranic studies to skill-based learning. Whether you're looking to expand your knowledge or gain new skills, our secure and user-friendly platform has the courses you need. Join our community where education and learning opportunities come together seamlessly.`,
  },
];
export const CardData = [
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Mobiles",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Laptops",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Camera",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Games",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Property",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
  {
    img: img1,
    Name: "MacBook Air M1, 2020",
    category: "Cars",
    Price: "$ 300",
    Description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    Date: " 12 Jan, 2023",
  },
];
export const coursesData = [
  {
    id: 1,
    courseName: "Web",
    cardImage: "assets/svgs/course.svg",
    catagory: {
      parentCatagory: "IT Domain",
      subCatagory: ["web", "front-end", "back-end", "javascript", "react"],
    },
  },
  {
    id: 2,
    courseName: "Mobile",
    cardImage: "assets/svgs/course.svg",
    catagory: {
      parentCatagory: "Medical",
      subCatagory: ["web", "front-end", "back-end", "javascript", "react"],
    },
  },
  {
    id: 3,
    courseName: "Telemarketing",
    cardImage: "assets/svgs/course.svg",
    catagory: {
      parentCatagory: "Clothing",
      subCatagory: ["web", "front-end", "back-end", "javascript", "react"],
    },
  },
  {
    id: 4,
    courseName: "AI",
    cardImage: "assets/svgs/course.svg",
    catagory: {
      parentCatagory: "Food",
      subCatagory: ["web", "front-end", "back-end", "javascript", "react"],
    },
  },
  {
    id: 5,
    courseName: "Marketing",
    cardImage: "assets/svgs/course.svg",
    catagory: {
      parentCatagory: "Teaching",
      subCatagory: ["web", "front-end", "back-end", "javascript", "react"],
    },
  },
];
export const top100Films = [
  { title: "Infinix" },
  { title: "Vivo" },
  { title: "Samsung" },
  { title: "Oppo" },
  { title: "Iphone" },
  { title: "Workstations" },
  { title: "Gaming Laptops" },
  { title: "Playstation" },
  { title: "Console" },
  { title: "Shop" },
  { title: "Plots" },
  { title: "Home" },
  { title: "Flates" },
  { title: "Model" },
  { title: "Years" },
];
export const intrests = [
  "Infinix",
  "Vivo",
  "Samsung",
  "Oppo",
  "Iphone",
  "Workstations",
  "Gaming Laptops",
  "Playstation",
  "Console",
  "Shop",
  "Plots",
  "Home",
  "Flates",
  "Model",
  "Years",
];
export const dayNames = [
  { title: "Monday" },
  { title: "Tuesday" },
  { title: "Wednesday" },
  { title: "Thursday" },
  { title: "Friday" },
  { title: "Saturday" },
  { title: "Sunday" },
];
export const productCategories = [
  "Electronics",
  "Mobile Phones",
  "Computers",
  "Laptops",
  "Fashion",
  "Footwear",
  "Sports",
  "Home & Kitchen",
  "Appliances",
  "Coffee",
];
export const courseCategories = [
  "Web Development",
  "Telemarketing",
  "Marketing",
  "AI",
  "Data Science",
  "Mobile Development",
  "UI/UX",
  "Graphic Design",
  "Video Editing",
  "Photography",
];
export const courses = [
  {
    id: 1,
    category: {
      parentCategory: "Marketing",
      subCategories: [
        "Digital Marketing",
        "Content Marketing",
        "SEO",
        "Social Media Marketing",
      ],
    },
  },
  {
    id: 2,
    category: {
      parentCategory: "Telemarketing",
      subCategories: [
        "Cold Calling",
        "Lead Generation",
        "Customer Service",
        "Sales Techniques",
      ],
    },
  },
  {
    id: 3,
    category: {
      parentCategory: "UI/UX",
      subCategories: [
        "User Interface Design",
        "User Experience Design",
        "Prototyping",
        "Usability Testing",
      ],
    },
  },
  {
    id: 4,
    category: {
      parentCategory: "Video Editing",
      subCategories: [
        "Adobe Premiere Pro",
        "Final Cut Pro",
        "After Effects",
        "DaVinci Resolve",
      ],
    },
  },
  {
    id: 5,
    category: {
      parentCategory: "Arts",
      subCategories: ["Painting", "Drawing", "Sculpture", "Art History"],
    },
  },
  {
    id: 6,
    category: {
      parentCategory: "Technology",
      subCategories: [
        "Web Development",
        "Mobile Development",
        "React",
        "MERN Stack",
        "Data Science",
        "Machine Learning",
        "AI",
        "Python",
      ],
    },
  },
  {
    id: 8,
    category: {
      parentCategory: "Business",
      subCategories: ["Marketing", "Finance", "Leadership", "Entrepreneurship"],
    },
  },
  {
    id: 9,
    category: {
      parentCategory: "Health",
      subCategories: ["Nutrition", "Fitness", "Mental Health", "Yoga"],
    },
  },
  {
    id: 10,
    category: {
      parentCategory: "Language",
      subCategories: ["English", "Spanish", "French", "German"],
    },
  },
  {
    id: 11,
    category: {
      parentCategory: "Science",
      subCategories: ["Physics", "Chemistry", "Biology", "Earth Science"],
    },
  },
  {
    id: 12,
    category: {
      parentCategory: "Mathematics",
      subCategories: ["Algebra", "Calculus", "Statistics", "Geometry"],
    },
  },
  {
    id: 13,
    category: {
      parentCategory: "Social Sciences",
      subCategories: [
        "Psychology",
        "Sociology",
        "Political Science",
        "Anthropology",
      ],
    },
  },
  {
    id: 14,
    category: {
      parentCategory: "Education",
      subCategories: [
        "Teaching",
        "Curriculum Development",
        "Educational Psychology",
        "Online Education",
      ],
    },
  },
  {
    id: 15,
    category: {
      parentCategory: "Music",
      subCategories: [
        "Music Theory",
        "Instrumental",
        "Vocal",
        "Music Production",
      ],
    },
  },
];
export const market = [
  {
    id: 1,
    category: {
      parentCategory: "Electronics",
      subCategories: ["Mobile Phones", "Laptops", "Cameras", "Headphones"],
    },
  },
  {
    id: 2,
    category: {
      parentCategory: "Home Appliances",
      subCategories: [
        "Refrigerators",
        "Washing Machines",
        "Microwaves",
        "Air Conditioners",
      ],
    },
  },
  {
    id: 3,
    category: {
      parentCategory: "Fashion",
      subCategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
      ],
    },
  },
  {
    id: 4,
    category: {
      parentCategory: "Beauty & Personal Care",
      subCategories: ["Skincare", "Haircare", "Makeup", "Fragrances"],
    },
  },
  {
    id: 5,
    category: {
      parentCategory: "Sports & Outdoors",
      subCategories: [
        "Fitness Equipment",
        "Outdoor Gear",
        "Cycling",
        "Camping & Hiking",
      ],
    },
  },
  {
    id: 6,
    category: {
      parentCategory: "Toys & Games",
      subCategories: [
        "Action Figures",
        "Board Games",
        "Educational Toys",
        "Puzzles",
      ],
    },
  },
  {
    id: 7,
    category: {
      parentCategory: "Books",
      subCategories: ["Fiction", "Non-Fiction", "Children's Books", "Comics"],
    },
  },
  {
    id: 8,
    category: {
      parentCategory: "Automotive",
      subCategories: [
        "Car Accessories",
        "Motorcycle Accessories",
        "Car Electronics",
        "Tools & Equipment",
      ],
    },
  },
  {
    id: 9,
    category: {
      parentCategory: "Home & Kitchen",
      subCategories: ["Furniture", "Bedding", "Kitchenware", "Home Decor"],
    },
  },
  {
    id: 10,
    category: {
      parentCategory: "Grocery & Gourmet Food",
      subCategories: ["Snacks", "Beverages", "Organic Food", "Pantry Staples"],
    },
  },
];
