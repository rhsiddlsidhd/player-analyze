export const fetcher = (...args) =>
  fetch(...args).then((res) => {
    console.log("fetcher");
    return res.json();
  });
