import React, { useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeComponent from "../components/HomeComponent";
import ClientsComponent from "../components/ClientsHome";
import Settings from "../components/Settings";


function Index(props) {
  return useRoutes([
    { path: "/", element: <HomeComponent/>, children: [
        {
          path: "dashboard",
          element: <ClientsComponent/>,
        },
        {
          path: "settings",
          element: <Settings/>,
        },
      ], 
    },
    
  ]);
}

export default Index;