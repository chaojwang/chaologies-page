import { useEffect } from "react";

const CREATOR_MONEY_ORIGIN = "https://creator-money-starter-kit.chaologies.chatgpt.site";

export default function CreatorMoneyEmbed({ route = "/creator-money" }) {
  const editionPath = route.replace(/^\/creator-money/, "") || "/";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Creator Money OS｜副业全年钱管家";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="creator-money-host">
      <iframe
        className="creator-money-frame"
        src={`${CREATOR_MONEY_ORIGIN}${editionPath}`}
        title="Creator Money OS／副业全年钱管家"
        allow="clipboard-write"
      />
    </main>
  );
}
