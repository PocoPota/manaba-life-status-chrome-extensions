const logManabaData = () => {
  console.log("Manaba Life Status Extension Loaded");

  const setLog = (time, url) => {
    console.log("アクセスが記録されました", time);
    chrome.storage.sync.set({
      "url": url,
      "date": time,
    });

    // ここにgithub commit APIを叩くコードを追加
  }

  const nowTime = new Date().toLocaleString();

  // get prev data from local storage
  chrome.storage.sync.get(["date"], (result) => {
    const prevTime = result.date;
    const timeDiff = prevTime ? (new Date(nowTime) - new Date(prevTime)) / 1000 : null;

    if (timeDiff & timeDiff > 60 * 5) {
      setLog(nowTime, window.location.href);
    } else {
      console.log("5分以内の再アクセスのため、記録を更新しませんでした");
    }
  });
}

logManabaData();