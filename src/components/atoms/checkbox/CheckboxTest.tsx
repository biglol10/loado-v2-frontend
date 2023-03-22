import React from 'react';

const CheckboxTest = ({ label, checked, onChange }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label style={{ marginBottom: '0.5rem' }}>{label}</label>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxTest;
