async function regSw() {
  if ("serviceWorker" in navigator) {
    let url = process.env.PUBLIC_URL + "/sw.js";
    const reg = await navigator.serviceWorker.register(url, { scope: "/" });
    console.log("service config is", { reg });
    return reg;
  }
  throw Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  console.log({ subscription });
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BPsMcsZ8qxNgQ-NEkw2XFfCDDy_KQTpBPydxXfJt3IpHDx2Mod64gxA7BOYMd2SZFi_borJPXykbaDC26eOenWk",
    });
  }
}

export { regSw, subscribe };
