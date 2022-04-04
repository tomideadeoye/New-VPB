import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Polygon, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

import { Card, Button, Row, Col, Image, Stack } from "react-bootstrap";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { database } from "../../lib/firebase.prod";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

// const markers = [
// 	{
// 		id: 1,
// 		name: "Tomide Adeoye",
// 		address: "land mark village",
// 		date: "20-10-30",
// 		position: { lat: 6.4442257453669285, lng: 3.427244093254078 },
// 		ownedArea: [
// 			{ lat: 6.4442257453669285, lng: 3.427244093254078 },
// 			{ lat: 6.444281715859478, lng: 3.4271032772807963 },
// 			{ lat: 6.444378997891362, lng: 3.42706974966811 },
// 			{ lat: 6.444464619390302, lng: 3.427058937013019 },
// 			{ lat: 6.444544077461007, lng: 3.4270528601332195 },
// 			{ lat: 6.444612874480723, lng: 3.4270870163886435 },
// 			{ lat: 6.444674508606699, lng: 3.42712984791385 },
// 			{ lat: 6.444717485911716, lng: 3.4272048659472354 },
// 			{ lat: 6.444710822763866, lng: 3.427365463212002 },
// 			{ lat: 6.444618871314924, lng: 3.4275314248947986 },
// 			{ lat: 6.444506264083019, lng: 3.427582219228018 },
// 			{ lat: 6.44438999209244, lng: 3.427563359945882 },
// 			{ lat: 6.444311616759975, lng: 3.427523105855901 },
// 			{ lat: 6.444246567723529, lng: 3.42746675851183 },
// 			{ lat: 6.44422070635654, lng: 3.4274198093766906 },
// 			{ lat: 6.444213501820881, lng: 3.4273540847784467 },
// 		],
// 		// status: "available",
// 		image:
// 			"https://media-exp1.licdn.com/dms/image/C4D03AQENUoFq3rdr4w/profile-displayphoto-shrink_200_200/0/1641711630692?e=1652313600&v=beta&t=3OKJ_E7pRqEgrsNc6TzoNbZycRbX3b1TJOMuaVsQAQo",
// 		status: "sold",
// 		litigation: "free",
// 		estimatedValue: "4000000",
// 		lastTransfer: "20-10-2014",
// 		contact: "08181927251",
// 		onChainAddress: "xddvai720e23ee32",
// 		verifyingInstitution: "Lagos Land Bureau",
// 	},
// ];

export default function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    // googleMapsApiKey: "AIzaSyB8b-MWtS70kJUsWBYmM5HAd2HddpvF6I0",
  });
  // Store Polygon path in state
  const [markers, setMarkers] = useState([]);
  const [path, setPath] = useState([]);
  const [mapStyle, setMapStyle] = useState("terrain");

  const [activeMarker, setActiveMarker] = useState({});
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  const handleActiveMarker = (activeOwner) => {
    if (activeOwner.id === activeMarker.id) {
      return;
    }
    setActiveMarker(activeOwner);
  };
  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const temPath = polygon.getPath();
      listenersRef.current.push(
        temPath.addListener("set_at", onEdit),
        temPath.addListener("insert_at", onEdit),
        temPath.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  // console.log("The path state is", path);

  // Get data from firebase
  const changeMap = () => {
    if (mapStyle === "satellite") setMapStyle("terrain");
    if (mapStyle === "terrain") setMapStyle("satellite");
  };

  useEffect(() => {
    const getProperty = async () => {
      const querySnapshot = await getDocs(collection(database, "property"));
      querySnapshot.forEach((doc) => {
        setMarkers([doc.data()]);
      });
    };
    getProperty();
  }, []);

  useEffect(() => {
    const paths = markers.map((i) => i.ownedArea);
    setPath(paths);
  }, [markers]);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <Container className="App">
      <GoogleMap
        mapContainerClassName="App-map"
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 6.444375, lng: 3.427228 }}
        zoom={17}
        version="weekly"
        on
        mapTypeId={mapStyle}
        options={{
          scaleControl: true,
          mapTypeControl: true,
        }}
      >
        {markers.map((owner) => (
          <Marker
            key={owner.id}
            position={owner.position}
            onClick={() => handleActiveMarker(owner)}
          >
            {activeMarker.id === owner.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker({})}>
                <Card style={{ width: "18rem", color: "black" }}>
                  <Card.Img
                    variant="top"
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQENUoFq3rdr4w/profile-displayphoto-shrink_200_200/0/1641711630692?e=1652313600&v=beta&t=3OKJ_E7pRqEgrsNc6TzoNbZycRbX3b1TJOMuaVsQAQo"
                  />
                  <Card.Body>
                    <Card.Title> Ownership Details</Card.Title>
                    <Card.Text> Property Belongs to: {owner.name}</Card.Text>
                    <Card.Text>Property was purchased on: {owner.date}</Card.Text>
                    <Card.Text>Property Status: {owner.status}</Card.Text>
                    <Card.Text>Litigation Status:{owner.litigation}</Card.Text>
                    <Card.Text>Estimated Value: {owner.estimatedValue}</Card.Text>
                    <Card.Text>Last Recorded Transfer: {owner.lastTransfer}</Card.Text>

                    <Card.Text>BlockChain Address: {owner.onChainAddress}</Card.Text>
                    <Button variant="primary" href="mailto:{tommideadeoye@gmail.com}">
                      Contact
                    </Button>
                    <Button variant="primary" href="mailto:{tommideadeoye@gmail.com}">
                      Generate Report
                    </Button>
                  </Card.Body>
                </Card>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}

        {path.map((i) => (
          <Polygon
            key={i}
            // editable draggable
            path={i}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fillColor: "blue",
              fillOpacity: 0.4,
              strokeColor: "blue",
              // strokeOpacity: 0.8,
              strokeWeight: 3,
            }}
          />
        ))}
      </GoogleMap>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={mapStyle === "satellite"} onChange={changeMap} name="Satellite" />
            }
            label="Change Map Style (terrain or satellite)"
          />
        </FormGroup>
        {/* <FormHelperText color="success">Terrain or Satellite</FormHelperText> */}
      </FormControl>
      {Object.keys(activeMarker).length !== 0 && (
        <ReportModal>
          <h2>PROPERTY DETAILS: {activeMarker.markerName}</h2>
          <Row>
            <Col sm={4}>
              <Card
                className="justify-content-center mx-auto"
                style={{ width: "100%", height: "100%" }}
              >
                <Image
                  className="mx-auto"
                  style={{ width: "50%" }}
                  fluid
                  rounded
                  src={activeMarker.image}
                />
              </Card>
            </Col>
            <Col sm={8}>
              <Card className="justify-content-center">
                <Card.Body>
                  <Card.Title>Reistered Owner:{activeMarker.name}</Card.Title>
                  <Card.Text>Address: {activeMarker.address}</Card.Text>
                  <Card.Text>Property was purchased on: {activeMarker.date}</Card.Text>
                  <Card.Text>Property Status: {activeMarker.status}</Card.Text>
                  <Card.Text>Litigation Status:{activeMarker.litigation}</Card.Text>
                  <Card.Text>Estimated Value: {activeMarker.estimatedValue}</Card.Text>
                  <Card.Text>Last Recorded Transfer: {activeMarker.lastTransfer}</Card.Text>

                  <Card.Text>BlockChain Address: {activeMarker.onChainAddress}</Card.Text>
                  <Card.Text>Verifying Institution: {activeMarker.verifyingInstitution}</Card.Text>
                  <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="primary" href="mailto:{tommideadeoye@gmail.com}">
                      Contact Owner
                    </Button>
                    <Button variant="primary" href="mailto:{tommideadeoye@gmail.com}">
                      Generate Report
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </ReportModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
  background: rgb(2, 0, 36);
  color: white;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 59%,
    rgba(0, 212, 255, 1) 100%
  );
`;
// const DemoContainer = styled.div`
//   color: white;
//   font-size: 60px;
//   padding: 20px 0px 0px 0px;
// `;
// const DemoSubText = styled.div`
//   font-size: 20px;
//   padding: 0px 0px 20px 0px;
// `;
const ReportModal = styled.div`
  color: black;
  padding: 20px 20px 20px 20px;
  > h2 {
    padding: 20px;
    color: white;
  }
`;
