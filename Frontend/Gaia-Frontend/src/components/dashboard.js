import React, { useEffect, useMemo, useState } from "react";
import { api } from "../utils/api";
import useAuth from "../hooks/useAuth";
import Map from "./map";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  Row,
  Col,
  PaperBox,
  CustomButton,
  DrawIcon,
  CloudUploadIcon,
  LoadingPage,
} from "../styledComponent/dashboardPage";
import { clearRenderedMap } from "../utils/parseGeoJson";

const cards = [
  { key: "upload", icon: CloudUploadIcon, label: "Upload Map" },
  { key: "draw", icon: DrawIcon, label: "Draw Map" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0, zoom: 2 });
  const [initialScreen, setShowInitialScreen] = useState(false);
  const [type, setType] = useState("");
  const [uploadedJson, setUploadedJson] = useState("");
  const { logout } = useAuth();

  var toastId;

  const postJsonData = (json) => {
    return new Promise(async (resolve, reject) => {
      let toastId = null;
      try {
        toastId = toast.loading("Saving your data...", {
          duration: 10000,
        });
        const data = {
          roleId: "3",
          feature: json,
          email: localStorage.getItem("email"),
        };
        const response = await api("/politician/upload-map", "POST", data);
        toast.dismiss(toastId);
        if (response.status === 401) {
          logout();
        } else if (response.status === 200) {
          setType("uploaded");
          toast.success("Your data have been saved successfully");
          resolve(response);
        } else {
          throw new Error(response?.message);
        }
      } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.message);
        reject(err);
      }
    });
  };

  const getJsonData = async () => {
    try {
      const response = await api("/politician/get-uploaded-map", "GET");
      if (response.status === 404) {
        setLoading(false);
        setShowInitialScreen(true);
      } else if (response.status === 401) {
        logout();
      } else if (response.status === 200) {
        setUploadedJson(response.data.feature);
        setType("uploaded");
        setLoading(false);
      } else {
        throw new Error(response?.message);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setShowInitialScreen(true);
    }
  };

  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      toast.dismiss(toastId);
      setCoordinates({ zoom: 7, lat: latitude, lng: longitude });
    }

    function error() {
      toast.dismiss(toastId);
      toast.error("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      toast.dismiss(toastId);
      toast.error("Geolocation is not supported by your browser");
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      toastId = toast.loading("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }

    getJsonData();
  }, []);

  const initialScreenPage = useMemo(
    () => (
      <LoadingPage>
        <Row>
          {cards.map((card, index) => (
            <Col key={`cards-${card.key}-${index}`}>
              <PaperBox>
                <card.icon />
                <CustomButton
                  variant={card.key === "upload" ? "contained" : "outlined"}
                  disabled={!!toastId}
                  onClick={() => {
                    setType(card.key);
                    setShowInitialScreen(false);
                  }}
                >
                  {card.label}
                </CustomButton>
              </PaperBox>
            </Col>
          ))}
        </Row>
      </LoadingPage>
    ),
    [toastId]
  );

  return loading ? (
    <Backdrop
      open={true}
      sx={{ color: "#fff", display: "flex", flexDirection: "column" }}
    >
      <CircularProgress color="inherit" />
      Loading data...
    </Backdrop>
  ) : initialScreen ? (
    initialScreenPage
  ) : (
    <Map
      {...coordinates}
      type={type}
      postJsonData={postJsonData}
      uploadedJson={uploadedJson}
      cbClearRenderedMap={(map) => {
        clearRenderedMap(map);
        setShowInitialScreen(true);
        setUploadedJson("");
      }}
    />
  );
};

export default Dashboard;
