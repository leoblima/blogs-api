const service = require('../services/postService');

const addPost = async (req, res) => {
try {
 const { code, data, message } = await service.addPost(req.body, req.user);

 if (message) return res.status(code).json(message);

 return res.status(code).json(data);
} catch (error) {
 return res.status(500).json({ error: error.message });
}
};

module.exports = { addPost };