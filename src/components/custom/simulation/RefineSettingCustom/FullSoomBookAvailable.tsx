import { Label, Image as SemanticImage } from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import styled from 'styled-components';

const StyledLabed = styled(Label)`
  font-size: 1rem !important;
`;

const FullSoomBookAvailable = ({
  sun1Count,
  sun2Count,
  sun3Count,
  bookValue = null,
}: {
  sun1Count: number;
  sun2Count: number;
  sun3Count: number;
  bookValue: {
    bookType: loaImagesType;
    probability: number;
  } | null;
}) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <StyledLabed color="black">
        <SemanticImage avatar spaced="right" src={loaImages['태양의은총']} size="small" />
        {sun1Count}
      </StyledLabed>
      <StyledLabed color="black">
        <SemanticImage avatar spaced="right" src={loaImages['태양의축복']} size="small" />
        {sun2Count}
      </StyledLabed>
      <StyledLabed color="black">
        <SemanticImage avatar spaced="right" src={loaImages['태양의가호']} size="small" />
        {sun3Count}
      </StyledLabed>
      {bookValue && (
        <StyledLabed color="black">
          <SemanticImage avatar spaced="right" src={loaImages[bookValue.bookType]} size="small" />
          <span style={{ color: 'tomato' }}>{bookValue.probability}%</span>
        </StyledLabed>
      )}
    </div>
  );
};

export default FullSoomBookAvailable;
