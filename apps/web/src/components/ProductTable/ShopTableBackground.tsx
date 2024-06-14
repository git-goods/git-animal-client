import styled from 'styled-components';

function ShopTableBackground({ children }: { children: React.ReactNode }) {
  return (
    <Bg>
      <TableStyled>{children}</TableStyled>
    </Bg>
  );
}

export default ShopTableBackground;

const Bg = styled.div`
  height: 655px;
  background-image: url('/shop/table-bg.png');
  background-size: cover;
`;

const TableStyled = styled.div`
  border-collapse: collapse;
  width: 100%;
  height: fit-content;

  vertical-align: center;
`;
