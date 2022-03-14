import React, { useState, useEffect } from 'react';
import '../css/home.css';

import { Button, Col, Row, Container, Navbar, ButtonGroup, Offcanvas, Accordion, ListGroup, Card, Figure, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';

import { v4 as uuidv4 } from 'uuid';

import { BsTwitter, BsInstagram, BsFacebook, BsGithub, BsTelephone } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si'

import myDataJson from '../data/myData.json';
import { ItemTexts, MyDataModel } from '../models/MyDataModel';

export default function Home() {

  const [myData, setMyData] = useState<MyDataModel>()

  const [darkMode, setDarkMode] = useState(0);//0:Off - 1:On Dark Mode

  const [language, setLanguage] = useState(0);//0:Eng - 1:Tr

  const [showMap, setShowMap] = useState(false);

  const [indexAccordion, setIndexAccordion] = useState(-1);

  const [musicIndex, setMusicIndex] = useState(-1);
  const [profilePhotoIndex, setProfilePhotoIndex] = useState(-1);

  useEffect(() => {
    const obj = myDataJson as MyDataModel
    setMyData(obj);

    setProfilePhotoIndex(Math.floor(Math.random() * obj?.personalInfo.profilPhotos.length));
    setMusicIndex(Math.floor(Math.random() * obj?.musics.links.length));
  }, []);

  useEffect(() => {
    darkMode === 0 ? document.body.style.backgroundColor = 'white' : document.body.style.backgroundColor = 'black'
  }, [darkMode]);

  const colorList = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]

  return (

    <Container>
      <Row>
        <Navbar className="justify-content-md-end">
          <ButtonGroup size="sm" className="m-2">
            <Button variant="outline-info" onClick={() => setShowMap(true)}>Show Map</Button>
            <Button variant="outline-info" onClick={() => language === 0 ? setLanguage(1) : setLanguage(0)}>Language</Button>
            <Button variant="outline-info" onClick={() => darkMode === 0 ? setDarkMode(1) : setDarkMode(0)}>Brightness</Button>
          </ButtonGroup>
        </Navbar>
      </Row>

      <Row>
        <Col style={{ textAlign: "center" }} xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Figure>
            <Figure.Image
              width="70%"
              style={{ maxHeight: "400px" }}
              className='img-fluid rounded'
              alt="My profile picture is from Cloudinary"
              src={myData?.personalInfo.profilPhotos[profilePhotoIndex]}
            />

            <Figure.Caption>
              <ListGroup>
                <ListGroup.Item key={uuidv4()} variant='info' className={darkMode === 1 ? "darkmode" : ""} style={{ fontFamily: "cursive" }}>Mert DUMANLI</ListGroup.Item>
                <ListGroup.Item key={uuidv4()} variant='success' className={darkMode === 1 ? "darkmode" : ""} style={{ fontFamily: "cursive" }}>{myData?.personalInfo.position[language]}</ListGroup.Item>
              </ListGroup>
            </Figure.Caption>

            <Card className='mt-2'>
              <ListGroup>
                {checkPersonalInfo(myData?.personalInfo.birthplace, "Birth Place", "Doğum Yeri")}
                {checkPersonalInfo(myData?.personalInfo.birthdate, "Birth Date", "Doğum Tarihi")}
                {checkPersonalInfo(myData?.personalInfo.gender, "Gender", "Cinsiyet")}
                {checkPersonalInfo(myData?.personalInfo.maritalStatus, "Marital Status", "Evlilik Durumu")}
                {checkPersonalInfo(myData?.personalInfo.nationality, "Nationality", "Uyruk")}
                {checkPersonalInfo(myData?.personalInfo.militaryService, "Military Service", "Askerlik Durumu")}
              </ListGroup>
            </Card>
            <Card className={darkMode === 1 ? "darkmode mt-3" : "mt-3"}>

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{language === 0 ? "Royalty-free music" : "Telifsiz Müzik"}</Tooltip>}>
                <span className="d-inline-block">
                  <Card.Header style={{ fontSize: "14px", fontFamily: "cursive" }}>{language === 0 ? "Music Place" : "Müzik Yeri"}</Card.Header>
                </span>
              </OverlayTrigger>
              <Card.Body>
                <Card.Title style={{ fontSize: "14px", fontFamily: "cursive" }}>{myData?.musics.names[musicIndex]}</Card.Title>

                <ReactAudioPlayer
                  src={myData?.musics.links[musicIndex]}
                  autoPlay={true}
                  controls
                  volume={0.27}
                />

              </Card.Body>
            </Card>
          </Figure>


        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8} style={{ textAlign: 'center' }}>

          <Accordion /*alwaysOpen defaultActiveKey={['0']}*/>{
            myData?.itemTexts.map((item, index) =>
              <Accordion.Item eventKey={index.toString()} key={index}>
                {writeHeader(item.title, index)}
                {writeBody(item)}
              </Accordion.Item>
            )
          }
          </Accordion>
        </Col>
      </Row>

      <Row className={indexAccordion !== -1 && (indexAccordion === 0 || indexAccordion === 1 || indexAccordion === 6) ? "mx-auto" : "mx-auto fixed-bottom"}>
        <Col xs={1} sm={1} md={3} lg={3} xl={3} xxl={3}></Col>
        <Col xs={true} sm={true} md={true} lg={true} xl={true} xxl={true} style={{ textAlign: 'center' }}>

          <a href={myData?.contactAddresses?.twitter} target="_blank" rel="noopener noreferrer">
            <BsTwitter className='m-3' style={{ color: myData?.itemColors.twitter[darkMode] }} id="socialMedia" />
          </a>
          <a href={myData?.contactAddresses?.instagram} target="_blank" rel="noopener noreferrer">
            <BsInstagram className='m-3' style={{ color: myData?.itemColors.instagram[darkMode] }} id="socialMedia" />
          </a>
          <a href={myData?.contactAddresses?.facebook} target="_blank" rel="noopener noreferrer">
            <BsFacebook className='m-3' style={{ color: myData?.itemColors.facebook[darkMode] }} id="socialMedia" />
          </a>
          <a href={`mailto:` + myData?.contactAddresses?.gmail} target="_blank" rel="noopener noreferrer">
            <SiGmail className='m-3' style={{ color: myData?.itemColors.gmail[darkMode] }} id="socialMedia" />
          </a>
          <a href={myData?.contactAddresses?.gitHub} target="_blank" rel="noopener noreferrer">
            <BsGithub className='m-3' style={{ color: myData?.itemColors.gitHub[darkMode] }} id="socialMedia" />
          </a>
          <a href={`tel:` + myData?.contactAddresses?.tel} target="_blank" rel="noopener noreferrer">
            <BsTelephone className='m-3' style={{ color: myData?.itemColors.tel[darkMode] }} id="socialMedia" />
          </a>

        </Col>
        <Col xs={1} sm={1} md={3} lg={3} xl={3} xxl={3}></Col>
      </Row>

      <Offcanvas style={{ height: "auto" }} placement='bottom' show={showMap} onHide={() => setShowMap(false)}>
        <Offcanvas.Header closeButton style={{ backgroundColor: myData?.itemColors.mapOffCanvasHeader[darkMode] }}>
          <Offcanvas.Title style={{ color: myData?.itemColors.mapOffCanvasTitle[darkMode] }}>{language === 0 ? "Home : " + myData?.map.openAddressEnglish : "Ev : " + myData?.map.openAddressTurkish}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: myData?.itemColors.mapOffCanvasBody[darkMode] }}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={1} xl={2} xxl={3}></Col>
            <Col xs={true} sm={true} md={true} lg={true} xl={true} xxl={true} >
              <iframe title={myData?.map.title} src={myData?.map.url} width="640" height="480"></iframe>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={2} xxl={3}></Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

    </Container >

  );
  function writeBody(i: ItemTexts) {
    return (language === 0 ? writeBodyEngTurk(i.detailEnglish) : writeBodyEngTurk(i.detailTurkish));
  }

  function writeBodyEngTurk(i: string[]) {
    return (
      <Accordion.Body className={darkMode === 1 ? "darkmode" : ""}>
        <ListGroup variant="flush">
          {i.map((item, index) =>
            <Card><ListGroup.Item variant='primary' key={index} style={{ fontFamily: "cursive" }}>{item}</ListGroup.Item></Card>
          )}
        </ListGroup>
      </Accordion.Body>
    );
  }
  function writeHeader(i: (string)[], index: React.SetStateAction<number>) {
    return (
      <Accordion.Header onClick={() => index === indexAccordion ? setIndexAccordion(-1) : setIndexAccordion(index)} className={darkMode === 1 ? "darkmode" : ""} style={{ fontFamily: "cursive" }}>
        {i[language]}
      </Accordion.Header>);
  }

  function checkPersonalInfo(item: string[] | undefined, keyTurkish: string, keyEnglish: string) {
    return (
      item !== undefined && item.length !== 0 && item.length === 2 ? <ListGroup.Item variant={colorList[(Math.floor(Math.random() * colorList.length))]} key={uuidv4()} className={darkMode === 1 ? "darkmode" : ""} style={{ fontFamily: "cursive" }}>{language === 0 ? keyTurkish + ": " + setSentenceUpperCaseFirstLetters(item[0]) : keyEnglish + ": " + setSentenceUpperCaseFirstLetters(item[1])}</ListGroup.Item> : ""
    );
  }
  function setSentenceUpperCaseFirstLetters(sentence: string) {
    var parcalar = sentence.split(" ");
    for (var i = 0; i < parcalar.length; i++) {
      var j = parcalar[i].charAt(0).toUpperCase();
      parcalar[i] = j + parcalar[i].substring(1).toLowerCase();
    }
    return parcalar.join(" ");
  }
}