import { Request, Response } from "express";
import { loginService, logoutService } from "../services/auth";

export const loginController = async (req: Request, res: Response) => {
  const loginToken = await loginService(req.body);
  res.cookie("authToken", loginToken.payload?.token, {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
  });
  res.status(loginToken.status).json({
    success: loginToken.success,
    message: loginToken.message,
    payload: loginToken.payload,
  });
};
export const logoutController = async (req: Request, res: Response) => {
  const response = await logoutService({
    owner: req.body.loggedUser.userId,
    token: req.body.loggedUser.token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  if (response) {
    res.clearCookie("authToken");
    res.status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } else res.json({ message: "something went wrong" });
};
