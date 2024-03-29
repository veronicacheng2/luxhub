import { Typography, Modal, Box, Button } from "@material-ui/core";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ConfirmModal({
  handleClose,
  open,
  bestPrice,
  bestBidAsk,
  productId,
  size,
}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);

  const confirmOrder = async () => {
    try {
      const res = await userRequest.post("/orders", {
        productId,
        size,
        price: bestBidAsk.price,
        seller: currentUser._id,
        buyer: bestBidAsk.userId,
      });
      await userRequest.delete("/bids/" + bestBidAsk._id);
      navigate("/successOrder", { state: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style.modalWrapper}>
          <Typography sx={{ fontFamily: "Urbanist" }}>
            The Highest Bid now is ${bestPrice}, will you take this offer and
            sell at ${bestPrice}?
          </Typography>
          <Box sx={style.btnWrapper}>
            <Button
              variant="outlined"
              size="medium"
              sx={{ color: "black" }}
              onClick={confirmOrder}
            >
              Confirm
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{ color: "black" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

/** @type {import("@mui/material").SxProps} */
const style = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    mt: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
};
