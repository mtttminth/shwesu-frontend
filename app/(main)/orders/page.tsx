import {
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { getOrders } from "@/lib/apis/order";
import OrderDetail from "@/components/order/OrderDetail";
import OrderHistoryPagination from "@/components/order/OrderHistoryPagination";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="px-12 mt-8 mb-12">
        <Grid>
          <Box className="content-center items-center mb-8">
            <h1 className="text-lg">Order List</h1>
          </Box>
        </Grid>
        <Grid xs={12} md={12} mt={2}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order number</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders ? (
                  orders.data.map((order) => (
                    <OrderDetail key={order.id} order={order} />
                  ))
                ) : (
                  <Typography variant="h6">No orders available</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3rem",
            marginTop: "3rem",
          }}
        >
          <OrderHistoryPagination
            currentPage={orders.meta.current_page}
            pageCount={orders.meta.last_page}
          />
        </Stack>
      </Box>
    </Box>
  );
}
