import userModel from "../models/userModels.js";

export const addWatchList = async (req, res) => {
  const { movieId, title, poster } = req.body;

  const user = await userModel.findById(req.userId);
  if (user.watchList.some(m => m.movieId === movieId)) {
    return res.json({ msg: "Already in watchlist" });
  }
  user.watchList.push({ movieId, title, poster });
  await user.save();

  res.json(user.watchList);
}
export const getWatchList = async (req, res) => {
  const user = await userModel.findById(req.userId).select("watchList");
  res.json(user.watchList);
};
export const deleteWatchList = async (req, res) => {
  const user = await userModel.findById(req.userId);

  user.watchList = user.watchList.filter(
    m => m.movieId !== req.params.movieId
  );

  await user.save();
  res.json(user.watchList);
};