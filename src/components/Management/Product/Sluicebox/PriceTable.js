import {useState, createRef} from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//import CurrencyFormat from "react-currency-format";
import Button from "@material-ui/core/Button";

const ITEM_HEIGHT = 100;

export const LongMenu = ({ options, id, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ref = createRef({ id });
  return (
    <div ref={ref} style={{ display: "flex" }}>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        style={{
          fontColor: "black",
          border: "1px solid black",
          marginTop: "1px",
        }}
      >
        {title}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            maxWidth: "35ch",
          },
        }}
      >
        {options ? (
          options.map((option) => (
            <MenuItem key={option.id} onClick={handleClose}>
                <p>
                      <strong>{option.value}</strong>
                      <small> ({option.condition})</small>
                    </p>
              
            </MenuItem>
          ))
        ) : (
          <b style={{ marginLeft: "5px" }}>No prices available</b>
        )}
      </Menu>
    </div>
  );
};

/*

<CurrencyFormat
                renderText={(value) => (
                  <>
                    
                  </>
                )}
                decimalScale={2}
                value={option.price.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
              />

*/
