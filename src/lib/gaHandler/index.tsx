import React from "react";
import Analytics from "./csrGA";
import { headers } from "next/headers";

// Get Nonce from server response headers
const GAHandler = async () => {
  const nonce = (await headers()).get("x-nonce")!;
  return <Analytics nonce={nonce} />;
};

export default GAHandler;
