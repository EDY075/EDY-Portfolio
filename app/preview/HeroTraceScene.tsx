import './hero-trace-scene.css';

const HERO_DESKTOP = 'M522 521C550 492 543 428 558 385C575 338 614 327 629 294C640 268 621 248 630 218C641 176 679 149 728 143C789 135 834 168 846 211C856 246 847 282 868 307C894 338 938 348 949 390C959 452 937 510 922 583C906 664 897 734 865 798C835 858 808 892 808 1000';
const HERO_MOBILE = 'M79 409C94 364 140 339 217 317C254 299 271 278 271 251C271 228 257 219 266 194C278 152 338 130 416 134C502 130 573 154 596 196C615 231 609 254 641 276C670 295 716 305 754 325C815 349 867 379 888 426C919 494 891 566 868 624C835 706 808 770 808 1000';
const STATEMENT_DESKTOP = 'M808 0C808 144 762 220 692 278C600 353 473 403 342 466C194 537 81 635 26 776C5 831 0 914 0 1000';
const STATEMENT_MOBILE = 'M808 0C808 160 752 239 668 311C547 415 389 465 264 545C136 627 53 710 17 813C2 856 0 915 0 1000';

function TracePath({ desktop, mobile }: { desktop: string; mobile: string }) {
  return (
    <>
      <path className="eg-c-trace-desktop eg-c-trace-line" d={desktop} pathLength="1" />
      <path className="eg-c-trace-mobile eg-c-trace-line" d={mobile} pathLength="1" />
    </>
  );
}

export function HeroTraceScene() {
  return (
    <div className="eg-c-trace-scene" aria-hidden="true">
      <svg className="eg-c-trace-edge" viewBox="0 0 1000 100" preserveAspectRatio="none" focusable="false">
        <path d="M0 71C181 93 316 60 452 61C604 61 729 10 850 12C924 13 968 24 1000 33V100H0Z" />
      </svg>
      <svg className="eg-c-trace-canvas" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="eg-c-trace-color" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
            <stop offset=".44" stopColor="#e2f49b" />
            <stop offset=".52" stopColor="#4b5218" />
            <stop offset=".87" stopColor="#4b5218" />
            <stop offset=".99" stopColor="var(--eg-accent)" />
          </linearGradient>
        </defs>
        <TracePath desktop={HERO_DESKTOP} mobile={HERO_MOBILE} />
      </svg>
    </div>
  );
}

export function HeroTraceContinuation() {
  return (
    <svg
      className="eg-c-trace-canvas eg-c-trace-continuation"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <TracePath desktop={STATEMENT_DESKTOP} mobile={STATEMENT_MOBILE} />
    </svg>
  );
}
