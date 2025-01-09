'use client';

import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { AdvocateTable } from './components/AdvocateTable';
import { StickySearchBar } from './components/StickySearchBar';
import { useAsyncAtom, useDebounce } from './hooks';
import { filterStringAtom } from './store/filterStringAtom';
import { filteredAdvocatesAsyncAtom } from './store/filteredAdvocatesAsyncAtom';

const StyledHeader = styled.h1`
  font-weight: 700;
  font-size: 42px;
  letter-spacing: 2px;
  align-self: center;
  color: #474747;
`;

const SearchHintContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-left: 12px;
`;

export default function Home() {
  const [showReset, setShowReset] = useState<boolean>(false);
  const setFilterString = useSetAtom(filterStringAtom);
  const { loading, error, data: filteredAdvocates } = useAsyncAtom(filteredAdvocatesAsyncAtom);

  const searchTermSpanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { debouncedFn: debouncedOnChange } = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilterString(searchTerm);
    searchTerm && searchTerm !== '' ? setShowReset(true) : setShowReset(false);
  }, 150);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (searchTermSpanRef.current) {
      searchTermSpanRef.current.textContent = e.target.value;
    }
    debouncedOnChange(e);
  }, []);

  const handleReset = useCallback(() => {
    setFilterString(undefined);
    setShowReset(false);
    if (inputRef.current && searchTermSpanRef.current) {
      inputRef.current.value = '';
      searchTermSpanRef.current.textContent = '';
    }
  }, [setFilterString]);

  if (error) return <h1>An Error Has Occured</h1>;

  return (
    <main
      style={{
        margin: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <StyledHeader>Solace Advocates</StyledHeader>
      <SearchHintContainer>
        <h3 style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>Searching for:</h3>
        <span ref={searchTermSpanRef}></span>
      </SearchHintContainer>
      <StickySearchBar onTextChange={onChange} showReset={showReset} onReset={handleReset} ref={inputRef} />
      <AdvocateTable loading={loading} filteredAdvocates={filteredAdvocates} />
    </main>
  );
}
