import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");
    // find users who are not already connected, and also neglect the our own profile to filter suggested connections
    const suggestedUser = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
    })
      .select("name username profilePicture headline")
      .limit(6);

    res.json(suggestedUser);
  } catch (error) {
    console.log("Error in getSuggestedConnections controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
