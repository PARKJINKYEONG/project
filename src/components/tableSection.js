import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TableSection({ title, columns, rows, handleDelete, dataFormatter }) {
  return (
    <>
      <h2 style={{ color: '#1976d2', marginBottom: '20px' }}>{title}</h2>
      <TableContainer component={Paper} style={{ marginTop: '20px', backgroundColor: '#f4f6f8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align || 'left'} style={{ color: 'white', fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} style={{ backgroundColor: '#e3f2fd', borderBottom: '2px solid #bbdefb' }}>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align || 'left'}
                    onClick={column.onClick ? () => column.onClick(row) : undefined}
                    style={{
                      cursor: column.onClick ? 'pointer' : 'default',
                      color: column.onClick ? '#1976d2' : 'inherit', // 클릭 가능한 텍스트의 색상을 변경
                      textDecoration: column.onClick ? 'underline' : 'none', // 클릭 가능한 텍스트에 밑줄 추가
                      fontWeight: column.onClick ? 'bold' : 'normal', // 클릭 가능한 텍스트를 굵게
                    }}
                  >
                    {dataFormatter ? dataFormatter(row, column.field) : row[column.field]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableSection;
