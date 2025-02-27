 interface MyModalProps {
    show: boolean;
    onClose: () => void;
}

function DocumentationModal({ show, onClose }: MyModalProps) {
    const handleClose = () => {
        onClose();
    };

    return (
        // Use the "show" prop to toggle Bootstrap modal classes and inline styles
        <div
            className={`modal fade  ${show ? "show" : ""} `}
            style={{ display: show ? "block" : "none" }}
            aria-hidden={!show}
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Documentation
                        </h5>
                        {/* "Close" button calls onClose */}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">


                        <h2>Overview</h2>
                        <p>
                            <strong>PuzzleCaptcha</strong> is a React component that renders a
                            <em>star-shaped puzzle</em> over a randomly fetched image, requiring the user
                            to <strong>slide</strong> the puzzle piece to the correct position. When the piece is
                            correctly aligned, the captcha is considered passed.
                        </p>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Star‑Shaped Puzzle Piece</strong>: Crops a portion of the image in a star shape.</li>
                            <li><strong>Random Image &amp; Position</strong>: Automatically fetches a random image from Picsum (by default), positions the gap in the right half of the image, and starts the piece on the left.</li>
                            <li><strong>Loading Overlay</strong>: Displays a spinner while fetching the image.</li>
                            <li><strong>Customizable Colors &amp; Text</strong>: You can set the slider’s initial and success colors, as well as text labels for the slider bar and card title.</li>
                            <li><strong>Optional Reset Button</strong>: Allows reloading a new puzzle. This can be hidden on success if desired.</li>
                        </ul>

                        <h2>Installation</h2>
                        <p>
                            You can integrate <strong>PuzzleCaptcha</strong> directly into your project code.
                            If you plan to distribute it as a library, bundle and publish it to npm as described in best practices.
                            For a typical React project:
                        </p>
                        <pre><code># If you have the source file directly:
                            # Place PuzzleCaptcha.tsx in your src/components folder
                        </code></pre>
                        <h2>Usage Example</h2>
                        <p>
                            Below is a minimal usage snippet that demonstrates <strong>basic</strong> integration
                            into a page or form:
                        </p>

                        <pre style={{ background: "#f5f5f5", padding: "10px" }}>
                            <code>
                                {`import React, { useState } from "react";
import PuzzleCaptcha from "./PuzzleCaptcha";

function App() {
  const [cardTitle, setCardTitle] = useState("Please Verify Captcha!");
  const [sliderBarTitle, setSliderBarTitle] = useState("Hold & Drag Right");
  const [initialColor, setInitialColor] = useState("#ff0000");
  const [successColor, setSuccessColor] = useState("#008000");
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(150);
  const [showResetBtn, setShowResetBtn] = useState(true);
  const [tolerance, setTolerance] = useState(3.5);

  return (
    <div>
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
      <button type="submit">Submit</button>
    </div>
  );
}

export default App;
`}
                            </code>
                        </pre>


                        <h2>Props Reference</h2>
                        <table border={1} cellPadding="6" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th><strong>Prop</strong></th>
                                    <th><strong>Type</strong></th>
                                    <th><strong>Default</strong></th>
                                    <th><strong>Description</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>sliderBarTitle</td>
                                    <td>string</td>
                                    <td>"Slide Right to Verify"</td>
                                    <td>The text displayed in the slider label (e.g., “Slide Right to Verify”).</td>
                                </tr>
                                <tr>
                                    <td>cardTitle</td>
                                    <td>string</td>
                                    <td>"Hold & Drag Right"</td>
                                    <td>The title displayed in the card header. e.g "Hold & Drag Right"</td>
                                </tr>
                                <tr>
                                    <td>initialColor</td>
                                    <td>string</td>
                                    <td>ff0000</td>
                                    <td>Background color of the slider track before the captcha is solved.</td>
                                </tr>
                                <tr>
                                    <td>successColor</td>
                                    <td>string</td>
                                    <td>#008000</td>
                                    <td>Background color of the slider track (and thumb) once the puzzle is solved.</td>
                                </tr>
                                <tr>
                                    <td>imageWidth</td>
                                    <td>number</td>
                                    <td>300</td>
                                    <td>The width of the captcha image (and overall card).</td>
                                </tr>
                                <tr>
                                    <td>imageHeight</td>
                                    <td>number</td>
                                    <td>150</td>
                                    <td>The height of the captcha image.</td>
                                </tr>
                                <tr>
                                    <td>pieceWidth</td>
                                    <td>number</td>
                                    <td>50</td>
                                    <td>The width of the puzzle piece.</td>
                                </tr>
                                <tr>
                                    <td>pieceHeight</td>
                                    <td>number</td>
                                    <td>50</td>
                                    <td>The height of the puzzle piece.</td>
                                </tr>
                                <tr>
                                    <td>tolerance</td>
                                    <td>number</td>
                                    <td>3.5</td>
                                    <td>How many pixels of leeway the user has to align the piece in the correct spot.</td>
                                </tr>
                                <tr>
                                    <td>showResetBtn</td>
                                    <td>boolean</td>
                                    <td>true</td>
                                    <td>Whether to show the refresh (reset) icon in the top-right corner of the captcha.</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Notes</h3>
                        <ul>
                            <li><strong>sliderBarTitle</strong> and <strong>cardTitle</strong> let you customize textual labels.</li>
                            <li><strong>initialColor</strong> and <strong>successColor</strong> are used to color the slider track (and possibly the thumb background).</li>
                            <li><strong>imageWidth</strong> and <strong>imageHeight</strong> also define the size of the HTML canvas used for rendering.</li>
                            <li><strong>pieceWidth</strong> and <strong>pieceHeight</strong> define the star piece’s bounding box.</li>
                            <li><strong>tolerance</strong> is critical: if set too high, the puzzle is too easy; if too low, it’s too strict.</li>
                        </ul>

                        <h2>Internal Logic</h2>
                        <ol>
                            <li>
                                <strong>Loading a Random Image</strong><br />
                                A random image is fetched from <code>https://picsum.photos/&lt;width&gt;/&lt;height&gt;?random=...</code>.
                                The component shows a spinner overlay while loading.
                            </li>
                            <li>
                                <strong>Star Hole &amp; Piece</strong><br />
                                The puzzle “hole” is placed in the right half of the image (random <code>gapX</code>),
                                and the puzzle piece is clipped into a 5‑point star shape using the <code>createStarPath()</code> function.
                            </li>
                            <li>
                                <strong>Slider Interaction</strong><br />
                                The puzzle piece’s x-position is controlled by an <code>&lt;input type="range"&gt;</code>.
                                The user drags from 0 (left) to the correct <code>gapX</code> in the right.
                                When the user releases the slider (<code>onMouseUp</code> / <code>onTouchEnd</code>),
                                the component checks if <code>|sliderValue - gapX| &lt; tolerance</code>.
                            </li>
                            <li>
                                <strong>Failure &amp; Reset</strong><br />
                                If the user fails, the captcha is marked as failed, and after a short timeout, a new puzzle is loaded.
                                You can adjust this behavior as needed.
                            </li>
                            <li>
                                <strong>Success</strong><br />
                                Once solved, the slider is disabled, and a “Captcha Passed!” message is shown.
                                Optionally, you can switch the slider thumb from an arrow to a check icon.
                            </li>
                        </ol>


                        <h2>Styling &amp; Custom Icons</h2>
                        <ul>
                            <li>
                                <strong>CSS File</strong>: Most of the layout, container, and slider track styling
                                can live in a separate <code>.css</code> file (e.g. <code>PuzzleCaptcha.css</code>).
                            </li>
                            <li>
                                <strong>Thumb Icon</strong>: By default, an arrow icon can be used. On success, you can
                                switch to a tick icon by dynamically injecting a <code>&lt;style&gt;</code> block
                                or toggling a class.
                            </li>
                            <li>
                                <strong>Card Border</strong>: If you need <code>1px solid !important</code>, define a
                                custom class in your <code>.css</code> and add it to the <code>&lt;div&gt;</code> container.
                            </li>
                        </ul>

                        <h2>Handling Double Mount in Dev</h2>
                        <p>
                            Under React 18’s <em>Strict Mode</em>, you might see the puzzle load
                            <strong>twice</strong> in development. This is normal; in production it will only load once.
                            If needed, you can remove <code>&lt;React.StrictMode&gt;</code> or guard your effect with a
                            ref to prevent double loading.
                        </p>

                        <h2>Extending or Modifying</h2>
                        <ul>
                            <li><strong>Fallback Image Sources</strong>: If <code>picsum.photos</code> is unavailable, you can easily add fallback sources (e.g. placekitten.com).</li>
                            <li><strong>Puzzle Shape</strong>: Currently it’s a star. You can replace <code>createStarPath()</code> with any shape path you want (e.g., jigsaw puzzle tabs).</li>
                            <li><strong>Success / Failure Hooks</strong>: Add callback props like <code>onSuccess()</code> or <code>onFail()</code> if you want the parent to handle these events.</li>
                        </ul>

                        <h2>Common Q&amp;A</h2>
                        <ol>
                            <li>
                                <strong>Why the piece is always on the left?</strong><br />
                                We intentionally place the piece’s slider at <code>x=0</code> so the user must drag to the right.
                            </li>
                            <li>
                                <strong>Can I hide the puzzle piece border or shadow?</strong><br />
                                Yes. Simply remove or change the inline style:
                                <code>border: "2px solid #fff"</code>, <code>boxShadow: "..."</code>.
                            </li>
                            <li>
                                <strong>How do I fully disable the slider after success?</strong><br />
                                We set <code>disabled= {"isLoading" || "isFailed" || "isSolved"}</code> on the
                                <code>&lt;input type="range"&gt;</code>, preventing further dragging.
                            </li>
                            <li>
                                <strong>What if the user fails multiple times?</strong><br />
                                By default, we auto-reset after 2 seconds of failing. You can remove that timeout or handle it differently.
                            </li>
                        </ol>

                        <h2>Conclusion</h2>
                        <p>
                            <strong>PuzzleCaptcha</strong> provides a <em>unique puzzle-based</em> user
                            verification mechanism. It’s highly customizable, letting you <strong>tweak</strong>
                            dimensions, <strong>colors</strong>, and text. You can:
                        </p>
                        <ul>
                            <li>Integrate it into any React form by importing and rendering <code>&lt;PuzzleCaptcha&gt;</code>.</li>
                            <li>Override or extend the styling via CSS or inline style blocks.</li>
                            <li>Provide a fallback for images if <code>picsum.photos</code> is unavailable.</li>
                            <li>Adjust <strong>tolerance</strong> and puzzle shape to control difficulty.</li>
                        </ul>
                        <p>
                            By following the examples above, you can seamlessly include PuzzleCaptcha in your React projects
                            for an engaging alternative to traditional captchas. Enjoy customizing it to fit your
                            applications style and needs!
                        </p>
                    </div>
                    <div className="modal-footer">
                        {/* "Close" button calls onClose */}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentationModal;
