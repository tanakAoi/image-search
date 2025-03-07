import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect, useState } from "react";
import { LikedImage } from "./models/LikedImage";
import {
  ILikeImageContext,
  LikeImageContext,
} from "./contexts/LikeImageContext";
import { IImage } from "./models/IImage";
import { AuthContext, IAuthContext } from "./contexts/AuthContext";
import {
  getImagesFromDB,
  addFavoriteImage,
  deleteFavoriteImage,
} from "./services/imageService";
import { createNewUser } from "./services/userService";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: [],
    add: () => {},
    remove: () => {},
  });

  const [auth, setAuth] = useState<IAuthContext>({
    isAuthenticated: true,
    userIdWithGoogle: "",
    userIdWithGithub: "",
    userName: "",
  });

  useEffect(() => {
    setAuth({
      isAuthenticated: isAuthenticated,
      userIdWithGoogle: user?.sub?.includes("google") ? user.sub : "",
      userIdWithGithub: user?.sub?.includes("github") ? user.sub : "",
      userName: user?.name ?? "",
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (auth.userName) {
      createNewUser(auth.userName, auth);

      const getSavedFavoriteImages = async () => {
        try {
          const savedFavoriteImages = await getImagesFromDB(auth.userName);
          if (savedFavoriteImages) {
            setLikeImage({ ...likeImage, likedImages: savedFavoriteImages });
          }
        } catch (error) {
          console.error("Error getting saved favorite images", error);
        }
      };
      getSavedFavoriteImages();
    }
  }, [auth]);

  likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.image.link === newLikedImage.link
    );

    if (!existingImages) {
      const newFavoriteImage = new LikedImage(
        newLikedImage.link,
        newLikedImage.title
      );

      addFavoriteImage(auth.userName, newFavoriteImage);
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  likeImage.remove = (removedImage: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      deleteFavoriteImage(auth.userName, removedImage);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <AuthContext.Provider value={auth}>
          <LikeImageContext.Provider value={likeImage}>
            <RouterProvider router={router} />
          </LikeImageContext.Provider>
        </AuthContext.Provider>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
