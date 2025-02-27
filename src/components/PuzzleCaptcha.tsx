import { useState, useEffect, useRef} from "react";
import '../styles/App.css';

interface PuzzleCaptchaProps {
    imageWidth: number;
    imageHeight: number;
    pieceWidth: number;
    pieceHeight: number;
    tolerance: number; // allowed pixel difference for a match
    sliderBarTitle: string,
    cardTitle: string,
    initialColor?: string,
    successColor?: string,
    showResetBtn?: boolean
}

const PuzzleCaptcha : React.FC<PuzzleCaptchaProps>= ({ 
    sliderBarTitle,
    cardTitle,
    initialColor,
    successColor,
    imageWidth,
    imageHeight,
    pieceWidth,
    pieceHeight,
    tolerance,
    showResetBtn
})  => {
    const canvasRef = useRef<HTMLCanvasElement>(null);      // Background image with star hole
    const pieceCanvasRef = useRef<HTMLCanvasElement>(null); // Draggable star-shaped puzzle piece
    const [gapX, setGapX] = useState<number>(0); // X-coordinate of the star gap
    const [gapY, setGapY] = useState<number>(0); // Y-coordinate of the star gap
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [isSolved, setIsSolved] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    // Load a random image and pick a star gap in the right half of the image.
    const loadImage = () => {
        setIsLoading(true); // Begin loading
        const sources = [
            `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`,
            `https://placekitten.com/${imageWidth}/${imageHeight}`,
            `https://dummyimage.com/${imageWidth}x${imageHeight}/ccc/000?text=Puzzle Captcha`
        ];
        let index = 0;

        function tryNext() {

            if (index >= sources.length) {
                // All failed
                setIsLoading(false);
                // Maybe set an error state or fallback UI
                return;
            }
            const newImg = new Image();
            newImg.crossOrigin = "anonymous"; // enable cross-origin
            newImg.src = `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`;
            newImg.onload = () => {

                setIsLoading(false); // Done loading

                // Position the star gap in the right half of the image so user must slide from left to right.
                const minX = Math.floor(imageWidth / 2);
                const maxX = imageWidth - pieceWidth - 10;
                const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

                // Random y position (with small margins)
                const minY = 10;
                const maxY = imageHeight - pieceHeight - 10;
                const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

                setGapX(x);
                setGapY(y);
                setSliderValue(0);
                setIsSolved(false);

                drawBackground(newImg, x, y);
                drawStarPiece(newImg, x, y);
            };

            newImg.onerror = () => {
                tryNext();
            };

        }

        tryNext();
    };

    // Draw the background image and create a star-shaped hole (semi-transparent).
    const drawBackground = (image: HTMLImageElement, x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, imageWidth, imageHeight);
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

        // Draw the star hole
        ctx.save();
        ctx.beginPath();
        createStarPath(
            ctx,
            x + pieceWidth / 2, // center X
            y + pieceHeight / 2, // center Y
            5,                   // star points
            pieceWidth * 0.45,   // outer radius
            pieceWidth * 0.2     // inner radius
        );

        // Fill the hole with semi-transparent overlay
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fill();

        // Add a white outline around the star hole
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    };


    // Draw the star puzzle piece by clipping the piece canvas to a star path
    // and then drawing the corresponding cropped image region.
    const drawStarPiece = (image: HTMLImageElement, cropX: number, cropY: number) => {
        const canvas = pieceCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, pieceWidth, pieceHeight);

        // 1) Clip to star shape
        ctx.save();
        ctx.beginPath();
        createStarPath(
            ctx,
            pieceWidth / 2,
            pieceHeight / 2,
            5, // number of spikes
            pieceWidth * 0.45, // outer radius
            pieceWidth * 0.2   // inner radius
        );
        ctx.clip();

        // 2) Draw the cropped portion of the image into the star
        ctx.drawImage(
            image,
            cropX,
            cropY,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
        );
        ctx.restore();


    };


    // Creates a star path with the given parameters.
    // (cx, cy) is the center, spikes is how many points, outerRadius/innerRadius define star shape.
    const createStarPath = (
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        spikes: number,
        outerRadius: number,
        innerRadius: number
    ) => {
        let rotation = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rotation) * outerRadius;
            y = cy + Math.sin(rotation) * outerRadius;
            ctx.lineTo(x, y);
            rotation += step;

            x = cx + Math.cos(rotation) * innerRadius;
            y = cy + Math.sin(rotation) * innerRadius;
            ctx.lineTo(x, y);
            rotation += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    };

    // When the slider changes, update the piece's x position and check if it's near the gapX.
    // Instead of checking success in onChange, just store the slider value
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setSliderValue(value);
    };

    // Do the success check only when the user stops dragging
    const handleSliderRelease = () => {
        // If the piece is within tolerance on release, mark solved; otherwise fail
        if (Math.abs(sliderValue - gapX) < tolerance) {
            setIsSolved(true);
            // optional: auto-reset or something
        } else {
            setIsFailed(true);
            setTimeout(() => {
                handleReset()
            }, 2000)
        }
    };

    // Reset with a new random image
    const handleReset = () => {
        setIsSolved(false)
        setIsFailed(false)
        loadImage();
    };

    useEffect(() => {
        loadImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [imageWidth, imageHeight, tolerance]);


    return (
        <div className="card mb-3 shadow p-4 w-auto" style={{ width: imageWidth }}  >
            <div className="card-header bg-transparent">{cardTitle}</div>
            <div className="card-body ">
                <div className="captcha-container">

                    {/* Add Dynamic Styling for slider arrow */}
                    {!isLoading && (
                        <style>
                            {`
                                /* WebKit-based browsers */
                                input[type="range"]::-webkit-slider-thumb {
                                    background: ${isSolved ? successColor : initialColor
                                                            } url("${isSolved ? "/successTick.svg" : "/arrow.svg"}")
                                    no-repeat center !important;
                                    background-size: 16px 16px;
                                }

                                /* Firefox */
                                input[type="range"]::-moz-range-thumb {
                                    background: ${isSolved ? successColor : initialColor
                                                            } url("${isSolved ? "/successTick.svg" : "/arrow.svg"}")
                                    no-repeat center !important;
                                    background-size: 16px 16px;
                                }
      
                             `}
                        </style>
                    )}


                    {/* LOADING OVERLAY */}
                    {isLoading && (
                        <div className="captcha-loading-overlay">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* Background image with star hole */}
                    <div style={{ position: "relative", height: imageHeight }}>
                        <canvas
                            ref={canvasRef}
                            width={imageWidth}
                            height={imageHeight}
                            style={{ position: "absolute", top: 0, left: 0 }}
                        />
                        {/* Draggable puzzle piece */}
                        <div
                            style={{
                                position: "absolute",
                                top: gapY,
                                left: sliderValue,
                                width: pieceWidth,
                                height: pieceHeight,
                            }}
                        >
                            <canvas
                                ref={pieceCanvasRef}
                                width={pieceWidth}
                                height={pieceHeight}
                                style={{
                                    cursor: "pointer",
                                    border: "2px solid #fff",
                                    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
                                }}
                            />
                        </div>

                        {  /* Refresh icon */
                            showResetBtn &&
                            <div className="captcha-refresh-icon" onClick={handleReset} title="Refresh Captcha">
                                <img src="/refreshIcon.svg" alt="Refresh" />
                            </div>
                        }
                    </div>

                    {/* Slider */}
                    <div className="captcha-slider-container" style={{ width: imageWidth, backgroundColor: isSolved ? successColor : initialColor }}>
                        <input
                            type="range"
                            min={0}
                            max={imageWidth - pieceWidth}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            disabled={isLoading || isFailed || isSolved}

                            className={`captcha-slider ${isSolved ? "is-solved" : ""}`}
                        />

                        {/* Centered label */}
                        <div className="captcha-slider-label">{sliderBarTitle}</div>
                    </div>


                    {/* If failed */}
                    {isFailed && (
                        <p className='text-danger mt-4  text-break' style={{ width: "90%" }}>
                            Captcha Failed. Please Let's try once more!
                        </p>
                    )}

                    {/* Status message */}
                    <div className="text-center mt-4">
                        {isSolved && (
                            <span style={{ color: successColor, fontWeight: "bold" }}>Captcha Passed!</span>
                        )}
                    </div>

                </div>
            </div>


        </div>
    );
};

export default PuzzleCaptcha;
