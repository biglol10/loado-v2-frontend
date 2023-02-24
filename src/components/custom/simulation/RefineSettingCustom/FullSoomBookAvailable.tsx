import { Label, Image as SemanticImage } from 'semantic-ui-react';
import { loaImages } from '@consts/imgSrc';

const FullSoomBookAvailable = ({
  sun1Count,
  sun2Count,
  sun3Count,
}: {
  sun1Count: number;
  sun2Count: number;
  sun3Count: number;
}) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <Label color="black" style={{ fontSize: '1rem' }}>
        <SemanticImage avatar spaced="right" src={loaImages['태양의은총']} size="small" />
        {sun1Count}
      </Label>
      <Label color="black" style={{ fontSize: '1rem' }}>
        <SemanticImage avatar spaced="right" src={loaImages['태양의축복']} size="small" />
        {sun2Count}
      </Label>
      <Label color="black" style={{ fontSize: '1rem' }}>
        <SemanticImage avatar spaced="right" src={loaImages['태양의가호']} size="small" />
        {sun3Count}
      </Label>
    </div>
  );
};

export default FullSoomBookAvailable;
