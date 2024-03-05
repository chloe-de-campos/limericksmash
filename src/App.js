

// export default App;
import React, { useState, useRef } from 'react';
import './App.css'; // Import your CSS file for styling

function App() {
  const [showButton, setShowButton] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const [roomCode, setRoomCode] = useState('');
  const [showRulesPopup, setShowRulesPopup] = useState(false); // State to control the visibility of the rules popup
  const [moveOn, setMoveOn] = useState(false)
  const [moveOn2, setMoveOn2] = useState(false)
  const [scaleVideos, setScaleVideos] = useState(false);


  const handleAnimationButtonClick = () => {
    // Play the video from the current time
    setMoveOn(true)
    videoRef1.current.currentTime = 2.1
    videoRef2.current.currentTime = 2.1
    videoRef3.current.currentTime = 2.1
    videoRef1.current.play();
    videoRef2.current.play();
    videoRef3.current.play();
    // Hide the button
    setShowButton(false);
  };

  const handleVideoTimeUpdate = () => {
    console.log('timelineupdate')
    // If the video has played for a certain duration, show the button
    if (!moveOn && videoRef1.current.currentTime >= 1.5) {
      videoRef1.current.pause();
      videoRef2.current.pause();
      videoRef3.current.pause();
      setMoveOn(true)
    }
    if (!moveOn2 && videoRef1.current.currentTime >= 2.7) {
      setShowContent(true);
      console.log('slowing')
      videoRef1.current.playbackRate = .65
      videoRef2.current.playbackRate = .69
      videoRef3.current.playbackRate = .6
      setMoveOn2(true)
    }

    if (videoRef1.current.currentTime >= 3.58) {
      console.log('ending')
      videoRef1.current.pause();
      videoRef2.current.pause();
      videoRef3.current.pause();
      
    }

  };

  const toggleRules = () => {
    setScaleVideos(!scaleVideos); // Toggle scaling effect
    setShowRulesPopup(!showRulesPopup);
  }

  const handleAnimationEnd = () => {
    // Animation video has ended, show the main content
    setShowContent(true);
  };


  const handleInputChange = (event) => {
    setRoomCode(event.target.value);
   
  };



  const handleSubmit = () => {
    if (roomCode.trim() !== '') {
      // Redirect to the URL with the room code
      window.location.href = `https://limericksmash.com/games/${roomCode}`;
    }
  };

  return (
    <div className="App">
      {/* Animation video */}
      <div className={`parallax-container ${scaleVideos ? 'video-scale-up' : ''}`} style={{ zIndex: 3, width: "100%",  height: "100vh" }}>
      <video
        id="animation-video1"
        ref={videoRef3}
        muted
        autoPlay
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleAnimationEnd}
      >
          <source src="parallax/layer3.webm" type="video/webm" />
        </video>
      </div>
      <div className={`parallax-container ${scaleVideos ? 'video-scale-up2' : ''}`} style={{ zIndex: 2, width: "100%",  height: "100vh" }}>
      <video
        id="animation-video2"
        ref={videoRef2}
        muted
        autoPlay
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleAnimationEnd}
      >
          <source src="parallax/layer2.webm" type="video/webm" />
        </video>
      </div>
      <div className={`parallax-container ${scaleVideos ? 'video-scale-up3' : ''}`} style={{ zIndex: 1 , width: "100%",  height: "100vh"}}>
      <video 
        id="animation-video3"
        ref={videoRef1}
        muted
        autoPlay
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleAnimationEnd}
      >
        <source src="parallax/final-impact_hottom.webm" type="video/webm" />
      </video>
      </div>
      

      {/* Button for triggering animation */}
      {showButton && (
        <button className="animation-button" style ={{position: 'absolute'}} onClick={handleAnimationButtonClick}>
          Play
        </button>
      )}

      {/* Main content */}
      {showContent && (
        
        <div className={'content'}>

        <button className="rules-button" onClick={toggleRules}>
                <img style={{ width: "20px", fill: "#FFFFFF" }} src="/lightbulg.svg" alt="Lightbulb Icon" />
                </button>
        {/* Rules popup */}
                    <div className={`rules-popup ${showRulesPopup ? 'show' : ''}`}>
                        <div className = "popuptext">
                    <button style={{width:"30px", height:"30px", position: 'absolute', left: "20px", top:"20px", }}onClick={toggleRules}>
                          
                          <img style={{width:"20px", height:"20px"}} src="/back1.svg" />
                        </button>
                      <div className="rules-content">
                        <h2>What's a Limerick?</h2>
                        <p>A limerick is a five-line poem with a distinctive rhythm and rhyme scheme. It usually has a humorous or nonsensical theme. </p>
                        <p>The rhyme scheme is typically AABBA.</p>
                        <p>
                        <span className="indented lineATitle">A:</span> <span className="lineA">  Welcome to a game most fine</span>
                        </p>
                        <p>
                        <span className="indented lineATitle">A:</span> <span className="lineA">   Where each round we write one more line</span>
                        </p>
                        <p>
                        <span className="indented lineBTitle">B:</span> <span className="lineB"> With each line we compete</span>
                        </p>
                        <p> 
                        <span className="indented lineBTitle">B:</span> <span className=" lineB">  Till the limerick's complete</span>
                        </p>
                        <p>
                        <span className="indented lineATitle">A:</span> <span className=" lineA"> And in legend the winner's enshrined!</span >
                        </p>
                        
                        <p>The structure often follows anapestic meter, with the first, second, and fifth lines having three stressed syllables and the third and fourth lines having two stressed syllables.</p>
                        </div>
                    </div>
                  </div>


                <div className={`centerContent ${showRulesPopup ? 'centerContent-hidden' : ''}`}> 

                   {/* <h1>LIMERICK SMASH</h1> */}
                   <div className="input-container">
                     <input
                      type="text"
                      placeholder="Enter room code"
                      value={roomCode}
                      onChange={handleInputChange}
                    />
                    <button onClick={handleSubmit}>Create or Join Room</button>
                  </div>
              </div>
        </div>
      )}
    </div>
  );
}

export default App;



