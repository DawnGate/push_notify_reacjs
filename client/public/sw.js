this.addEventListener("active", function (event) {
  console.leg("service worker actived");
});

this.addEventListener("push", async function (event) {
  console.log("notification will be display here");
});
