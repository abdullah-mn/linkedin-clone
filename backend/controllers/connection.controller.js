import ConnectionRequest from "../models/connectionRequest.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const sendConnectionRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const senderId = req.user._id;

    if (senderId.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }

    if (req.user.connections.includes(userId)) {
      return res.status(400).json({ message: "You are already connected" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      sender: senderId,
      recipient: userId,
      status: "pending",
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A connection request already pending" });
    }

    const newRequest = new ConnectionRequest({
      sender: senderId,
      recipient: userId,
    });
    await newRequest.save();

    res.status(200).json(newRequest);
  } catch (error) {
    console.log("Error in sendConnectionRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // check if the request is for the current user
    if (request.recipient._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been accepted" });
    }
    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender._id, {
      $addToSet: { connections: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { connections: request.sender._id },
    });

    const notification = new Notification({
      recipient: request.user._id,
      type: "connectionAccepted",
      relatedUser: userId,
    });
    await notification.save();

    res.status(200).json({ message: "Connection accepted successfully" });
  } catch (error) {
    console.log("Error in acceptConnectionRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
      return res.status(403).json({ message: "Connection request not found" });
    }

    if (request.recipient.toString() !== userId.toString()) {
      return res
        .status(400)
        .json({ message: "Not authorized to reject this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }
    request.status = "rejected";
    await request.save();

    res.json({ message: "Connection request rejected" });
  } catch (error) {
    console.log("Error in rejectConnectionRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConnectionRequests = async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "name username profilePicture headline connections");

    res.status(200).json(requests);
  } catch (error) {
    console.log("Error in getConnectionRequests controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
