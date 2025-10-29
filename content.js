const logManabaData = async () => {
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

  const setLog = async (time, url) => {
    console.log("アクセスが記録されました", getDateTimeFromTs(time));
    try {
      await setStorage({
        "url": url,
        "date": time,
      });
    } catch (error) {
      console.error('ストレージへの保存に失敗しました:', error);
      throw error; // エラーを再スローして上位で処理できるようにする
    }

    // GitHub Actions APIを叩く
    const timestamp = time;
    const host = new URL(url).hostname;
    await callGitHubAPI(timestamp, host);
  };

  const nowTime = getNow();

  // get prev data from local storage
  const result = await getStorage(["date"]);
  const prevTime = result.date;
  const timeDiff = prevTime ? (nowTime - prevTime) : null;

  const FIVE_MINUTES_MS = 5 * 60 * 1000; // 5分をミリ秒で表現

  if (!prevTime || (timeDiff && timeDiff > FIVE_MINUTES_MS)) {
    await setLog(nowTime, window.location.href);
  } else {
    console.log("5分以内の再アクセスのため、記録を更新しませんでした");
  }
};

logManabaData();