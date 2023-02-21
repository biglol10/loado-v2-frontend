import styled from 'styled-components';

const InheritedMaterials = styled.div`
  border: 1px solid slategrey;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${localStorage.getItem('deviceType') === 'mobile' ? '1' : '3'},
    1fr
  );
  gap: 10px;
  padding: 10px 20px;
`;

const RefineSettingDiv = styled.div`
  border: 1px solid slategrey;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const H3NoMargin = styled.h3`
  margin-bottom: 0px;
  margin-right: 20px;
`;

export { InheritedMaterials, RefineSettingDiv, H3NoMargin };
