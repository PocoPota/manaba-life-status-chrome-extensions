const logManabaData = async () => {
  console.log("Manaba Life Status Extension Loaded");

  const callGitHubAPI = async (ts, host) => {
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
            timestamp: ts.toString(),
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

  const setLog = async (ts, host) => {
    console.log("アクセスが記録されました", getDateTimeFromTs(ts));
    try {
      await setStorage({
        "host": host,
        "ts": ts,
      });
    } catch (error) {
      console.error('ストレージへの保存に失敗しました:', error);
      throw error; // エラーを再スローして上位で処理できるようにする
    }

    // GitHub Actions APIを叩く
    await callGitHubAPI(ts, host);
  };

  const nowTs = getNow();

  // get prev data from local storage
  const result = await getStorage(["ts"]);
  const prevTs = result.ts;
  const timeDiff = prevTs ? (nowTs - prevTs) : null;

  const FIVE_MINUTES_MS = 5 * 60 * 1000; // 5分をミリ秒で表現

  if (!prevTs || (timeDiff && timeDiff > FIVE_MINUTES_MS)) {
    const host = window.location.hostname;
    await setLog(nowTs, host);
  } else {
    console.log("5分以内の再アクセスのため、記録を更新しませんでした");
  }
};

logManabaData();