'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import styled from 'styled-components';
import { Advocate } from '../schemas';

const ShowSpecialtiesButton = styled.button`
  outline: none;
  border: none;
  text-decoration: underline;
  text-underline-offset: 4px;
  display: flex;
  &:hover {
    text-underline-offset: 6px;
  }
  transition: background-color ease-in-out 200ms, text-underline-offset ease-in-out 200ms;
`;

const AnimatedListContainer = styled(motion.ul)`
  > ::before {
    content: '✦';
    margin-right: 8px;
  }
`;

const AnimatedListItem = styled(motion.li)`
  width: fit-content;
`;

type SpecialityListProps = Pick<Advocate, 'specialties'>;
export const SpecialityList = ({ ...props }: SpecialityListProps) => {
  const [showSpec, setShowSpec] = useState<boolean>(false);
  return (
    <>
      <ShowSpecialtiesButton onClick={() => setShowSpec((prev) => !prev)}>
        {showSpec ? 'Hide Specialties' : 'Show Specialties'}
      </ShowSpecialtiesButton>
      <AnimatePresence>
        {showSpec && (
          <AnimatedListContainer
            style={{ width: 'fit-content' }}
            exit={{ height: 0 }}
            transition={{ delay: 0.1 * props.specialties.length }}
          >
            {props.specialties.map((spec, idx) => {
              return (
                <AnimatedListItem
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  exit={{ y: -10, opacity: 0 }}
                  key={idx}
                >
                  {spec}
                </AnimatedListItem>
              );
            })}
          </AnimatedListContainer>
        )}
      </AnimatePresence>
    </>
  );
};
