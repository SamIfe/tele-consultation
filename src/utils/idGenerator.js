
const generateId = (prefix) => {
  return prefix + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

module.exports = { generateId };
