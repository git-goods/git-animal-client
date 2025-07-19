interface CharacterSVGProps {
  svgContent?: string;
}

export const CharacterSVG = ({ svgContent }: CharacterSVGProps) => {
  if (svgContent) {
    return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      overflow="visible"
      width="600"
      height="300"
      viewBox="0 0 600 300"
      style={{
        width: '600px',
        height: '300px',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <style>
        {`
          @keyframes move-1 {
            0.0% {
              transform: translate(45%, 42%) rotate(0deg) scaleX(1);
            }
            0.01% {
              transform: translate(47%, 42%) rotate(0deg) scaleX(-1);
            }
            5.0% {
              transform: translate(44%, 41%) rotate(0deg) scaleX(-1);
            }
            5.01% {
              transform: translate(42%, 41%) rotate(0deg) scaleX(1);
            }
            10.0% {
              transform: translate(52%, 77%) rotate(-1deg) scaleX(1);
            }
            12.0% {
              transform: translate(72%, 64%) rotate(2deg) scaleX(1);
            }
            12.01% {
              transform: translate(74%, 64%) rotate(2deg) scaleX(-1);
            }
            15.0% {
              transform: translate(45%, 75%) rotate(0deg) scaleX(-1);
            }
            17.0% {
              transform: translate(13%, 72%) rotate(0deg) scaleX(-1);
            }
            17.01% {
              transform: translate(11%, 72%) rotate(0deg) scaleX(1);
            }
            22.0% {
              transform: translate(33%, 73%) rotate(-3deg) scaleX(1);
            }
            22.01% {
              transform: translate(35%, 73%) rotate(-3deg) scaleX(-1);
            }
            24.0% {
              transform: translate(23%, 37%) rotate(1deg) scaleX(-1);
            }
            24.01% {
              transform: translate(21%, 37%) rotate(1deg) scaleX(1);
            }
            28.0% {
              transform: translate(30%, 52%) rotate(-2deg) scaleX(1);
            }
            30.0% {
              transform: translate(35%, 51%) rotate(2deg) scaleX(1);
            }
            30.01% {
              transform: translate(37%, 51%) rotate(2deg) scaleX(-1);
            }
            33.0% {
              transform: translate(10%, 29%) rotate(0deg) scaleX(-1);
            }
            33.01% {
              transform: translate(8%, 29%) rotate(0deg) scaleX(1);
            }
            37.0% {
              transform: translate(36%, 67%) rotate(-2deg) scaleX(1);
            }
            37.01% {
              transform: translate(38%, 67%) rotate(-2deg) scaleX(-1);
            }
            39.0% {
              transform: translate(16%, 72%) rotate(0deg) scaleX(-1);
            }
            39.01% {
              transform: translate(14%, 72%) rotate(0deg) scaleX(1);
            }
            44.0% {
              transform: translate(20%, 47%) rotate(1deg) scaleX(1);
            }
            49.0% {
              transform: translate(27%, 76%) rotate(-1deg) scaleX(1);
            }
            49.01% {
              transform: translate(29%, 76%) rotate(-1deg) scaleX(-1);
            }
            51.0% {
              transform: translate(13%, 70%) rotate(0deg) scaleX(-1);
            }
            51.01% {
              transform: translate(11%, 70%) rotate(0deg) scaleX(1);
            }
            56.0% {
              transform: translate(40%, 37%) rotate(2deg) scaleX(1);
            }
            60.0% {
              transform: translate(47%, 64%) rotate(-1deg) scaleX(1);
            }
            60.01% {
              transform: translate(49%, 64%) rotate(-1deg) scaleX(-1);
            }
            65.0% {
              transform: translate(33%, 73%) rotate(0deg) scaleX(-1);
            }
            65.01% {
              transform: translate(31%, 73%) rotate(0deg) scaleX(1);
            }
            67.0% {
              transform: translate(34%, 58%) rotate(1deg) scaleX(1);
            }
            67.01% {
              transform: translate(36%, 58%) rotate(1deg) scaleX(-1);
            }
            69.0% {
              transform: translate(24%, 21%) rotate(1deg) scaleX(-1);
            }
            71.0% {
              transform: translate(13%, 28%) rotate(0deg) scaleX(-1);
            }
            71.01% {
              transform: translate(11%, 28%) rotate(0deg) scaleX(1);
            }
            73.0% {
              transform: translate(37%, 66%) rotate(-2deg) scaleX(1);
            }
            77.0% {
              transform: translate(58%, 59%) rotate(2deg) scaleX(1);
            }
            77.01% {
              transform: translate(60%, 59%) rotate(2deg) scaleX(-1);
            }
            79.0% {
              transform: translate(37%, 23%) rotate(1deg) scaleX(-1);
            }
            81.0% {
              transform: translate(15%, 31%) rotate(0deg) scaleX(-1);
            }
            86.0% {
              transform: translate(13%, 64%) rotate(-1deg) scaleX(-1);
            }
            86.01% {
              transform: translate(11%, 64%) rotate(-1deg) scaleX(1);
            }
            88.0% {
              transform: translate(49%, 73%) rotate(-2deg) scaleX(1);
            }
            92.0% {
              transform: translate(64%, 34%) rotate(1deg) scaleX(1);
            }
            92.01% {
              transform: translate(66%, 34%) rotate(1deg) scaleX(-1);
            }
            97.0% {
              transform: translate(33%, 36%) rotate(0deg) scaleX(-1);
            }
            97.01% {
              transform: translate(31%, 36%) rotate(0deg) scaleX(1);
            }
            100.0% {
              transform: translate(70%, 45%) rotate(-2deg) scaleX(1);
            }
          }
          #little-chick-1 {
            animation-name: move-1;
            animation-duration: 180s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            transform-origin: center;
          }
        `}
      </style>

      <g
        id="little-chick-1"
        transform="translate(-100, 100)"
        style={{
          cursor: 'pointer',
        }}
      >
        <g id="little-chick-shadow" transform="translate(-2, 2)">
          <rect
            width="12"
            height="3"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 1.41422 2.12132)"
            fill="#6F6F6F"
            fillOpacity="0.1"
          />
          <rect
            width="10"
            height="1"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 1.41422 3.53553)"
            fill="#6F6F6F"
            fillOpacity="0.1"
          />
          <rect
            width="8"
            height="1"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 1.41422 4.94975)"
            fill="#6F6F6F"
            fillOpacity="0.1"
          />
        </g>

        <g id="little-chick-leg" transform="translate(2, 6)">
          <rect width="2" height="2" fill="#FF6F0F" />
          <rect x="1" y="1" width="2" height="1" fill="#FF6F0F" />
        </g>

        <g id="little-chick-body">
          <rect width="6" height="1" transform="matrix(-1 0 0 1 7 4)" fill="#FFD600" />
          <rect x="3" y="5" width="5" height="2" fill="white" />
          <rect x="3" y="5" width="5" height="2" fill="#FFD600" />
          <rect width="9" height="3" transform="matrix(-1 0 0 1 12 4)" fill="#FFD600" />
          <rect width="6" height="1" transform="matrix(-1 0 0 1 11 8)" fill="#FFD600" />
          <rect width="7" height="1" transform="matrix(-1 0 0 1 11 7)" fill="#FFD600" />
          <rect width="4" height="1" transform="matrix(-1 0 0 1 10 9)" fill="#FFD600" />
          <rect width="6" height="1" transform="matrix(-1 0 0 1 7 1)" fill="#FFD600" />
          <rect width="1" height="1" transform="matrix(-1 0 0 1 3 5)" fill="#FFD600" />
          <rect width="3" height="1" transform="matrix(-1 0 0 1 5 0)" fill="#FFD600" />
          <rect width="7" height="2" transform="matrix(-1 0 0 1 7 2)" fill="#FFD600" />
          <rect x="1" y="2" width="5" height="2" fill="white" />
          <rect x="1" y="2" width="5" height="2" fill="#FFD600" />
          <rect x="2" y="1" width="3" height="2" fill="white" />
          <rect x="2" y="1" width="3" height="2" fill="#FFD600" />
          <rect x="2" y="3" width="5" height="2" fill="white" />
          <rect x="2" y="3" width="5" height="2" fill="#FFD600" />
          <rect x="4" y="2" width="7" height="5" fill="white" />
          <rect x="4" y="2" width="7" height="5" fill="#FFD600" />
          <rect x="5" y="7" width="5" height="1" fill="white" />
          <rect x="5" y="7" width="5" height="1" fill="#FFD600" />
          <rect x="6" y="8" width="4" height="1" fill="white" />
          <rect x="6" y="8" width="4" height="1" fill="#FFD600" />
        </g>

        <g id="little-chick-head" transform="translate(6, -2)">
          <rect x="1" y="1" width="4" height="6" fill="#FFD600" />
          <rect x="2" y="3" width="1" height="1" fill="black" />
          <rect x="4" y="2" width="1" height="1" fill="black" />
          <rect width="1" height="4" transform="matrix(-1 0 0 1 1 1)" fill="#FFD600" />
          <rect width="1" height="1" transform="matrix(-1 0 0 1 5 1)" fill="#FFD600" />
          <rect width="1" height="4" transform="matrix(-1 0 0 1 6 2)" fill="#FFD600" />
          <rect width="3" height="1" transform="matrix(-1 0 0 1 4 0)" fill="#FFD600" />
          <rect x="4" y="4" width="2" height="2" fill="#FF6F0F" />
          <rect x="5" y="5" width="2" height="1" fill="#FF6F0F" />
        </g>
      </g>
    </svg>
  );
};
