import {
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, {
  Fragment,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext from "../context/auth.context";
import { signInWithGoogle } from "../firebase/auth";
import { addFavorite, removeFavorite } from "../firebase/user.firestore";
import { IFavorite, IUser } from "../models/User";

export default function FavoriteButton(props: any) {
  const [openAddFavorite, setOpenAddFavorite] = useState(false);
  const [openRemoveFavorite, setOpenRemoveFavorite] = useState(false);
  const [openNeedLogin, setOpenNeedLogin] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const { user, userData, loading, setUserData } = useContext(AuthContext);

  const handleFavoriteButton = () => {
    if (!user) {
      setOpenNeedLogin(true);
    } else {
      if (isFavorite) {
        removeFavorite(props.lifeId, user.email).then(() => {
          const newFavorites = userData.favorites.filter(
            (id) => id !== props.lifeId
          );
          const newUserData = { ...userData, favorites: newFavorites };
          console.log("newR", newUserData);
          setUserData(newUserData);
          setIsFavorite(false);
          setOpenRemoveFavorite(true);
        });
      } else {
        addFavorite(props.lifeId, user.email).then(() => {
          userData.favorites.push(props.lifeId);
          const newUserData = userData;
          console.log("newA", newUserData);
          setUserData(newUserData);
          setIsFavorite(true);
          setOpenAddFavorite(true);
        });
      }
    }
  };

  const login = () => {
    signInWithGoogle().then(() => {
      setOpenNeedLogin(false);
    });
  };

  useEffect(() => {
    if (userData) {
      console.log(userData);
      if (userData.favorites.some((el) => el === props.lifeId)) {
        setIsFavorite(true);
      }
    }
  }, [userData, user, loading]);

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={login}>
        SIGN IN
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenNeedLogin(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Fragment>
      <IconButton aria-label="favorite" onClick={handleFavoriteButton}>
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      <Snackbar
        open={openAddFavorite}
        autoHideDuration={3000}
        message="Added to favorite!"
      />
      <Snackbar
        open={openRemoveFavorite}
        autoHideDuration={3000}
        message="Removed from favorite!"
      />
      <Snackbar
        open={openNeedLogin}
        autoHideDuration={3000}
        message="Need to login"
        action={action}
      />
    </Fragment>
  );
}
