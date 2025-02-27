import { useState } from "react";
import PuzzleCaptcha from "./components/PuzzleCaptcha";
import OptionsPanel from "./components/OptionsPanel";
import DocumentationModal from "./components/DocumentationModal";

function App() {
  // States lifted in the parent
  const [cardTitle, setCardTitle] = useState("Please Verify Captcha!");
  const [sliderBarTitle, setSliderBarTitle] = useState("Hold & Drag Right");
  const [initialColor, setInitialColor] = useState("#ff0000");
  const [successColor, setSuccessColor] = useState("#008000");
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(150);
  const [showResetBtn, setShowResetBtn] = useState(true)
  const [tolerance, setTolerance] = useState(3.5); 
  const [showModal, setShowModal] = useState(false);


  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-items-center">

      <div className="row  text-center m-4">
        <h2>Puzzle Captcha Demo</h2>
      </div>


      <div className="row col-12">
        {/* Left side: The puzzle captcha, receiving props from parent */}
        <div className="d-flex justify-content-end col-6 bg-card">
          <PuzzleCaptcha
            sliderBarTitle={sliderBarTitle}
            cardTitle={cardTitle}
            initialColor={initialColor}
            successColor={successColor}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            showResetBtn={showResetBtn}
            pieceWidth={50}
            pieceHeight={50}
            tolerance={tolerance}
          />
        </div>

        {/* Right side: The options panel, which updates parent state */}
        <div className="flex col-6">
          <OptionsPanel
            sliderBarTitle={sliderBarTitle}
            setSliderBarTitle={setSliderBarTitle}

            cardTitle={cardTitle}
            setCardTitle={setCardTitle}

            initialColor={initialColor}
            setInitialColor={setInitialColor}

            successColor={successColor}
            setSuccessColor={setSuccessColor}

            imageWidth={imageWidth}
            setImageWidth={setImageWidth}

            imageHeight={imageHeight}
            setImageHeight={setImageHeight}

            showResetBtn={showResetBtn}
            setShowResetBtn={setShowResetBtn}

            tolerance={tolerance}
            setTolerance={setTolerance}
          />
        </div>
      </div>


      {/* Documentation */}
      <div className="container">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Documentation! - Easy Captcha (NO API Required)</h4>
          <p>
            Read complete documentation about this plugin, includes installation, usage, supported hooks, and more!
          </p>
          <hr />
            <button className="mb-0 btn btn-primary"   onClick={handleOpen}>View Documentation</button>
        </div>
      </div> 

      {/* Modal */}
      <DocumentationModal
       show={showModal}
       onClose={handleClose}
      />
    </div>
  );
}

export default App;
