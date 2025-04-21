import instagram from "/images/instagram.png";
import facebook from "/images/facebook.png";
import x from "/images/x.png";

export default function Footer() {
  return (
    <footer>
      <div>
        <ul>
          <li>
            <a href="#" title="Go to instagram">
              <img
                src={instagram}
                className="w-6 invert-100 hue-rotate-93 brightness-103 contrast-103"
              />
            </a>
          </li>
          <li>
            <a href="#" title="Go to facebook">
              <img
                src={facebook}
                className="w-6 invert-100 hue-rotate-93 brightness-103 contrast-103"
              />
            </a>
          </li>
          <li>
            <a href="#" title="Go to twitter/x">
              <img
                src={x}
                className="w-6 invert-100 hue-rotate-93 brightness-103 contrast-103"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p>Copyright © 2025 Holidaze</p>
      </div>
    </footer>
  );
}
