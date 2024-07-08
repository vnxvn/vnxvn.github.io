const video = document.querySelector(".video");
const paging = document.querySelector(".paging");
let urls = [];

const readFileTxt = async (file) => {
  if (urls.length === 0) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      urls = data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    } catch (e) {
      console.log(e);
    }
  }
  return urls;
};

const renderPaging = (pages) => {
  var html = "";
  for (var i = 1; i <= pages; i++) {
    html += ` <li  class="${
      i === 1 ? "active" : ""
    } "  onclick="onClickPage(event,${i})">${i} </li>`;
  }
  if (paging) {
    paging.innerHTML = html;
  }
};

const onClickPage = async (e, page) => {
  const spans = document.querySelectorAll("li");
  video.src = urls[page - 1];
  if (spans.length > 0) {
    spans.forEach((el) => el.classList.remove("active"));
  }
  e.target.classList.add("active");
};

function setCookie(name, value, housr) {
  const date = new Date();
  date.setTime(date.getTime() + housr * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

document.addEventListener("click", function () {
  var cookie = getCookie("cookie000");
  if (cookie === null) {
    window.open(window.location.href);
    window.location.href = "https://s.shopee.vn/LSDf5RWvY";
    setCookie("cookie000", "shopee", 5);
  }
});

const main = async () => {
  await readFileTxt("ttt.txt");

  video.src = urls[0];
  renderPaging(urls.length);
};

main();
