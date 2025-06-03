import { useState, useEffect, useCallback, useMemo } from "react";
import "./featured.css";
import ghost from "./mood.gif";

function Featured() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200);
  const toRotate = useMemo(() => [
    "Welcome to Hunt Amazon Finds,",
    "where adventure awaits in the cursed jungle.",
    "But be warned, for the jungle is full of treasures that hold unspeakable horrors.",
    "Will you have the courage to explore its depths and claim the treasures that await, or will you fall victim to its cursed power"
  ], []);
  const period = 1500;

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period); // pause before deleting
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1); // go to next text
      setDelta(500); // pause before typing next
    } else {
      setDelta(isDeleting ? 50 : 100);
    }
  }, [isDeleting, loopNum, period, text, toRotate]);

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, delta, tick]);

  return (
    <div className='container-fluid featured'>
      <div className='row featured_row'>
        <div className='col_left col-lg-6'>
          <div>
            <h1 className="txt-rotate animate__animated animate__fadeInRight">
              <span className="wrap">{text}</span>
            </h1>
          </div>
        </div>
        <div className='col_right col-lg-6'>
          <img className='featured_img' src={ghost} autoPlay loop muted alt="" />
        </div>
        <div className='col_bottom col-lg-12'>
          <a href='#products'>
            <i className="fa-solid fa-angles-down"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Featured;
