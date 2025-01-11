'use client';

import styled from 'styled-components';
import { Advocate } from '../schemas';
import { SpecialityList } from './SpecialityList';

type AdvocateTableProps = {
  loading?: boolean;
  filteredAdvocates?: Advocate[];
};

const TableBody = styled.tbody`
  width: 50%;
`;

const ThHeader = styled.th`
  font-size: 16px;
  font-weight: 400;
  text-align: start;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  td {
    padding: 16px 0px;
  }
`;

const DummyLoader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  font-size: 42px;
  font-weight: 600;
`;

const TABLE_HEADER_VALUES = [
  'First Name',
  'Last Name',
  'City',
  'Degree',
  'Specialties',
  'Years of Experience',
  'Phone Number',
];

export const AdvocateTable = ({ ...props }: AdvocateTableProps) => {
  if (props.loading) return <DummyLoader>Loading Advocates Table...</DummyLoader>;
  return (
    <table style={{ display: 'table' }}>
      <thead>
        <tr>
          {TABLE_HEADER_VALUES.map((label, idx) => {
            return <ThHeader key={idx}>{label}</ThHeader>;
          })}
        </tr>
      </thead>
      <TableBody>
        {props.filteredAdvocates?.map((advocate, idx) => {
          return (
            <TableRow key={idx}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td style={{ width: 375 }}>
                <SpecialityList specialties={advocate.specialties} />
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </TableRow>
          );
        })}
      </TableBody>
    </table>
  );
};
