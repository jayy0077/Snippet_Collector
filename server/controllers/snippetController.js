const Snippet = require("../models/Snippet");

const createSnippet = async (req, res) => {
  try {
    const { userId, title, language, code, tags, description } = req.body;

    const snippet = new Snippet({
      userId,
      title,
      language,
      code,
      tags,
      description,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    console.error('Create snippet error:', error);
    res.status(400).json({ error: 'Failed to create snippet' });
  }
};
const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user.uid }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    console.error("Get snippets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, language, code, description } = req.body;

  try {
    const updated = await Snippet.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { title, language, code, description }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update snippet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteSnippet = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Snippet.findOneAndDelete({ _id: id, userId: req.user.uid });

    if (!deleted) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json({ message: "Snippet deleted" });
  } catch (error) {
    console.error("Delete snippet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
};