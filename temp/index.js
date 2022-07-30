import React, { useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
d
import styles from './index.module.css';
import Sticker from '../src/components/Sticker';
import TypedText from '../src/components/TypedText';
import { Flex, Box, Text, Heading } from 'rebass';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import Emoji from '../src/components/Emoji';
import useBaseUrl from '@docusaurus/useBaseUrl';
import gsap from 'gsap';

const BackgroundEffect = ({children}) => {

  const canvasRef = useRef(null);
  var width, height, largeHeader,canvas, ctx, points, target, animateHeader = true;

  const initHeader = useCallback(()=> {
    width = document.body.scrollWidth;//window.innerWidth;
    height = document.body.scrollHeight;//window.innerHeight;
    console.log(width);
    target = {x: width / 2, y: height / 2};
    canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height - 60;
    ctx = canvas.getContext('2d');
    //canvas.style.backgroundColor = "red";

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 50) {
        for (var y = 0; y < height; y = y + height / 50) {
            var px = x + Math.random() * width / 50;
            var py = y + Math.random() * height / 50;
            var p = {x: px, originX: px, y: py, originY: py};
            points.push(p);
        }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
            var p2 = points[j]
            if (!(p1 == p2)) {
                var placed = false;
                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (closest[k] == undefined) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }

                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }
            }
        }
        p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
        var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        points[i].circle = c;
    }
  },[])

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();

    this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(121,214,181,' + _this.active + ')';
        ctx.fill();
    };
}

// animation
function initAnimation() {
  animate();
  for (var i in points) {
      shiftPoint(points[i]);
  }
}

function shiftPoint(p) {
  gsap.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100, 
      onComplete: function () {
          shiftPoint(p);
      }
  });
}

function animate() {
  if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
              points[i].active = 0.1;
              points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
              points[i].active = 0.02;
              points[i].circle.active = 0.1;
          } else {
              points[i].active = 0;
              points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
      }
  }
  requestAnimationFrame(animate);
}

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(121,214,181,' + p.active + ')';
        ctx.stroke();
    }
}
function mouseMove(e) {
  var posx = 0;
  var posy = 0;
  if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
  } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  target.x = posx;
  target.y = posy;
}

const addListeners = useCallback(()=> {
  if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
  }
  window.addEventListener('scroll', scrollCheck);
  window.addEventListener('resize', resize);
},[]);

function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = document.body.scrollWidth;//window.innerWidth;
        height = document.body.scrollHeight - 60;//window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

  useEffect(()=>{
    initHeader();
    initAnimation();
    addListeners();
  }, [canvasRef])

  return(
  <ErrorBoundary
    fallback={({error, tryAgain}) => (
      <div>
        <p>This component crashed because of error: {error.message}.</p>
        <button onClick={tryAgain}>Try Again!</button>
      </div>
    )}>
    <canvas ref={canvasRef} style={{position: "absolute", zIndex: -1 }}></canvas>
    {children}
  </ErrorBoundary>
  )
  };

function Photo(){
  const {siteConfig} = useDocusaurusContext();  
   return(
    <TypedText strings={siteConfig.tagline.split("|")} /> // render typed content
   )
}

function Coffee() {
  return ( 
  <a
    className="bmc-button"
    target="_blank"
    href="https://www.buymeacoffee.com/haruiz"
  >
    <img      
      src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
      alt="Buy me a coffee"
    />
    <span className="bmc-text">Buy me a coffee</span>
  </a>
   );
  }

function Bio(){
  return (
    <smal style={{
      textAlign: "center", 
      fontSize: "medium"
    }}>
    <h3>Research/Professional Interests:</h3>
    <p>Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Pattern Recognition, Signal processing, Remote Sensing (UAV and satellite imagery processing), Geophysics tools (Ground Penetrating Radar(GPR)), Python, C++, Mathematical simulation and electromagnetism.</p>
  </smal>
  )
}

function Profile(){

  const style = {
    margin: "auto",
    width: "50%",
    //border: "3px solid green",
    padding: "10px",
  }

 return(
   <div style={style}>    
    <Sticker style={{
      margin: "auto",
      width: 180,
      height: 180
    }} avatar={useBaseUrl("/img/profile.png")} opacity={0.8} /> 
    <Photo/> 
    <Bio/>
    <Coffee />    
   </div>
 )
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">        
        <Profile />
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p>         */}        
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

const AboutMe = ()=>{
  const width = "60%";
return(
  <Flex flexDirection="column" justifyContent="space-between"  alignItems="center" margin={20}>
    <Box width={width} textAlign="justify">
    <Text textAlign="center"><h1><Emoji symbol="👋" label="hand"/>  About Me</h1></Text> 
      <p>
      Google Developer Expert (GDE) in Machine Learning, with a bachelor's in Computer Science and a Master's degree in AI, currently working as a Research associate and pursuing my Ph.D. in Interdisciplinary Engineering at Texas A&M University. In the last two years, my research has been focused on solving problems in the field of agriculture using Machine Learning and Deep Learning.
      </p>
      <p>
      Full-stack python and javascript developer, proficient in .Net, MATLAB, and C++. With experience also working with Ml/Dl libraries such as Tensorflow, PyTorch, Scikit-Learn, Scipy, Dask, Pandas, and Opencv.
      I enjoy developing open source solutions focused on computer vision (FalconCV, CVStudio, Rigging.js) and working on social meaning projects in my free time.
      </p>
    </Box>

    <Box width={width} textAlign="center">
    <h1><Emoji symbol="🏆" label="cup"/>  Recent achievements</h1>
    <ul style={{listStyle: "None"}}>
    <li><a href='https://graduation.udacity.com/confirm/LFG39WPU'>Deep Learning Udacity Nanodegree</a></li>
    <li><a href='https://confirm.udacity.com/YLXC7HQK'>Intel® Edge AI for IoT Developers Nanodegree</a></li>
    <li><a href='https://www.credly.com/badges/3339a9da-4af4-42eb-9b4b-d1e5e7ea422a'>Intel Edge AI Certification</a></li>
    <li><a href='https://www.credential.net/296580df-2e88-4a20-8a77-961b7152209d'>Tensorflow Developer Certificated</a></li>
    </ul> 
    </Box>

    <Box width={width} textAlign="center">
      <h1><Emoji symbol="🔬" label="cup"/> Publications</h1>
      <a href='https://scholar.google.com/citations?user=QvVPUMoAAAAJ&hl=en'>Google Scholar Profile</a>
    </Box>
  </Flex>
)
}
export default function Home() {
  const {siteConfig, Profile} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <BackgroundEffect>
        <HomepageHeader />
        <AboutMe />
      </BackgroundEffect>
    </Layout>
  );
}

