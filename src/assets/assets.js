import logo from "./logo.png";
import search_icon from "./search.png";
import user_profile from "./user.png";
import car_image1 from "./car1.jpg";
import car_image2 from "./car2.jpg";
import car_image3 from "./car3.jpg";
import car_image4 from "./car4.jpg";
import dashboardIcon from "./dashboard.png";
import dashboardIconColored from "./dashboard-colored.png";
import addIcon from "./add.png";
import addIconColored from "./add-colored.png";
import carIcon from "./car.png";
import carIconColored from "./car-colored.png";
import listIcon from "./list.png";
import listIconColored from "./list-colored.png";
import closeIcon from "./close-icon.png";
import menuIcon from "./menu-icon.png";
import mainCar from "./main-car.png";
import arrowIcon from "./arrow.png";
import bannerCarImage from "./banner-car.png";
import facebookLogo from "./facebook.png";
import instagramLogo from "./instagram.png";
import twitterLogo from "./twitter.png";
import gmailLogo from "./gmail.png";
import arrowBack from "./arrow-back.png";
import fuel_icon from "./fuel.png";
import location_icon from "./location.png";
import check_icon from "./checked.png";
import car_icon from "./car-icon.png";
import filter_icon from "./filter.png";
import calendar_icon_colored from "./calendar.png";
import location_icon_colored from "./location-colored.png";
import edit_icon from "./edit.png";
import cautionIconColored from './warning.png';
import upload_icon from "./upload.png";
import tick_icon from "./tick.png";
import eye_icon from "./view.png";
import delete_icon from "./delete.png";
import eye_close_icon from "./eye_close.png";


export const cityList = ["New York", "Los Angeles", "Houston", "Chicago"];

export const assets = {
  logo,
  search_icon,
  user_profile,
  dashboardIcon,
  dashboardIconColored,
  addIcon,
  addIconColored,
  carIcon,
  carIconColored,
  listIcon,
  listIconColored,
  closeIcon,
  menuIcon,
  mainCar,
  arrowIcon,
  car_image1,
  car_image2,
  car_image3,
  car_image4,
  bannerCarImage,
  facebookLogo,
  instagramLogo,
  twitterLogo,
  gmailLogo,
  arrowBack,
  fuel_icon,
  location_icon,
  check_icon,
  car_icon,
  filter_icon,
  calendar_icon_colored,
  location_icon_colored,
  edit_icon,
  cautionIconColored,
  upload_icon,
  tick_icon,
  delete_icon,
  eye_close_icon,
  eye_icon,
};

export const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars" },
  { name: "My Bookings", path: "/my-booking" },
];

export const ownerMenuLinks = [
  { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
  { name: "Add car", path: "/owner/add-car", icon: addIcon, coloredIcon: addIconColored },
  { name: "Manage cars", path: "/owner/manage-cars", icon: carIcon, coloredIcon: carIconColored },
  { name: "Manage bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
];

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb57095",
  "name": "vijeta",
  "email": "admin@example.com",
  "role": "owner",
  "image":user_profile,
};

export const dummyCarData = [
  {
    _id: "67ff5bc069c03d4e45f30b77",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "BMW",
    model: "X5",
    image:car_image1,
    year: "2006",
    category: "SUV",
    seating_capacity: 4,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    pricePerDay: "209",
    location: "Houston",
    description: "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first Sedan ever produced by Toyota.",
    isAvailable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "67ff6b758f1b3684286a2a65",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Toyota",
    model: "Corolla",
    image:car_image2,
    year: "2021",
    category: "Sedan",
    seating_capacity: 4,
    fuel_type: "Diesel",
    transmission: "Manual",
    pricePerDay: "130",
    location: "Chicago",
    description: "The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvailable: true,
    createdAt: "2025-04-16T08:33:57.993Z",
  },
  {
    _id: "67ff7c4e1f3a0d74296a3c88",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Tesla",
    model: "Model S",
    image:car_image3,
    year: "2022",
    category: "Electric",
    seating_capacity: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: "300",
    location: "New York",
    description: "A premium all-electric sedan offering impressive acceleration and modern features.",
    isAvailable: true,
    createdAt: "2025-04-15T11:45:21.000Z",
  },
  {
    _id: "67ff8d9a2f4a6f12380a1b99",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Mustang",
    image:car_image4,
    year: "2019",
    category: "Coupe",
    seating_capacity: 4,
    fuel_type: "Petrol",
    transmission: "Manual",
    pricePerDay: "250",
    location: "Los Angeles",
    description: "The Mustang is an American classic muscle car with powerful performance and iconic design.",
    isAvailable: true,
    createdAt: "2025-04-14T14:20:10.000Z",
  },
];

export const dummyBookingsData = [
  {
    _id: "68482bcc98eb9722b7751f70",
    car: dummyCarData[0],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-13T00:00:00.000Z",
    returnDate: "2025-06-14T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T12:57:48.244Z",
  },
  {
    _id: "68482dff71eb9822b7752f01",
    car: dummyCarData[1],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-20T00:00:00.000Z",
    returnDate: "2025-06-22T00:00:00.000Z",
    status: "pending",
    price: 260,
    createdAt: "2025-06-15T10:24:00.000Z",
  },
  {
    _id: "684830aa12eb9722b7753f88",
    car: dummyCarData[2],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-07-01T00:00:00.000Z",
    returnDate: "2025-07-03T00:00:00.000Z",
    status: "confirmed",
    price: 600,
    createdAt: "2025-06-25T09:15:10.000Z",
  },
  {
    _id: "684832cc98eb9722b7754f66",
    car: dummyCarData[3],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-07-05T00:00:00.000Z",
    returnDate: "2025-07-07T00:00:00.000Z",
    status: "cancelled",
    price: 500,
    createdAt: "2025-06-28T13:00:00.000Z",
  },
];

export const dummyDashboardData = {
  totalCars: 12,
  totalBookings: 45,
  pendingBookings: 5,
  completedBookings: 40,
  monthlyRevenue: 5400,
  recentBookings: [
    {
      car: { brand: "BMW", model: "X5" },
      createdAt: "2025-07-10T14:23:11.123Z",
      price: 200,
      status: "Confirmed"
    },
    {
      car: { brand: "Audi", model: "Q7" },
      createdAt: "2025-07-08T11:00:00.000Z",
      price: 180,
      status: "Pending"
    }
  ]
};
