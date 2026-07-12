import mongoose from "mongoose";

declare global {
  var mongoose: {
    connection: mongoose.Connection | null;
    promise: promise<mongoose.Connection> | null
  };
}

export {}
