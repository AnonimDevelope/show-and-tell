export const postComment = async (postId, comment, replyTo) => {
  if (replyTo) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}posts/${postId}/comments/${
        replyTo._id
      }?secret_token=${localStorage.getItem("token")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );

    return await response.json();
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/comments?secret_token=${localStorage.getItem("token")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }
  );

  return await response.json();
};

export const addLike = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/like?secret_token=${localStorage.getItem("token")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.log(error));
};

export const deleteLike = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/like?secret_token=${localStorage.getItem("token")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.log(error));
};

export const addDislike = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/dislike?secret_token=${localStorage.getItem("token")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.log(error));
};

export const deleteDislike = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/dislike?secret_token=${localStorage.getItem("token")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.log(error));
};

export const savePost = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }user/saves?secret_token=${localStorage.getItem("token")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: postId }),
    }
  ).catch((error) => console.log(error));
};

export const deleteSavedPost = (postId) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }user/saves?secret_token=${localStorage.getItem("token")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: postId }),
    }
  ).catch((error) => console.log(error));
};

export const likeComm = (postId, commId, nestCommId) => {
  if (nestCommId) {
    fetch(
      `${
        process.env.NEXT_PUBLIC_DOMAIN_API
      }posts/${postId}/comments/${commId}/${nestCommId}/like?secret_token=${localStorage.getItem(
        "token"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return;
  }

  fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/comments/${commId}/like?secret_token=${localStorage.getItem(
      "token"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const dislikeComm = (postId, commId, nestCommId) => {
  if (nestCommId) {
    fetch(
      `${
        process.env.NEXT_PUBLIC_DOMAIN_API
      }posts/${postId}/comments/${commId}/${nestCommId}/dislike?secret_token=${localStorage.getItem(
        "token"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return;
  }

  fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/comments/${commId}/dislike?secret_token=${localStorage.getItem(
      "token"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPostInfo = async (postId) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/rate?secret_token=${localStorage.getItem("token")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const getComments = async (postId) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}/comments?secret_token=${localStorage.getItem("token")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const getDate = (date) => {
  const timestamp = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${
    months[timestamp.getMonth()]
  } ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
};

export const deletePost = async (postId) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN_API
    }posts/${postId}?secret_token=${localStorage.getItem("token")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const getTextFromContent = (content) => {
  let text = "";

  content.blocks.forEach((block) => {
    if (block.type === "paragraph") {
      text = text + " " + block.data.text;
    }
  });

  return text;
};

export const getAllPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_API}posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getPost = async (slug) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_API}posts/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
