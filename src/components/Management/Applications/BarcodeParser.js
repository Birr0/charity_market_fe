import { Alert, AlertTitle } from "@material-ui/lab";

export const BarcodeParser = (barcode) => {
  if (barcode == null || barcode.length == 0 || String(barcode).match(/\D/g)) {
    return false;
  } else {
    return true;
  }
};

export function BarcodeError() {
  return (
    <>
      <Alert severity="error" style={{ fontSize: "large" }}>
        <AlertTitle>Can't use that code!</AlertTitle>
        <strong>Please try a different code</strong>
      </Alert>
    </>
  );
}

//Not very rigorous, duct tape fix for time being