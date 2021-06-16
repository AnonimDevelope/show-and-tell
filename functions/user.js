export const getUserSaves = async () => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }user/saves?secret_token=${localStorage.getItem("token")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const getUserHistory = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN_API +
      "user/history?secret_token=" +
      localStorage.getItem("token"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const clearUserHistory = async (body) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN_API +
      "user/history?secret_token=" +
      localStorage.getItem("token"),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );

  return await response.json();
};

export const getUserProfile = async (userId) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }user/${userId}?secret_token=${localStorage.getItem("token")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};
