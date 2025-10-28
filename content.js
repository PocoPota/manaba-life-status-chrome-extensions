const logManabaData = () => {
  console.log("Manaba Life Status Extension Loaded");

  const callGitHubAPI = async (timestamp, host) => {
    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: CONFIG.BRANCH,
          inputs: {
            timestamp: timestamp.toString(),
            host: host,
          },
        }),
      });

      if (response.status === 204) {
        console.log('GitHub Actions APIを呼び出しました');
      } else {
        console.error('GitHub Actions APIの呼び出しに失敗しました:', response.status);
      }
    } catch (error) {
      console.error('GitHub Actions APIの呼び出し中にエラーが発生しました:', error);
    }
  };

  const setLog = (time, url) => {
    console.log("アクセスが記録されました", time);
    chrome.storage.sync.set({
      "url": url,
      "date": time,
    });

    // GitHub Actions APIを叩く
    const timestamp = new Date(time).getTime();
    const host = new URL(url).hostname;
    callGitHubAPI(timestamp, host);
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