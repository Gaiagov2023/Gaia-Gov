import React from "react";
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  styled,
  tableCellClasses,
  Skeleton,
} from "@mui/material";

const SkeletonCom = ({ length = 1 }) =>
  Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={`skeleton-row-${index}`}>
      {Array.from({ length })?.map((_, ind) => (
        <TableCell key={`skeleton-cell-${index}-${ind}`}>
          <Skeleton variant="rounded" width="100%" height={25} />
        </TableCell>
      ))}
    </TableRow>
  ));

const Table = ({
  headers,
  loading,
  totalElements,
  currentPage,
  pageSize,
  pagination,
  onPageChange,
  children,
}) => {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 16,
      fontWeight: "bold",
    },
  }));

  const onRowsPerPageChange = (e) => {
    onPageChange({ page: 0, size: e.target.value });
  };
  const onPaginationChange = (_, newPage) => {
    onPageChange({ page: newPage, size: pageSize });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers?.map(({ label, ...restProps }) => (
                <StyledTableCell key={label} {...restProps}>
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonCom length={headers.length} />
            ) : children?.length > 0 ? (
              children
            ) : (
              <TableRow>
                <TableCell
                  sx={{ padding: "10px", textAlign: "center" }}
                  colSpan={headers.length}
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {pagination && children?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={totalElements}
          page={currentPage}
          rowsPerPage={pageSize}
          onPageChange={onPaginationChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </>
  );
};

export default Table;
