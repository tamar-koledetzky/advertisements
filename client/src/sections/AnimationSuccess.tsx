import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SuccessOverlay = styled.div<{ duration: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out, ${fadeOut} 1s ease-out ${props => props.duration - 3}s;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 2rem;
  z-index: 9999;
`;

const Message = styled.div`
  margin-bottom: 20px;
`;

const CheckMark = styled.div`
  font-size: 4rem;
`;
interface AnimationSuccessProps {
  message: string;
  duration: number;
  onAnimationEnd: () => void;
}

const AnimationSuccess: React.FC<AnimationSuccessProps> = ({ message, duration,onAnimationEnd }) => {
  return (
    <SuccessOverlay duration={duration} onAnimationEnd={onAnimationEnd}>
      <Message>{message}</Message>
      <CheckMark>✔️</CheckMark>
      {/* <Typography component={StyledLink} to="/home">
        למעבר לדף הבית
        <Arrow>←</Arrow>
      </Typography> */}
    </SuccessOverlay>
  );
};

export default AnimationSuccess;
