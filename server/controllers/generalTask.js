import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.status(200).json(Tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
