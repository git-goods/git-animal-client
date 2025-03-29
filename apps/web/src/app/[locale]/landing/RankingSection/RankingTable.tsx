import { css, cx } from '_panda/css';
import type { RankType } from '@gitanimals/api';

import { RankingLink } from './RankingLink';

export function RankingTable({ ranks }: { ranks: RankType[] }) {
  return (
    <div className={rankingListStyle}>
      <table className={tableStyle}>
        <thead>
          <tr className={theadTrStyle}>
            <th>Rank</th>
            <th>Pet</th>
            <th>Name</th>
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((item) => (
            <tr key={item.rank} className={trStyle}>
              <td>{item.rank}</td>
              <td>
                <RankingLink id={item.name}>
                  <img src={item.image} alt={item.name} width={60} height={60} />
                </RankingLink>
              </td>
              <td>
                <RankingLink id={item.name}>{item.name}</RankingLink>
              </td>
              <td>{item.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const rankingListStyle = css({});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate',
  textAlign: 'left',
  borderSpacing: '0 4px',
});

const trBaseStyle = css({
  borderRadius: '8px',

  '& td, & th': {
    border: 'none',
    padding: '0 16px',
  },

  '& td:first-child, & th:first-child': {
    paddingLeft: '40px',
    borderRadius: '8px 0 0 8px',
    width: '120px',
  },
  '& td:last-child, & th:last-child': {
    paddingRight: '40px',
    borderRadius: '0 8px 8px 0',
    textAlign: 'right',
  },
  '& td:nth-child(2), & th:nth-child(2)': {
    textAlign: 'center',
    width: '72px',
    padding: '0 8px',
  },
});

const theadTrStyle = cx(
  trBaseStyle,
  css({
    textStyle: 'glyph16.bold',
    backgroundColor: 'white.white_50',
    color: 'white.white_100',
    height: '40px',
  }),
);

const trStyle = cx(
  trBaseStyle,
  css({
    textStyle: 'glyph18.regular',
    color: 'white.white_100',
    backgroundColor: 'white.white_10',
    height: '60px',

    '& td:first-child': {
      fontSize: '20px',
      lineHeight: '28px',
      fontFamily: 'token(fonts.dnf)',
      color: 'white.white_50',
    },
  }),
);
