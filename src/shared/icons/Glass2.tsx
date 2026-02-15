export const Glass2 = ({ width = 24, height = 12, stroke = "#9CA3AF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 12"
      fill="none"
      role="img"
      aria-label="آیکون جستجو"
    >
      <circle cx="5.5" cy="5.52417" r="4.5" stroke={stroke} strokeWidth="2" />
      <line
        x1="9"
        y1="4.52417"
        x2="15"
        y2="4.52417"
        stroke={stroke}
        strokeWidth="2"
      />
      <circle
        cx="18.5"
        cy="5.52417"
        r="4.5"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
};