'use client';

import { AnimatePresence, motion, useAnimate } from 'motion/react';
import Image from 'next/image';
import { ChangeEvent, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import TrashVector from '../assets/trash.svg';

const StickyBarContainer = styled.div`
  position: sticky;
  top: 24px;
`;

const StickyInputWrapper = styled(motion.div)`
  display: flex;
  flex: 1;
`;

const StickyBarInput = styled(motion.input)`
  outline: none;
  display: flex;
  width: 100%;
  font-size: 36px;
  line-height: 36px;
  min-height: 36px;
  color: white;
  backdrop-filter: blur(12px);
  background-color: #6b6b6b83;
  padding: 16px;
  border-radius: 24px;

  &::placeholder {
    color: white;
    font-weight: 200;
  }

  box-shadow: 0px 4px 36px 6px lightgray;
`;

const StickyContentContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TrashIcon = styled(Image)`
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const IconWrapper = styled(motion.button)`
  display: flex;
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
`;

type StickyBarProps = {
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  showReset?: boolean;
};

export const StickySearchBar = forwardRef<HTMLInputElement, StickyBarProps>(
  ({ ...props }: StickyBarProps, inputRef) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      if (props.showReset) {
        animate(scope.current, { marginRight: `48px` });
      } else {
        animate(scope.current, { marginRight: `0px` });
      }
    }, [props.showReset]);

    return (
      <StickyBarContainer>
        <StickyContentContainer>
          <StickyInputWrapper ref={scope}>
            <StickyBarInput onChange={props.onTextChange} placeholder="Enter a Search String" ref={inputRef} />
          </StickyInputWrapper>
          <AnimatePresence>
            {props.showReset && (
              <IconWrapper
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.075 }}
                exit={{ opacity: 0, x: 48 }}
                onClick={props.onReset}
              >
                <TrashIcon src={TrashVector} alt="trash vector icon"></TrashIcon>
              </IconWrapper>
            )}
          </AnimatePresence>
        </StickyContentContainer>
      </StickyBarContainer>
    );
  },
);
