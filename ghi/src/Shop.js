import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import background from "./img/pixellated_tavern.png";
import currency from "./img/newcurrency.png";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/charSlice";
import { useGetShopItemsQuery, usePurchaseItemMutation } from "./store/shopApi";
import { useEffect } from "react";
import { useLazyGetCharacterDetailsQuery } from "./store/charApi";
import { useGetTokenQuery } from "./store/authApi";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Shop() {
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { active_character, stored_char_details } = useSelector(
    (state) => state.character
  );
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
    if (token && !active_character) {
      navigate("/ground-7-rule/selectCharacter");
    }
  }, [token, tokenLoading, active_character, navigate]);
  // End of Token and Active character check

  const { data: shopItems, isLoading } = useGetShopItemsQuery(1);
  const [purchaseItem] = usePurchaseItemMutation();

  const [getCharacterDetails, { data: character_details, isSuccess }] =
    useLazyGetCharacterDetailsQuery();

  const dispatch = useDispatch();

  const tryBuy = async (e) => {
    e.preventDefault();
    const attemptPurchase = await purchaseItem({
      character_id: active_character,
      item_id: e.target.value,
    });
    if (attemptPurchase.data.character_name) {
      getCharacterDetails(active_character);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateField({ field: "stored_char_details", value: character_details })
      );
    }
  }, [character_details, dispatch, isSuccess]);

  return (
    <div
      className="pb-10"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingBottom: "30%",
      }}
    >
      <div className="row">
        <div className="offset-1 col-10">
          <div className="form-bg">
            <div className="shadow p-4 mt-4">
              <div className="float-right text-warning">
                <img src={currency} alt="" style={{ maxHeight: "25px" }} />
                {stored_char_details?.currency}
              </div>
              <h1 className="text-white" style={{ textAlign: "center" }}>
                {isLoading ? (
                  <CircularProgress color="warning" />
                ) : (
                  shopItems?.shop_name
                )}
              </h1>
              <div className="container">
                <div className="row">
                  {isLoading ? (
                    <CircularProgress color="warning" />
                  ) : (
                    shopItems?.items.map((item) => {
                      return (
                        <Card
                          key={item.id}
                          style={{ width: "18rem" }}
                          className="p-0 bg-dark bg-gradient border border-warning border-2"
                        >
                          <Card.Img
                            variant="top"
                            src={require(`./img/items/${item.img}`)}
                            style={{
                              objectFit: "cover",
                              maxHeight: "250px",
                              maxWidth: "auto",
                            }}
                          />
                          <Card.Body className="text-center align-bottom text-white">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Button
                              onClick={tryBuy}
                              value={item.id}
                              variant="warning"
                            >
                              Purchase for {item.price} coin
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
