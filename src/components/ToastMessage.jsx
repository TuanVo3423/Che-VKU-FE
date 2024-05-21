import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { SystemReducer } from "../redux/Reducers/System";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ isOpen, title, type }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(SystemReducer.actions.setIsDisplayMessage());
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{ width: "100%", padding: "10px"}}
        >
          {title}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
