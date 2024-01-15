const loadCustomStylesheet = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("custom.css");
  document.head.appendChild(link);
};

const addUserStatus = () => {
  const allAvatars = document.querySelectorAll(".post-avatar");
  for (let i = 0; i < allAvatars.length; i++) {
    const avatar = allAvatars[i];
    const customDiv = document.createElement("div");
    //choose random between 3 strings
    const random = Math.floor(Math.random() * 3);
    const status = ["green-bar", "red-bar", "yellow-bar"];
    customDiv.classList.add(status[random]);
    avatar.appendChild(customDiv);
  }
};

const removeBlockedPosts = () => {
  const postsWrapper = document.getElementById("posts-wrap");
  const posts = postsWrapper.children;
  const updatedBlockedUsers = JSON.parse(
    window.localStorage.getItem("blocked_users")
  );
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postAuthor = post.getAttribute("data-autor");
    const postNumber = post.getAttribute("id");

    console.log("post author", postNumber + " " + postAuthor);

    if (updatedBlockedUsers.includes(postAuthor)) {
      post.remove();
    }
  }
};

const observer = new MutationObserver((mutations) => {
  // find mutation whose targete is a div with id "user-card"
  const uniqueMutation = mutations.find((mutation) => {
    return mutation.target.id === "user-card";
  });

  if (!uniqueMutation) return;

  const userInfo = uniqueMutation.target.querySelector(".user-info");
  const userName = userInfo.querySelector("h4").innerText;
  const userControls = uniqueMutation.target.querySelector(".user-controls");
  addButtonsToUserPopup(userControls, userName);
});

observer.observe(document, {
  subtree: true,
  attributes: true,
});

loadCustomStylesheet();
removeBlockedPosts();
addUserStatus();
