import React, { useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeComponent from "../components/HomeComponent";
import ClientsComponent from "../components/ClientsHome";
import Settings from "../components/Settings";
import PrimaryActions from "../components/PrimaryActions";
import ClientList from "../components/ClientsLIst";
import CompanyList from "../components/CompanyList";
import DetailsLayout from "../components/DetailsLayout";
import QuotationLIst from "../components/QuotationList";

function Index(props) {
  return useRoutes([
    { path: "/", element: <HomeComponent/>, children: [
      {
        path: "dashboard",
        element: <PrimaryActions/>,
      }, 
      {
          path: "main",
          element: <ClientsComponent/>,
        },
        {
          path: "settings",
          element: <Settings/>,
        },
        {
          path: "payments",
          element: <ClientsComponent/>,
        },
        {
          path: "clients",
          element: <ClientList/>,
        },
        {
          path: "company",
          element: <CompanyList/>,
        },
        {
          path: "quotation",
          element: <QuotationLIst/>,
        },
        {
          path: "details",
          element: <DetailsLayout/>,
        },
      ], 
    },
    
  ]);
}

export default Index;