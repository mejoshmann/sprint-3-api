const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Get all the videos
router.get("/", (req, res) => {
  const videoDataJSON = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataJSON);

  const newVideo = videoData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).send(newVideo);
});

// Get a single video
router.get("/:id", (req, res) => {
  const videoDataJSON = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataJSON);
  const videoId = req.params.id;

  const selectedVideo = videoData.find((video) => video.id === videoId);
  if (selectedVideo) {
    res.send(selectedVideo);
  } else {
    res.status(404).send();
  }
});

// upload video
router.post("/", (req, res) => {
  const videoDataJSON = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataJSON);
  const uploadId = uuidv4();

  const newVideo = {
    id: uploadId,
    title: req.body.title,
    channel: "The Best Channel",
    image: "/images/husky.jpg",
    description: req.body.description,
    timestamp: Date.now(),
  };
  videoData.push(newVideo);
  const updatedVideoData = JSON.stringify(videoData);
  fs.writeFileSync("./data/videos.json", updatedVideoData);
  res.status(201).send("Video uploaded successfully");
});

// Post a comment
router.post("/:id/comments", (req, res) => {
  const videoDataJSON = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataJSON);
  const videoId = req.params.id;

  const comment = {
    id: uuidv4(),
    name: "Joshua Mann",
    comment: req.body.comment,
    timestamp: Date.now(),
  };
  const selectedVideo = videoData.find((video) => video.id === videoId);
  selectedVideo.comments.push(comment);

  const commentString = JSON.stringify(videoData);
  fs.writeFileSync("./data/videos.json", commentString);
  res.status(201).send("New Comment posted");
});

// not working correctly
router.delete("/:id/comments/commentId", (req, res) => {
  const videoDataJSON = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataJSON);
  const videoId = req.params.id;
  const commentId = req.params.commentId;

  const selectVideo = videoData.find((video) => video.id === videoId);
  if (!selectVideo) {
    res.status(404).send("Video not found");
    return;
  }

  const commentIndex = selectedVideo.comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex === -1) {
    res.status(404).send("Comment not found");
  }

  selectedVideo.comments.splice(commentIndex, 1);

  const updatedVideoData = JSON.stringify(videoData);
  fs.writeFileSync("./data/videos.json", updatedVideoData);
  res.send.status(200).send("Comment deleted successfully");
});

module.exports = router;
