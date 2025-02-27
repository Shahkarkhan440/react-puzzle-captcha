 interface OptionsPanelProps {
    sliderBarTitle: string;
    setSliderBarTitle: (val: string) => void;

    cardTitle: string;
    setCardTitle: (val: string) => void;

    initialColor: string;
    setInitialColor: (val: string) => void;

    successColor: string;
    setSuccessColor: (val: string) => void;

    imageWidth: number;
    setImageWidth: (val: number) => void;

    imageHeight: number;
    setImageHeight: (val: number) => void;

    showResetBtn: boolean,
    setShowResetBtn: (val: boolean)=> void

    tolerance: number,
    setTolerance: (val: number) => void; 
}

function OptionsPanel({
    sliderBarTitle,
    setSliderBarTitle,

    cardTitle,
    setCardTitle,

    initialColor,
    setInitialColor,

    successColor,
    setSuccessColor,

    imageWidth,
    setImageWidth,

    imageHeight,
    setImageHeight,

    showResetBtn,
    setShowResetBtn,

    tolerance,
    setTolerance

}: OptionsPanelProps) {
    const handleSliderBarTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderBarTitle(e.target.value);
    };

    const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
    };

    const handleInitialColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInitialColor(e.target.value);
    };

    const handleSuccessColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuccessColor(e.target.value);
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageWidth(Number(e.target.value));
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageHeight(Number(e.target.value));
    };


    return (
        <div className="card mb-3 shadow p-4" style={{ maxWidth: "500px" }}>
            <div className="card-header bg-transparent border-success">Customize</div>
            <div className="card-body">
                <form>
                    <div className="row">

                        <div className="form-group col-6">
                            <label>Card Title</label>
                            <input
                                type="text"
                                value={cardTitle}
                                onChange={handleCardTitleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-6">


                            <label>Slide Bar Title</label>

                            <input
                                type="text"
                                value={sliderBarTitle}
                                onChange={handleSliderBarTitleChange}
                                className="form-control"
                            />
                        </div>


                    </div>

                    <div className="row mt-2">
                        <div className="form-group col-6">
                            <label>Initial Color</label>
                            <input
                                type="color"
                                value={initialColor}
                                onChange={handleInitialColorChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group col-6">
                            <label>Success Color</label>
                            <input
                                type="color"
                                value={successColor}
                                onChange={handleSuccessColorChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="form-group col-6">
                            <label>Captcha Box Width (px)</label>
                            <input
                                type="number"
                                min="200"
                                value={imageWidth}
                                onChange={handleWidthChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group col-6">
                            <label>Captcha Box Height (px)</label>
                            <input
                                type="number"
                                min="150"
                                value={imageHeight}
                                onChange={handleHeightChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="row mt-2">

                        <div className="form-group col-6">
                            <label>Disable Reset Button</label>
                            <br></br>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" 
                                 checked={!showResetBtn}
                                autoComplete="off" onChange={()=> setShowResetBtn(false)}/>
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Yes</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" 
                                checked={showResetBtn}
                                autoComplete="off" 
                                 onChange={()=> setShowResetBtn(true)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">No</label>
                            </div>

                        </div>

                        <div className="form-group col-6">
                            <label>Match Tolerance </label>
                            <input
                                type="number"
                                min="1"
                                value={tolerance}
                                onChange={(e)=>setTolerance(Number(e.target.value))}
                                className="form-control"
                            />
                        </div>


                    </div>


                    {/* If you want a submit button, you can add one here. 
              Otherwise, each onChange updates the parent immediately. */}
                </form>
            </div>
        </div>
    );
}

export default OptionsPanel;
