/** 
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import PersonIcon from "@mui/icons-material/Person";

// Pages
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import SignOut from "pages/SignOut";
import Dashboard from "pages/Dashboard";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import VerifyPro from "assets/images/logos/logo.png";

const date = new Date().getFullYear();

const routeLoc = {
  HOME: "/",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  APPLICATION_FORM: "/ApplicationForm",
  DEMO: "/demo",
  BLOG: "/blog",
  PRICING: "/pricing",
  TEAM: "/team",
  DASHBOARD: "/dashboard",
  ABOUT_US: "/company/about-us",
  CONTACT_US: "/company/contact-us",
  SIGN_OUT: "/signout",
};

const routes = [
  {
    name: "Company",
    key: "company",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Company",
        collapse: [
          {
            name: "about us",
            key: "about-us",
            route: routeLoc.ABOUT_US,
            component: <AboutUs />,
          },
          {
            name: "contact us",
            key: "contact us",
            route: routeLoc.CONTACT_US,
            component: <ContactUs />,
          },
          {
            name: "Blog",
            key: "Blog",
            route: routeLoc.BLOG,
            component: <ContactUs />,
          },
        ],
      },
    ],
  },
  {
    name: "account",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "sign in",
        key: "signin",
        route: routeLoc.SIGN_IN,
        component: <SignIn />,
      },
      {
        name: "sign up",
        key: "signup",
        route: routeLoc.SIGN_UP,
        component: <SignUp />,
      },
      {
        name: "sign out",
        key: "signout",
        route: routeLoc.SIGN_OUT,
        component: <SignOut />,
      },
    ],
  },
  {
    name: "Records",
    key: "records",
    icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "LASRAB",
        key: "LASRAB",
        description: "Search through archives of Lagos State records conveniently ",
        href: routeLoc.RECORDS,
      },
      {
        name: "Enivronmental",
        key: "Enivronmental",
        description: "Search through visual maps of publically available environmental records",
        route: routeLoc.ENVIRONMENT,
      },
    ],
  },
  {
    name: "Your Dashboard",
    key: "dashboard",
    icon: <PersonIcon />,
    route: routeLoc.DASHBOARD,
    component: <Dashboard />,
  },
];

const footerRoutes = {
  brand: {
    // name: "VerifyPro",
    image: VerifyPro,
    route: "/",
    key: "brand",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/CreativeTim/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/creativetim",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/tomideadeoye",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { route: routeLoc.ABOUT_US, name: "About Us" },
        { route: routeLoc.DEMO, name: "Demo" },
        { route: routeLoc.DASHBOARD, name: "Dashboard" },
        { route: routeLoc.BLOG, name: "Blog" },
      ],
    },
    {
      name: "account",
      items: [
        { name: "Sign In", route: routeLoc.SIGN_IN },
        { name: "Sign Up", route: routeLoc.SIGN_UP },
        { name: "Sign Out", route: routeLoc.SIGN_OUT },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", route: routeLoc.HOME },
        { name: "knowledge center", route: routeLoc.HOME },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", route: routeLoc.HOME },
        { name: "privacy policy", route: routeLoc.HOME },
        { name: "licenses (EULA)", route: routeLoc.HOME },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Copyright &copy; {date} VerifyPro .
    </MKTypography>
  ),
};

export { routes, routeLoc, footerRoutes };
