exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  // Demo login (baad me DB add karenge)
  res.json({
    success: true,
    token: "demo-jwt-token",
    user: { email },
  });
};

exports.signup = (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({
    success: true,
    message: "User registered",
  });
};
