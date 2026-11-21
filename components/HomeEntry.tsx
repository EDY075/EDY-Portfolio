import './home-entry.css';

export function HomeEntry() {
  return (
    <div className="eg-entry-wipe" aria-hidden="true">
      <div className="eg-entry-panel">
        <svg className="eg-entry-matte" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <mask id="eg-entry-aperture" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
            <rect width="1440" height="900" fill="white" />
            <path
              className="eg-entry-cutout"
              fill="black"
              d="M644 114H743L674 402Q672 408 679 408H773L820 214H898Q920 214 915 235L827 602H727L751 506H575Q551 506 555 483Z"
            />
          </mask>
          <rect width="1440" height="900" fill="currentColor" mask="url(#eg-entry-aperture)" />
        </svg>
        <div className="eg-entry-mark"><span>E</span><span>G</span></div>
        <span className="eg-entry-label">Carregando</span>
      </div>
    </div>
  );
}
