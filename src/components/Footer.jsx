/**
 * Footer component that displays social media links and copyright information.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-5">
      <div className="bg-white">
        <ul className="flex justify-center items-center gap-8 py-2 sm:gap-14">
          <li>
            <a href="#" title="Go to instagram" className="flex animate hover">
              <div className="social-btn">
                <img src="/images/instagram.png" className="social-img" />
              </div>
            </a>
          </li>
          <li>
            <a href="#" title="Go to facebook" className="flex animate hover">
              <div className="social-btn">
                <img src="/images/facebook.png" className="social-img" />
              </div>
            </a>
          </li>
          <li>
            <a href="#" title="Go to twitter/x" className="flex animate hover">
              <div className="social-btn">
                <img src="/images/x.png" className="social-img" />
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-orange text-white text-sm font-inter text-center py-6">
        <p>Copyright © 2025 Holidaze</p>
      </div>
    </footer>
  );
}
