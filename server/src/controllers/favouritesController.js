import userModel from "../models/userModels.js";

export const addFavourite = async (req, res) => {
  const { movieId, title, poster } = req.body;

  const user = await userModel.findById(req.userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  
  if (user.favourites.some(m => m.movieId === movieId)) {
    return res.status(400).json({ msg: "Already in favourites" });
  }

  user.favourites.push({ movieId, title, poster });
  await user.save();

  res.json(user.favourites);
};


export const getFavourites = async (req, res) => {
  const user = await userModel.findById(req.userId).select("favourites");
  res.json(user.favourites);
};


export const deleteFavourite = async (req, res) => {
  const user = await userModel.findById(req.userId);

  user.favourites = user.favourites.filter(
    m => m.movieId !== req.params.movieId
  );

  await user.save();
  res.json(user.favourites);
};
