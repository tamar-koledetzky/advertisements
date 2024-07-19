import React from 'react';
import { RotatingTriangles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const CustomSpinner = ({ size = 40, color1 = '#ff0000', color2 = '#00ff00', color3 = '#0000ff' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
      <RotatingTriangles
        visible={true}
        height={size}
        width={size}
        colors={[color1, color2, color3]}
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default CustomSpinner;
